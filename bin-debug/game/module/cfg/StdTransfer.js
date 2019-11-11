var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var StdTransfer = (function () {
    function StdTransfer() {
        /** 属性 */
        this.attrs = [];
        /** 激活技能 */
        this.skillID = [];
        /** 奥义ID */
        this.ZXCID = [];
    }
    return StdTransfer;
}());
__reflect(StdTransfer.prototype, "StdTransfer");
//# sourceMappingURL=StdTransfer.js.map