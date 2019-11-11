var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var StdScene = (function () {
    function StdScene() {
        /** npc */
        this.npc = [];
        /** 传送口 */
        this.teleport = [];
        /** 左右功能按钮展示 */
        this.LRbtnSHow = [];
        /** 配置按钮 */
        this.configureBtn = [];
        /** 挂机时的路径 */
        this.hookPath = [];
    }
    return StdScene;
}());
__reflect(StdScene.prototype, "StdScene");
//# sourceMappingURL=StdScene.js.map