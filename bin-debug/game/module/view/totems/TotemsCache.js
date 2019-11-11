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
 * @Description: 图腾数据
 * @Author: xiejunwei
 * @Date: 2019-08-29 13:40:43
 * @LastEditTime: 2019-10-24 14:15:01
 */
var TotemsCache = (function (_super) {
    __extends(TotemsCache, _super);
    function TotemsCache() {
        var _this = _super.call(this) || this;
        _this.totemsData = {};
        _this.resonanceData = {};
        return _this;
    }
    TotemsCache.prototype.clear = function () {
        this.totemsData = {};
        this.resonanceData = {};
    };
    /**
     * 初始化图腾数据
     * @param type 图腾类型 lvl图腾阶数 star图腾星数
     */
    TotemsCache.prototype.initTotemsData = function (type, lvl, star) {
        var id = lvl * 7 + star + 1;
        var obj = {
            id: id,
            jie: lvl,
            star: star
        };
        this.totemsData[type] = obj;
    };
    /**
     * 初始化图腾共鸣信息
     * @param id图腾组合ID，lvl共鸣等级
     */
    TotemsCache.prototype.initResonanData = function (id, lvl) {
        this.resonanceData[id] = lvl;
    };
    /**
     * 判断升级信息
     */
    TotemsCache.prototype.checkGrade = function (idx) {
        if (!idx) {
            var len = Object.keys(GameConfig.totems).length;
            for (var i = 1; i <= len; i++) {
                if (this.checkGrade(i))
                    return true;
            }
            return false;
        }
        if (idx.length) {
            for (var i = idx[0]; i <= idx[1]; i++) {
                if (this.checkGrade(i))
                    return true;
            }
            return false;
        }
        var data = this.totemsData[idx];
        var id = data ? data.id : 1;
        var conf = GameConfig.totems[idx][id];
        if (!conf)
            return false;
        if (!conf.consume)
            return false;
        var count = GameCache.bag.itemCount(conf.consume[0].id);
        return count >= conf.consume[0].count;
    };
    /**
     * 判断共鸣
     */
    TotemsCache.prototype.checkReonance = function (idx) {
        if (!idx) {
            for (var i in GameConfig.resonance) {
                if (this.checkReonance(i))
                    return true;
            }
            return false;
        }
        var item = GameConfig.resonance[idx];
        var tLvl = GameCache.totems.resonanceData[idx] ? GameCache.totems.resonanceData[idx] : 0;
        var conf = GameConfig.resonance[idx][tLvl];
        var totemsData = GameCache.totems.totemsData[conf.number[0]];
        var minLvl = totemsData ? totemsData.jie : 0;
        var acti = true;
        for (var _i = 0, _a = conf.number; _i < _a.length; _i++) {
            var i = _a[_i];
            var td = GameCache.totems.totemsData[i];
            var lvl = td ? td.jie : 0;
            if (!td || td.id == 1)
                acti = false; // 存在图腾未激活
            minLvl = minLvl > lvl ? lvl : minLvl;
        }
        return (acti && (minLvl >= conf.classLvl || conf.classLvl == 0));
    };
    return TotemsCache;
}(BaseCache));
__reflect(TotemsCache.prototype, "TotemsCache");
//# sourceMappingURL=TotemsCache.js.map