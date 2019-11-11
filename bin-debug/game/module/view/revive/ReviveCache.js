/*
 * @Description: 复活数据
 * @Author: liangzhaowei
 * @Date: 2019-09-11 20:11:44
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var ReviveCache = (function (_super) {
    __extends(ReviveCache, _super);
    function ReviveCache() {
        var _this = _super.call(this) || this;
        /**倒计时剩余时间 */
        _this.leftTime = 0;
        /**复活数据列表 */
        _this.reveiveList = [];
        return _this;
    }
    ReviveCache.prototype.clear = function () {
        this.leftTime = 0;
        this.reveiveList = [];
    };
    return ReviveCache;
}(BaseCache));
__reflect(ReviveCache.prototype, "ReviveCache");
//# sourceMappingURL=ReviveCache.js.map