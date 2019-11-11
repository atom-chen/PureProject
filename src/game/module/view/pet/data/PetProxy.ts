/*
 * @Description: 宠物
 * @Author: guolinsen
 * @Date: 2019-07-29 17:22:47
 * @LastEditTime: 2019-10-17 20:06:00
 */
class PetProxy extends BaseProxy {
	public constructor() {
		super(PacketTypes.PET);
		this.regNetMsg(1, this.doInitPet); //返回拥有的宠物信息列表
		this.regNetMsg(2, this.doRefreshPet); //更新一个宠物的全部信息
	}

	public doInitPet(pBytes: GameByteArray) {
		var count: number = pBytes.readByte();
		let petArray = {};
		for (let i = 0; i < count; i++) {
			let item: PetItem = new PetItem();
			item.init(pBytes);
			petArray[item.wid] = item;
		}
		GameCache.pet.initData(petArray);
		App.MessageCenter.dispatch(MsgConst.PET_INFO);
	}

	public doRefreshPet(pBytes: GameByteArray) {
		let originLength = Object.keys(GameCache.pet.petArray);
		GameCache.pet.upData(pBytes);
		if (originLength < Object.keys(GameCache.pet.petArray)) {
			App.MessageCenter.dispatch(MsgConst.PET_ACTIVATE);
		}
		else {
			App.MessageCenter.dispatch(MsgConst.PET_INFO);
		}
	}


	/**激活宠物*/
	public actPet(id: number) {
		let bytes: GameByteArray = this.getBytes(2);
		bytes.writeUnsignedShort(id);
		this.sendToServer(bytes);
	}

	/**切换状态*/
	public changeState(id: number, state: number) {
		let bytes: GameByteArray = this.getBytes(3);
		bytes.writeUnsignedShort(id);
		bytes.writeByte(state);
		this.sendToServer(bytes);
	}

	/**升星*/
	public upStar(id: number) {
		let bytes: GameByteArray = this.getBytes(4);
		bytes.writeUnsignedShort(id);
		this.sendToServer(bytes);
	}


	/**升级*/
	public upLevel(petId: number, itemNum: number, itemId) {
		let bytes: GameByteArray = this.getBytes(5);
		bytes.writeUnsignedShort(petId);
		bytes.writeUnsignedShort(itemNum);
		bytes.writeInt(itemId);
		this.sendToServer(bytes);
	}

}