/**
 * @author linsen
 *
 */
class GameByteArray extends egret.ByteArray {
	static DT_VOID: number = 0;
	static DT_SMALL: number = 1;
	static DT_USMALL: number = 2;
	static DT_SHORT: number = 3;
	static DT_USHORT: number = 4;
	static DT_INT: number = 5;
	static DT_UINT: number = 6;
	static DT_FLOAT: number = 7;

	public constructor() {
		super();
		this.endian = egret.Endian.LITTLE_ENDIAN;
	}

	public readCustomBytes(): string {
		let s: string = this.readUTF();
		this.position++;
		return s;
	}
	// 对于协议中要读取8字节Int64的字段，分两种情况：如果不需要加减等运算的字段，比如handle，
	// 用readDouble函数读取，如果是需要运算的数字类型，比如铜钱等，用readNumber读取
	// 返回uint64类型的readInt64以后不要使用了,已经使用的地方慢慢修改过来

	public readNumber(): number {
		let i64 = new uint64(this);
		let str = i64.toString();
		return +str;
	}

	/**
 * 读取自定义的数值
 * @return 
 * 
 */
	public readNumeric(type: number): any {
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
	}

	// 对应readnumer
	public writeNumber(val: number) {
		let i64 = uint64.stringToUint64(val.toString());
		this.writeInt64(i64);
	}

	public writeInt64(bigInt: uint64) {
		this.writeUnsignedInt(bigInt._lowUint);
		this.writeUnsignedInt(bigInt._highUint);
	}

	public writeString(value: string): void {
		this.writeUTF(value);
		this.writeByte(0);
	}

	public writeCmd(id: number, subId: number): void {
		this.writeByte(id);
		this.writeByte(subId);
	}

	/**
	 * 回收bytes对象
	 * @param byte
	 */
	static recycleByte(byte: GameByteArray): void {
		ObjectPool.push(byte);
	}

	/**
	 * 从对象池获取一个bytes对象
	 */
	static getBytes(): GameByteArray {
		let pack: GameByteArray = ObjectPool.get(GameByteArray);
		pack.clear();

		pack.writeShort(GameSocket.DEFAULT_TAG);
		pack.writeShort(0);//dataLength
		pack.writeShort(0);//data crc
		pack.writeShort(0);//head crc
		/*
		pack.writeShort(this.pid);
		this.pid++;
		if (this.pid > 0xFFFF)
		{
			this.pid = 0;			
		}
		*/
		pack.writeInt(0);//占位
		pack.writeInt(0);//占位
		return pack;
	}
}