/*
 * @Description: 转职协议
 * @Author: liangzhaowei
 * @Date: 2019-10-28 17:37:37
 */

class TransferProxy extends BaseProxy {
	public constructor() {
		super(PacketTypes.TRANSFER);

		this.regNetMsg(1, this.doInit); //下发转职数据
		this.regNetMsg(2, this.doRetrunRes); //返回转职结果
		this.regNetMsg(3, this.doRetrunExp); //返回使用转职经验道具结果
	}


	public doInit(pBytes: GameByteArray) {
		let transferData = new TransferItem();
		transferData.init(pBytes);
		GameCache.transfer.initData(transferData);
		App.MessageCenter.dispatch(MsgConst.TRANSFER_INFO);
	}

	public doRetrunRes(pBytes: GameByteArray) {
		let roid = GameCache.hero.transIdFromeServer(pBytes.readInt());
		let num = pBytes.readUnsignedShort();
		let lv = pBytes.readUnsignedShort();
		let exp = pBytes.readUnsignedInt();
		GameCache.transfer.upTrunLv(roid, num, lv, exp);
		App.MessageCenter.dispatch(MsgConst.TRANSFER_INFO);
	}

	public doRetrunExp(pBytes: GameByteArray) {
		let roid = GameCache.hero.transIdFromeServer(pBytes.readInt());
		let exp = pBytes.readUnsignedInt();
		let itemIndex = pBytes.readByte();
		let time = pBytes.readByte();
		GameCache.transfer.upItemInfo(roid, exp, itemIndex, time);
		App.MessageCenter.dispatch(MsgConst.TRANSFER_INFO);
	}

	/**请求转职*/
	public sendSuitResolve(id: number) {
		let bytes: GameByteArray = this.getBytes(1);
		bytes.writeInt(id);
		this.sendToServer(bytes);
	}

	/**使转职经验道具*/
	public sendSuitChange(id: number, itemId: number) {
		let bytes: GameByteArray = this.getBytes(2);
		bytes.writeInt(id);
		bytes.writeByte(itemId);
		this.sendToServer(bytes);
	}



}