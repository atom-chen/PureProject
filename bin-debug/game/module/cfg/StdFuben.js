var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var StdFuben = (function () {
    function StdFuben() {
        /** 配置 */
        this.enterCfg = [];
        /** 副本次数购买消耗 */
        this.buyTimesConsume = [];
        /** 退出时候是否保存位置 */
        this.exitPos = [];
    }
    return StdFuben;
}());
__reflect(StdFuben.prototype, "StdFuben");
//# sourceMappingURL=StdFuben.js.map