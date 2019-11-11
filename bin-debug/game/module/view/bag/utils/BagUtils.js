var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * create by junwei on
 */
var BagUtils = (function () {
    function BagUtils() {
    }
    /**获取可熔炼装备
     * @param color 默认排除颜色
     */
    BagUtils.getMeltingEquip = function (color) {
        if (color === void 0) { color = 6; }
        var bag = GameCache.bag.getBagByType(BagType.BAG_TYPE_EQUIP);
        for (var i in bag) {
            ItemUtils.isItemRecycle(bag[i], color);
        }
    };
    /**
     * 获取当前玩家背包中可用的装备格子数
     * @returns number
     */
    BagUtils.bagEquipGridNum = function () {
        var bagGridNum = GameCache.hero.mainPro.pro(PropId.AP_BAG_GRID_COUNT);
        var eqNum = GameCache.bag.getBagByType(BagType.BAG_TYPE_EQUIP).length;
        var canUse = bagGridNum - GameConfig.bagStuff.maxItem.value - eqNum;
        return canUse < 0 ? 0 : canUse;
    };
    /**
     * 获取当前玩家背包中可用的道具格子数
     * @returns number
     */
    BagUtils.bagItemGridNum = function () {
        var max = GameConfig.bagStuff.maxItem.value;
        var itmNum = GameCache.bag.getBagByType(BagType.BAG_TYPE_OTHER).length;
        var canUse = max - itmNum;
        return canUse < 0 ? 0 : canUse;
    };
    /**
     * 检查背包空间是否足够
     * @param  {StdItem[]} itemArr
     * @returns boolean
     */
    BagUtils.checkSpaceEnough = function (itemArr) {
        if (!itemArr || itemArr.length == 0) {
            return true;
        }
        var itemMap = {};
        var eqNum = 0;
        var itNum = 0;
        // 先堆叠物品
        for (var _i = 0, itemArr_1 = itemArr; _i < itemArr_1.length; _i++) {
            var item = itemArr_1[_i];
            if (!itemMap[item.id]) {
                itemMap[item.id] = item.count;
                continue;
            }
            itemMap[item.id] += item.count;
        }
        for (var k in itemMap) {
            var itemCfg = GameConfig.item[k];
            if (ItemUtils.isEquip(itemCfg)) {
                eqNum += itemMap[k];
            }
            else if (ItemUtils.isNormalItem(itemCfg)) {
                var bagCount = GameCache.bag.itemCount(k);
                // 计算当前物品背包中使用的格子数
                var ndGrid = Math.floor(bagCount / itemCfg.dup);
                // 有余数需要多占用一个格子
                (bagCount % itemCfg.dup) >= 1 && ndGrid++;
                var ndGrid2 = Math.floor((bagCount + itemMap[k]) / itemCfg.dup);
                ((bagCount + itemMap[k]) % itemCfg.dup) >= 1 && ndGrid2++;
                itNum += ndGrid2 - ndGrid;
            }
        }
        var eqCanUse = BagUtils.bagEquipGridNum();
        // 装备空间不足
        if (eqNum > eqCanUse)
            return false;
        var itCanUse = BagUtils.bagItemGridNum();
        // 物品空间不足
        if (itNum > itCanUse) {
            return false;
        }
        return true;
    };
    return BagUtils;
}());
__reflect(BagUtils.prototype, "BagUtils");
//# sourceMappingURL=BagUtils.js.map