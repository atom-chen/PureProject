var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var StdRunetablet = (function () {
    function StdRunetablet() {
        /** 培养道具消耗 */
        this.item = [];
        /** 培养金币消耗 */
        this.gold = [];
        /** 每级增加属性 */
        this.atts = [];
    }
    return StdRunetablet;
}());
__reflect(StdRunetablet.prototype, "StdRunetablet");
//# sourceMappingURL=StdRunetablet.js.map