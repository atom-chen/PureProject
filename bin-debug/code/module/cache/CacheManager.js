var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by linsen on 2019/5/30.
 * 管理所有模块数据类，
*/
var CacheManager = (function () {
    function CacheManager() {
    }
    CacheManager.reg = function (cache) {
        this.cacheList.push(cache);
    };
    CacheManager.clearAll = function () {
        var i = 0;
        var len = this.cacheList.length;
        for (; i < len; i++) {
            this.cacheList[i].needClear && this.cacheList[i].clear();
        }
    };
    CacheManager.cacheList = [];
    return CacheManager;
}());
__reflect(CacheManager.prototype, "CacheManager");
//# sourceMappingURL=CacheManager.js.map