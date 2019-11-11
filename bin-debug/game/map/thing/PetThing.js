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
 * @Description: In User Settings Edit
 * @Author: guolinsen
 * @Date: 2019-07-25 11:34:17
 * @LastEditTime: 2019-08-06 11:50:04
 */
var PetThing = (function (_super) {
    __extends(PetThing, _super);
    function PetThing() {
        var _this = _super.call(this) || this;
        _this.nextTime = 0;
        _this.canTouch = null;
        return _this;
    }
    PetThing.prototype.init = function (pro) {
        _super.prototype.init.call(this, pro);
        this.con = GameConfig.pet[pro.pro(PropId.AP_ACTOR_ID)];
        this.title.setNameColor(pro.masterName == GameCache.hero.mainPro.charName ? ColorUtil.TITLE_HERO : ColorUtil.TITLE_NORMAL);
    };
    PetThing.prototype.update = function (tick) {
        _super.prototype.update.call(this, tick);
        if (this.nextTime <= tick) {
            this.nextTime = tick + 2000;
            this.think();
        }
    };
    PetThing.prototype.setCellXY = function (x, y, server) {
        _super.prototype.setCellXY.call(this, x, y, server);
    };
    PetThing.prototype.think = function () {
        if (!this.isMove) {
            var move = Math.random() > 0.6;
            if (move) {
                var dir = MathUtils.limitInteger(-2, 2);
                var _x = this.cellXY.x + dir;
                var _y = this.cellXY.y;
                if (GameCache.map.canStand(_x, _y)) {
                    this.moveSpeed = GlobalVar.DEFAULT_MOVE_SPEED << 1;
                    this.moveTo(_x, _y);
                }
            }
        }
        if (this.isJump) {
            this.jumpEnd();
        }
        var talk = Math.random() > 0.9;
        if (talk) {
            this.say(this.con["adle_talk"][MathUtils.limitInteger(0, this.con["adle_talk"].length)]);
        }
    };
    return PetThing;
}(AnimalThing));
__reflect(PetThing.prototype, "PetThing");
//# sourceMappingURL=PetThing.js.map