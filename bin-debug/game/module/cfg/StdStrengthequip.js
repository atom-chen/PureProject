var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var StdStrengthequip = (function () {
    function StdStrengthequip() {
        /** 消耗材料 */
        this.consume = [];
        /** 精练消耗材料 */
        this.reconsume = [];
    }
    return StdStrengthequip;
}());
__reflect(StdStrengthequip.prototype, "StdStrengthequip");
//# sourceMappingURL=StdStrengthequip.js.map