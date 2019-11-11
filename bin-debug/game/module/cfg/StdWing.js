var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var StdWing = (function () {
    function StdWing() {
        /** 培养道具消耗 */
        this.consumeItems = [];
        /** 培养金币消耗 */
        this.consumeGold = [];
        /** 每级增加属性 */
        this.levelAtt = [];
        /** 激活翅膀外观id */
        this.wingAppearance = [];
    }
    return StdWing;
}());
__reflect(StdWing.prototype, "StdWing");
//# sourceMappingURL=StdWing.js.map