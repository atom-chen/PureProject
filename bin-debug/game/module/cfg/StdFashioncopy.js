var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var StdFashioncopy = (function () {
    function StdFashioncopy() {
        /** 奖励显示 */
        this.awardshow = [];
        /** 角色出生点 */
        this.enterPos = [];
        /** 小怪信息 */
        this.monsterInfo = [];
        /** 小怪出生点 */
        this.monsterPos = [];
        /** 波数对应评分 */
        this.score = [];
    }
    return StdFashioncopy;
}());
__reflect(StdFashioncopy.prototype, "StdFashioncopy");
//# sourceMappingURL=StdFashioncopy.js.map