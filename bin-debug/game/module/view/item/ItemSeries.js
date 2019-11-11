var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 物品唯一序号64位读取
 */
var ItemSeries = (function () {
    function ItemSeries(bytes) {
        if (bytes === void 0) { bytes = null; }
        this._str = "";
        if (bytes) {
            this.createTime = bytes.readUnsignedInt();
            this.wSeries = bytes.readUnsignedShort();
            this.btServer = bytes.readByte();
            this.btReserve = bytes.readByte();
            this._str = this.createTime + "_" + this.wSeries + "_" + this.btServer + "_" + this.btReserve;
        }
    }
    /**
    * 序列号字符串化
    */
    ItemSeries.prototype.toString = function () {
        return this._str;
    };
    /**
     * 获取 ItemSeries 的字节流形式
     */
    ItemSeries.prototype.writeToBytes = function (bytes) {
        bytes.writeUnsignedInt(this.createTime);
        bytes.writeShort(this.wSeries);
        bytes.writeByte(this.btServer);
        bytes.writeByte(this.btReserve);
    };
    /**
     * 判断物品系列号是否相等
     */
    ItemSeries.prototype.isEquals = function (value) {
        if (!value)
            return false;
        return value.createTime == this.createTime
            && value.wSeries == this.wSeries
            && value.btServer == this.btServer;
    };
    /**
     * 是否为0的序列号
     */
    ItemSeries.prototype.isZero = function () {
        return (this.createTime == 0 && this.wSeries == 0 && this.btServer == 0 && this.btReserve == 0);
    };
    return ItemSeries;
}());
__reflect(ItemSeries.prototype, "ItemSeries");
//# sourceMappingURL=ItemSeries.js.map