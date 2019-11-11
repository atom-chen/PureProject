var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/*
 * @Description: 战斗AI
 * @Author: guolinsen
 * @Date: 2019-08-21 19:44:10
 * @LastEditTime: 2019-10-14 15:03:14
 */
var ThingFight = (function () {
    function ThingFight() {
        this._open = false;
        this.nextUpdateTime = 0;
        this.skillList = []; //挂机使用的技能列表
        this.skillIndex = 0;
        this.isPassive = false;
        this.attackHuman = 0; //攻击对象是玩家的话 就是玩家的id
        this.monsterId = 0; //指定怪物id
    }
    ThingFight.prototype.register = function (user) {
        this.user = user;
        App.FightManager.addFight(this);
        if (user.pro.kind == ThingKind.Monster) {
            this.isPassive = true;
        }
        this.createSkillList();
    };
    ThingFight.prototype.createSkillList = function () {
        var list = this.user.pro.skillList;
        if (!list)
            return;
        var i = 0;
        var a = list.length;
        for (; i < a; i++) {
            var skill = UserSkill.create(list[i][0], list[i][1]);
            this.skillList.push(skill);
        }
    };
    Object.defineProperty(ThingFight.prototype, "useSkill", {
        /**设置下个使用的技能*/
        set: function (id) {
            this.waitSkill = id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ThingFight.prototype, "target", {
        /**设置攻击目标*/
        set: function (tar) {
            this.tar = tar;
            if (this.user == GameCache.hero.focusPlayer) {
                ActorSeleMgr.onSele(tar);
            }
            this.attackHuman = 0;
            if (tar && tar.pro.aiCamp == AICampType.NORMAL) {
                if (tar.pro.kind == ThingKind.Human) {
                    this.attackHuman = tar.pro.pro(PropId.AP_ACTOR_ID);
                }
                else if (tar.pro.kind == ThingKind.HeroPet) {
                    this.attackHuman = tar.pro.masterId;
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ThingFight.prototype, "open", {
        get: function () {
            return this._open;
        },
        set: function (v) {
            this._open = v;
            if (!v) {
                this.tar = null;
                this.waitSkill = null;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ThingFight.prototype, "fighting", {
        get: function () {
            return this._open || this.tar;
        },
        enumerable: true,
        configurable: true
    });
    ThingFight.prototype.update = function (tick) {
        if (tick <= this.nextUpdateTime)
            return;
        if (this.user.action >= ActionStandard.SA_NORMHIT)
            return;
        var self = this;
        var user = self.user;
        if (user.isJump)
            return;
        if (user.isDie || user.disappear)
            return;
        if (GameCache.hero.focusPlayer == user) {
            var drop = this.getDropItem(user);
            if (drop) {
                this.nextUpdateTime = tick + this.user.moveSpeed;
                return;
            }
        }
        if (self.tar && (self.tar.disappear || self.tar.isDie))
            self.tar = null;
        (self.open || self.tar) && self.getSkill();
        self.open && self.getTarget(); //开启ai后自动找怪
        var tar = self.tar;
        if (tar && this.waitSkill) {
            if (self.inAttackDis()) {
                this.nextUpdateTime = tick + this.user.pro.pro(PropId.AP_ATTACK_SPEED);
                this.waitSkill.dwResumeTick = GameConfig.skill[this.waitSkill.nSkillId]["cooldownTime"] + tick + 100;
                user.preSkill();
                user.setBanHavior(2000);
                App.FightManager.useSkill(user, this.waitSkill, tar);
                this.waitSkill = null;
            }
            else {
                this.nextUpdateTime = tick + this.user.moveSpeed;
                if (tar != this.moveTar || !user.isMove) {
                    if (user.pro.kind == ThingKind.Monster) {
                        if (user.cellXY.y != tar.cellXY.y) {
                            this.tar = null;
                            return;
                        }
                    }
                    user.moveTo(tar.cellXY.x, tar.cellXY.y);
                    this.moveTar = tar;
                }
            }
        }
        else {
            if (user.pro.kind == ThingKind.Monster && !user.isMove && Math.random() > 0.99) {
                this.nextUpdateTime = tick + this.user.moveSpeed;
                var dir = Math.random() > 0.5 ? 1 : -1;
                user.moveTo(user.cellXY.x + dir, user.cellXY.y);
            }
            if (GameCache.hero.focusPlayer == user) {
                this.nextUpdateTime = tick + this.user.moveSpeed;
                if (!user.isMove) {
                    var p = GameCache.map.getHookPoint();
                    if (p) {
                        user.moveTo(p[0], p[1]);
                    }
                }
            }
        }
    };
    ThingFight.prototype.getDropItem = function (hero) {
        var list = App.ThingManager.dropList;
        var i = 0;
        var a = list.length;
        var cellXY = hero.cellXY;
        var curItem;
        var curDis = 0;
        for (; i < a; i++) {
            var item = list[i];
            if (!item.isTrue) {
                return null;
            }
            if (item.canPick()) {
                item.pick();
                hero.stopMove();
                return item;
            }
            var dis = Math.abs(cellXY.x - item.cellY) + Math.abs(cellXY.y - item.cellY);
            if (!curDis || curDis > dis) {
                curItem = item;
            }
        }
        if (curItem) {
            hero.moveTo(curItem.cellX, curItem.cellY);
        }
        return curItem;
    };
    ThingFight.prototype.beHit = function (target) {
        if (this.isPassive) {
            this.tar = target;
        }
    };
    ThingFight.prototype.inAttackDis = function () {
        var std = GameConfig.skill[this.waitSkill.nSkillId];
        var tar = this.tar;
        if (std && tar) {
            var dis = std.skilldis ? std.skilldis : 0;
            return Math.abs(this.user.cellXY.x - tar.cellXY.x) <= dis && this.user.cellXY.y == tar.cellXY.y;
        }
        return false;
    };
    ThingFight.prototype.onRemove = function () {
        App.FightManager.removeFight(this.user.pro.recog);
        this.user = null;
        this.tar = null;
        this.moveTar = null;
        this.waitSkill = null;
        for (var _i = 0, _a = this.skillList; _i < _a.length; _i++) {
            var skill = _a[_i];
            skill.dispose();
        }
        this.skillList.length = 0;
        this.isPassive = null;
        this.monsterId = 0;
        this.foreverSkill = null;
        ObjectPool.push(this);
    };
    ThingFight.prototype.getSkill = function () {
        if (this.waitSkill)
            return;
        if (this.foreverSkill && this.foreverSkill.canUse) {
            this.waitSkill = this.foreverSkill;
            return;
        }
        var kind = this.user.pro.kind;
        var list = this.skillList;
        if (kind == ThingKind.Hero) {
            list = GameCache.skill.getFightSkilList(this.user.pro.pro(PropId.AP_ACTOR_ID));
        }
        if (!list || list.length == 0)
            return;
        var i = this.skillIndex + 1;
        var a = list.length;
        if (this.skillIndex >= a) {
            this.skillIndex = 0;
            i = 0;
        }
        var flag = false;
        for (; true; i++) {
            if (i == this.skillIndex + 1 && flag)
                break;
            if (i >= a)
                i = 0;
            flag = true;
            var useSkill = list[i];
            if (useSkill && useSkill.canUse) {
                this.waitSkill = useSkill;
                this.skillIndex = i;
                break;
            }
        }
    };
    ThingFight.prototype.getTarget = function () {
        if (this.tar)
            return;
        if (this.isPassive)
            return;
        if (this.waitSkill) {
            var stdSkill = GameConfig.skill[this.waitSkill.nSkillId];
            if (!stdSkill)
                return;
            var camList = AICampEnemy[this.user.pro.aiCamp];
            var tar = void 0;
            if (camList) {
                var thingDic = App.ThingManager.getThingDic();
                var maxDis = stdSkill.skilldis;
                var curDis = 9999999;
                for (var k in thingDic) {
                    var thing = thingDic[k];
                    if (thing.isDie || thing.disappear) {
                        continue;
                    }
                    if (camList.indexOf(thing.pro.aiCamp) == -1) {
                        continue;
                    }
                    if (this.user.pro.aiCamp == AICampType.MONSTER && Math.random() > 0.6) {
                        this.tar = thing;
                        return;
                    }
                    if (this.monsterId) {
                        if (this.monsterId != thing.configId) {
                            continue;
                        }
                    }
                    var dis = Math.abs(this.user.cellXY.x - thing.cellXY.x) + Math.abs(this.user.cellXY.y - thing.cellXY.y);
                    if (!tar || curDis > dis) {
                        tar = thing;
                        curDis = dis;
                    }
                }
            }
            this.target = tar;
        }
    };
    return ThingFight;
}());
__reflect(ThingFight.prototype, "ThingFight");
//# sourceMappingURL=ThingFight.js.map