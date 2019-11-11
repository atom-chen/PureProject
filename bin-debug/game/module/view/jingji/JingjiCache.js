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
 * @Description: 竞技场数据
 * @Author: xiejunwei
 * @Date: 2019-09-03 19:11:34
 * @LastEditTime: 2019-10-26 11:54:27
 */
var JingjiCache = (function (_super) {
    __extends(JingjiCache, _super);
    function JingjiCache() {
        var _this = _super.call(this) || this;
        _this.targetDetail = []; //目标详细数据
        _this.jingjiList = []; //竞技场目标列表
        _this.targetIdx = 0;
        _this.jingjiData = {
            winNum: 0,
            winPoint: 0,
            remain: 0,
            bought: 0,
            recoverTime: 0,
            refreshTime: 0,
            pointRank: 0
        };
        return _this;
    }
    JingjiCache.prototype.clear = function () {
        this.jingjiData = {};
        this.targetDetail = [];
        this.jingjiList = [];
    };
    JingjiCache.prototype.initJingjiData = function (winNum, winPoint, remain, bought, recoverTime, refreshTime, pointRank) {
        var obj = {
            winNum: winNum,
            winPoint: winPoint,
            remain: remain,
            bought: bought,
            recoverTime: recoverTime,
            refreshTime: refreshTime,
            pointRank: pointRank
        };
        this.jingjiData = obj;
        App.MessageCenter.dispatch(MsgConst.JINGJI_PERSONAL_DATA);
    };
    JingjiCache.prototype.getJingjiBuyMax = function () {
        var bought = this.jingjiData ? this.jingjiData.bought : 0;
        var vipLvl = GameCache.vip.realValue();
        var vipConf = GameConfig.vip[vipLvl];
        var nextConf = GameConfig.vip[vipLvl + 1] ? GameConfig.vip[vipLvl + 1] : vipConf;
        var max = GameConfig.jingji["1"].consumeTimes + vipConf.arena;
        var next = GameConfig.jingji["1"].consumeTimes + nextConf.arena;
        return [max, bought, next];
    };
    JingjiCache.prototype.checkEnter = function () {
        return !this.jingjiData || this.jingjiData.remain > 0;
    };
    return JingjiCache;
}(BaseCache));
__reflect(JingjiCache.prototype, "JingjiCache");
//# sourceMappingURL=JingjiCache.js.map