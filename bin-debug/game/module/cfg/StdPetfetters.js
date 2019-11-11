var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var StdPetfetters = (function () {
    function StdPetfetters() {
        /** 激活需要 */
        this.petneed = [];
        /** 属性加成 */
        this.skillattribute = [];
    }
    return StdPetfetters;
}());
__reflect(StdPetfetters.prototype, "StdPetfetters");
//# sourceMappingURL=StdPetfetters.js.map