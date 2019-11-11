/*
 * @Description: 额外奖励窗口
 * @Author: liangzhaowei
 * @Date: 2019-10-14 13:59:33
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
var RewardExWin = (function (_super) {
    __extends(RewardExWin, _super);
    function RewardExWin() {
        var _this = _super.call(this, LayerManager.UI_Tips) || this;
        _this.skinName = "RewardExWinSkin";
        return _this;
    }
    RewardExWin.prototype.init = function () {
        var layout = new eui.TileLayout();
        layout.requestedRowCount = 2;
        layout.horizontalGap = 25;
        this.layout = layout;
        this.gRw.layout = layout;
        if (!this.itemList) {
            this.itemList = ObjectPool.get(ItemList);
        }
    };
    /**用于同一处理打开时的操作 */
    RewardExWin.prototype.open = function (param) {
        if (param === void 0) { param = null; }
        _super.prototype.open.call(this);
        /**设置背景透明度 */
        if (this.myParent["setRectAlpha"]) {
            this.myParent["setRectAlpha"](0.9);
        }
        this.addTouchEvent(this, this.closeView);
        if (param && param.exData1) {
            var list = [];
            if (param.exData1 instanceof Array) {
                list = param.exData1;
            }
            else {
                return;
            }
            if (list.length) {
                this.itemList.setData(list, this.gRw);
                /**逐渐弹出效果 */
                for (var i = 0; i < this.itemList.itemArr.length; i++) {
                    GlobalFun.createItemEffect(this.itemList.itemArr[i], i);
                }
                if (list.length < 6) {
                    this.y = 188;
                    this.layout.requestedRowCount = 1;
                }
                else {
                    this.y = 152;
                    this.layout.requestedRowCount = 2;
                }
            }
        }
    };
    RewardExWin.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.itemList.dispose();
    };
    RewardExWin.prototype.close = function (param) {
        if (param === void 0) { param = null; }
        /**重置回来背景的透明度 */
        if (this.myParent["resetAlpha"]) {
            this.myParent["resetAlpha"]();
        }
        _super.prototype.close.call(this);
    };
    return RewardExWin;
}(BaseEuiWindow));
__reflect(RewardExWin.prototype, "RewardExWin");
//# sourceMappingURL=RewardExWin.js.map