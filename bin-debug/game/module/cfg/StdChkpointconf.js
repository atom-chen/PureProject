var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var StdChkpointconf = (function () {
    function StdChkpointconf() {
        /** 挂机场景ID */
        this.mSceneId = [];
        /** BOSS出生点 */
        this.BOSSpoint = [];
        /** 主城按钮位置 */
        this.cityPos = [];
    }
    return StdChkpointconf;
}());
__reflect(StdChkpointconf.prototype, "StdChkpointconf");
//# sourceMappingURL=StdChkpointconf.js.map