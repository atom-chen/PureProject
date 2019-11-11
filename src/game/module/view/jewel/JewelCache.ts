/*
 * @Description: 宝石数据
 * @Author: xiejunwei
 * @Date: 2019-09-09 15:11:58
 * @LastEditTime: 2019-10-29 14:07:53
 */
class JewelCache extends BaseCache {

    public jewelBag: any;       //二级key结构，主key为类型，次key为品质
    public roleJewelList: any;  //人物宝石列表

    public constructor() {
        super();

        this.jewelBag = {};
        this.roleJewelList = {};
    }

    clear() {
        this.jewelBag = {};
        this.roleJewelList = {};
    }

    public initJewelBag(id): void {
        let gem: StdGem = GameConfig.jewel[id];
        let item: StdItem = GameConfig.item[id];
        if (!gem || !item) return;
        let typeobj = this.jewelBag[gem.part];
        if (!typeobj) typeobj = this.jewelBag[gem.part] = {};
        if (typeobj[item.showQuality]) {
            typeobj[item.showQuality].push(id);
        } else {
            typeobj[item.showQuality] = [id];
        }
    }

    public deleteJewel(id): void {
        let gem: StdGem = GameConfig.jewel[id];
        let item: StdItem = GameConfig.item[id];
        let typeobj = this.jewelBag[gem.part];
        if (!typeobj) return;
        if (!typeobj[item.showQuality] || typeobj[item.showQuality].length == 0) return;
        typeobj[item.showQuality].shift();
    }

    /**
     * 检查宝石穿戴
     */
    public checkJewelInsert(roleId?, part?): boolean {
        if (!roleId) {
            let list = GameCache.hero.list;
            for (let i = 0; i < list.length; i++) {
                for (let j = 0; j < 8; j++) {
                    if (this.checkJewelInsert(list[i].id, j)) return true;
                }
            }
            return false;
        }
        if (!part && typeof (part) != "number") {
            for (let i = 0; i < 8; i++) {
                if (this.checkJewelInsert(roleId, i)) return true;
            }
            return false;
        }

        let data = this.roleJewelList[roleId];
        let condi = GameConfig.jewel[0].condition;
        let towerLvl = GameCache.copytower.copyTowerLayer;
        //槽位未开启
        if (towerLvl < condi[part]) return false;
        //获取当前穿著宝石
        let curItem = data && data[part] ? data[part] : null;
        //装着有宝石时,检查背包是否有上级宝石
        if (curItem) {
            let item: StdItem = GameConfig.item[curItem.id];
            let gemItem: StdGem = GameConfig.jewel[curItem.id];
            let color = item.showQuality;   //品质
            let type = gemItem.part;        //类型
            let bag = this.jewelBag[type];
            for (let i in bag) {
                let c = parseInt(i);
                if (c > color) return true;
            }
        } else {
            //无宝石装着时，检查存在能镶嵌的宝石
            let toggle = false;
            for (let i in this.jewelBag) {
                let type = parseInt(i);
                let check = false;
                for (let j in data) {
                    let gemItem: StdGem = GameConfig.jewel[data[j].id];
                    if (gemItem.part == type) {
                        check = true;
                        break;
                    };
                }
                if (check) continue;
                toggle = true;
            }
            return toggle;
        }
        return false;
    }

    /**
     * 检查宝石升级
     */
    public checkJewelUpGrade(roleId?, part?): boolean {
        if (!roleId) {
            let list = GameCache.hero.list;
            for (let i = 0; i < list.length; i++) {
                for (let j = 0; j < 8; j++) {
                    if (this.checkJewelUpGrade(list[i].id, j)) return true;
                }
            }
            return false;
        }
        if (!part && typeof (part) != "number") {
            for (let i = 0; i < 8; i++) {
                if (this.checkJewelUpGrade(roleId, i)) return true;
            }
            return false;
        }
        let data = this.roleJewelList[roleId];
        let curItem = data && data[part] ? data[part] : null;
        if (!curItem) return false;
        let gem: StdGem = GameConfig.jewel[curItem.id];
        let count = GameCache.bag.itemCount(gem.consume[0].id);
        let tarCount = gem.consume[0].count * (1 + curItem.lvl * gem.lvlConsume);
        return count >= tarCount;
    }

}