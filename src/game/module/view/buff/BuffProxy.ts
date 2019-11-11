/*
 * @Description: BUFF
 * @Author: guolinsen
 * @Date: 2019-09-02 20:11:09
 * @LastEditTime: 2019-09-03 10:22:45
 */
class BuffProxy extends BaseProxy {
	public constructor() {
		super(PacketTypes.BUFF);

		this.regNetMsg(1, this.doAddBuff);
		this.regNetMsg(2, this.doDeleteBuff1);
		this.regNetMsg(3, this.doDeleteBuff2);
		this.regNetMsg(4, this.doUpdateBuff);
	}

	private doAddBuff(bytes: GameByteArray) {
		let recog = bytes.readDouble();
		let id = bytes.readUnsignedShort();
		let type = bytes.readUnsignedByte();
		let group = bytes.readUnsignedByte();
		let restTime = bytes.readInt();
		let name = bytes.readCustomBytes();
		let value = bytes.readNumeric(bytes.readUnsignedByte());
		let interval = bytes.readUnsignedShort();
		let icon = bytes.readUnsignedByte();
		restTime = restTime <= 0 ? restTime : (restTime * 1000 + App.TimerManager.getSyncTime());
		GameCache.buff.addBuff(recog, id, type, group, restTime, name, value, interval, icon);
	}

	private doDeleteBuff1(bytes: GameByteArray) {
		let recog = bytes.readDouble();
		let type = bytes.readUnsignedByte();
		let group = bytes.readUnsignedByte();
		GameCache.buff.delteBuff1(recog, type, group);
	}

	private doDeleteBuff2(bytes: GameByteArray) {
		let recog = bytes.readDouble();
		let id = bytes.readUnsignedByte();
		GameCache.buff.delteBuff2(recog, id);
	}

	private doUpdateBuff(bytes: GameByteArray) {
		let recog = bytes.readDouble();
		let id = bytes.readUnsignedByte();
		let value = bytes.readUnsignedInt();
	}

}