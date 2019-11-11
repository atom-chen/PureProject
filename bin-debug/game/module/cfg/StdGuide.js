var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var StdGuide = (function () {
    function StdGuide() {
        /** 引导目标 */
        this.command = [];
    }
    return StdGuide;
}());
__reflect(StdGuide.prototype, "StdGuide");
//# sourceMappingURL=StdGuide.js.map