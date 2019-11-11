/**
 * create by junwei on 07/29/2019
 * 
 */

class FashionCache extends BaseCache {

    public fashionBag: any; //根据职业作为索引的时装背包
    public timeLimitItem: any; //时限物品
    public roleFashionData = {};

    public tempProp: PropertySet; //临时人物模型数据
    public role: number; //临时人物下标
    public dish: any; //搭配列表

    public constructor() {
        super();

        this.fashionBag = {};
        this.dish = {};
        this.timeLimitItem = {};
    }

    clear() {
        this.fashionBag = {};
        this.tempProp = null;
        this.dish = {};
        this.timeLimitItem = {};
        this.roleFashionData = {};
    }

    /**
     * 初始化人物时装列表
     */
    public initRoleFashion(id, roleId): void {
        let item: StdFashionequip = GameConfig.fashion[id];
        if (!item) return;
        if (!this.roleFashionData[roleId]) this.roleFashionData[roleId] = {};
        let fashionData = this.roleFashionData[roleId];
        fashionData[item.part] = item;
    }

    /**
     * 清空对应角色的时装列表
     * @param  {} roleId
     * @returns void
     */
    public cleanRoleFashion(roleId): void {
        if (this.roleFashionData[roleId]) {
            this.roleFashionData[roleId] = {};
        }
    }

    /**
     * 添加时装
     */
    public addFashionItem(roleId, type, id): void {
        if (!this.fashionBag[roleId]) {
            this.fashionBag[roleId] = {};
            this.fashionBag[roleId][type] = [id];
        } else if (!this.fashionBag[roleId][type]) {
            this.fashionBag[roleId][type] = [id];
        } else {
            this.fashionBag[roleId][type].push(id);
        }
        App.MessageCenter.dispatch(MsgConst.FASHION_GET);
    }

    /**删除时装 */
    public deleteFashionItem(roleId, type, id): void {
        if (!this.fashionBag[roleId] || !this.fashionBag[roleId][type]) return;
        let idx = this.fashionBag[roleId][type].indexOf(id);
        if (idx < 0) return;
        this.fashionBag[roleId][type].splice(idx, 1);
    }



    /**购买时装 */
    public fashionBuy(itemArr): void {
        if (!itemArr.length) return;
        Proxy.fashion.sendOneBuy(this.role, itemArr);
        if (App.ViewManager.isShow(ViewConst.ITEMTIPS)) App.ViewManager.close(ViewConst.ITEMTIPS);
    }

    /**试穿时装*/
    public tryFashion(itemArr): void {
        let job = GameCache.hero.getProByIndex(this.role).job - 1;
        for (let i of itemArr) {
            this.tempProp.pro(i.part, i.shape[job]);
            this.dish[i.part] = i;
        }
        App.MessageCenter.dispatch(MsgConst.FASHION_TRY, itemArr);
    }

    /**卸下时装 */
    public takeOff(itemArr): void {
        if (itemArr.length == 8) {
            Proxy.fashion.sendOneTakeOff(this.role);
            App.MessageCenter.dispatch(MsgConst.FASHION_TRY, itemArr, false);
        } else {
            for (let i of itemArr) {
                this.tempProp.pro(i.part, "");
                delete this.dish[i.part];
                Proxy.fashion.sendTakeOff(this.role, i.part);
            }
        }
        App.MessageCenter.dispatch(MsgConst.FASHION_TRY, itemArr, false);
    }


    /**检查角色是否拥有该时装 */
    public checkHave(item): boolean {
        let roleId = GameCache.hero.getRoleIdByIndex(this.role);
        let bag = this.fashionBag[roleId] && this.fashionBag[roleId][item.part] ? this.fashionBag[roleId][item.part] : [];
        if (!bag) return false;
        return bag.indexOf(item.id) != -1;
    }

    /**根据时装外观ID、部位、职业查找时装 */
    public checkFashionId(faceId, part, job) {
        for (let i in GameConfig.fashion) {
            let item = GameConfig.fashion[i];
            if (item.part == part && (item.conds[0].value == 0 || item.conds[0].value == job)) {
                if (item.shape.indexOf(faceId) != -1) return item;
            }
        }
    }

    public saveFunc(role): void {
        let buyList = [];
        let eqList = [];
        for (let i in this.dish) {
            let item: StdFashionequip = this.dish[i];
            if (this.checkHave(item)) {
                eqList.push(item);
            } else {
                buyList.push(item);
            }
        }
        if (buyList.length) {
            let view = new ViewProp();
            view.exData1 = buyList;
            view.exData2 = role;
            App.ViewManager.open(ViewConst.FASHIONBUY, view);
        }
        if (eqList.length) {
            Proxy.fashion.sendOneWear(role, eqList);
        }
    }
}