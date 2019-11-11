/**
 * effect: 套装协议
 * author :lzw
 * data :2019.7.25
 */
class SuitProxy extends BaseProxy {
	public constructor() {
		super(PacketTypes.EQUIP);

		this.regNetMsg(26, this.doSuitResolve); //套装分解结果
		this.regNetMsg(27, this.doSuitChange); //套装兑换结果
		this.regNetMsg(28, this.doSuitInfo); //玩家套装等级
		this.regNetMsg(29, this.doSuitInfoOnce); //玩家套装等级(单次下发)
	}


	public doSuitResolve(pBytes: GameByteArray) {
		var res: Boolean = pBytes.readBoolean();
		if (res) {
			App.MessageCenter.dispatch(MsgConst.SUIT_RESOLVE);
		}
		else {
			var errorId: number = pBytes.readInt();
			if (errorId && GameConfig.errotips[errorId]) {
				GlobalFun.SysMsg(GameConfig.errotips[errorId].dec);
			}
		}
	}

	public doSuitChange(pBytes: GameByteArray) {
		var res: Boolean = pBytes.readBoolean();
		if (res) {
			App.MessageCenter.dispatch(MsgConst.SUIT_CHANGE);
		}
		else {
			var errorId: number = pBytes.readInt();
			if (errorId && GameConfig.errotips[errorId]) {
				GlobalFun.SysMsg(GameConfig.errotips[errorId].dec);
			}
		}
	}

	public doSuitInfo(pBytes: GameByteArray) {
		var id: number = GameCache.hero.transIdFromeServer(pBytes.readUnsignedInt());    //角色id
		var fight: number = pBytes.readInt();//战力
		let count: number = pBytes.readInt();    //套装等级列表
		let lvList = [];
		for (let i: number = 0; i < count; i++) {
			lvList.push(pBytes.readInt());
		}
		GameCache.suit.initStList(id, fight, lvList);
		App.MessageCenter.dispatch(MsgConst.SUIT_INFO);
	}

	public doSuitInfoOnce(pBytes: GameByteArray) {
		var id: number = GameCache.hero.transIdFromeServer(pBytes.readUnsignedInt());    //角色id
		var fight: number = pBytes.readInt();//战力
		var lv: number = pBytes.readInt();//等级
		GameCache.suit.upStList(id, fight, lv);
		App.MessageCenter.dispatch(MsgConst.SUIT_INFO);
	}

	/**套装分解*/
	public sendSuitResolve(id: number, itemId: number, itemNum: number) {
		let bytes: GameByteArray = this.getBytes(28);
		bytes.writeUnsignedInt(id);
		bytes.writeInt(itemId);
		bytes.writeInt(itemNum);
		this.sendToServer(bytes);
	}

	/**套装兑换*/
	public sendSuitChange(id: number, itemId: number, itemNum: number) {
		let bytes: GameByteArray = this.getBytes(29);
		bytes.writeUnsignedInt(id);
		bytes.writeInt(itemId);
		bytes.writeInt(itemNum);
		this.sendToServer(bytes);
	}


	/**套装等级获取*/
	public sendSuitGetLv(id: number, lv: number) {
		let bytes: GameByteArray = this.getBytes(30);
		bytes.writeUnsignedInt(id);
		bytes.writeInt(lv);
		this.sendToServer(bytes);
	}


	/**套装一键分解*/
	public sendSuitAllResolve(id: number, itemList: StdItem[]) {
		let bytes: GameByteArray = this.getBytes(31);
		bytes.writeUnsignedInt(id);
		bytes.writeUnsignedInt(itemList.length);
		for (let i = 0; i < itemList.length; i++) {
			bytes.writeInt(itemList[i].id);
		}
		this.sendToServer(bytes);
	}

}