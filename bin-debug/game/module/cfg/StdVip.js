var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var StdVip = (function () {
    function StdVip() {
        /** 专享礼包 */
        this.ExclusivePackage = [];
        /** 每日礼包 */
        this.DailyPackage = [];
        /** 文字描述 */
        this.des = [];
        /** 排序 */
        this.sort = [];
        /** VIP属性 */
        this.attr = [];
    }
    return StdVip;
}());
__reflect(StdVip.prototype, "StdVip");
//# sourceMappingURL=StdVip.js.map