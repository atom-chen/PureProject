var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var StdNoviceguide = (function () {
    function StdNoviceguide() {
        /** 完成条件 */
        this.command = [];
        /** 所在窗口 */
        this.targetView = [];
        /** 指向标签的提示 */
        this.targetViewText = [];
        /** 坐标偏移 */
        this.offset = [];
    }
    return StdNoviceguide;
}());
__reflect(StdNoviceguide.prototype, "StdNoviceguide");
//# sourceMappingURL=StdNoviceguide.js.map