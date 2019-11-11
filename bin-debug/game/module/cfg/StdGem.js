var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var StdGem = (function () {
    function StdGem() {
        /** 基础属性 */
        this.attr = [];
        /** 成长属性 */
        this.lvlAttr = [];
        /** 基础升级消耗 */
        this.consume = [];
        /** 分解获得 */
        this.resolve = [];
        /** 孔位开启条件 */
        this.condition = [];
    }
    return StdGem;
}());
__reflect(StdGem.prototype, "StdGem");
//# sourceMappingURL=StdGem.js.map