var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var StdFamily = (function () {
    function StdFamily() {
        /** 权限表 */
        this.privilege = [];
        /** 申请入会条件(战力) */
        this.condition = [];
    }
    return StdFamily;
}());
__reflect(StdFamily.prototype, "StdFamily");
//# sourceMappingURL=StdFamily.js.map