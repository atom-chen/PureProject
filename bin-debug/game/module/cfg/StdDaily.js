var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var StdDaily = (function () {
    function StdDaily() {
        /** 解锁条件（0：等级限制，1：开服天数限制） */
        this.cond = [];
    }
    return StdDaily;
}());
__reflect(StdDaily.prototype, "StdDaily");
//# sourceMappingURL=StdDaily.js.map