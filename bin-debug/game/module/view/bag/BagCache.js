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
var BagCache = (function (_super) {
    __extends(BagCache, _super);
    function BagCache() {
        var _this = _super.call(this) || this;
        _this.newItenHintArr = [];
        _this.equipNum = 0; //装备数量
        /**
         * 添加背包物品
         */
        _this.tempList = [];
        /**
         * 自动熔炼
         */
        _this.cdCheck = 0;
        _this.bagItems = {};
        _this.bagSeries = {};
        _this.itemZDL = {};
        _this.recycleArr = {};
        _this.roleKeepBag = {};
        _this.roleSuggestBag = {};
        _this.bagGridNum = {};
        return _this;
    }
    BagCache.prototype.clear = function () {
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
    };
    BagCache.prototype.initBagItems = function (bagItems) {
        if (!this.bagItems)
            return;
        for (var i = 0; i < bagItems.length; i++) {
            var item = bagItems[i];
            // let num = this.getItemBagType(item.stdItem) + "";
            var num = item.bagType;
            if (num == BagType.BAG_TYPE_EQUIP)
                this.equipNum++; //装备计数
            this.bagSeries[item.series.toString()] = item;
            if (this.bagItems[num]) {
                if (this.bagItems[num][item.stdItem.id]) {
                    this.bagItems[num][item.stdItem.id].push(this.bagSeries[item.series.toString()]);
                }
                else {
                    this.bagItems[num][item.stdItem.id] = [this.bagSeries[item.series.toString()]];
                }
            }
            else {
                this.bagItems[num] = {};
                this.bagItems[num][item.stdItem.id] = [this.bagSeries[item.series.toString()]];
            }
            var len = this.bagItems[num][item.stdItem.id].length;
        }
        //派送更新界面信息
        App.MessageCenter.dispatch(MsgConst.BAG_ITEM_NUM);
        this.autoRecycle();
    };
    BagCache.prototype.addItem = function (item) {
        if (!this.bagItems)
            return;
        var stdItem = item.stdItem;
        if (!stdItem)
            return;
        // let type = this.getItemBagType(stdItem) + "";
        var type = item.bagType;
        if (type == BagType.BAG_TYPE_EQUIP)
            this.equipNum++; //装备计数
        this.bagSeries[item.series.toString()] = item;
        if (this.bagItems[type]) {
            if (this.bagItems[type][item.stdItem.id]) {
                this.bagItems[type][item.stdItem.id].push(this.bagSeries[item.series.toString()]);
            }
            else {
                this.bagItems[type][item.stdItem.id] = [this.bagSeries[item.series.toString()]];
            }
        }
        else {
            this.bagItems[type] = {};
            this.bagItems[type][item.stdItem.id] = [this.bagSeries[item.series.toString()]];
        }
        var len = this.bagItems[type][item.stdItem.id].length;
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
        var mes = ItemUtils.getItemNamewithColor(stdItem) + " x" + item.btCount;
        GlobalFun.SysMsg(StringUtils.substitute(Language.lang.huode, mes), SysMessageType.CHAT_PANEL_RIGHT);
        this.autoRecycle();
    };
    /**返回用户物品 */
    BagCache.prototype.getUserItemBySeries = function (series) {
        return this.bagSeries[series.toString()] || null;
    };
    /**
     * 背包物品数量变化
     */
    BagCache.prototype.changeItemCount = function (series, newCount) {
        if (!this.bagItems)
            return;
        var oldCount;
        var item = this.bagSeries[series.toString()];
        if (item) {
            oldCount = item.btCount;
            item.btCount = newCount;
            var std = item.stdItem;
            var mes = ItemUtils.getItemNamewithColor(std) + (" x" + (newCount - oldCount));
            App.MessageCenter.dispatch(MsgConst.BAG_ITEM_NUM);
            App.MessageCenter.dispatch(MsgConst.BAG_ITEM_NUM + std.id);
            if ((newCount - oldCount) < 0)
                return;
            GlobalFun.SysMsg(StringUtils.substitute(Language.lang.huode, mes), SysMessageType.CHAT_PANEL_RIGHT);
        }
    };
    /**
     * 删除背包物品
     */
    BagCache.prototype.delItem = function (series) {
        if (!this.bagItems)
            return null;
        var item = this.bagSeries[series.toString()];
        if (!item)
            return;
        // let bagtype = this.getItemBagType(item.stdItem);
        var bagtype = item.bagType;
        if (bagtype == BagType.BAG_TYPE_EQUIP)
            this.equipNum--; //装备计数
        var itemArr = this.bagItems[bagtype][item.stdItem.id];
        for (var i = 0; i < itemArr.length; i++) {
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
    };
    /**
    * 判断物品背包类型
    * @param item
    */
    BagCache.prototype.getItemBagType = function (item) {
        if (item.type == 0) {
            return 0;
        }
        if (ItemUtils.isEquip(item))
            return BagType.BAG_TYPE_EQUIP;
        else
            return BagType.BAG_TYPE_OTHER;
    };
    /**根据id获取物品个数 */
    BagCache.prototype.itemCount = function (itemId, bagtype) {
        if (bagtype === void 0) { bagtype = -1; }
        var num = 0;
        var item;
        if (typeof (itemId) == "number" || typeof (itemId) == "string") {
            item = GameConfig.item[itemId];
        }
        else if (itemId instanceof UserItem) {
            item = itemId.stdItem;
        }
        else if (itemId instanceof StdItem) {
            item = itemId;
        }
        if (item.id == GlobalVar.COIN) {
            return GameCache.hero.mainPro.pro(PropId.AP_COIN);
        }
        else if (item.id == GlobalVar.GOLD) {
            return GameCache.hero.mainPro.pro(PropId.AP_YUANBAO);
        }
        if (bagtype < 0) {
            bagtype = item.bagtype;
        }
        var type = bagtype;
        var bag = this.bagItems["" + type];
        if (!bag || !bag[item.id])
            return 0;
        if (type == BagType.BAG_TYPE_EQUIP) {
            num = bag[item.id].length;
        }
        else {
            for (var i = 0; i < bag[item.id].length; i++) {
                var bItem = bag[item.id][i];
                num += bItem.btCount;
            }
        }
        return num;
    };
    /**根据所需材料判断背包是否满足条件 */
    BagCache.prototype.getBagEnoughByCondtion = function (item) {
        if (item instanceof Array) {
            for (var index in item) {
                var data = item[index];
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
    };
    /**
     * 根据获取背包
     * @param ItemType 背包类型
     */
    BagCache.prototype.getBagByType = function (ItemType) {
        var arr = [];
        var obj = this.bagItems[ItemType];
        for (var i in obj) {
            arr = arr.concat(obj[i]);
        }
        return arr;
    };
    BagCache.prototype.autoRecycle = function () {
        var auto = GlobalFun.getRemindSet(0, SettingType.AUTO_RECYCLE);
        var time = egret.getTimer();
        if ((time - this.cdCheck) < 1000) {
            if (!App.TimerManager.isExists(this.autoRecycle, this))
                App.TimerManager.addDelay(1100, 1100, 1, this.autoRecycle, this);
            return;
        }
        ;
        this.cdCheck = time;
        if (auto)
            return;
        var bagNum = this.bagGridNum[BagType.BAG_TYPE_EQUIP] ? this.bagGridNum[BagType.BAG_TYPE_EQUIP] : 0;
        var limit = Math.floor(bagNum * GlobalVar.AUTO_RECYCLE_TRIGER);
        var delta = this.equipNum - limit;
        if (delta > 0) {
            var arr = [];
            for (var i in GameCache.bag.recycleArr) {
                if (delta <= 0)
                    break;
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
    };
    /**
     * 熔炼列表更新
     */
    BagCache.prototype.reFreshRecyle = function () {
        GameCache.bag.recycleArr = {};
        var eqArr = this.getBagByType(BagType.BAG_TYPE_EQUIP);
        for (var i = 0; i < eqArr.length; i++) {
            var item = eqArr[i];
            //检查是否建议使用
            if (ItemUtils.itemSuggestUse(item)) {
                this.newItenHintArr.unshift(item);
                if (!App.ViewManager.isShow(ViewConst.NEWITEM)) {
                    App.ViewManager.open(ViewConst.NEWITEM);
                }
            }
        }
        App.MessageCenter.dispatch(MsgConst.EQUIP_INFO);
    };
    BagCache.prototype.checkRecycle = function () {
        var count = 0;
        for (var i in this.recycleArr) {
            count++;
            if (count >= 1)
                break;
        }
        return count > 0;
    };
    return BagCache;
}(BaseCache));
__reflect(BagCache.prototype, "BagCache");
//# sourceMappingURL=BagCache.js.map