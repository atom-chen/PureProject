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
 * @Description: 动物实体、怪物和人物的基类
 * @Author: guolinsen
 * @Date: 2019-06-20 21:58:20
 * @LastEditTime: 2019-10-28 17:35:26
 */
var AnimalThing = (function (_super) {
    __extends(AnimalThing, _super);
    function AnimalThing() {
        var _this = _super.call(this) || this;
        _this.isDie = false;
        _this.banHavior = 0; //禁止所有行为
        _this.showTop = false;
        return _this;
    }
    AnimalThing.prototype.init = function (pro) {
        _super.prototype.init.call(this, pro);
        if (pro.fightAi) {
            this.fight = ObjectPool.get(ThingFight);
            this.fight.register(this);
        }
        this.skillAction = new SkillAction();
        //this.createShadow();
    };
    AnimalThing.prototype.createShadow = function () {
        if (this.shadow == null) {
            var bit = new eui.Image();
            bit.source = RES_DIR_BODY_SHADOW;
            bit.anchorOffsetX = 39;
            bit.anchorOffsetY = 16;
            this.shadow = bit;
        }
        App.ThingManager.bottomLayer.addChild(this.shadow);
    };
    AnimalThing.prototype.removeShadow = function () {
        App.DisplayUtils.removeFromParent(this.shadow);
    };
    AnimalThing.prototype.jumpStart = function () {
        if (this.disappear)
            return;
        _super.prototype.jumpStart.call(this);
        if (this.shadow) {
            this.shadow.visible = false;
        }
    };
    AnimalThing.prototype.jumpEnd = function () {
        _super.prototype.jumpEnd.call(this);
        if (this.shadow) {
            this.shadow.visible = true;
        }
    };
    /**
     * 处理单个属性变更
     * @param propType
     * @param propValue
     *
     */
    AnimalThing.prototype.updateProperty = function (propType, propValue) {
        _super.prototype.updateProperty.call(this, propType, propValue);
        switch (propType) {
            case PropId.AP_LEVEL:
                break;
            case PropId.AP_HP:
                this.changeHp(propValue);
                break;
            case PropId.AP_MAX_HP:
                break;
            case PropId.AP_ATTACK_SPEED:
                break;
            case PropId.AP_DIR:
                break;
            case PropId.AP_BODY_COLOR://身体颜色
                break;
            case PropId.AP_STATE://状态变更
                if (propValue & ThingState.DEATH)
                    this.isDie = true;
                else if (this.isDie)
                    this.reAlive();
                break;
        }
    };
    /**
   * 处理HP变更
   * @param value
   *
   */
    AnimalThing.prototype.changeHp = function (value) {
        if (this.isDie && value > 0) {
            this.reAlive();
        }
        var maxHp = this.pro.pro(PropId.AP_MAX_HP);
        if (value && maxHp && value < maxHp) {
            if (!App.TimerManager.isExists(this.showHp, this)) {
                App.TimerManager.addDelay(500, 1, 1, this.showHp, this, null, null);
            }
            else if (this.topTitle) {
                this.showHp();
            }
        }
        else {
            this.removeTopTile();
        }
    };
    AnimalThing.prototype.showHp = function () {
        this.getTopTitle();
        this.topTitle.setHp(this.pro.pro(PropId.AP_HP), this.pro.pro(PropId.AP_MAX_HP));
    };
    AnimalThing.prototype.clearBehavior = function () {
        this.stopMove();
        this.skillAction.play = false;
    };
    AnimalThing.prototype.getTopTitle = function () {
        if (this.topTitle == null) {
            this.topTitle = ObjectPool.get(ThingTopTitle);
            this.topTitle.setHpType(this.pro.hpType);
            this.topTitle.x = this.x;
            this.topTitle.y = this.y - 120;
            App.ThingManager.titleLayer.addChild(this.topTitle);
        }
    };
    AnimalThing.prototype.removeTopTile = function () {
        App.TimerManager.remove(this.showHp, this);
        if (this.topTitle) {
            this.topTitle.dispose();
            App.DisplayUtils.removeFromParent(this.topTitle);
            this.topTitle = null;
        }
    };
    /**
      * 死亡的处理
      *
      */
    AnimalThing.prototype.die = function () {
        this.isDie = true;
        this.clearBehavior();
        App.TimerManager.addDelay(200, 1, 1, this.playAction, this, null, null, ActionStandard.SA_DIE, 1);
        //this.playAction(ActionStandard.SA_DIE, 1);
        if (this.pro.pro(PropId.AP_HP) > 0) {
            this.changeHp(0);
        }
        this.removeBubbles();
        this.removeTopTile();
        this.isfollow = false;
    };
    /**
     * 复活的处理
     *
     */
    AnimalThing.prototype.reAlive = function () {
        this.playAction(ActionStandard.SA_IDLE);
        this.isDie = false;
    };
    AnimalThing.prototype.moveTo = function (x, y) {
        if (this.banHavior > App.TimerManager.getSyncTime())
            return false;
        return _super.prototype.moveTo.call(this, x, y);
    };
    AnimalThing.prototype.setPath = function (p) {
        if (this.isDie)
            return;
        if (this.banHavior > App.TimerManager.getSyncTime())
            return;
        _super.prototype.setPath.call(this, p);
    };
    AnimalThing.prototype.update = function (tick) {
        _super.prototype.update.call(this, tick);
        var topTile = this.topTitle;
        if (topTile) {
            if (topTile.x != this.x)
                topTile.x = this.x;
            if (topTile.y != this.y)
                topTile.y = this.y - 120;
        }
        var shadow = this.shadow;
        if (shadow) {
            if (shadow.x != this.x)
                shadow.x = this.x;
            if (shadow.y != this.y)
                shadow.y = this.y;
        }
        if (this.banHavior > tick)
            return;
        if (!this.isMove) {
            var sa = this.skillAction;
            if (sa.play) {
                sa.play = false;
                this.playSkillAction(sa);
            }
        }
        if (this.fight) {
            this.fight.update(tick);
        }
    };
    AnimalThing.prototype.jumpProcess = function () {
        var topTile = this.topTitle;
        if (!topTile)
            return;
        if (topTile.x != this.x)
            topTile.x = this.x;
        if (topTile.y != this.y)
            topTile.y = this.y - 120;
    };
    /**主动使用技能*/
    AnimalThing.prototype.preSkill = function () {
        this.clearPath(); //先清除移动
    };
    /**播放技能*/
    AnimalThing.prototype.playSkill = function (skillId, x, y, tar) {
        this.toLastPoint(); //先直接移动到目标点，防止网络卡的时候 其他玩家施法技能的位置不对
        var sa = this.skillAction;
        sa.skill = skillId;
        sa.x = x;
        sa.y = y;
        sa.target = tar;
        sa.play = true;
    };
    AnimalThing.prototype.playSkillAction = function (sa) {
        var con = GameConfig.skill[sa.skill.nSkillId];
        if (!con) {
            throw (new Error("找不到技能配置," + sa.skill.nSkillId));
        }
        this.updateBodyDir(this.cellXY.x, sa.x);
        if (con.action1)
            this.playAction(con.action1, 1);
        App.skillPlay.play(this, sa.skill, sa.x, sa.y, sa.target);
    };
    /**0解除 >0禁止时间段*/
    AnimalThing.prototype.setBanHavior = function (t) {
        this.banHavior = t + App.TimerManager.getSyncTime() - 1;
    };
    AnimalThing.prototype.isTouch = function (mouseX, mouseY) {
        if (this.isDie)
            return false;
        return _super.prototype.isTouch.call(this, mouseX, mouseY);
    };
    AnimalThing.prototype.dispose = function () {
        App.TimerManager.removeAll(this);
        if (this.fight) {
            this.fight.onRemove();
            this.fight = null;
        }
        _super.prototype.dispose.call(this);
        this.removeTopTile();
        this.removeShadow();
        this.skillAction.play = false;
        this.banHavior = 0;
    };
    return AnimalThing;
}(BaseMoveThing));
__reflect(AnimalThing.prototype, "AnimalThing");
//# sourceMappingURL=AnimalThing.js.map