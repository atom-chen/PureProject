var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var StdItem = (function () {
    function StdItem() {
        /** 静态属性 */
        this.staitcAttrs = [];
        /** 使用条件 */
        this.conds = [];
        /** 跳转功能 */
        this.jump = [];
    }
    return StdItem;
}());
__reflect(StdItem.prototype, "StdItem");
//# sourceMappingURL=StdItem.js.map