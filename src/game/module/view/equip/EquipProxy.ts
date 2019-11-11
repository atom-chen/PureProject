/**
 * effect: 装备协议内容
 * author :lzw
 * data :2019.6.20
 */
class EquipProxy extends BaseProxy {
	public constructor() {
		super(PacketTypes.EQUIP);



		// static public const EQUIP_WEAR_EQUIP:int = 1;     //穿上一件装备 需要客户端从背包读数据的
		// static public const EQUIP_DROP_EQUIP:int = 2;     //脱下一件装备
		// static public const EQUIP_INIT_EQUIP:int = 3;     //初始化人物装备
		// static public const EQUIP_DURA_CHANGE:int = 4;    //装备耐久度发生变化
		// static public const EQUIP_QUERY_OTHERS_EQUIP:int = 5;//返回其他玩家装备列表
		// static public const EQUIP_DELETE_EQUIP:int = 6;    //删除一件身上的装备
		// static public const EQUIP_CHECK_RANK_EQUIP:int = 7;    //排行榜查看别人的装备返回
		// static public const EQUIP_SPECIAL_EQUIP :int = 8;     //特殊的装备
		// static public const EQUIP_CHECK_RANK_HERO_EQUIP: int = 9;	//排行榜查看英雄的装备返回
		// static public const EQUIP_INSURE_TIP: int = 10;	//装备投保触发
		// static public const EQUIP_WEAR_EQUIP2: int = 11;	//穿上一件装备 服务端直接发装备全数据
		// static public const Equip_Can_Upgrade_Id_Back: int = 19;//可升级物品返回

		this.regNetMsg(3, this.doInitPlayerEquip); //初始化装备返回
		this.regNetMsg(1, this.doWearEquip); //穿上装备 需要客户端从背包读数据的
		this.regNetMsg(11, this.doWearEquip2); //穿上装备 服务端直接发装备全数据
		this.regNetMsg(2, this.doDropEquip); //脱下装备
		this.regNetMsg(4, this.doEquipDuraChange); //装备耐久度变化
		this.regNetMsg(5, this.doOthersEquips); //查看其他玩家装备
		this.regNetMsg(6, this.doDeleteEquips); //删除身上的装备
		this.regNetMsg(7, this.doRankCheckEquipBack); //排行榜查看别人的装备
		this.regNetMsg(8, this.doSpecialEquipBack); //一些特殊的装备
		this.regNetMsg(9, this.doRankHeroEquipBack); //排行榜英雄装备
		this.regNetMsg(16, this.doStrengthInfo);   //强化装备信息
		this.regNetMsg(30, this.doRefineInfo);
		this.regNetMsg(31, this.doQuickEquip); 	//一键穿戴返回
	}

	/**
		 * 装备子系统消息分发处理 
		 * @param pBytes
		 * 
		 */
	public doServerMessage(bytes: GameByteArray): void {
		// var cmdId: number = bytes.readByte();
		// switch (cmdId) {
		// 	case ServerPacketTypes.EQUIP_INIT_EQUIP:   //初始化装备返回
		// 		doInitPlayerEquip(bytes);
		// 		break;
		// 	case ServerPacketTypes.EQUIP_WEAR_EQUIP:  //穿上装备 需要客户端从背包读数据的
		// 		doWearEquip(bytes);
		// 		break;
		// 	case ServerPacketTypes.EQUIP_WEAR_EQUIP2:  //穿上装备 服务端直接发装备全数据
		// 		doWearEquip2(bytes);
		// 		break;
		// 	case ServerPacketTypes.EQUIP_DROP_EQUIP:  //脱下装备
		// 		doDropEquip(bytes);
		// 		break;
		// 	case ServerPacketTypes.EQUIP_DURA_CHANGE:  //装备耐久度变化
		// 		doEquipDuraChange(bytes);
		// 		break;
		// 	case ServerPacketTypes.EQUIP_QUERY_OTHERS_EQUIP://查看其他玩家装备
		// 		doOthersEquips(bytes);
		// 		break;
		// 	case ServerPacketTypes.EQUIP_DELETE_EQUIP://删除身上的装备
		// 		doDeleteEquips(bytes);
		// 		break;
		// 	case ServerPacketTypes.EQUIP_CHECK_RANK_EQUIP://排行榜查看别人的装备
		// 		doRankCheckEquipBack(bytes);
		// 		break;
		// 	case ServerPacketTypes.EQUIP_SPECIAL_EQUIP://一些特殊的装备
		// 		doSpecialEquipBack(bytes);
		// 		break;
		// 	case ServerPacketTypes.EQUIP_CHECK_RANK_HERO_EQUIP:	//排行榜英雄装备
		// 		doRankHeroEquipBack(bytes);
		// 		break;
		// 	case ServerPacketTypes.EQUIP_INSURE_TIP:   //装备投保触发
		// 		setTimeout(doEquipInsure, 5000, bytes);
		// 		break;
		// }
	}

	/**
	 * 初始化装备返回
	 * @param pBytes
	 * 
	 */
	private doInitPlayerEquip(pBytes: GameByteArray): void {
		var id: number = GameCache.hero.transIdFromeServer(pBytes.readUnsignedInt());    //角色id
		var count: number = pBytes.readByte();    //装备个数
		var equipItems = []//装备列表
		for (var i = 0; i < count; i++) {
			var pos = pBytes.readByte();   //装备的位置
			var item: UserItem = new UserItem(pBytes);
			item.sourceType = ItemSourceType.ROLEEQUIP;
			equipItems[pos] = item;
		}
		GameCache.equip.initEqList(id, equipItems);
	}

	/**
	 * 穿上装备返回
	 * @param pBytes
	 * 
	 */
	private doWearEquip(pBytes: GameByteArray): void {
		var id: number = GameCache.hero.transIdFromeServer(pBytes.readUnsignedInt());    //角色id
		var equipSeries: ItemSeries = new ItemSeries(pBytes);
		var itemId: number = pBytes.readUnsignedShort();   //物品id
		// var location: number = pBytes.readUnsignedByte();   //装备的位置
		GameCache.equip.wearEq(id, equipSeries);
		App.MessageCenter.dispatch(MsgConst.EQUIP_INFO);
	}

	/**
	 * 穿上装备返回
	 * @param pBytes
	 * 
	 */
	private doWearEquip2(pBytes: GameByteArray): void {
		var item: UserItem = new UserItem(pBytes);
		item.sourceType = ItemSourceType.ROLEEQUIP;
		App.MessageCenter.dispatch(MsgConst.EQUIP_INFO);

	}

	/**
	 * 卸下装备返回
	 * @param pBytes
	 * 
	 */
	private doDropEquip(pBytes: GameByteArray): void {
		var id: number = GameCache.hero.transIdFromeServer(pBytes.readUnsignedInt());    //角色id
		var equipSeries: ItemSeries = new ItemSeries(pBytes);
		GameCache.equip.dropEquip(id, equipSeries);
		App.MessageCenter.dispatch(MsgConst.EQUIP_INFO);
	}
	/**
	 * 删除一个装备
	 * @param pBytes
	 * 
	 */
	private doDeleteEquips(pBytes: GameByteArray): void {
		var equipSeries: ItemSeries = new ItemSeries(pBytes);
		// GlobalData.itemDataMgr.dropEquip(equipSeries);
	}
	/**
	 * 耐久度改变
	 * @param pBytes
	 * 
	 */
	private doEquipDuraChange(pBytes: GameByteArray): void {
		var equipSeries: ItemSeries = new ItemSeries(pBytes);
		var newDura: number = pBytes.readUnsignedInt();
		// GlobalData.itemDataMgr.equipDuraChange(equipSeries, newDura);
	}

	/**
	 * 排行榜查看别人装备返回
	 * @param pBytes
	 * 
	 */
	private doRankCheckEquipBack(pBytes: GameByteArray): void {
		// var player: RankPlayerEquipInfo = new RankPlayerEquipInfo();
		// player.initData(pBytes);
		// var infoType:number = pBytes.readByte();    //信息类型  0 排行榜窗口消息   1 独立窗口消息
		// if (infoType == 0)
		// 	DataEventDispatcher.dispatchEvent(new RankEvent(RankEvent.CHECK_EQUIP_BACK, player));
		// else {
		// 	//PropertyOtherWin.getInstance().show(player);
		// 	var statueWin: PropertyStatueWin = GameNavigator.toggleWin(GameNavigateType.WIN_PropertyStatueWin) as PropertyStatueWin;
		// 	statueWin.setData(player);
		// }
	}

	/**
	 * 装备强化信息
	 */
	private doStrengthInfo(bytes: GameByteArray): void {
		let roleId = GameCache.hero.transIdFromeServer(bytes.readUnsignedInt()) + "";
		let lvlArr = [];
		for (let i = 0; i < 10; i++) {
			let lvl = bytes.readUnsignedShort();
			lvlArr.push(lvl);
		}
		GameCache.equip.roleStrengthList[roleId] = lvlArr.concat();
		App.MessageCenter.dispatch(MsgConst.EQUIP_STRENGTH);
	}




	/**
	 * 精炼信息返回
	 */
	private doRefineInfo(bytes: GameByteArray): void {
		let roleid = GameCache.hero.transIdFromeServer(bytes.readUnsignedInt());
		let len = bytes.readByte();
		let lvlArr = [];
		for (let i = 0; i < len; i++) {
			let lvl = bytes.readUnsignedShort();
			lvlArr.push(lvl);
		}
		GameCache.equip.roleRefineList[roleid] = lvlArr.concat();
		App.MessageCenter.dispatch(MsgConst.EQUIP_REFINE);
	}

	/**
	 * 一键穿戴返回
	 */
	private doQuickEquip(bytes: GameByteArray): void {
		let roleid = GameCache.hero.transIdFromeServer(bytes.readInt());
		GameCache.bag.reFreshRecyle();
	}




	/**
	 * 发送查询玩家装备
	 * 
	 */
	public sendQueryMyEquip(): void {
		this.sendMsgId(4);
	}

	/**
	 * 发送穿上装备
	 * @param hand    持有的位置(双持装备才有效)   0为左  1为右   2为由服务器选择
	 * @param hero    主角色为0 其它玩家和角色就另外获取
	 */
	public sendWearEquip(itemSeries: ItemSeries, hand: number = 2, hero: number = 0): void {
		var bytes: GameByteArray = this.getBytes(1);
		bytes.writeInt(hero);
		itemSeries.writeToBytes(bytes);
		bytes.writeByte(hand);
		this.sendToServer(bytes);
	}

	/**
	 * 发送卸下装备(ItemSeries)
	 * @param hero    主角色为0 其它玩家和角色就另外获取
	 * 
	 */
	public sendDropEquipByItemSeries(itemSeries: ItemSeries, hero: number = 0): void {
		var bytes: GameByteArray = this.getBytes(2);
		bytes.writeInt(hero);
		itemSeries.writeToBytes(bytes);
		this.sendToServer(bytes);
	}


	/**
	 * 发送卸下装备(nPos)
	 * 
	 */
	public sendDropEquipByPos(nPos: number): void {
		var bytes: GameByteArray = this.getBytes(3);
		// bytes.writeCmd(PacketTypes.EUIP, ClientPacketTypes.EQUIP_DROP_EQUIP_POS);
		bytes.writeByte(nPos);
		this.sendToServer(bytes);
		//			trace("Send Cmd: Drop a Equip By pos");
	}
	/**
	 * 发送查看其他玩家装备消息
	 * @param roleName
	 * 
	 */
	public sendQueryOthersEquips(roleName: string): void {
		var bytes: GameByteArray = this.getBytes(1);
		// bytes.writeCmd(PacketTypes.EUIP, ClientPacketTypes.EQUIP_QUERY_OTHERS_EQUIP);
		bytes.writeString(roleName);
		this.sendToServer(bytes);
		//			trace("Send Cmd: Check Other Player Equip");
	}
	/**
	 * 发送隐藏时装消息
	 * 
	 */
	public sendHideSuitEquips(type: number = 0): void {
		var bytes: GameByteArray = this.getBytes(1);
		// bytes.writeCmd(PacketTypes.EUIP, ClientPacketTypes.EQUIP_HIDE_SUIT);
		bytes.writeByte(type);
		this.sendToServer(bytes);
		//			trace("Send Cmd: Hide suit");
	}


	/**
	 * 排行榜查看别人装备信息
	 * 
	 */
	public sendRankCheckEquips(roleName: string, roleId: number = 0): void {
		var bytes: GameByteArray = this.getBytes(1);
		// bytes.writeCmd(PacketTypes.EUIP, ClientPacketTypes.EQUIP_CHECK_RANK_EQUIP);
		bytes.writeString(roleName);
		bytes.writeUnsignedInt(roleId);
		this.sendToServer(bytes);
		//			trace("Send Cmd: Rank Check Other Player Equip");
	}

	/**
	 * 排行榜查看别人英雄的装备 
	 * 
	 */
	public sendRankCheckHeroEquips(roleId: number, heroId: number): void {
		var bytes: GameByteArray = this.getBytes(1);
		// bytes.writeCmd(PacketTypes.EUIP, ClientPacketTypes.EQUIP_CHECK_RANK_HERO_EQUIP);
		bytes.writeUnsignedInt(roleId);
		bytes.writeByte(heroId);
		this.sendToServer(bytes);
	}

	/**
	 * 对装备进行投保
	 * 
	 */
	public sendInsureEquip(guid: ItemSeries, count: number): void {
		var bytes: GameByteArray = this.getBytes(1);
		// bytes.writeCmd(PacketTypes.EUIP, ClientPacketTypes.EQUIP_INSURE);
		guid.writeToBytes(bytes);
		bytes.writeByte(count);
		this.sendToServer(bytes);
	}

	/**
	 * 处理其他玩家装备列表
	 * @param bytes
	 * 
	 */
	private doOthersEquips(bytes: GameByteArray): void {
		//			var opWin:OtherPropertyWin = GameNavigator.showWin(GameNavigateType.WIN_Role) as OtherPropertyWin;
		//			opWin.clear();
		//			opWin.actorName = bytes.readCustomBytes();
		//			opWin.job = bytes.readUnsignedByte();
		//			opWin.level = bytes.readUnsignedByte();
		//			opWin.sex = bytes.readUnsignedByte();
		//			bytes.readUnsignedInt();
		//			opWin.weapon = bytes.readUnsignedInt();
		//			
		//			//坐骑
		//			bytes.readUnsignedInt();
		//			
		//			var numEquips:int = bytes.readUnsignedByte();
		//			for(var i:int = 0; i < numEquips; i++)
		//			{
		//				opWin.putOnEquip(new UserItem(bytes));
		//			}
		//			
		//			opWin.readAttrs(bytes);
		//			opWin.battlePower = bytes.readUnsignedInt();
		//			//刷新内观
		//			opWin.updateBodyShape();

		// var player: RankPlayerEquipInfo = new RankPlayerEquipInfo(bytes);


		// PropertyOtherWin.getInstance().show(player, true);
	}

	private doSpecialEquipBack(bytes: GameByteArray): void {
		//  GlobalData.specialEquipMgr.setSpecialEquipData(bytes);

	}

	/**
	 * 排行榜英雄装备返回 
	 * @param bytes
	 * 
	 */
	private doRankHeroEquipBack(bytes: GameByteArray): void {
		// var hero: HeroInfo = new HeroInfo();
		// hero.rankHero(bytes);
		// var type: number = bytes.readByte();
		// //排行榜
		// if(type == 0) {
		// 	DataEventDispatcher.dispatchEvent(new RankEvent(RankEvent.CHECK_HERO_EQUIP_BACK, hero));
		// }
	}

	/**
	 * 投保触发 
	 * @param bytes
	 * 
	 */
	private doEquipInsure(bytes: GameByteArray): void {
		var item: UserItem = new UserItem(bytes);
		var money: number = bytes.readUnsignedShort();
		// var txt: String = LangManager.Lang.property[18].replace("$value$", item.stdItem.name).replace("$money$", money);
		// var box: MsgRichBox = MsgRichBox.show(txt, [LangManager.Lang.property[29], LangManager.Lang.Common_Cancel],
		// 	insureCallBack, LangManager.Lang.property[28], false, false, true, GlobalData.gameWidth - 270, GlobalData.gameHeight - 200);
		// box.userData = item;

	}

	/**
	 * 强化装备
	 */
	public sendEquipStrength(role): void {
		let roleId = GameCache.hero.getServerIdByIndex(role);
		let bytes: GameByteArray = this.getBytes(16);
		bytes.writeInt(roleId);
		this.sendToServer(bytes);
		// this.sendMsgId(16);
	}

	/**
	 * 精炼装备
	 */
	public sendRefine(role, part): void {
		let bytes: GameByteArray = this.getBytes(32);
		let roleId = GameCache.hero.getServerIdByIndex(role);
		bytes.writeInt(roleId);
		bytes.writeShort(part);
		this.sendToServer(bytes);
	}

	/**
	 * 一键穿戴装备
	 */
	public sendQuickEquip(roleid, itemArr: UserItem[]): void {
		let bytes: GameByteArray = this.getBytes(33);
		bytes.writeInt(roleid);
		bytes.writeByte(itemArr.length);
		for (let i = 0; i < itemArr.length; i++) {
			itemArr[i].series.writeToBytes(bytes);
		}
		this.sendToServer(bytes);
	}
}