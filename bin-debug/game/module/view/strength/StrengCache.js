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
 * create by junwei on 07/24/2019
 */
var StrengthCache = (function (_super) {
    __extends(StrengthCache, _super);
    function StrengthCache() {
        return _super.call(this) || this;
    }
    StrengthCache.prototype.estimateLvl = function (curPos, curLvl, role) {
        var lvlList = GameCache.hero.getDataByIndex(role, GameCache.equip.roleStrengthList);
        if (!lvlList)
            return;
        var lvl = lvlList[lvlList.length - 1];
        var idx = lvlList.indexOf(lvl);
        var conf = GameConfig.strengthProp["Equip"][lvl + 1];
        if (!conf)
            idx = 9;
        var round = 0;
        // if (lvlList[0] - lvl >= 2) round = 1;
        var stap = 0;
        if (curPos < idx) {
            stap = idx - curPos;
        }
        else {
            stap = 10 - curPos + idx;
        }
        return round * 9 + stap;
    };
    StrengthCache.prototype.carculate = function (need) {
        for (var i in need) {
            var enough = GameCache.bag.itemCount(i) > need[i];
            if (!enough)
                return false;
        }
        return true;
    };
    StrengthCache.prototype.clear = function () {
    };
    /**
     *  根据强化等级和部位获取强化属性
     * @param  {number} lv
     * @param  {number} part
     */
    StrengthCache.prototype.getStrengthProp = function (lv, part) {
        var curConf = GameConfig.strengthProp["Equip"][lv];
        var prop = curConf["part" + part];
        return prop;
    };
    /**
     * 根据精炼等级和部位获取精炼属性
     * @param  {number} lv
     * @param  {number} part
     */
    StrengthCache.prototype.getRefineProp = function (lv, part) {
        var curConf = GameConfig.refine["ReEquip"][lv];
        var prop = curConf["part" + part];
        return prop;
    };
    StrengthCache.prototype.checkStrengthGrade = function (roleId) {
        if (!roleId) {
            var list = GameCache.hero.list;
            for (var i = 0; i < list.length; i++) {
                if (this.checkStrengthGrade(list[i].id))
                    return true;
            }
            return false;
        }
        var data = GameCache.equip.roleStrengthList[roleId];
        var lowLvl = data ? data[data.length - 1] : 0;
        lowLvl = lowLvl + 1;
        if (lowLvl > GameCache.hero.mainPro.pro(PropId.AP_LEVEL))
            return false;
        var conf = GameConfig.strengthCost[lowLvl];
        if (!conf)
            return;
        var count = GameCache.bag.itemCount(conf.consume[0].id);
        return count >= conf.consume[0].count;
    };
    StrengthCache.prototype.checkRefineGrade = function (roleId, part) {
        if (!roleId) {
            var list = GameCache.hero.list;
            for (var i = 0; i < list.length; i++) {
                // if (this.checkRefineGrade(list[i].id)) return true;
                for (var j = 0; j < 10; j++) {
                    if (this.checkRefineGrade(list[i].id, j))
                        return true;
                }
            }
            return false;
        }
        var data = GameCache.equip.roleRefineList[roleId];
        var lvl = data ? data[part] : 0;
        lvl = lvl + 1;
        var eqArr = GameCache.equip.roleEquipList[roleId];
        if (!eqArr || !eqArr[part])
            return false;
        if (lvl > GameCache.hero.mainPro.pro(PropId.AP_LEVEL))
            return false;
        var conf = GameConfig.strengthCost[lvl];
        var count = GameCache.bag.itemCount(conf.reconsume[0].id);
        var money = GameCache.hero.mainPro.pro(PropId.AP_COIN);
        return (count >= conf.reconsume[0].count) && (money >= conf.reconsume[1].count);
    };
    return StrengthCache;
}(BaseCache));
__reflect(StrengthCache.prototype, "StrengthCache");
//# sourceMappingURL=StrengCache.js.map