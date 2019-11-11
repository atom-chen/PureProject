/*
 * @Description: 扭蛋协议内容
 * @Author: liangzhaowei
 * @Date: 2019-10-08 14:04:38
 */



class GashaponProxy extends BaseProxy {
	public constructor() {
		super(PacketTypes.GASHAPON);
		this.regNetMsg(1, this.doBag); //仓库
		this.regNetMsg(2, this.doAddBag); //仓库
		this.regNetMsg(3, this.doRemoveBag); //仓库
		this.regNetMsg(4, this.doShow); //展示获得物品
		this.regNetMsg(5, this.doStack); //堆叠物品
	}


	public doBag(pBytes: GameByteArray) {
		let type = pBytes.readByte()
		let count = pBytes.readUnsignedShort()
		for (let i = 0; i < count; i++) {
			let item: UserItem = new UserItem(pBytes);
			GameCache.gashapon.addBagItems(type, item);
		}
		//派送更新界面信息
		App.MessageCenter.dispatch(MsgConst.GASHAPON_BAG);
	}

	public doAddBag(pBytes: GameByteArray) {
		let type = pBytes.readByte()
		let item: UserItem = new UserItem(pBytes);
		GameCache.gashapon.addBagItems(type, item);
		//派送更新界面信息
		App.MessageCenter.dispatch(MsgConst.GASHAPON_BAG);
	}

	public doStack(pBytes: GameByteArray) {
		let type = pBytes.readByte()
		let item: UserItem = new UserItem(pBytes);
		GameCache.gashapon.addBagItems(type, item);
		//派送更新界面信息
		App.MessageCenter.dispatch(MsgConst.GASHAPON_BAG);
	}

	public doRemoveBag(pBytes: GameByteArray) {
		let type = pBytes.readByte()
		let count = pBytes.readShort();
		for (let i = 0; i < count; i++) {
			let sceId = new ItemSeries(pBytes).toString();
			GameCache.gashapon.removeBagItems(type, sceId);
		}
		//派送更新界面信息
		App.MessageCenter.dispatch(MsgConst.GASHAPON_BAG);
	}

	public doShow(pBytes: GameByteArray) {
		let type = pBytes.readByte()
		let count = pBytes.readByte()
		let list = [];
		for (let i = 0; i < count; i++) {
			let item: UseCondition = new UseCondition();
			item.id = pBytes.readInt();
			item.count = pBytes.readUnsignedShort();
			list.push(item);
		}

		if (list.length > 1) {
			/**打开十连 */
			if (type) {
				let viewData = new ViewProp();
				viewData.exData1 = type;
				viewData.exData2 = list;
				App.ViewManager.open(ViewConst.GASHAPONRW, viewData);
			}
			App.MessageCenter.dispatch(MsgConst.GASHAPON_TEN_GET, list);
		}
		else {
			App.MessageCenter.dispatch(MsgConst.GASHAPON_ONE_GET, list[0]);

		}

	}




	/**请求扭蛋(连抽)*/
	public askGashapon(time: number, type: number) {
		let bytes: GameByteArray = this.getBytes(1);
		bytes.writeByte(type);
		bytes.writeByte(time);
		this.sendToServer(bytes);
	}

	/**一键领取扭蛋仓库*/
	public getAllRw(type: number) {
		let bytes: GameByteArray = this.getBytes(2);
		bytes.writeInt(type);
		this.sendToServer(bytes);
	}

	/**请求扭蛋仓库*/
	public getBag(type: number) {
		let bytes: GameByteArray = this.getBytes(3);
		bytes.writeInt(type);
		this.sendToServer(bytes);
	}



}