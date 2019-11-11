var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var StdRank = (function () {
    function StdRank() {
        /** 奖励(预留) */
        this.award = [];
    }
    return StdRank;
}());
__reflect(StdRank.prototype, "StdRank");
//# sourceMappingURL=StdRank.js.map