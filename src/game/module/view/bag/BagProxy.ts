/**
 * 背包系统
 */
class BagProxy extends BaseProxy {
    public constructor() {
        super(PacketTypes.BAG);

        this.regNetMsg(4, this.doQueryMyItem);  //玩家背包数据返回
        this.regNetMsg(2, this.doAddItem);  //添加玩家背包数据
        this.regNetMsg(1, this.doDeleteItem);  //删除玩家背包数据
        this.regNetMsg(3, this.doItemCountChange); //物品个数变化
        this.regNetMsg(45, this.doExpandGridData); //拓展背包格子
        this.regNetMsg(12, this.recycleItem);
    }

    private doQueryMyItem(bytes: GameByteArray): void {
        let bagType = bytes.readUnsignedByte();
        let bagGridNum = bytes.readUnsignedShort();
        let count: number = bytes.readUnsignedShort(); //物品个数
        let bagItems: UserItem[] = [];
        for (let i = 0; i < count; i++) {
            let item: UserItem = new UserItem(bytes);
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
    }

    private doAddItem(bytes): void {
        let bagType = bytes.readUnsignedByte();
        let newItem: UserItem = new UserItem(bytes);
        newItem.bagType = bagType;
        newItem.sourceType = ItemSourceType.BAG;
        GameCache.bag.addItem(newItem);
        // App.FrameHandler.add(GameCache.bag.addItem, GameCache.bag, false, newItem);

    }

    private doDeleteItem(bytes: GameByteArray): void {
        let bagType = bytes.readUnsignedByte();
        let delItem: ItemSeries = new ItemSeries(bytes);
        GameCache.bag.delItem(delItem);
    }

    private recycleItem(bytes: GameByteArray): void {
        let bagType = bytes.readUnsignedByte();
        let count = bytes.readByte();
        for (let i = 0; i < count; i++) {
            let series: ItemSeries = new ItemSeries(bytes);
            GameCache.bag.delItem(series);
        }
        App.MessageCenter.dispatch(MsgConst.BAG_RECYCLE);
    }

    private doItemCountChange(bytes: GameByteArray): void {
        let bagType = bytes.readByte();
        let series: ItemSeries = new ItemSeries(bytes);
        let newCount: number = bytes.readUnsignedShort();
        GameCache.bag.changeItemCount(series, newCount);
    }

    private doExpandGridData(bytes: GameByteArray): void {
        let vo: BackPackLockVO = new BackPackLockVO();
        let bagType = bytes.readByte();
        vo.freeNum = bytes.readByte();
        vo.leftTime = bytes.readInt();
        vo.allTime = bytes.readInt();
        App.MessageCenter.dispatch(MsgConst.BAG_EXPAND);
    }


    /**
     * 发送查询背包物品请求 
     * @param type 背包类型
     */
    public sendQueryBagItem(type: number): void {
        let bytes: GameByteArray = this.getBytes(2);
        bytes.writeByte(2);
        this.sendToServer(bytes);
    }

    /**
     * 发送删除物品要求
     * @param itemSeries 物品唯一ID , type 背包类型
     */
    public sendDeleteBagItem(itemSeries: ItemSeries, type: number): void {
        if (!itemSeries) {
            return;
        }
        var bytes: GameByteArray = this.getBytes(1);
        bytes.writeByte(type);
        itemSeries.writeToBytes(bytes);
        this.sendToServer(bytes);
    }

    /**
     * 背包拓展
     * @param count 拓展格子数, type 背包类型
     */
    public sendExpandGrid(count, type: number): void {
        let bytes: GameByteArray = this.getBytes(4);
        bytes.writeByte(type);
        bytes.writeUnsignedShort(count);
        // this.sendToServer(bytes);
    }

    /**
     * 拆分背包物品
     * @param type 背包类型，itemSeries物品唯一ID，count 拆分的数量
     */
    public sendDispart(type, itemSeries: ItemSeries, count): void {
        let bytes: GameByteArray = this.getBytes(5);
        bytes.writeByte(type);
        itemSeries.writeToBytes(bytes);
        bytes.writeUnsignedShort(count);
        this.sendToServer(bytes);
    }

    /**
     * 合并背包格子
     * @param type 背包类型,itemSeries_a 物品A ,itemSeries_b 物品B
     */
    public sendCombination(type, itemSeries_a: ItemSeries, itemSeries_b: ItemSeries): void {
        let bytes: GameByteArray = this.getBytes(6);
        bytes.writeByte(type);
        itemSeries_a.writeToBytes(bytes);
        itemSeries_b.writeToBytes(bytes);
        this.sendToServer(bytes);
    }



    /**
     * 装备回收
     * @param type 背包类型，items 物品数组
     */
    public sendEquipRecycleBagItem(type: number, items: UserItem[] = []): void {
        if (!items.length) return;
        let bytes: GameByteArray = this.getBytes(11);
        bytes.writeByte(type);
        bytes.writeUnsignedShort(items.length);
        for (let i = 0; i < items.length; i++) {
            items[i].series.writeToBytes(bytes);
        }
        this.sendToServer(bytes);
    }

    /**
     * 物品使用
     */
    public sendItemUse(item: UserItem, count = 1): void {
        let bytes: GameByteArray = this.getBytes(7);
        let roleid = GameCache.hero.getServerIdByIndex(0);
        bytes.writeByte(item.stdItem["bagtype"]);
        item.series.writeToBytes(bytes);        //物品唯一序列号
        bytes.writeInt(roleid);                 //角色ID
        // bytes.writeInt(count);
        this.sendToServer(bytes);
    }

    /**
     * 批量使用道具
     * @param type 背包类型，itemSeries物品唯一ID，count物品数量
     */
    public sendItemUsePlus(type: number, itemSeries: ItemSeries, count: number): void {
        let bytes: GameByteArray = this.getBytes(8);
        itemSeries.writeToBytes(bytes);        //物品唯一序列号
        bytes.writeUnsignedShort(count);
        this.sendToServer(bytes);
    }
}