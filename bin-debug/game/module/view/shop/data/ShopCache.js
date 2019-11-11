/*
 * @Description: 商店数据
 * @Author: liangzhaowei
 * @Date: 2019-09-23 16:17:12
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
var ShopType;
(function (ShopType) {
    /**道具*/
    ShopType[ShopType["prop"] = 0] = "prop";
    /**金币*/
    ShopType[ShopType["gold"] = 1] = "gold";
    /**积分*/
    ShopType[ShopType["score"] = 2] = "score";
})(ShopType || (ShopType = {}));
var ShopCache = (function (_super) {
    __extends(ShopCache, _super);
    function ShopCache() {
        var _this = _super.call(this) || this;
        _this.shopData = {};
        return _this;
    }
    ShopCache.prototype.clear = function () {
        this.shopData = {};
    };
    /**初始化数据 */
    ShopCache.prototype.initData = function (type, shopData) {
        this.shopData[type] = shopData;
    };
    /**更新套装内容 */
    ShopCache.prototype.upStList = function (roleId, fight, lv) {
    };
    return ShopCache;
}(BaseCache));
__reflect(ShopCache.prototype, "ShopCache");
//# sourceMappingURL=ShopCache.js.map