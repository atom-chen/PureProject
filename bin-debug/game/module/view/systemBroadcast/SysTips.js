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
 * @Description: 通用系统提示
 * @Author: xiejunwei
 * @Date: 2019-07-31 20:45:48
 * @LastEditTime: 2019-10-26 14:21:09
 */
var SysTips = (function (_super) {
    __extends(SysTips, _super);
    function SysTips() {
        var _this = _super.call(this, LayerManager.UI_TipsNoClick) || this;
        _this.skinName = "SysTipsSkin";
        _this.horizontalCenter = 1;
        _this.verticalCenter = 1;
        return _this;
    }
    SysTips.prototype.init = function () {
        _super.prototype.init.call(this);
        this.setWinTitle("hint2");
    };
    SysTips.prototype.open = function (param) {
        _super.prototype.open.call(this);
        this.initData(param);
        this.addTouchEvent(this.btn0, this.closeView);
        this.addTouchEvent(this.btn1, this.onCLick);
        this.currentState = param.exData1["state"] == 1 ? "single" : "normal";
    };
    SysTips.prototype.close = function (param) {
        _super.prototype.close.call(this);
        if (this.handler) {
            this.handler.dispose();
            this.handler = null;
        }
    };
    SysTips.prototype.initData = function (param) {
        this.desc.textFlow = TextFlowUtils.generateTextFlow(param.exData1.desc);
        if (this.handler) {
            this.handler.dispose();
        }
        this.handler = Handler.create(param.exData1.thisc, param.exData1.func, [], false);
    };
    SysTips.prototype.onCLick = function () {
        if (this.handler) {
            this.handler.run();
        }
        this.closeView();
    };
    return SysTips;
}(BaseEuiWindow));
__reflect(SysTips.prototype, "SysTips");
//# sourceMappingURL=SysTips.js.map