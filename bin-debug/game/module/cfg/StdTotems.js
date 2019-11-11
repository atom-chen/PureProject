var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var StdTotems = (function () {
    function StdTotems() {
        /** 培养消耗 */
        this.consume = [];
        /** 每级增加属性 */
        this.levelAtt = [];
    }
    return StdTotems;
}());
__reflect(StdTotems.prototype, "StdTotems");
//# sourceMappingURL=StdTotems.js.map