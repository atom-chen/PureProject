/*
 * @Description:扭蛋仓库
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
var GashaponBagWin = (function (_super) {
    __extends(GashaponBagWin, _super);
    function GashaponBagWin() {
        var _this = _super.call(this, LayerManager.UI_Tips) || this;
        /**仓库类型 */
        _this.type = 1;
        _this.skinName = "GashaponBagWinSkin";
        return _this;
    }
    GashaponBagWin.prototype.init = function () {
        this.list.itemRenderer = ItemBase;
    };
    /**用于同一处理打开时的操作 */
    GashaponBagWin.prototype.open = function (param) {
        if (param === void 0) { param = null; }
        _super.prototype.open.call(this);
        this.addTouchEvent(this.mBtn, this.onClick);
        if (param && param.exData1) {
            this.type = param.exData1;
        }
        this.message(MsgConst.GASHAPON_BAG, this.upCn);
        this.upCn();
    };
    GashaponBagWin.prototype.onClick = function (e) {
        switch (e.currentTarget) {
            case this.mBtn:
                Proxy.gashapon.getAllRw(this.type);
                break;
            default:
                break;
        }
    };
    GashaponBagWin.prototype.upCn = function () {
        if (!GameCache.gashapon.bagSeries[this.type]) {
            return;
        }
        var bagList = GlobalFun.objChangeList(GameCache.gashapon.bagSeries[this.type]);
        this.setListData(this.list, bagList);
    };
    return GashaponBagWin;
}(BaseEuiWindow));
__reflect(GashaponBagWin.prototype, "GashaponBagWin");
//# sourceMappingURL=GashaponBagWin.js.map