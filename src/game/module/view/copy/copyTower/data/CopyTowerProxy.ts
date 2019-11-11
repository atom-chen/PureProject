/*
 * @Description: 副本爬塔协议
 * @Author: guolinsen
 * @Date: 2019-07-29 17:22:47
 * @LastEditTime: 2019-08-21 11:46:06
 */
class CopyTowerProxy extends BaseProxy {
	public constructor() {
		super(PacketTypes.COPY);
		this.regNetMsg(21, this.doTower); //【爬塔】下发爬塔数据
		this.regNetMsg(22, this.doRwResult); //【爬塔】抽奖结果返回
		this.regNetMsg(26, this.doRank); //【爬塔】下发排行榜数据
	}

	public doTower(pBytes: GameByteArray) {
		GameCache.copytower.initData(pBytes);
		App.MessageCenter.dispatch(MsgConst.CPOY_TOWER);
	}

	public doRwResult(pBytes: GameByteArray) {
		App.MessageCenter.dispatch(MsgConst.CPOY_TOWER_LUCK, pBytes.readByte());
	}

	public doRank(pBytes: GameByteArray) {
		GameCache.copytower.rankData(pBytes);
		App.MessageCenter.dispatch(MsgConst.CPOY_TOWER_RANK);
	}


	/**【爬塔】请求幸运转盘抽奖*/
	public getLuck() {
		this.sendMsgId(22);
	}

	/**【爬塔】请求领取转盘抽奖的奖励*/
	public getLuckRw() {
		this.sendMsgId(23);
	}

	/**【爬塔】请求领取每日奖励*/
	public getDailyRw() {
		this.sendMsgId(24);
	}

	/**【爬塔】请求挑战当前层的boss*/
	public gotoCopy() {
		this.sendMsgId(25);
	}


	/**【爬塔】请求排行榜数据*/
	public getRank(lenght: number) {
		let bytes: GameByteArray = this.getBytes(26);
		bytes.writeByte(lenght);
		this.sendToServer(bytes);
	}


}