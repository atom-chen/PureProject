var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var StdMiwutower = (function () {
    function StdMiwutower() {
        /** 怪物ID */
        this.bossPos = [];
        /** 掉落ID */
        this.dropID = [];
        /** 日常奖励 */
        this.dailyaward = [];
        /** 层数掉落展示 */
        this.awardshow = [];
        /** 特殊奖励展示 */
        this.specialShow = [];
    }
    return StdMiwutower;
}());
__reflect(StdMiwutower.prototype, "StdMiwutower");
//# sourceMappingURL=StdMiwutower.js.map