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
 * @Description: 玩家自己的角色
 * @Author: guolinsen
 * @Date: 2019-08-02 17:07:38
 * @LastEditTime: 2019-11-01 16:42:39
 */
var HeroThing = (function (_super) {
    __extends(HeroThing, _super);
    function HeroThing() {
        var _this = _super.call(this) || this;
        _this.lastPostPoint = { x: 0, y: 0 };
        _this.oldValue = {};
        _this.canTouch = false;
        return _this;
    }
    HeroThing.prototype.init = function (pro) {
        _super.prototype.init.call(this, pro);
        this.title.setNameColor(ColorUtil.TITLE_HERO);
        var fInfo = GameCache.family.fInfo;
        if (fInfo) {
            this.title.setFamilyName(fInfo.fName);
        }
    };
    HeroThing.prototype.setPath = function (path) {
        if (this.isJump)
            return;
        _super.prototype.setPath.call(this, path);
        this.postPoint();
    };
    HeroThing.prototype.setCellXY = function (x, y, server) {
        _super.prototype.setCellXY.call(this, x, y, server);
        if (!server) {
            this.postPoint();
        }
        this.lastPostPoint.x = x;
        this.lastPostPoint.y = y;
    };
    HeroThing.prototype.jumpEnd = function () {
        _super.prototype.jumpEnd.call(this);
        this.postPoint();
    };
    HeroThing.prototype.arrivedPathPoint = function () {
        _super.prototype.arrivedPathPoint.call(this);
        this.postPoint();
        if (this == GameCache.hero.focusPlayer) {
            App.VisitManager.checkArrived();
        }
    };
    HeroThing.prototype.checkCellXY = function () {
        _super.prototype.checkCellXY.call(this);
        if (Math.abs(this.lastPostPoint.x - this.cellXY.x) >= 4 || Math.abs(this.lastPostPoint.y - this.cellXY.y) >= 4) {
            this.postPoint();
        }
    };
    /**清除移动路径*/
    HeroThing.prototype.clearPath = function () {
        _super.prototype.clearPath.call(this);
        this.postPoint();
    };
    HeroThing.prototype.postPoint = function () {
        if (GameCache.map.isAIMap)
            return;
        if (this.lastPostPoint.x == this.cellXY.x && this.lastPostPoint.y == this.cellXY.y)
            return;
        Proxy.move.sendMoveto(this.cellXY.x, this.cellXY.y, this.pro.isMainPlayer ? 0 : this.pro.pro(PropId.AP_ACTOR_ID));
        this.lastPostPoint.x = this.cellXY.x;
        this.lastPostPoint.y = this.cellXY.y;
    };
    /**
     * 处理单个属性变更
     * @param propType
     * @param propValue
     *
     */
    HeroThing.prototype.updateProperty = function (propType, propValue) {
        _super.prototype.updateProperty.call(this, propType, propValue);
        switch (propType) {
            case PropId.AP_BODY_ID:
            case PropId.AP_HAIR:
            case PropId.AP_HAT:
            case PropId.AP_EYE:
            case PropId.AP_GLASSES:
            case PropId.AP_PANTS:
            case PropId.AP_ASSIST:
            case PropId.AP_WEAPON:
            case PropId.AP_BACK:
            case PropId.AP_SWING:
                App.MessageCenter.dispatch(MsgConst.EQUIP_ATTR_CHANGE);
                break;
            case PropId.AP_CHKPOINT_LV:
                if (this.pro.isMainPlayer)
                    GameCache.pass.updateLv(propValue);
                break;
            case PropId.AP_LEVEL:
                // GameCache.sysopen.initCheckList();
                break;
            case PropId.AP_RISK_LVL:
                GameCache.adventure.updatelv(propValue);
                break;
            case PropId.AP_SIGNIN:
                GameCache.sign.updateCounts(propValue);
                break;
            case PropId.AP_CHECKINS:
                GameCache.sign.updateAwardState(propValue);
                break;
        }
        App.MessageCenter.dispatch(MsgConst.PROPERTY + propType);
    };
    HeroThing.prototype.changeHp = function (value) {
        _super.prototype.changeHp.call(this, value);
        if (this.curHp == null) {
            this.curHp = value;
            return;
        }
        var hurt = value - this.curHp;
        this.curHp = value;
        (hurt != 0) && App.HurtTxtManager.play(this.pro.recog, hurt, false, HurtType.SELF, this);
    };
    HeroThing.prototype.die = function () {
        _super.prototype.die.call(this);
        App.MessageCenter.dispatch(MsgConst.HERO_DIE);
        GameCache.hero.resetFocus();
    };
    HeroThing.prototype.reAlive = function () {
        _super.prototype.reAlive.call(this);
        GameCache.hero.resetFocus();
    };
    Object.defineProperty(HeroThing.prototype, "isFighting", {
        get: function () {
            return this.fight.fighting;
        },
        enumerable: true,
        configurable: true
    });
    HeroThing.prototype.addPathPoint = function (x, y) {
    };
    HeroThing.prototype.showHp = function () {
        this.getTopTitle();
        this.topTitle.setHp(this.pro.pro(PropId.AP_HP), this.pro.pro(PropId.AP_MAX_HP));
    };
    return HeroThing;
}(HumanThing));
__reflect(HeroThing.prototype, "HeroThing");
//# sourceMappingURL=HeroThing.js.map