/*
 * @Description:冒险系统
 * @Author: guolinsen
 * @Date: 2019-08-26 17:40:15
 * @LastEditTime: 2019-08-27 20:33:45
 */
class AdventureProxy extends BaseProxy {
	public constructor() {
		super(PacketTypes.ADVENTURE);

		this.regNetMsg(1, this.doInit); //初始化数据
		this.regNetMsg(2, this.doSingleInfo); //刷新数据
	}

	private doInit(pBytes: GameByteArray) {
		let len = pBytes.readUnsignedShort();
		let cache = GameCache.adventure;
		for (let i = 0; i < len; i++) {
			let finish = pBytes.readByte();
			let prize = pBytes.readByte();
			let progress = pBytes.readShort();
			cache.updateSingle(i, finish ? true : false, prize ? true : false, progress);
		}
		cache.checkFinish();
		App.MessageCenter.dispatch(MsgConst.ADVENTURE_UPDATE_SINGLE);
	}

	private doSingleInfo(pBytes: GameByteArray) {
		let id = pBytes.readUnsignedShort();
		let finish = pBytes.readByte();
		let prize = pBytes.readByte();
		let progress = pBytes.readShort();
		let cache = GameCache.adventure;
		cache.updateSingle(id, finish ? true : false, prize ? true : false, progress, true);
		App.MessageCenter.dispatch(MsgConst.ADVENTURE_UPDATE_SINGLE);
	}

	public sendPrize(id: number, param1: number = 0, param2: number = 0) {
		let bytes = this.getBytes(2);
		bytes.writeUnsignedShort(id);
		bytes.writeUnsignedInt(param1);
		bytes.writeUnsignedInt(param2);
		this.sendToServer(bytes);
	}
}