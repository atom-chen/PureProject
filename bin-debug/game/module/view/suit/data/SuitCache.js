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
 * effect: 套装数据
 * author :lzw
 * data :2019.7.25
 */
var SuitCache = (function (_super) {
    __extends(SuitCache, _super);
    // /**红点 */
    // public roleRed = {};
    function SuitCache() {
        var _this = _super.call(this) || this;
        //套装内容
        _this.roleSuit = {};
        _this.nResolveId = 16; //分解物品id
        return _this;
    }
    SuitCache.prototype.clear = function () {
        this.roleSuit = {};
        // this.roleRed = {};
    };
    /**初始化套装内容 */
    SuitCache.prototype.initStList = function (roleId, fight, lvList) {
        var obj = { lv: 1, lvList: [], fight: 0 };
        var max = lvList.length > 0 ? Math.max.apply(null, lvList) : 1;
        obj.lv = max;
        obj.lvList = lvList;
        obj.fight = fight;
        this.roleSuit[roleId] = obj;
    };
    /**更新套装内容 */
    SuitCache.prototype.upStList = function (roleId, fight, lv) {
        var roleData = this.roleSuit[roleId];
        if (!roleData) {
            var obj = { lv: 1, lvList: [], fight: 0 };
            obj.lv = lv;
            obj.lvList.push(lv);
            obj.fight = fight;
            this.roleSuit[roleId] = obj;
        }
        else {
            roleData.lvList.push(lv);
            roleData.fight = fight;
            var max = roleData.lvList.length > 0 ? Math.max.apply(null, roleData.lvList) : 1;
            roleData.lv = max;
        }
    };
    /**套装兑换列表 */
    SuitCache.prototype.suitChangeList = function (job, serverRoleId, roleId) {
        var changeList = [];
        var suitLv = GameCache.hero.mainPro ? GameCache.hero.mainPro.pro(PropId.AP_LEVEL) : 1; /**套装等级 */
        if (suitLv < 10) {
            suitLv = 1;
        }
        else {
            suitLv = Math.floor(suitLv / 10) * 10;
        }
        var suitCfg = GameConfig.equipExchangeLevel[job][suitLv];
        if (!suitCfg) {
            return [];
        }
        for (var index in suitCfg) {
            var obj = CommonUtils.copyDataHandler(suitCfg[index]);
            obj.gap = 0;
            obj.roleId = serverRoleId;
            /**计算战力差距 */
            var partItem = GameConfig.item[obj.item];
            if (partItem) {
                var itemPower = ItemUtils.getItemZDL(partItem);
                /**装备 */
                var eqData = GameCache.equip.roleEquipList[roleId];
                // obj.eqLv = 0;
                if (eqData) {
                    if (eqData[partItem.part]) {
                        obj.gap = itemPower - ItemUtils.getItemZDL(eqData[partItem.part].stdItem);
                    }
                    else {
                        obj.gap = itemPower;
                    }
                }
                else {
                    obj.gap = itemPower;
                }
                changeList.push(obj);
            }
        }
        /**根据战力影响排序 */
        changeList.sort(this.sort);
        return changeList;
    };
    SuitCache.prototype.sort = function (a, b) {
        return a.gab - b.gab;
    };
    /**套装分解列表 */
    SuitCache.prototype.sortResolveList = function () {
        var list = [];
        var itemArr = GameCache.bag.getBagByType(BagType.BAG_TYPE_EQUIP);
        for (var index in itemArr) {
            var item = itemArr[index];
            if (item.stdItem.showQuality == 6) {
                for (var cnt in GameCache.equip.roleEquipList) {
                    var eqlist = GameCache.equip.roleEquipList[cnt];
                    var partItem = eqlist[item.stdItem.part];
                    /**部位相等 */
                    if (partItem) {
                        /**背包的物品战力少于装备的 */
                        if (ItemUtils.getItemZDL(item.stdItem) <= ItemUtils.getItemZDL(partItem.stdItem)) {
                            list.push(item.stdItem);
                        }
                    }
                }
            }
        }
        return list;
    };
    /**套装分解列表 */
    SuitCache.prototype.sortResolveRed = function () {
        var list = [];
        var itemArr = GameCache.bag.getBagByType(BagType.BAG_TYPE_EQUIP);
        for (var index in itemArr) {
            var item = itemArr[index];
            if (item.stdItem.showQuality == 6) {
                for (var cnt in GameCache.equip.roleEquipList) {
                    var eqlist = GameCache.equip.roleEquipList[cnt];
                    var partItem = eqlist[item.stdItem.part];
                    /**部位相等 */
                    if (partItem) {
                        /**背包的物品战力少于装备的 */
                        if (ItemUtils.getItemZDL(item.stdItem) <= ItemUtils.getItemZDL(partItem.stdItem)) {
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    };
    /**套装加成列表 */
    SuitCache.prototype.suitPropertyList = function (roleId) {
        var listData = [];
        var eqData = GameCache.equip.roleEquipList[roleId];
        /**套装等级 */
        var suitLv = 0;
        if (eqData) {
            for (var eqIndex in eqData) {
                var eq = eqData[eqIndex];
                if (eq && eq.stdItem && eq.stdItem.level && eq.stdItem.showQuality == 6) {
                    suitLv = suitLv + eq.stdItem.level;
                }
            }
        }
        for (var item in GameConfig.equipAddition) {
            var cfg = GameConfig.equipAddition[item];
            /**是否已升级 */
            var passed = GameCache.suit.roleSuit[roleId].lvList.indexOf(cfg.level);
            if (suitLv >= cfg.showlevel && (passed == -1)) {
                return true;
            }
        }
        return false;
    };
    /**套装兑换列表 */
    SuitCache.prototype.suitChangeListRed = function (job, roleId) {
        var changeList = [];
        var suitLv = GameCache.hero.mainPro ? GameCache.hero.mainPro.pro(PropId.AP_LEVEL) : 1; /**人物等级 */
        if (suitLv < 10) {
            suitLv = 1;
        }
        else {
            suitLv = Math.floor(suitLv / 10) * 10;
        }
        var suitCfg = GameConfig.equipExchangeLevel[job][suitLv];
        if (!suitCfg) {
            return false;
        }
        for (var index in suitCfg) {
            var exchangeId = suitCfg[index].item;
            var exchangeCount = GameConfig.equipExchange[exchangeId] ? GameConfig.equipExchange[exchangeId].needNum[0].count : 0;
            if (GameCache.bag.itemCount(this.nResolveId) >= exchangeCount) {
                return true;
            }
        }
        return false;
    };
    return SuitCache;
}(BaseCache));
__reflect(SuitCache.prototype, "SuitCache");
//# sourceMappingURL=SuitCache.js.map