/**
 * create by junwei on 
 */
class BagUtils {
    /**获取可熔炼装备
     * @param color 默认排除颜色
     */
    static getMeltingEquip(color: number = 6): void {
        let bag = GameCache.bag.getBagByType(BagType.BAG_TYPE_EQUIP);
        for (let i in bag) {
            ItemUtils.isItemRecycle(bag[i], color);
        }
    }

    /**
     * 获取当前玩家背包中可用的装备格子数
     * @returns number
     */
    static bagEquipGridNum(): number {
        let bagGridNum = GameCache.hero.mainPro.pro(PropId.AP_BAG_GRID_COUNT);
        let eqNum = GameCache.bag.getBagByType(BagType.BAG_TYPE_EQUIP).length;
        let canUse = bagGridNum - GameConfig.bagStuff.maxItem.value - eqNum;
        return canUse < 0 ? 0 : canUse;
    }

    /**
     * 获取当前玩家背包中可用的道具格子数
     * @returns number
     */
    static bagItemGridNum(): number {
        let max = GameConfig.bagStuff.maxItem.value;
        let itmNum = GameCache.bag.getBagByType(BagType.BAG_TYPE_OTHER).length;
        let canUse = max - itmNum;
        return canUse < 0 ? 0 : canUse;
    }

    /**
     * 检查背包空间是否足够
     * @param  {StdItem[]} itemArr
     * @returns boolean
     */
    static checkSpaceEnough(itemArr: { id: number, count: number }[]): boolean {
        if (!itemArr || itemArr.length == 0) {
            return true;
        }
        let itemMap = {};
        let eqNum = 0;
        let itNum = 0;
        // 先堆叠物品
        for (let item of itemArr) {
            if (!itemMap[item.id]) {
                itemMap[item.id] = item.count;
                continue;
            }
            itemMap[item.id] += item.count;
        }
        for (let k in itemMap) {
            let itemCfg = GameConfig.item[k] as StdItem;
            if (ItemUtils.isEquip(itemCfg)) {
                eqNum += itemMap[k];
            } else if (ItemUtils.isNormalItem(itemCfg)) {
                let bagCount = GameCache.bag.itemCount(k);
                // 计算当前物品背包中使用的格子数
                let ndGrid = Math.floor(bagCount / itemCfg.dup);
                // 有余数需要多占用一个格子
                (bagCount % itemCfg.dup) >= 1 && ndGrid++;
                let ndGrid2 = Math.floor((bagCount + itemMap[k]) / itemCfg.dup);
                ((bagCount + itemMap[k]) % itemCfg.dup) >= 1 && ndGrid2++;
                itNum += ndGrid2 - ndGrid;
            }
        }
        let eqCanUse = BagUtils.bagEquipGridNum();
        // 装备空间不足
        if (eqNum > eqCanUse)
            return false;
        let itCanUse = BagUtils.bagItemGridNum();
        // 物品空间不足
        if (itNum > itCanUse) {
            return false;
        }
        return true;
    }
}