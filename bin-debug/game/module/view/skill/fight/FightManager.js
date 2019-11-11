var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/*
 * @Description: 战斗管理
 * @Author: guolinsen
 * @Date: 2019-07-18 13:45:52
 * @LastEditTime: 2019-10-28 17:54:33
 */
var FightManager = (function (_super) {
    __extends(FightManager, _super);
    function FightManager() {
        var _this = _super.call(this) || this;
        /**是否正在开启自动战斗，用于ai初始化*/
        _this.autoFight = true;
        _this.fightDic = {};
        /**英雄正在挂机中*/
        _this.onHook = false;
        return _this;
    }
    FightManager.prototype.mapChange = function () {
        App.TimerManager.removeAll(this);
    };
    FightManager.prototype.addFight = function (fight) {
        this.fightDic[fight.user.pro.recog] = fight;
        fight.open = this.autoFight;
    };
    FightManager.prototype.removeFight = function (recog) {
        delete this.fightDic[recog];
    };
    FightManager.prototype.useSkill = function (actor, skill, tar) {
        if (GameCache.map.isAIMap) {
            this.playUseSkill(actor, tar.cellXY.x, tar.cellXY.y, skill, tar.pro.recog);
        }
        else {
            var dir = MathUtils.getDirByGridPoint(actor.cellXY.x, actor.cellXY.y, tar.cellXY.x, tar.cellXY.y);
            Proxy.skill.sendUseSkill(actor.pro["isMainPlayer"] ? 0 : actor.pro.pro(PropId.AP_ACTOR_ID), skill.nSkillId, tar.pro.recog, tar.cellXY.x, tar.cellXY.y, dir);
        }
    };
    /**播放施法效果*/
    FightManager.prototype.playUseSkill = function (actor, x, y, skill, target) {
        actor.setBanHavior(0);
        actor.playSkill(skill, x, y, target);
    };
    /**播放击中效果*/
    FightManager.prototype.playBeHitSkill = function (actacker, defender, skill) {
        App.skillPlay.playHitEff(actacker, defender, skill.nSkillId);
        if (actacker && defender) {
            // let std: StdSkill = GameConfig.skill[skill];
            // if (std && std.action2) {
            // 	if (!defender.isDie && !defender.disappear)
            // 		defender.playAction(std.action2, 1);
            // }
            if (this.fightDic[defender.pro.recog]) {
                this.fightDic[defender.pro.recog].beHit(actacker);
            }
        }
    };
    /********************************************************************************************/
    //前端假战斗计算
    /**击中目标，用于前端自己计算战斗*/
    FightManager.prototype.postHitTarget = function (actor, skill, tar, x, y) {
        if (!GameCache.map.isAIMap)
            return;
        if (GameCache.pass.isOpen) {
            if (actor.pro.kind == ThingKind.Monster)
                return;
        }
        var defender = App.ThingManager.getThing(tar);
        if (!defender)
            return;
        if (defender.disappear || defender.isDie)
            return;
        var pro1 = actor.pro;
        var pro2 = defender.pro;
        var std = GameConfig.skill[skill.nSkillId];
        var range = std.actRange && std.actRange[0];
        if (range) {
            //单体伤害
            var result = range.acts && range.acts[0] && range.acts[0]["results"] && range.acts[0]["results"];
            if (!result)
                return;
            if (range.rangeType == 0 || range.rangeType == 1) {
                if (defender.isDie || defender.disappear)
                    return;
                this.doResult(result, actor, defender, skill);
            }
            else {
                var xStart = void 0, xEnd = void 0, yStart = void 0, yEnd = void 0;
                var xCenter = void 0, yCenter = void 0;
                if (range.rangeCenter == 0 || range.rangeCenter == 2) {
                    xCenter = x;
                    yCenter = y;
                }
                else {
                    xCenter = actor.cellXY.x;
                    yCenter = actor.cellXY.y;
                }
                xStart = xCenter + range.xStart;
                xEnd = xCenter + range.xEnd;
                if (range.rangeType == 2) {
                    yStart = yEnd = yCenter;
                }
                else if (range.rangeType == 6) {
                    var dir = x > xCenter ? 1 : -1;
                    if (x == xCenter) {
                        dir = actor.getBodyDir();
                    }
                    yStart = yCenter;
                    yEnd = yCenter + range.yEnd;
                    if (dir == 1) {
                        xStart = xCenter;
                        xEnd = xCenter + range.xEnd;
                    }
                    else {
                        xStart = xCenter - range.xEnd;
                        xEnd = xCenter;
                    }
                }
                else {
                    yStart = yCenter + range.yStart;
                    yEnd = yCenter + range.yEnd;
                }
                GlobalVar.testSkill && App.gameWorld.drawSkillRange(xStart, yStart, xEnd, yEnd);
                var camList = AICampEnemy[actor.pro.aiCamp];
                var tar_1;
                if (camList) {
                    var thingDic = App.ThingManager.getThingDic();
                    for (var k in thingDic) {
                        var thing = thingDic[k];
                        if (thing.isDie || thing.disappear) {
                            continue;
                        }
                        if (camList.indexOf(thing.pro.aiCamp) == -1) {
                            continue;
                        }
                        var px = thing.cellXY.x;
                        var py = thing.cellXY.y;
                        if (px < xStart || px > xEnd || py < yStart || py > yEnd) {
                            continue;
                        }
                        this.doResult(result, actor, thing, skill);
                    }
                }
            }
        }
    };
    FightManager.prototype.doResult = function (result, actor, defender, skill) {
        var i = 0;
        var a = result.length;
        for (; i < a; i++) {
            if (defender.isDie || defender.disappear)
                break;
            var r = result[i];
            var hurt = actor.pro.pro(PropId.AP_ATTACK); //基础攻击值
            var aCri = actor.pro.pro(PropId.AP_CRIT); //暴击率
            var aCrihurt = actor.pro.pro(PropId.AP_CRIT_HURT); //暴击伤害
            var def = defender.pro.pro(PropId.AP_DEFENCE); //防御值
            var defC = GameConfig.globalConfig.DEF; //防御系数
            var reduce = defender.pro.pro(PropId.AP_DAMAGE_DEC); //伤害减少
            var unCri = defender.pro.pro(PropId.AP_UNCRIT); //抗暴
            var maxCri = GameConfig.globalConfig.CRIT_MAX; //最大暴击率
            var minCri = GameConfig.globalConfig.CRIT_MIN; //最小暴击率
            var float = Math.random() > 0.5 ? 1 : -1;
            float = Math.random() * GameConfig.globalConfig.DMG_FLOAT * float / 10000; //伤害浮动值
            float = 1 - float;
            var addHurt = actor.pro.pro(PropId.AP_DAMAGE_INC); //增加伤害值
            var extraHurt = actor.pro.pro(PropId.AP_DAMAGE_EXT);
            hurt = ((hurt * r.id / 10000 + r.value) * (1 + addHurt) * (1 - def / (def + defC)) * (1 - reduce) * float + extraHurt) >> 0;
            // hurt = (hurt - def + r.value * skill.nLevel + hurt * r.id / 10000) >> 0;
            var cri = Math.min(Math.max(aCri - unCri, minCri), maxCri) / 10000;
            var jugeCri = Math.random();
            var bao = cri >= jugeCri;
            if (bao)
                hurt = hurt * GameConfig.globalConfig.CRIT_RATE * (1 + aCrihurt);
            this.calHurt(hurt, defender, r.resultType, r.delay, bao);
            this.playBeHitSkill(actor, defender, skill);
        }
    };
    FightManager.prototype.calHurt = function (hurt, defender, type, delay, bao) {
        var hutType = HurtType.NORMAL;
        var pro2 = defender.pro;
        // let def = pro2.pro(type == 1 ? PropId.AP_PHYSICAL_DEFENCE_MAX : PropId.AP_MAGIC_DEFENCE_MAX);
        // hurt = ((hurt - def) * MathUtils.limit(0.8, 1)) >> 0;
        if (hurt <= 0)
            hurt = 1;
        var showHurt = hurt;
        if (GameCache.pass.isOpen) {
            hurt = 1;
        }
        var curHp = pro2.pro(PropId.AP_HP) - hurt;
        if (curHp <= 0) {
            if (!GameCache.pass.isOpen)
                showHurt = pro2.pro(PropId.AP_HP);
            defender.die();
            App.MessageCenter.dispatch(MsgConst.BATTLE_KILL, defender);
        }
        else {
            pro2.pro(PropId.AP_HP, curHp, defender);
        }
        if (GameCache.hero.isMySelf(defender.pro.recog))
            hutType = HurtType.SELF;
        if (delay) {
            App.TimerManager.addDelay(delay, 1, 1, App.HurtTxtManager.play, App.HurtTxtManager, null, null, pro2.recog, showHurt, bao, hutType, defender);
        }
        else {
            App.HurtTxtManager.play(pro2.recog, showHurt, bao, hutType, defender);
        }
    };
    /********************************************************************************************/
    /**开启AI*/
    FightManager.prototype.starAllAI = function (v) {
        for (var recog in this.fightDic) {
            this.fightDic[recog].open = v;
            this.autoFight = v;
        }
    };
    /******************************************************************************/
    //玩家自己的操作
    FightManager.prototype.setFightTarget = function (tar) {
        if (tar && (tar.isDie || tar.disappear)) {
            this.heroStart(false);
            return;
        }
        var list = GameCache.hero.list;
        for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
            var hero = list_1[_i];
            var recog = hero.pro.recog;
            var fight = this.fightDic[recog];
            fight.target = tar;
        }
        this.heroStart(true);
    };
    //主角开始/结束挂机
    FightManager.prototype.heroStart = function (start, monsterId) {
        if (monsterId === void 0) { monsterId = 0; }
        this.onHook = start;
        var list = GameCache.hero.list;
        for (var _i = 0, list_2 = list; _i < list_2.length; _i++) {
            var hero = list_2[_i];
            var recog = hero.pro.recog;
            var fight = this.fightDic[recog];
            fight.open = start;
            fight.monsterId = monsterId;
            if (!start) {
                fight.target = null;
            }
        }
        if (!start) {
            if (GameCache.map.isHookMap() && GameCache.map.dataInit) {
                if (!App.TimerManager.isExists(this.startHook, this)) {
                    App.TimerManager.addDelay(5000, 1, 1, this.startHook, this);
                }
            }
        }
    };
    FightManager.prototype.startHook = function () {
        if (!GameCache.map.dataInit)
            return;
        this.heroStart(true);
    };
    FightManager.prototype.setUseSKill = function (skill, forever) {
        var recog = GameCache.hero.mainPro.recog;
        var fight = this.fightDic[recog];
        forever && (fight.foreverSkill = skill);
        fight.useSkill = skill;
    };
    return FightManager;
}(BaseClass));
__reflect(FightManager.prototype, "FightManager");
//# sourceMappingURL=FightManager.js.map