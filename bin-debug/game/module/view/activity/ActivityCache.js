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
/*
 * @Description: 活动数据
 * @Author: xiejunwei
 * @Date: 2019-10-14 11:07:00
 */
var ActivityCache = (function (_super) {
    __extends(ActivityCache, _super);
    function ActivityCache() {
        var _this = _super.call(this) || this;
        _this.serverOpen = 0;
        _this.xsyhData = {};
        _this.xslbData = {};
        return _this;
    }
    ActivityCache.prototype.clear = function () {
        this.xsyhData = {};
        this.xslbData = {};
    };
    ActivityCache.prototype.initActivityData = function () {
        if (!this.serverOpen)
            this.serverOpen = GameCache.server.serverOpenDay;
    };
    ActivityCache.prototype.XSYHBough = function (idx) {
        if (!this.xsyhData[this.serverOpen])
            this.xsyhData[this.serverOpen] = {};
        if (!this.xsyhData[this.serverOpen][idx]) {
            this.xsyhData[this.serverOpen][idx] = 1;
        }
        else {
            this.xsyhData[this.serverOpen][idx]++;
        }
    };
    ActivityCache.prototype.XSLBBough = function (idx) {
        if (!this.xslbData[this.serverOpen])
            this.xslbData[this.serverOpen] = {};
        if (!this.xslbData[this.serverOpen][idx]) {
            this.xslbData[this.serverOpen][idx] = 1;
        }
        else {
            this.xslbData[this.serverOpen][idx]++;
        }
    };
    return ActivityCache;
}(BaseClass));
__reflect(ActivityCache.prototype, "ActivityCache");
//# sourceMappingURL=ActivityCache.js.map