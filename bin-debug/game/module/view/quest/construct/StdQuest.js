var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var StdQuest = (function () {
    function StdQuest() {
        this.showTimerBox = false; //是否弹出不需要飞天鞋的速传框
    }
    return StdQuest;
}());
__reflect(StdQuest.prototype, "StdQuest");
//# sourceMappingURL=StdQuest.js.map