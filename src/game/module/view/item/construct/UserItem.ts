/**
 * 交互道具结构
 */
class UserItem {
    /**道具来源*/
    sourceType: number;
    /**配置表结构 */
    stdItem: StdItem;
    /**格子id */
    part: number;
    /**物品唯一系列号 */
    series: ItemSeries;
    /**对应的标准物品ID */
    wItemId: number;
    /**此物品的数量，默认为1 */
    btCount: number = 1;
    /**物品的品质等级 */
    btQuality: number;
    /**物品的强化等级 */
    btStrong: number;
    /**物品的精炼等级 */
    btRefine: number;
    /**物品的耐久度 */
    wDura: number;
    /**此物品的耐久度上限 */
    wDuraMax: number;
    /**物品标志，使用比特位标志物品的标志，例如绑定否 */
    btFlag: number;
    wHoles: number[] = [];
    nDeadline: number;
    smith: number;
    initAttrs: number;
    btSmithCount: number;
    refineAttrs: any[] = [];
    btLuck: number;
    btDeportId: number;
    beLong: number;
    btHandPos: number;
    btSharp: number;
    bagType:number;

    public constructor(bytes: GameByteArray = null) {
        this.UserItem(bytes);
    }

    public UserItem(bytes: GameByteArray): void {
        if (!bytes) return;
        this.series = new ItemSeries(bytes);
        this.wItemId = bytes.readUnsignedShort();
        this.stdItem = GameConfig.item[this.wItemId];
        this.btQuality = bytes.readUnsignedByte();
        this.btStrong = bytes.readUnsignedByte();
        bytes.readShort();//耐久度
        bytes.readShort();//耐久度上限
        this.btCount = bytes.readUnsignedShort();
        bytes.readUnsignedInt();//强化的星
        bytes.readShort();//物品升星
        bytes.readUnsignedInt(); //物品的使用时间
        bytes.readUnsignedInt(); //五个 属性
        bytes.readUnsignedInt(); //五个
        bytes.readUnsignedInt(); //五个
        bytes.readUnsignedInt(); //五个
        bytes.readUnsignedInt(); //五个
        bytes.readUnsignedInt(); //一个 器魂
        bytes.readUnsignedByte(); //物品数量
        bytes.readUnsignedByte(); //物品标志
        bytes.readUnsignedByte(); //幸运值
        bytes.readShort(); //精炼度
        bytes.readUnsignedByte(); //穿戴位置
        bytes.readUnsignedByte(); //左手还是右手
        bytes.readUnsignedByte(); //锋利值
        bytes.readUnsignedByte(); //临时标志


        // bytes.position += 1;
    }

    public cloneItem(): UserItem {
        let item: UserItem = new UserItem();
        item.series = this.series;
        item.part = this.part;
        item.stdItem = this.stdItem;
        item.wItemId = this.wItemId;
        return
    }
}