/*
 * @Description: 排行榜数据
 * @Author: liangzhaowei
 * @Date: 2019-09-25 11:29:40
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
var RankCache = (function (_super) {
    __extends(RankCache, _super);
    function RankCache() {
        var _this = _super.call(this) || this;
        _this.rankData = {};
        /**临时存储其它玩家信息 */
        _this.otherRoleData = {};
        return _this;
    }
    RankCache.prototype.clear = function () {
        this.rankData = {};
        this.otherRoleData = {};
    };
    /**初始化数据 */
    RankCache.prototype.initData = function (type, sigleRank) {
        this.rankData[type] = sigleRank;
    };
    return RankCache;
}(BaseCache));
__reflect(RankCache.prototype, "RankCache");
//# sourceMappingURL=RankCache.js.map