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
 * @author linsen
 *
 */
var GameByteArray = (function (_super) {
    __extends(GameByteArray, _super);
    function GameByteArray() {
        var _this = _super.call(this) || this;
        _this.endian = egret.Endian.LITTLE_ENDIAN;
        return _this;
    }
    GameByteArray.prototype.readCustomBytes = function () {
        var s = this.readUTF();
        this.position++;
        return s;
    };
    // 对于协议中要读取8字节Int64的字段，分两种情况：如果不需要加减等运算的字段，比如handle，
    // 用readDouble函数读取，如果是需要运算的数字类型，比如铜钱等，用readNumber读取
    // 返回uint64类型的readInt64以后不要使用了,已经使用的地方慢慢修改过来
    GameByteArray.prototype.readNumber = function () {
        var i64 = new uint64(this);
        var str = i64.toString();
        return +str;
    };
    /**
 * 读取自定义的数值
 * @return
 *
 */
    GameByteArray.prototype.readNumeric = function (type) {
        switch (type) {
            case GameByteArray.DT_SMALL:
                return this.readByte();
            case GameByteArray.DT_USMALL:
                return this.readUnsignedByte();
            case GameByteArray.DT_SHORT:
                return this.readShort();
            case GameByteArray.DT_USHORT:
                return this.readUnsignedShort();
            case GameByteArray.DT_INT:
                return this.readInt();
            case GameByteArray.DT_UINT:
                return this.readUnsignedInt();
            case GameByteArray.DT_FLOAT:
                return this.readFloat();
            default: return 0;
        }
    };
    // 对应readnumer
    GameByteArray.prototype.writeNumber = function (val) {
        var i64 = uint64.stringToUint64(val.toString());
        this.writeInt64(i64);
    };
    GameByteArray.prototype.writeInt64 = function (bigInt) {
        this.writeUnsignedInt(bigInt._lowUint);
        this.writeUnsignedInt(bigInt._highUint);
    };
    GameByteArray.prototype.writeString = function (value) {
        this.writeUTF(value);
        this.writeByte(0);
    };
    GameByteArray.prototype.writeCmd = function (id, subId) {
        this.writeByte(id);
        this.writeByte(subId);
    };
    /**
     * 回收bytes对象
     * @param byte
     */
    GameByteArray.recycleByte = function (byte) {
        ObjectPool.push(byte);
    };
    /**
     * 从对象池获取一个bytes对象
     */
    GameByteArray.getBytes = function () {
        var pack = ObjectPool.get(GameByteArray);
        pack.clear();
        pack.writeShort(GameSocket.DEFAULT_TAG);
        pack.writeShort(0); //dataLength
        pack.writeShort(0); //data crc
        pack.writeShort(0); //head crc
        /*
        pack.writeShort(this.pid);
        this.pid++;
        if (this.pid > 0xFFFF)
        {
            this.pid = 0;
        }
        */
        pack.writeInt(0); //占位
        pack.writeInt(0); //占位
        return pack;
    };
    GameByteArray.DT_VOID = 0;
    GameByteArray.DT_SMALL = 1;
    GameByteArray.DT_USMALL = 2;
    GameByteArray.DT_SHORT = 3;
    GameByteArray.DT_USHORT = 4;
    GameByteArray.DT_INT = 5;
    GameByteArray.DT_UINT = 6;
    GameByteArray.DT_FLOAT = 7;
    return GameByteArray;
}(egret.ByteArray));
__reflect(GameByteArray.prototype, "GameByteArray");
//# sourceMappingURL=GameByteArray.js.map