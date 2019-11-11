/*
 * @Description: 日常数据集
 * @Author: liangzhaowei
 * @Date: 2019-08-14 16:16:15
 * @LastEditTime: 2019-08-15 10:54:16
 */

class DailyProxy extends BaseProxy {
	public constructor() {
		super(PacketTypes.DAILY);
		this.regNetMsg(1, this.doInit); //初始化数据
		this.regNetMsg(2, this.doRefreshPet); //刷新数据
	}


	public doInit(pBytes: GameByteArray) {
		var count: number = pBytes.readByte();
		let list = {};
		for (let i = 0; i < count; i++) {
			let item: DailyItem = new DailyItem();
			item.init(pBytes);
			list[item.id] = item;
		}
		GameCache.daily.initServer(list);
		App.MessageCenter.dispatch(MsgConst.DAILY);

	}

	public doRefreshPet(pBytes: GameByteArray) {
		GameCache.daily.upData(pBytes);
		App.MessageCenter.dispatch(MsgConst.DAILY);
	}



	/**请求单个日常任务信息*/
	public askTaskInfo(id: number) {
		let bytes: GameByteArray = this.getBytes(2);
		bytes.writeByte(id);
		this.sendToServer(bytes);
	}

	/**领取日常奖励*/
	public getTaskRw(id: number) {
		let bytes: GameByteArray = this.getBytes(3);
		bytes.writeByte(id);//任务id
		this.sendToServer(bytes);
	}



	/**领取活跃度奖励*/
	public getActRw(id: number) {
		let bytes: GameByteArray = this.getBytes(4);
		bytes.writeByte(id);//奖励索引
		this.sendToServer(bytes);
	}

}