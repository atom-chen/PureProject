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
 * @Description: 副本爬塔数据
 * @Author: guolinsen
 * @Date: 2019-07-31 16:01:47
 * @LastEditTime: 2019-10-23 15:35:38
 */
var CopyTowerCache = (function (_super) {
    __extends(CopyTowerCache, _super);
    function CopyTowerCache() {
        var _this = _super.call(this) || this;
        _this.rankList = []; /**爬塔排行榜数据 */
        _this.myRank = 0;
        return _this;
    }
    CopyTowerCache.prototype.clear = function () {
        this.copyTowerData = null;
        this.rankList = [];
    };
    /**初始化数据 */
    CopyTowerCache.prototype.initData = function (pBytes) {
        if (!this.copyTowerData) {
            this.copyTowerData = new CopyTowerItem();
        }
        this.copyTowerData.init(pBytes);
    };
    /**更新排行榜内容 */
    CopyTowerCache.prototype.rankData = function (pBytes) {
        this.myRank = pBytes.readByte();
        var count = pBytes.readByte();
        this.rankList = [];
        for (var i = 0; i < count; i++) {
            var obj = { num: 1, layer: 1, name: "" };
            obj.num = pBytes.readByte();
            obj.layer = pBytes.readUnsignedShort();
            obj.name = pBytes.readCustomBytes();
            this.rankList.push(obj);
        }
    };
    Object.defineProperty(CopyTowerCache.prototype, "copyTowerLayer", {
        /** 返回爬塔层级 */
        get: function () {
            return this.copyTowerData.layer;
            ;
        },
        enumerable: true,
        configurable: true
    });
    /**是否可以领取每日奖励 */
    CopyTowerCache.prototype.bGetDailyRw = function () {
        if (this.copyTowerData) {
            if (this.copyTowerData.layer && this.copyTowerData.getState == 0) {
                return true;
            }
        }
        return false;
    };
    return CopyTowerCache;
}(BaseCache));
__reflect(CopyTowerCache.prototype, "CopyTowerCache");
//# sourceMappingURL=CopyTowerCache.js.map