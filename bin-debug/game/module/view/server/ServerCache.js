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
 * @Description: 保存服务器的一些数据 如服务器当前时间，开服时间
 * @Author: guolinsen
 * @Date: 2019-06-06 17:16:50
 * @LastEditTime: 2019-10-25 13:58:31
 */
var ServerCache = (function (_super) {
    __extends(ServerCache, _super);
    function ServerCache() {
        var _this = _super.call(this) || this;
        _this._serverTimeBase = 0;
        return _this;
    }
    Object.defineProperty(ServerCache.prototype, "serverTimeBase", {
        set: function (value) {
            this._serverTimeBase = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServerCache.prototype, "serverTime", {
        /**
         * 实时获取开服天数，每次获取都要计算一次
         * 如果是同一次计算的时候需要多次用到开服天数，可先保存在一个临时变量
        */
        // get serverOpenDay(): number {
        // 	let d = new Date();
        // 	d.setTime(this.serverTime);
        // 	let sd = new Date(d.getFullYear(), d.getMonth(), d.getDate());
        // 	d.setTime(this.serverOpenTime);
        // 	let od = new Date(d.getFullYear(), d.getMonth(), d.getDate());
        // 	return (sd.getTime() - od.getTime()) / 1000 / 3600 / 24 + 1;
        // }
        /**
         * 获取当前服务器时间
        */
        get: function () {
            return this._serverTimeBase + egret.getTimer();
        },
        enumerable: true,
        configurable: true
    });
    ServerCache.prototype.clear = function () {
        _super.prototype.clear.call(this);
        this.serverOpenTime = null;
        this._serverTimeBase = 0;
    };
    return ServerCache;
}(BaseCache));
__reflect(ServerCache.prototype, "ServerCache");
//# sourceMappingURL=ServerCache.js.map