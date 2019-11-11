/*
 * @Description: 扭蛋数据
 * @Author: liangzhaowei
 * @Date: 2019-10-08 14:04:38
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
var GashaponType;
(function (GashaponType) {
    /**宠物类型*/
    GashaponType[GashaponType["Pet"] = 1] = "Pet";
})(GashaponType || (GashaponType = {}));
var GashaponCache = (function (_super) {
    __extends(GashaponCache, _super);
    function GashaponCache() {
        var _this = _super.call(this) || this;
        /**扭蛋仓库 */
        _this.bagSeries = {};
        /**是否第一次请求了仓库内容 */
        _this.bOpenList = {};
        return _this;
    }
    GashaponCache.prototype.clear = function () {
        this.bagSeries = {};
        this.bOpenList = {};
    };
    GashaponCache.prototype.addBagItems = function (type, bagItems) {
        if (!this.bagSeries[type]) {
            this.bagSeries[type] = {};
        }
        this.bagSeries[type][bagItems.series.toString()] = bagItems;
    };
    GashaponCache.prototype.removeBagItems = function (type, series) {
        if (this.bagSeries[type] && this.bagSeries[type][series]) {
            delete this.bagSeries[type][series];
        }
    };
    return GashaponCache;
}(BaseCache));
__reflect(GashaponCache.prototype, "GashaponCache");
//# sourceMappingURL=GashaponCache.js.map