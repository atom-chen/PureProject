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
 * 背包系统
 */
var BagProxy = (function (_super) {
    __extends(BagProxy, _super);
    function BagProxy() {
        var _this = _super.call(this, PacketTypes.BAG) || this;
        _this.regNetMsg(4, _this.doQueryMyItem); //玩家背包数据返回
        _this.regNetMsg(2, _this.doAddItem); //添加玩家背包数据
        _this.regNetMsg(1, _this.doDeleteItem); //删除玩家背包数据
        _this.regNetMsg(3, _this.doItemCountChange); //物品个数变化
        _this.regNetMsg(45, _this.doExpandGridData); //拓展背包格子
        _this.regNetMsg(12, _this.recycleItem);
        return _this;
    }
    BagProxy.prototype.doQueryMyItem = function (bytes) {
        var bagType = bytes.readUnsignedByte();
        var bagGridNum = bytes.readUnsignedShort();
        var count = bytes.readUnsignedShort(); //物品个数
        var bagItems = [];
        for (var i = 0; i < count; i++) {
            var item = new UserItem(bytes);
            item.sourceType = ItemSourceType.BAG;
            item.bagType = bagType;
            bagItems.push(item);
        }
        if (bagItems) {
            // App.FrameHandler.add(GameCache.bag.initBagItems, GameCache.bag, false, bagItems);
            GameCache.bag.initBagItems(bagItems);
        }
        GameCache.bag.bagGridNum[bagType] = bagGridNum;
        App.MessageCenter.dispatch(MsgConst.BAG_INFO);
    };
    BagProxy.prototype.doAddItem = function (bytes) {
        var bagType = bytes.readUnsignedByte();
        var newItem = new UserItem(bytes);
        newItem.bagType = bagType;
        newItem.sourceType = ItemSourceType.BAG;
        GameCache.bag.addItem(newItem);
        // App.FrameHandler.add(GameCache.bag.addItem, GameCache.bag, false, newItem);
    };
    BagProxy.prototype.doDeleteItem = function (bytes) {
        var bagType = bytes.readUnsignedByte();
        var delItem = new ItemSeries(bytes);
        GameCache.bag.delItem(delItem);
    };
    BagProxy.prototype.recycleItem = function (bytes) {
        var bagType = bytes.readUnsignedByte();
        var count = bytes.readByte();
        for (var i = 0; i < count; i++) {
            var series = new ItemSeries(bytes);
            GameCache.bag.delItem(series);
        }
        App.MessageCenter.dispatch(MsgConst.BAG_RECYCLE);
    };
    BagProxy.prototype.doItemCountChange = function (bytes) {
        var bagType = bytes.readByte();
        var series = new ItemSeries(bytes);
        var newCount = bytes.readUnsignedShort();
        GameCache.bag.changeItemCount(series, newCount);
    };
    BagProxy.prototype.doExpandGridData = function (bytes) {
        var vo = new BackPackLockVO();
        var bagType = bytes.readByte();
        vo.freeNum = bytes.readByte();
        vo.leftTime = bytes.readInt();
        vo.allTime = bytes.readInt();
        App.MessageCenter.dispatch(MsgConst.BAG_EXPAND);
    };
    /**
     * 发送查询背包物品请求
     * @param type 背包类型
     */
    BagProxy.prototype.sendQueryBagItem = function (type) {
        var bytes = this.getBytes(2);
        bytes.writeByte(2);
        this.sendToServer(bytes);
    };
    /**
     * 发送删除物品要求
     * @param itemSeries 物品唯一ID , type 背包类型
     */
    BagProxy.prototype.sendDeleteBagItem = function (itemSeries, type) {
        if (!itemSeries) {
            return;
        }
        var bytes = this.getBytes(1);
        bytes.writeByte(type);
        itemSeries.writeToBytes(bytes);
        this.sendToServer(bytes);
    };
    /**
     * 背包拓展
     * @param count 拓展格子数, type 背包类型
     */
    BagProxy.prototype.sendExpandGrid = function (count, type) {
        var bytes = this.getBytes(4);
        bytes.writeByte(type);
        bytes.writeUnsignedShort(count);
        // this.sendToServer(bytes);
    };
    /**
     * 拆分背包物品
     * @param type 背包类型，itemSeries物品唯一ID，count 拆分的数量
     */
    BagProxy.prototype.sendDispart = function (type, itemSeries, count) {
        var bytes = this.getBytes(5);
        bytes.writeByte(type);
        itemSeries.writeToBytes(bytes);
        bytes.writeUnsignedShort(count);
        this.sendToServer(bytes);
    };
    /**
     * 合并背包格子
     * @param type 背包类型,itemSeries_a 物品A ,itemSeries_b 物品B
     */
    BagProxy.prototype.sendCombination = function (type, itemSeries_a, itemSeries_b) {
        var bytes = this.getBytes(6);
        bytes.writeByte(type);
        itemSeries_a.writeToBytes(bytes);
        itemSeries_b.writeToBytes(bytes);
        this.sendToServer(bytes);
    };
    /**
     * 装备回收
     * @param type 背包类型，items 物品数组
     */
    BagProxy.prototype.sendEquipRecycleBagItem = function (type, items) {
        if (items === void 0) { items = []; }
        if (!items.length)
            return;
        var bytes = this.getBytes(11);
        bytes.writeByte(type);
        bytes.writeUnsignedShort(items.length);
        for (var i = 0; i < items.length; i++) {
            items[i].series.writeToBytes(bytes);
        }
        this.sendToServer(bytes);
    };
    /**
     * 物品使用
     */
    BagProxy.prototype.sendItemUse = function (item, count) {
        if (count === void 0) { count = 1; }
        var bytes = this.getBytes(7);
        var roleid = GameCache.hero.getServerIdByIndex(0);
        bytes.writeByte(item.stdItem["bagtype"]);
        item.series.writeToBytes(bytes); //物品唯一序列号
        bytes.writeInt(roleid); //角色ID
        // bytes.writeInt(count);
        this.sendToServer(bytes);
    };
    /**
     * 批量使用道具
     * @param type 背包类型，itemSeries物品唯一ID，count物品数量
     */
    BagProxy.prototype.sendItemUsePlus = function (type, itemSeries, count) {
        var bytes = this.getBytes(8);
        itemSeries.writeToBytes(bytes); //物品唯一序列号
        bytes.writeUnsignedShort(count);
        this.sendToServer(bytes);
    };
    return BagProxy;
}(BaseProxy));
__reflect(BagProxy.prototype, "BagProxy");
//# sourceMappingURL=BagProxy.js.map