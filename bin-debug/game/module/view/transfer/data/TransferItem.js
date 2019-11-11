/*
 * @Description: 转职数据体
 * @Author: liangzhaowei
 * @Date: 2019-10-29 19:17:42
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TransferItem = (function () {
    function TransferItem() {
        /**道具使用次数 */
        this.itemUseIime = {};
    }
    TransferItem.prototype.init = function (bytes) {
        if (!bytes)
            return;
        this.roldId = GameCache.hero.transIdFromeServer(bytes.readInt());
        this.job = bytes.readByte();
        this.sex = bytes.readByte();
        this.turnNum = bytes.readUnsignedShort();
        this.turnLv = bytes.readUnsignedShort();
        this.exp = bytes.readUnsignedInt();
        this.itemUseIime[0] = bytes.readByte();
        this.itemUseIime[1] = bytes.readByte();
        this.itemUseIime[2] = bytes.readByte();
    };
    return TransferItem;
}());
__reflect(TransferItem.prototype, "TransferItem");
//# sourceMappingURL=TransferItem.js.map