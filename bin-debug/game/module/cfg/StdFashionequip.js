var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var StdFashionequip = (function () {
    function StdFashionequip() {
        /** 所需职业 */
        this.conds = [];
        /** 兑换所需 */
        this.needNum = [];
        /** 增加属性 */
        this.staitcAttrs = [];
        /** 外观ID */
        this.shape = [];
    }
    return StdFashionequip;
}());
__reflect(StdFashionequip.prototype, "StdFashionequip");
//# sourceMappingURL=StdFashionequip.js.map