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
 * @Description: 符碑数据
 * @Author: xiejunwei
 * @Date: 2019-09-17 20:14:20
 */
var RuneCache = (function (_super) {
    __extends(RuneCache, _super);
    function RuneCache() {
        var _this = _super.call(this) || this;
        _this.runeData = {};
        return _this;
    }
    RuneCache.prototype.clear = function () {
        this.runeData = {};
    };
    RuneCache.prototype.initRuneData = function (roleIdx, lvl, star, exp) {
        var obj = {};
        var id = (lvl * 10 + star);
        id = id < 0 ? 0 : id;
        var roleId = GameCache.hero.getRoleIdByIndex(roleIdx);
        obj["id"] = id;
        obj["star"] = star;
        obj["lvl"] = lvl;
        obj["exp"] = exp;
        this.runeData[roleId] = obj;
    };
    /**
     * 获取升一星所需材料
     */
    RuneCache.prototype.getUpGradeNum = function (roleIdx) {
        var roleId = GameCache.hero.getRoleIdByIndex(roleIdx);
        var data = GameCache.rune.runeData[roleId];
        if (!data)
            data = {
                exp: 0,
                id: 0,
                lvl: 0,
                star: 0
            };
        var conf = GameConfig.rune[roleIdx + 1][data.id];
        var curExp = data.exp;
        var maxExp = conf.upExp;
        var plus = conf.addExp;
        var count = conf.item[0].count;
        return Math.ceil((maxExp - curExp) / plus) * count;
    };
    RuneCache.prototype.checkGrade = function (roleId) {
        var list = GameCache.hero.list;
        if (!roleId) {
            var list_1 = GameCache.hero.list;
            for (var i = 0; i < list_1.length; i++) {
                if (this.checkGrade(list_1[i].id))
                    return true;
            }
            return false;
        }
        var idx = 0;
        for (var i = 0; i < list.length; i++) {
            if (list[i].id == roleId) {
                idx = i;
                break;
            }
        }
        var data = this.runeData[roleId];
        var id = data ? data.id : 0;
        var conf = GameConfig.rune[idx + 1][id + 1];
        if (!conf)
            return false;
        var count = GameCache.bag.itemCount(conf.item[0].id);
        return count >= conf.item[0].count;
    };
    return RuneCache;
}(BaseCache));
__reflect(RuneCache.prototype, "RuneCache");
//# sourceMappingURL=RuneCache.js.map