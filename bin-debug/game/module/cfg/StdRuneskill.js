var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var StdRuneskill = (function () {
    function StdRuneskill() {
        /** 技能名称 */
        this.name = [];
        /** 技能属性 */
        this.attrs = [];
    }
    return StdRuneskill;
}());
__reflect(StdRuneskill.prototype, "StdRuneskill");
//# sourceMappingURL=StdRuneskill.js.map