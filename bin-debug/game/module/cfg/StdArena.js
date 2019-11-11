var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var StdArena = (function () {
    function StdArena() {
        /** 购买消耗 */
        this.consume = [];
        /** 参与奖励 */
        this.award = [];
        /** 参与奖励展示 */
        this.awardshow = [];
        /** 连胜积分 */
        this.awardpoint = [];
        /** 排名奖励（1-10） */
        this.rankaward = [];
        /** 出生点 */
        this.startPos = [];
    }
    return StdArena;
}());
__reflect(StdArena.prototype, "StdArena");
//# sourceMappingURL=StdArena.js.map