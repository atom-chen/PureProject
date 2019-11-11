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
 * @Description: 购物提示框
 * @Author: xiejunwei
 * @Date: 2019-07-31 19:52:59
 * @LastEditTime: 2019-08-01 17:03:39
 */
var ShopTips = (function (_super) {
    __extends(ShopTips, _super);
    function ShopTips() {
        var _this = _super.call(this, LayerManager.UI_Tips) || this;
        _this.skinName = "ShopTipsSkin";
        return _this;
    }
    ShopTips.prototype.init = function () {
        _super.prototype.init.call(this);
    };
    ShopTips.prototype.open = function (param) {
        _super.prototype.open.call(this);
    };
    return ShopTips;
}(BaseEuiWindow));
__reflect(ShopTips.prototype, "ShopTips");
//# sourceMappingURL=ShopTips.js.map