var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var StdGashapondisplay = (function () {
    function StdGashapondisplay() {
        /** 道具 */
        this.item = [];
        /** 单抽消耗 */
        this.single = [];
        /** 十连消耗 */
        this.ten = [];
    }
    return StdGashapondisplay;
}());
__reflect(StdGashapondisplay.prototype, "StdGashapondisplay");
//# sourceMappingURL=StdGashapondisplay.js.map