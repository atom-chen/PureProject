/**
 * 物品唯一序号64位读取
 */
class ItemSeries {
    public createTime: number; //31-0位表示物品产生的日期和时间，值为短日期类型，单位是秒
    public wSeries: number; //47-32位表示在一秒内的序列，每产生一个物品则序列值+1，一秒后序列值归零
    public btServer: number  //55-48位表示服务器ID
    public btReserve: number; //63-56位保留

    private _str: string = "";

    public constructor(bytes: GameByteArray = null) {
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
    public toString() {
        return this._str;
    }

    /**
     * 获取 ItemSeries 的字节流形式
     */
    public writeToBytes(bytes: GameByteArray): void {
        bytes.writeUnsignedInt(this.createTime);
        bytes.writeShort(this.wSeries);
        bytes.writeByte(this.btServer);
        bytes.writeByte(this.btReserve);
    }

    /**
     * 判断物品系列号是否相等
     */
    public isEquals(value: ItemSeries): boolean {
        if (!value) return false;

        return value.createTime == this.createTime
            && value.wSeries == this.wSeries
            && value.btServer == this.btServer;
    }

    /**
     * 是否为0的序列号
     */
    public isZero(): Boolean {
        return (this.createTime == 0 && this.wSeries == 0 && this.btServer == 0 && this.btReserve == 0);
    }

}