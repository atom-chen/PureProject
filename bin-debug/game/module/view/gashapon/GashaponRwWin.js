/*
 * @Description: 抽奖奖励框
 * @Author: liangzhaowei
 * @Date: 2019-10-08 17:28:38
 */
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
var GashaponRwWin = (function (_super) {
    __extends(GashaponRwWin, _super);
    function GashaponRwWin() {
        var _this = _super.call(this, LayerManager.UI_Tips) || this;
        /**扭蛋类型 */
        _this.type = 1;
        /**抽取次数 */
        _this.time = 1;
        /**是否可以点击 */
        _this.press = false;
        _this.skinName = "GashaponRwWinSkin";
        return _this;
    }
    GashaponRwWin.prototype.init = function () {
        App.DisplayUtils.addEffectToObj(this, "matrix_0_1", -1, 320, 185);
        App.DisplayUtils.addEffectToObj(this.gEff, "point_0_1", -1, 260, 250);
        var eff = App.DisplayUtils.addEffectToObj(this.gEff, "point_0_1", -1, 380, 250);
        eff.scaleX = -1;
    };
    /**用于同一处理打开时的操作 */
    GashaponRwWin.prototype.open = function (param) {
        if (param === void 0) { param = null; }
        /**设置背景透明度 */
        if (this.myParent["setRectAlpha"]) {
            this.myParent["setRectAlpha"](0.9);
        }
        _super.prototype.open.call(this);
        if (param && param.exData1) {
            var cfg = GameConfig.gashaponDisplay[param.exData1];
            this.cfg = cfg;
            this.type = param.exData1;
            if (cfg && cfg.ten) {
                this.price1.setData(cfg.ten);
            }
        }
        if (param && param.exData2) {
            if (param.exData2.length > 1) {
                this.btn0.icon = "res/btn/luck_2.png";
            }
            else {
                this.btn0.icon = "res/btn/luck_1.png";
            }
            this.time = param.exData2.length;
            /**创建奖励特效 */
            for (var i = 0; i < 10; i++) {
                var item = this["item" + i];
                if (param.exData2[i]) {
                    item.data = param.exData2[i];
                    GlobalFun.createItemEffect(item, i);
                }
            }
        }
        this.addTouchEvent(this.btn0, this.onClick);
        App.TimerManager.add(1200, this.tieme, this, 1);
        this.press = false;
    };
    GashaponRwWin.prototype.tieme = function () {
        this.press = true;
    };
    GashaponRwWin.prototype.close = function (param) {
        if (param === void 0) { param = null; }
        /**重置回来背景的透明度 */
        if (this.myParent["resetAlpha"]) {
            this.myParent["resetAlpha"]();
        }
        _super.prototype.close.call(this);
    };
    GashaponRwWin.prototype.onClick = function (e) {
        switch (e.currentTarget) {
            case this.btn0:
                if (!GlobalFun.getBagEnounghUseCondition(this.cfg.ten)) {
                    GlobalFun.gotoCharge();
                    return;
                }
                if (this.press) {
                    Proxy.gashapon.askGashapon(this.time, this.type);
                    this.closeView();
                }
                break;
            default:
                break;
        }
    };
    return GashaponRwWin;
}(BaseEuiWindow));
__reflect(GashaponRwWin.prototype, "GashaponRwWin");
//# sourceMappingURL=GashaponRwWin.js.map