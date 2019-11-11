var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var StdPassmonster = (function () {
    function StdPassmonster() {
        /** 出生点 */
        this.heroPos = [];
        /** 刷怪 */
        this.monster = [];
        /** 刷怪点 */
        this.pos = [];
    }
    return StdPassmonster;
}());
__reflect(StdPassmonster.prototype, "StdPassmonster");
//# sourceMappingURL=StdPassmonster.js.map