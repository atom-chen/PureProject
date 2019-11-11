var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 交互道具结构
 */
var UserItem = (function () {
    function UserItem(bytes) {
        if (bytes === void 0) { bytes = null; }
        /**此物品的数量，默认为1 */
        this.btCount = 1;
        this.wHoles = [];
        this.refineAttrs = [];
        this.UserItem(bytes);
    }
    UserItem.prototype.UserItem = function (bytes) {
        if (!bytes)
            return;
        this.series = new ItemSeries(bytes);
        this.wItemId = bytes.readUnsignedShort();
        this.stdItem = GameConfig.item[this.wItemId];
        this.btQuality = bytes.readUnsignedByte();
        this.btStrong = bytes.readUnsignedByte();
        bytes.readShort(); //耐久度
        bytes.readShort(); //耐久度上限
        this.btCount = bytes.readUnsignedShort();
        bytes.readUnsignedInt(); //强化的星
        bytes.readShort(); //物品升星
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
    };
    UserItem.prototype.cloneItem = function () {
        var item = new UserItem();
        item.series = this.series;
        item.part = this.part;
        item.stdItem = this.stdItem;
        item.wItemId = this.wItemId;
        return;
    };
    return UserItem;
}());
__reflect(UserItem.prototype, "UserItem");
//# sourceMappingURL=UserItem.js.map