var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var StdCailiaocopy = (function () {
    function StdCailiaocopy() {
        /** 奖励显示 */
        this.awardshow = [];
        /** 角色出生点 */
        this.enterPos = [];
        /** BOSS出生点 */
        this.bossPos = [];
        /** 小怪出生点 */
        this.monsterPos = [];
        /** 波数对应评分 */
        this.score = [];
        /** 奖励描述 */
        this.awarddec = [];
    }
    return StdCailiaocopy;
}());
__reflect(StdCailiaocopy.prototype, "StdCailiaocopy");
//# sourceMappingURL=StdCailiaocopy.js.map