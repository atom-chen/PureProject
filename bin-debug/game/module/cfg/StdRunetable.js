var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var StdRunetable = (function () {
    function StdRunetable() {
        /** 培养道具消耗 */
        this.item = [];
        /** 每级增加属性 */
        this.atts = [];
    }
    return StdRunetable;
}());
__reflect(StdRunetable.prototype, "StdRunetable");
//# sourceMappingURL=StdRunetable.js.map