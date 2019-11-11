/**
 * create by junwei on 07/24/2019
 */
class StrengthCache extends BaseCache {
    public constructor() {
        super();
    }

    public estimateLvl(curPos, curLvl, role) {
        let lvlList = GameCache.hero.getDataByIndex(role, GameCache.equip.roleStrengthList);
        if (!lvlList) return;
        let lvl = lvlList[lvlList.length - 1];
        let idx = lvlList.indexOf(lvl);
        let conf = GameConfig.strengthProp["Equip"][lvl + 1];
        if (!conf) idx = 9;
        let round = 0;
        // if (lvlList[0] - lvl >= 2) round = 1;
        let stap = 0;
        if (curPos < idx) {
            stap = idx - curPos;
        } else {
            stap = 10 - curPos + idx;
        }
        return round * 9 + stap;
    }

    private carculate(need): boolean {
        for (let i in need) {
            let enough = GameCache.bag.itemCount(i) > need[i];
            if (!enough) return false;
        }
        return true;
    }

    clear() {

    }

    /**
     *  根据强化等级和部位获取强化属性
     * @param  {number} lv
     * @param  {number} part
     */
    public getStrengthProp(lv: number, part: number) {
        let curConf = GameConfig.strengthProp["Equip"][lv];
        let prop = curConf[`part${part}`];
        return prop;
    }

	/**
	 * 根据精炼等级和部位获取精炼属性
	 * @param  {number} lv
	 * @param  {number} part
	 */
    public getRefineProp(lv: number, part: number) {
        let curConf = GameConfig.refine["ReEquip"][lv];
        let prop = curConf[`part${part}`];
        return prop;
    }

    public checkStrengthGrade(roleId?): boolean {
        if (!roleId) {
            let list = GameCache.hero.list;
            for (let i = 0; i < list.length; i++) {
                if (this.checkStrengthGrade(list[i].id)) return true;
            }
            return false;
        }
        let data = GameCache.equip.roleStrengthList[roleId];
        let lowLvl = data ? data[data.length - 1] : 0;
        lowLvl = lowLvl + 1;
        if (lowLvl > GameCache.hero.mainPro.pro(PropId.AP_LEVEL)) return false;
        let conf = GameConfig.strengthCost[lowLvl];
        if (!conf) return;
        let count = GameCache.bag.itemCount(conf.consume[0].id);
        return count >= conf.consume[0].count;
    }

    public checkRefineGrade(roleId?, part?): boolean {
        if (!roleId) {
            let list = GameCache.hero.list;
            for (let i = 0; i < list.length; i++) {
                // if (this.checkRefineGrade(list[i].id)) return true;
                for (let j = 0; j < 10; j++) {
                    if (this.checkRefineGrade(list[i].id, j)) return true;
                }
            }
            return false;
        }
        let data = GameCache.equip.roleRefineList[roleId];
        let lvl = data ? data[part] : 0;
        lvl = lvl + 1;
        let eqArr = GameCache.equip.roleEquipList[roleId];
        if (!eqArr || !eqArr[part]) return false;
        if (lvl > GameCache.hero.mainPro.pro(PropId.AP_LEVEL)) return false;
        let conf = GameConfig.strengthCost[lvl];
        let count = GameCache.bag.itemCount(conf.reconsume[0].id);
        let money = GameCache.hero.mainPro.pro(PropId.AP_COIN);
        return (count >= conf.reconsume[0].count) && (money >= conf.reconsume[1].count);
    }
}