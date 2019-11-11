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
 * @Description: 存放一些不包含在独立系统的数据，切换服务器时需要清理的
 * @Author: guolinsen
 * @Date: 2019-07-31 14:26:55
 * @LastEditTime: 2019-10-25 16:05:20
 */
var GlobalCache = (function (_super) {
    __extends(GlobalCache, _super);
    function GlobalCache() {
        var _this = _super.call(this) || this;
        _this.oldPower = 0;
        /**0下线 1顶号 2封号*/
        _this.disconnectedType = -1;
        return _this;
    }
    GlobalCache.prototype.clear = function () {
        this.oldPower = 0;
        this.disconnectedType = -1;
    };
    return GlobalCache;
}(BaseCache));
__reflect(GlobalCache.prototype, "GlobalCache");
//# sourceMappingURL=GlobalCache.js.map