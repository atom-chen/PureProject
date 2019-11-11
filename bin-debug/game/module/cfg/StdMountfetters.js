var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var StdMountfetters = (function () {
    function StdMountfetters() {
        /** 激活需要 */
        this.petneed = [];
        /** 属性加成 */
        this.skillattribute = [];
    }
    return StdMountfetters;
}());
__reflect(StdMountfetters.prototype, "StdMountfetters");
//# sourceMappingURL=StdMountfetters.js.map