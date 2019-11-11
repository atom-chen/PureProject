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
/**
 * Created by linsen on 2019/5/30.
 * 数据保存
 */
var BaseCache = (function (_super) {
    __extends(BaseCache, _super);
    function BaseCache(needClear) {
        if (needClear === void 0) { needClear = true; }
        var _this = _super.call(this) || this;
        _this.needClear = needClear;
        CacheManager.reg(_this);
        return _this;
    }
    BaseCache.prototype.clear = function () {
    };
    return BaseCache;
}(egret.HashObject));
__reflect(BaseCache.prototype, "BaseCache");
//# sourceMappingURL=BaseCache.js.map