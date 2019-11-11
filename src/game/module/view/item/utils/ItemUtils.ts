/*
 * @Description: In User Settings Edit
 * @Author: xiejunwei
 * @Date: 2019-08-20 15:12:43
 * @LastEditTime: 2019-11-01 17:04:36
 */
class ItemUtils {
    public static colorArr = [0xd6d6d6, 0x2aff00, 0x00b4ff, 0xff00de, 0xffea00, 0xff0000];

    /**
     * 获得物品品质对于的颜色
     * @param value 为品质
    */
    public static getItemColor(value) {
        return this.colorArr[value - 1] || 0xd6d6d6;
    }

    /**
     * 返回附带品质颜色的物品名称，富文本字符串
     * @param item 物品
     */
    public static getItemNamewithColor(item: StdItem): string {
        let str: string = "<(c" + this.getItemColor(item.showQuality) + ")" + item.name + ">"
        return str;
    }

    /**
     * 返回附带品质颜色的物品名称，富文本字符串
     * @param id 物品id
     */
    public static getItemNamewithColorById(id: number): string {
        let qua = 1;
        let name = ""
        if (id && GameConfig.item[id]) {
            qua = GameConfig.item[id].showQuality || 1;
            name = GameConfig.item[id].name || ""
        }
        let str: string = "<(c" + this.getItemColor(qua) + ")" + name + ">"
        return str;
    }


    /**
     * 获得职业文字
     * @param job
     */
    public static getJobString(job): string {
        let language = Language.lang;
        return language.jobName[job];
    }



    /**
     * 获取装备使用职业
     * @param item
     */
    public static getEquipJob(item: StdItem): number {
        let conds = item.conds;
        let job = 0;
        if (!conds) {
            return this.currencyEquip(item);
        }
        for (let i = 0; i < conds.length; i++) {
            if (conds[i].cond == StdItemCondition.ucJob) {
                if (conds[i].cond != 0) {
                    job = conds[i].value;
                } else {
                    job = this.currencyEquip(item);
                }
                return job;
            }
        }
    }

    /**
     * 获取使用登记
     * @param item
     */
    public static getUsLv(item: StdItem): number {
        let conds = item.conds;
        if (!conds) {
            return 0;
        }
        for (let i = 0; i < conds.length; i++) {
            if (conds[i].cond == StdItemCondition.ucLevel) {
                return conds[i].value;
            }
        }
    }

    //通用装备处理：遍历已有人物，检查身上部位空位并对比战力
    private static currencyEquip(item: StdItem): number {
        for (let i = 0; i < GameCache.hero.list.length; i++) {
            let eqArr = GameCache.hero.getDataByIndex(i, GameCache.equip.roleEquipList);
            let eqItem = eqArr && eqArr[item.part] ? eqArr[item.part] : null;
            let power: number = this.getItemZDL(item);
            if (eqItem) {
                if (this.getItemZDL(eqItem.stdItem) < power) return GameCache.hero.list[i].pro.pro(PropId.AP_JOB);
            } else {
                return GameCache.hero.list[i].pro.pro(PropId.AP_JOB);
            }
        }
        return 1;
    }


    /**
     * 根据属性集获取战斗力和
     * @param propArr
     */
    public static getZdlByProp(propArr): number {
        let num = 0;
        if (!propArr) return 0;
        for (let i of propArr) {
            let conf = GameConfig.buffId[i.type];
            conf && (num += conf.power * i.value);
        }
        return Math.floor(num);
    }

    /**
     * 是否是装备
    */
    public static isEquip(std: StdItem): boolean {
        return std.type > 0 && std.type < ItemType.itEquipMax;
    }

    /** 是否属于普通道具
     * @param  {StdItem} std
     * @returns boolean
     */
    public static isNormalItem(std: StdItem): boolean {
        return std.type >= ItemType.itNormal;
    }

    /**
     * 获取物品战斗力
     * @param item
     */
    public static getItemZDL(item: StdItem): number {
        let zdl = GameCache.bag.itemZDL[item.id];
        if (!zdl) {
            zdl = this.getZdlByProp(item.staitcAttrs);
            GameCache.bag.itemZDL[item.id] = zdl;
        }
        return zdl;
    }

    /**
     * 检查人物是否能使用
     * @param item
     */
    public static itemCanUse(item: UserItem): boolean {
        // let bagtype = GameCache.bag.getItemBagType(item);
        let bagtype = item.bagType;
        switch (bagtype) {
            case BagType.BAG_TYPE_EQUIP:
                let cond = item.stdItem.conds;
                let result = true;
                for (let i in cond) {
                    if (cond[i].cond == StdItemCondition.ucLevel) {
                        let lvl = GameCache.hero.mainPro.pro(PropId.AP_LEVEL);
                        if (lvl < cond[i].value) return false;
                    }
                    if (cond[i].cond == StdItemCondition.ucJob) {
                        let roleData = GameCache.hero.getProByJob(cond[i].value);
                        if (!roleData) return false;
                    }
                }
                return true;
            default:
                break;
        }
        return true;
    }

    /**
     * 推荐使用
     * @param item
     */
    public static itemSuggestUse(uItem: UserItem): boolean {
        let item = uItem.stdItem;
        // let bagtype = GameCache.bag.getItemBagType(item);
        let bagtype = uItem.bagType;
        if (!item.useremind) return false;
        switch (bagtype) {
            case BagType.BAG_TYPE_EQUIP:
                let job = ItemUtils.getEquipJob(item);
                // 为开启该角色时
                if (!GameCache.hero.getHeroByJob(job)) {
                    this.isItemRecycle(uItem, 7, (item.showQuality >= 6));
                    return false;
                }

                //利用物品回收机制，不回收的为大于身上装备战力，进行推荐，低于侧不推荐同时回收;若品质大于等于6，就强制不进入回收组。
                let show = (!this.isItemRecycle(uItem, 7, (item.showQuality >= 6)));
                let enable = ItemUtils.itemCanUse(uItem);
                return show && enable;
            default:
                return true;
        }
    }

    /**
     * 物品是否回收
     * @param uItem：装备；color：大于等于该品质跳过回收检查；force：为跳过收纳到回收组的步骤； seleJob为当装备为通用装备时，指定某个职业判断
     */
    public static isItemRecycle(uItem: UserItem, color: number = 6, force: boolean = false, seleJob: number = 0): boolean {
        let item = uItem.stdItem;
        if (item.showQuality >= color) return false;
        let power = ItemUtils.getItemZDL(item);
        let eqJob = ItemUtils.getEquipJob(item)
        let job = eqJob ? eqJob : 1;
        if (seleJob != 0) job = seleJob;
        let roleID = 0;
        let role = GameCache.hero.getProByJob(job);
        if (role) roleID = role.pro(PropId.AP_ACTOR_ID);
        let eqArr = GameCache.equip.roleEquipList[roleID];
        let eqItem: UserItem = eqArr && eqArr[item.part] ? eqArr[item.part] : null;
        if (eqItem) {
            if (eqItem.series.isEquals(uItem.series)) return true;
            let eqPower = ItemUtils.getItemZDL(eqItem.stdItem);     //当前人物装备战力
            if (eqPower >= power) {
                //当前装备战力低于人物已装备，回收
                !force && (GameCache.bag.recycleArr[uItem.series.toString()] = uItem);
                //检查该装备是否在推荐列表里，有则剔除
                if (GameCache.bag.roleSuggestBag[job] && GameCache.bag.roleSuggestBag[job][item.part] == uItem) {
                    delete GameCache.bag.roleSuggestBag[job][item.part];
                }
                return true;
            } else {
                //检查进入推荐，判断当前装备是否为推荐装备，是则中断回收，并且进入推荐队列
                let suggest = this.initSuggest(uItem, job, power, force);
                if (suggest === "same") {
                    return true;
                }
                !force && !suggest && (GameCache.bag.recycleArr[uItem.series.toString()] = uItem);
                return !suggest;
            }
        } else {
            //角色未创建时或角色该部位没有装备时，筛选对应职业部位最高战力装备
            let keepBag = GameCache.bag.roleKeepBag[`${job}`];
            if (!keepBag) {
                keepBag = GameCache.bag.roleKeepBag[`${job}`] = {};
            }
            let rItem = keepBag[`${item.part}`] ? keepBag[`${item.part}`] : null;
            //检查推荐
            let suggest = this.initSuggest(uItem, job, power, force);

            if (!rItem) {
                keepBag[`${item.part}`] = uItem;
                return false;
            }
            let oldPower = ItemUtils.getItemZDL(rItem.stdItem);
            if (uItem.series.isEquals(rItem.series)) { //若是同一个物品对比时，跳出
                return false
            }
            if (power > oldPower) {
                keepBag[`${item.part}`] = uItem;
                !force && (GameCache.bag.recycleArr[rItem.series.toString()] = rItem);
            } else {
                //该情况为 uItem不是最高战力装备，检查是否属于角色目前能穿著的最高战力装备，假若是，跳过回收
                !force && !suggest && (GameCache.bag.recycleArr[uItem.series.toString()] = uItem);
                return true;
            }
        }
    }

    /**
     * 推荐穿著,假若为推荐穿著，中断回收 true为中断回收
     */
    private static initSuggest(uItem: UserItem, job, newPower, force = false) {
        let sItem: StdItem = uItem.stdItem;
        let roleBag = GameCache.bag.roleSuggestBag[job];
        if (!ItemUtils.itemCanUse(uItem)) return true;
        if (!roleBag) roleBag = GameCache.bag.roleSuggestBag[job] = {};
        let oldItem = roleBag[sItem.part];
        if (oldItem) {
            let oldPower = ItemUtils.getItemZDL(sItem);
            if (uItem.series.isEquals(oldItem.series)) return "same";
            if (newPower > oldPower) {
                //新道具战力大于旧时，回收旧道具
                !force && (GameCache.bag.recycleArr[oldItem.series.toString()] = oldItem);
                roleBag[sItem.part] = uItem;
                return true;
            } else {
                return false;
            }
        } else {
            roleBag[sItem.part] = uItem;
            return true;
        }
    }

    public static deleSuggest(uItem: UserItem): void {
        let job = this.getEquipJob(uItem.stdItem);
        let bag = GameCache.bag.roleSuggestBag[job];
        if (!bag) return;
        for (let i in bag) {
            let item: UserItem = bag[i];
            if (item.series.isEquals(uItem.series))
                delete bag[i];
        }
    }

}