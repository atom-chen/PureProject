/*
 * @Description: 首冲协议内容
 * @Author: liangzhaowei
 * @Date: 2019-09-02 17:15:45
 * @LastEditTime: 2019-09-04 17:44:38
 */

class FirstChargeProxy extends BaseProxy {
	public constructor() {
		super(PacketTypes.OTHER);
		this.regNetMsg(81, this.privilegeCardTime); //
		this.regNetMsg(86, this.seceondChargeState); //充值2倍状态
		this.regNetMsg(87, this.firstChargeState); //充值4倍状态
	}

	/**首冲/累充奖励 */
	public privilegeCardTime(pBytes: GameByteArray) {
		let type: number = pBytes.readByte();
		let count: number = pBytes.readByte();
		let list: number[] = [];
		for (let i = 0; i < count; i++) {
			list.push(pBytes.readByte());
		}
		GameCache.firstcharge.update(list, type)
		App.MessageCenter.dispatch(MsgConst.FIRST_CHARGE);
	}

	/**获取首冲累充奖励*/
	public getRw(index: number, day: number) {
		let bytes: GameByteArray = this.getBytes(47);
		bytes.writeByte(index);
		bytes.writeByte(day);
		this.sendToServer(bytes);
	}

	/**充值2倍状态 */
	public seceondChargeState(pBytes: GameByteArray) {
		let count: number = pBytes.readByte();
		GameCache.firstcharge.secondChargeSt = {};
		for (let i = 0; i < count; i++) {
			GameCache.firstcharge.secondChargeSt[pBytes.readUnsignedShort()] = (pBytes.readByte());
		}
		App.MessageCenter.dispatch(MsgConst.FIRST_CHARGE);
	}


	/**充值4倍状态 */
	public firstChargeState(pBytes: GameByteArray) {
		GameCache.firstcharge.firstChargeSt = pBytes.readByte();
		App.MessageCenter.dispatch(MsgConst.FIRST_CHARGE);
	}

}