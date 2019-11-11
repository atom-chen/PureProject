/*
 * @Description: vip
 * @Author: guolinsen
 * @Date: 2019-07-29 17:22:47
 * @LastEditTime: 2019-09-05 10:39:52
 */
class VipProxy extends BaseProxy {
	public constructor() {
		super(PacketTypes.VIP);
		this.regNetMsg(1, this.privilegeCardTime); //
		this.regNetMsg(2, this.vipWelfareData); //登录下发vip礼包数据(专属、每日)
		this.regNetMsg(3, this.vipWelfareExclusive); //返回专属礼包状态
		this.regNetMsg(4, this.vipWelfareDaily); //放回每日礼包状态
		this.regNetMsg(5, this.vipCardSt); //vip体验卡状态
	}

	/**下发vip特权卡时间 */
	public privilegeCardTime(pBytes: GameByteArray) {
		let time = pBytes.readInt();
		GameCache.vip.privilegeCardTime = time;
		App.MessageCenter.dispatch(MsgConst.VIP_CARD_TIME);
	}

	public vipWelfareData(pBytes: GameByteArray) {
		let welfareData = { dailyGet: 0, exclusiveList: [] }
		welfareData.dailyGet = pBytes.readByte();
		let count = pBytes.readByte();
		for (let i = 0; i < count; i++) {
			welfareData.exclusiveList.push(pBytes.readByte());
		}
		GameCache.vip.upWelfare(welfareData);
		App.MessageCenter.dispatch(MsgConst.VIP_WELFARE);
	}

	public vipWelfareExclusive(pBytes: GameByteArray) {
		let index = pBytes.readByte();
		let vipWelfare = GameCache.vip.vipWelfare;
		if (vipWelfare && vipWelfare.exclusiveList) {
			vipWelfare.exclusiveList[index - 1] = pBytes.readByte();
		}
		App.MessageCenter.dispatch(MsgConst.VIP_WELFARE);
	}

	public vipWelfareDaily(pBytes: GameByteArray) {
		GameCache.vip.vipWelfare.dailyGet = pBytes.readByte();
		App.MessageCenter.dispatch(MsgConst.VIP_WELFARE);
	}

	/** vip体验卡状态*/
	public vipCardSt(pBytes: GameByteArray) {
		let count = pBytes.readByte();

		for (let i = 0; i < count; i++) {
			GameCache.vip.vipCardSt[pBytes.readByte()] = pBytes.readByte();
		}

		App.MessageCenter.dispatch(MsgConst.VIP_CARD);
	}



	/**激活vip特权卡*/
	public actCard(index: number) {
		let bytes: GameByteArray = this.getBytes(1);
		bytes.writeByte(index);
		this.sendToServer(bytes);
	}

	/**领取专属礼包*/
	public actExclusive(index: number) {
		let bytes: GameByteArray = this.getBytes(2);
		bytes.writeByte(index);
		this.sendToServer(bytes);
	}

	/**领取每日礼包*/
	public actDaily(index: number) {
		let bytes: GameByteArray = this.getBytes(3);
		bytes.writeByte(index);
		this.sendToServer(bytes);
	}


}