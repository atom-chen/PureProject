var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var StdFashionesuit = (function () {
    function StdFashionesuit() {
        /** 包含职业 */
        this.conds = [];
        /** 包含时装 */
        this.part = [];
        /** 额外属性 */
        this.staitcAttrs = [];
    }
    return StdFashionesuit;
}());
__reflect(StdFashionesuit.prototype, "StdFashionesuit");
//# sourceMappingURL=StdFashionesuit.js.map