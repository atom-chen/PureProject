var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var StdCarousel = (function () {
    function StdCarousel() {
        /** 间隔 */
        this.interval = [];
        /** 首次登录的延时播放 */
        this.first = [];
    }
    return StdCarousel;
}());
__reflect(StdCarousel.prototype, "StdCarousel");
//# sourceMappingURL=StdCarousel.js.map