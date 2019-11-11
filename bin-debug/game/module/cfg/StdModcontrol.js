var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var StdModcontrol = (function () {
    function StdModcontrol() {
        /** 解锁图片资源 */
        this.image = [];
        /** 红点关联道具 */
        this.redItemIdList = [];
    }
    return StdModcontrol;
}());
__reflect(StdModcontrol.prototype, "StdModcontrol");
//# sourceMappingURL=StdModcontrol.js.map