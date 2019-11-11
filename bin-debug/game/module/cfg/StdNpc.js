var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var StdNpc = (function () {
    function StdNpc() {
        /** 默认说话 */
        this.talk = [];
    }
    return StdNpc;
}());
__reflect(StdNpc.prototype, "StdNpc");
//# sourceMappingURL=StdNpc.js.map