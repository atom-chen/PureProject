class BagCache extends BaseCache {
    public bagItems: any;   //已分类的物品ID索引背包
    public bagSeries: any;  //序列号索引背包
    public itemZDL: any;  //物品战力组
    public recycleArr: any;  //回收组

    public roleKeepBag: any; //角色没开启时，背包保存该职业的一套最高战力装备
    public roleSuggestBag: any; //推荐穿着

    public newItenHintArr: UserItem[] = [];

    public equipNum: number = 0; //装备数量

    public bagGridNum;

    public constructor() {
        super();

        this.bagItems = {};
        this.bagSeries = {};
        this.itemZDL = {};
        this.recycleArr = {};
        this.roleKeepBag = {};
        this.roleSuggestBag = {};
        this.bagGridNum = {};
    }

    clear() {
        this.bagItems = {};
        this.bagSeries = {};
        this.itemZDL = {};
        this.recycleArr = {};
        this.roleKeepBag = {};
        this.roleSuggestBag = {};
        this.newItenHintArr = [];
        this.equipNum = 0;
        this.tempList = [];
        this.bagGridNum = {};
    }

    public initBagItems(bagItems: UserItem[]): void {
        if (!this.bagItems) return;
        for (let i = 0; i < bagItems.length; i++) {

            let item = bagItems[i];
            // let num = this.getItemBagType(item.stdItem) + "";
            let num = item.bagType;
            if (num == BagType.BAG_TYPE_EQUIP) this.equipNum++;  //装备计数
            this.bagSeries[item.series.toString()] = item;
            if (this.bagItems[num]) {
                if (this.bagItems[num][item.stdItem.id]) {
                    this.bagItems[num][item.stdItem.id].push(this.bagSeries[item.series.toString()]);
                } else {
                    this.bagItems[num][item.stdItem.id] = [this.bagSeries[item.series.toString()]];
                }
            } else {
                this.bagItems[num] = {};
                this.bagItems[num][item.stdItem.id] = [this.bagSeries[item.series.toString()]];
            }
            let len = this.bagItems[num][item.stdItem.id].length;

        }

        //派送更新界面信息
        App.MessageCenter.dispatch(MsgConst.BAG_ITEM_NUM);

        this.autoRecycle();
    }

    /**
     * 添加背包物品
     */
    private tempList = [];
    public addItem(item: UserItem) {
        if (!this.bagItems) return;
        let stdItem: StdItem = item.stdItem;
        if (!stdItem) return;
        // let type = this.getItemBagType(stdItem) + "";
        let type = item.bagType;
        if (type == BagType.BAG_TYPE_EQUIP) this.equipNum++; //装备计数
        this.bagSeries[item.series.toString()] = item;
        if (this.bagItems[type]) {
            if (this.bagItems[type][item.stdItem.id]) {
                this.bagItems[type][item.stdItem.id].push(this.bagSeries[item.series.toString()]);
            } else {
                this.bagItems[type][item.stdItem.id] = [this.bagSeries[item.series.toString()]];
            }
        } else {
            this.bagItems[type] = {};
            this.bagItems[type][item.stdItem.id] = [this.bagSeries[item.series.toString()]];
        }
        let len = this.bagItems[type][item.stdItem.id].length;
        // this.bagSeries[item.series.toString()] = this.bagItems[type][item.stdItem.id][len - 1];

        // this.tempList.push(item);
        // if (App.TimerManager.isExists(this.checkNewItemFunc, this))
        //     App.TimerManager.remove(this.checkNewItemFunc, this);
        // App.TimerManager.addDelay(200, 100, 1, this.checkNewItemFunc, this);

        //新物品提示
        if (ItemUtils.itemSuggestUse(item)) {
            this.newItenHintArr.unshift(item);
            if (!App.ViewManager.isShow(ViewConst.NEWITEM)) {
                App.ViewManager.open(ViewConst.NEWITEM);
            }
        }

        //派送更新界面信息
        App.MessageCenter.dispatch(MsgConst.BAG_ITEM_NUM);
        App.MessageCenter.dispatch(MsgConst.BAG_ITEM_NUM + item.stdItem.id);

        let mes: string = ItemUtils.getItemNamewithColor(stdItem) + " x" + item.btCount;
        GlobalFun.SysMsg(StringUtils.substitute(Language.lang.huode, mes), SysMessageType.CHAT_PANEL_RIGHT);

        this.autoRecycle();
    }

    /**返回用户物品 */
    public getUserItemBySeries(series: ItemSeries): UserItem {
        return this.bagSeries[series.toString()] || null;
    }

    /**
     * 背包物品数量变化
     */
    public changeItemCount(series: ItemSeries, newCount: number): void {
        if (!this.bagItems) return;

        let oldCount: number;
        let item = this.bagSeries[series.toString()];
        if (item) {
            oldCount = item.btCount;
            item.btCount = newCount;
            let std: StdItem = item.stdItem;
            let mes: string = ItemUtils.getItemNamewithColor(std) + ` x${newCount - oldCount}`;
            App.MessageCenter.dispatch(MsgConst.BAG_ITEM_NUM);
            App.MessageCenter.dispatch(MsgConst.BAG_ITEM_NUM + std.id);
            if ((newCount - oldCount) < 0) return
            GlobalFun.SysMsg(StringUtils.substitute(Language.lang.huode, mes), SysMessageType.CHAT_PANEL_RIGHT);
        }
    }

    /**
     * 删除背包物品
     */
    public delItem(series: ItemSeries): void {
        if (!this.bagItems) return null;
        let item: UserItem = this.bagSeries[series.toString()];
        if (!item) return;
        // let bagtype = this.getItemBagType(item.stdItem);
        let bagtype = item.bagType;
        if (bagtype == BagType.BAG_TYPE_EQUIP) this.equipNum--; //装备计数
        let itemArr: UserItem[] = this.bagItems[bagtype][item.stdItem.id];
        for (let i = 0; i < itemArr.length; i++) {
            if (itemArr[i].series.isEquals(series)) {
                itemArr.splice(i, 1);
            }
        }
        ItemUtils.deleSuggest(item);
        delete this.bagSeries[series.toString()];
        if (this.recycleArr[series.toString()]) {
            delete this.recycleArr[series.toString()];
        }
        //派送更新界面信息
        App.MessageCenter.dispatch(MsgConst.BAG_ITEM_NUM);
        App.MessageCenter.dispatch(MsgConst.BAG_ITEM_NUM + item.stdItem.id);
    }

    /**
    * 判断物品背包类型
    * @param item
    */
    public getItemBagType(item: StdItem): number {
        if (item.type == 0) {
            return 0;
        }
        if (ItemUtils.isEquip(item))
            return BagType.BAG_TYPE_EQUIP;
        else
            return BagType.BAG_TYPE_OTHER;
    }

    /**根据id获取物品个数 */
    public itemCount(itemId, bagtype = -1) {
        let num = 0;
        let item: StdItem;

        if (typeof (itemId) == "number" || typeof (itemId) == "string") {
            item = GameConfig.item[itemId];
        } else if (itemId instanceof UserItem) {
            item = itemId.stdItem;
        } else if (itemId instanceof StdItem) {
            item = itemId;
        }
        if (item.id == GlobalVar.COIN) {
            return GameCache.hero.mainPro.pro(PropId.AP_COIN);
        } else if (item.id == GlobalVar.GOLD) {
            return GameCache.hero.mainPro.pro(PropId.AP_YUANBAO);
        }
        if (bagtype < 0) {
            bagtype = item.bagtype;
        }
        let type = bagtype;
        let bag = this.bagItems[`${type}`];
        if (!bag || !bag[item.id]) return 0;
        if (type == BagType.BAG_TYPE_EQUIP) {
            num = bag[item.id].length;
        } else {
            for (let i = 0; i < bag[item.id].length; i++) {
                let bItem: UserItem = bag[item.id][i];
                num += bItem.btCount;
            }
        }
        return num;
    }

    /**根据所需材料判断背包是否满足条件 */
    public getBagEnoughByCondtion(item) {

        if (item instanceof Array) {
            for (let index in item) {
                let data = item[index]
                if (!data.id) {
                    return false;
                }
                if (this.itemCount(data.id) < data.count) {
                    return false;
                }
            }
            return true;
        }
        else {
            if (!item.id) {
                return false;
            }

            if (this.itemCount(item.id) >= item.count) {
                return true;
            }
        }


        return false;
    }

    /**
     * 根据获取背包
     * @param ItemType 背包类型
     */
    public getBagByType(ItemType): UserItem[] {
        let arr: UserItem[] = [];
        let obj = this.bagItems[ItemType];
        for (let i in obj) {
            arr = arr.concat(obj[i]);
        }
        return arr;
    }

    /**
     * 自动熔炼
     */
    private cdCheck = 0;
    public autoRecycle(): void {
        let auto = GlobalFun.getRemindSet(0, SettingType.AUTO_RECYCLE);
        let time = egret.getTimer();
        if ((time - this.cdCheck) < 1000) {
            if (!App.TimerManager.isExists(this.autoRecycle, this))
                App.TimerManager.addDelay(1100, 1100, 1, this.autoRecycle, this)
            return;
        };
        this.cdCheck = time;
        if (auto) return;
        let bagNum = this.bagGridNum[BagType.BAG_TYPE_EQUIP] ? this.bagGridNum[BagType.BAG_TYPE_EQUIP] : 0;
        let limit = Math.floor(bagNum * GlobalVar.AUTO_RECYCLE_TRIGER);
        let delta = this.equipNum - limit;
        if (delta > 0) {
            let arr = [];
            for (let i in GameCache.bag.recycleArr) {
                if (delta <= 0) break;
                arr.push(GameCache.bag.recycleArr[i]);
                delta--;
            }
            Proxy.bag.sendEquipRecycleBagItem(BagType.BAG_TYPE_EQUIP, arr);
            // while (arr.length) {
            //     let arr_0 = arr.slice(0, 100);
            //     arr.splice(0, 100);
            //     Proxy.bag.sendEquipRecycleBagItem(BagType.BAG_TYPE_EQUIP, arr_0);
            // }
        }
    }

    /**
     * 熔炼列表更新
     */
    public reFreshRecyle(): void {
        GameCache.bag.recycleArr = {};
        let eqArr = this.getBagByType(BagType.BAG_TYPE_EQUIP);
        for (let i = 0; i < eqArr.length; i++) {
            let item = eqArr[i];
            //检查是否建议使用
            if (ItemUtils.itemSuggestUse(item)) {
                this.newItenHintArr.unshift(item);
                if (!App.ViewManager.isShow(ViewConst.NEWITEM)) {
                    App.ViewManager.open(ViewConst.NEWITEM);
                }
            }
        }
        App.MessageCenter.dispatch(MsgConst.EQUIP_INFO);
    }

    public checkRecycle(): boolean {
        let count = 0;
        for (let i in this.recycleArr) {
            count++;
            if (count >= 1) break;
        }
        return count > 0;
    }
}