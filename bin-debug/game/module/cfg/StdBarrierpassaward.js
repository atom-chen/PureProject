var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var StdBarrierpassaward = (function () {
    function StdBarrierpassaward() {
        /** 过关掉落组 */
        this.drop_id = [];
        /** 过关奖励展示 */
        this.awardshow = [];
        /** 挂机掉落组 */
        this.hang_drop = [];
    }
    return StdBarrierpassaward;
}());
__reflect(StdBarrierpassaward.prototype, "StdBarrierpassaward");
//# sourceMappingURL=StdBarrierpassaward.js.map