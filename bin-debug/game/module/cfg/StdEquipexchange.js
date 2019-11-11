var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var StdEquipexchange = (function () {
    function StdEquipexchange() {
        /** 兑换所需 */
        this.needNum = [];
        /** 分解获得 */
        this.recycle = [];
    }
    return StdEquipexchange;
}());
__reflect(StdEquipexchange.prototype, "StdEquipexchange");
//# sourceMappingURL=StdEquipexchange.js.map