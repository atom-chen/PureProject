/*
 * @Description: 商店
 * @Author: liangzhaowei
 * @Date: 2019-09-23 15:16:06
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
var ShopWin = (function (_super) {
    __extends(ShopWin, _super);
    function ShopWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "CommunalPageWin4Skin";
        return _this;
    }
    ShopWin.prototype.init = function () {
        _super.prototype.init.call(this);
    };
    return ShopWin;
}(CommunalPageWin));
__reflect(ShopWin.prototype, "ShopWin");
//# sourceMappingURL=ShopWin.js.map