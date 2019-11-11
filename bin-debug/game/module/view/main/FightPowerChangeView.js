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
 * @Description: 战力变化效果
 * @Author: guolinsen
 * @Date: 2019-07-31 14:05:19
 * @LastEditTime: 2019-09-03 20:05:39
 */
var FightPowerChangeView = (function (_super) {
    __extends(FightPowerChangeView, _super);
    function FightPowerChangeView() {
        var _this = _super.call(this, LayerManager.UI_Main2) || this;
        _this.skinName = "FightPowerChangeViewSkin";
        _this.horizontalCenter = 0;
        _this.bottom = 212;
        _this.touchEnabled = _this.touchChildren = false;
        _this.closeDispose = false;
        return _this;
    }
    FightPowerChangeView.prototype.init = function () {
        _super.prototype.init.call(this);
        this.fight.handler = Handler.create(this, this.rollComplete, null, false);
    };
    FightPowerChangeView.prototype.open = function (param) {
        _super.prototype.open.call(this, param);
        this.onShow();
    };
    FightPowerChangeView.prototype.onShow = function () {
        egret.Tween.removeTweens(this);
        egret.Tween.removeTweens(this.change);
        this.change.visible = false;
        this.alpha = 1;
        this.cur = GlobalFun.getTotalPower();
        var old = GameCache.global.oldPower;
        this.fight.playData(old, this.cur);
    };
    FightPowerChangeView.prototype.rollComplete = function () {
        var num = this.cur - GameCache.global.oldPower;
        var str;
        GameCache.global.oldPower = this.cur;
        if (num > 0) {
            this.change.updateType("num_json.pro_zlgreen_");
            str = "+" + num;
        }
        else {
            this.change.updateType("num_json.pro_zlred_");
            str = num;
        }
        this.change.value = str;
        this.change.visible = true;
        this.change.x = this.fight.x + this.fight.width + 4;
        this.change.y = 48;
        this.change.alpha = 0;
        var cy = this.change.y - this.fight.y;
        egret.Tween.get(this.change)
            .to({ y: this.fight.y, alpha: 1 }, 300)
            .wait(1000)
            .to({ y: this.fight.y - cy, alpha: 0 }, 300)
            .call(this.hide, this);
    };
    FightPowerChangeView.prototype.hide = function () {
        egret.Tween.get(this).to({ alpha: 0 }, 500).call(this.closeView, this);
    };
    return FightPowerChangeView;
}(BaseEuiWindow));
__reflect(FightPowerChangeView.prototype, "FightPowerChangeView");
//# sourceMappingURL=FightPowerChangeView.js.map