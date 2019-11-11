var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var StdExpcopy = (function () {
    function StdExpcopy() {
        /** 等级区间 */
        this.level = [];
        /** 入场消耗 */
        this.consume = [];
        /** 角色出生点 */
        this.enterPos = [];
        /** 小怪信息 */
        this.monsterInfo = [];
        /** 小怪出生点 */
        this.monsterPos = [];
    }
    return StdExpcopy;
}());
__reflect(StdExpcopy.prototype, "StdExpcopy");
//# sourceMappingURL=StdExpcopy.js.map