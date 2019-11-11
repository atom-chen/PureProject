/*
 * @Description: 排行榜协议内容
 * @Author: liangzhaowei
 * @Date: 2019-09-25 11:29:40
 */


class RankProxy extends BaseProxy {
	public constructor() {
		super(PacketTypes.Default);

		this.regNetMsg(65, this.doInit); //排行榜数据
		this.regNetMsg(67, this.doOtherPlayer); //其它玩家数据
	}


	public doInit(pBytes: GameByteArray) {


		let sigleRank = { type: 0, myRank: 0, myValue: 0, firstRoleList: [], rankList: [] };
		sigleRank.type = pBytes.readByte();
		sigleRank.myRank = pBytes.readInt();
		sigleRank.myValue = pBytes.readUnsignedInt();

		/**第一名角色列表 */
		let roleCount = pBytes.readByte();
		for (let i = 0; i < roleCount; i++) {
			let propSet: PropertySet = new PropertySet();
			propSet.kind = ThingKind.Human;
			let id = pBytes.readInt();
			let job = pBytes.readByte()
			let bodyId = pBytes.readUnsignedInt();
			propSet.pro(PropId.AP_JOB, job);
			propSet.pro(PropId.AP_BODY_ID, bodyId);
			propSet.pro(PropId.AP_SEX, pBytes.readByte());
			propSet.pro(PropId.AP_WEAPON, pBytes.readUnsignedInt());
			propSet.pro(PropId.AP_MOUNT, pBytes.readUnsignedInt());
			propSet.pro(PropId.AP_SWING, pBytes.readUnsignedInt());
			propSet.pro(PropId.AP_HAIR, pBytes.readUnsignedInt());
			propSet.pro(PropId.AP_HAT, pBytes.readUnsignedInt());
			propSet.pro(PropId.AP_EYE, pBytes.readUnsignedInt());
			propSet.pro(PropId.AP_GLASSES, pBytes.readUnsignedInt());
			propSet.pro(PropId.AP_PANTS, pBytes.readUnsignedInt());
			propSet.pro(PropId.AP_ASSIST, pBytes.readUnsignedInt());
			propSet.pro(PropId.AP_BACK, pBytes.readUnsignedInt());
			sigleRank.firstRoleList.push(propSet);
		}

		/**排行榜单个玩家数据集 */
		let rankCount = pBytes.readByte();
		for (let i = 0; i < rankCount; i++) {
			let rankData = new RankItemData();
			rankData.init(pBytes);
			/**加入排行榜类型 */
			rankData.rankType = sigleRank.type;
			sigleRank.rankList.push(rankData)
		}
		GameCache.rank.initData(sigleRank.type, sigleRank);
		App.MessageCenter.dispatch(MsgConst.RANK_INFO, sigleRank.type);

	}


	public doOtherPlayer(pBytes: GameByteArray) {
		let otherData: any = {};
		otherData.name = pBytes.readCustomBytes();
		otherData.lv = pBytes.readInt();
		otherData.title = pBytes.readInt();//头衔
		otherData.vip = pBytes.readByte();//
		otherData.badgeLv = pBytes.readByte();//徽章
		otherData.unionNe = pBytes.readCustomBytes();//行会职位
		otherData.unionJob = pBytes.readByte();//行会职位
		otherData.roleList = [];

		/**玩家中的角色 */
		let roleCount = pBytes.readByte();
		for (let i = 0; i < roleCount; i++) {
			let roleData: any = {};
			roleData.id = pBytes.readInt();
			roleData.power = pBytes.readInt();
			roleData.job = pBytes.readByte();
			roleData.bodyId = pBytes.readUnsignedInt();
			roleData.sex = pBytes.readByte();


			/**模型数据 */
			let propSet: PropertySet = new PropertySet();
			propSet.kind = ThingKind.Human;
			// propSet.pro(PropId.AP_ACTOR_ID, id);
			propSet.pro(PropId.AP_JOB, roleData.job);
			propSet.pro(PropId.AP_BODY_ID, roleData.bodyId);
			propSet.pro(PropId.AP_SEX, roleData.sex);

			propSet.pro(PropId.AP_WEAPON, pBytes.readUnsignedInt());
			propSet.pro(PropId.AP_MOUNT, pBytes.readUnsignedInt());
			propSet.pro(PropId.AP_SWING, pBytes.readUnsignedInt());
			propSet.pro(PropId.AP_HAIR, pBytes.readUnsignedInt());
			propSet.pro(PropId.AP_HAT, pBytes.readUnsignedInt());
			propSet.pro(PropId.AP_EYE, pBytes.readUnsignedInt());
			propSet.pro(PropId.AP_GLASSES, pBytes.readUnsignedInt());
			propSet.pro(PropId.AP_PANTS, pBytes.readUnsignedInt());
			propSet.pro(PropId.AP_ASSIST, pBytes.readUnsignedInt());
			propSet.pro(PropId.AP_BACK, pBytes.readUnsignedInt());


			roleData.propSet = propSet

			/**装备数据 */
			roleData.qe = [];
			let eqCount = pBytes.readByte();
			for (let i = 0; i < eqCount; i++) {
				let usItem = new UserItem(pBytes);
				usItem.sourceType = ItemSourceType.OTHER_ROLEEQUIP;
				roleData.qe.push(usItem);
			}

			/**装备槽强化信息 */
			roleData.strent = [];
			let strentCount = pBytes.readByte();
			for (let i = 0; i < strentCount; i++) {
				roleData.strent.push(pBytes.readUnsignedShort());
			}



			/**记录角色数据 */
			otherData.roleList.push(roleData);
		}

		GameCache.rank.otherRoleData = otherData;
		App.ViewManager.open(ViewConst.OTHERROLE);
	}


	/**请求排行榜信息*/
	public askRank(type: number) {
		let bytes: GameByteArray = this.getBytes(10);
		bytes.writeByte(type);
		this.sendToServer(bytes);
	}

	/**请求查看玩家信息*/
	public askRoleInfo(id: number) {
		let bytes: GameByteArray = this.getBytes(11);
		bytes.writeUnsignedInt(id);
		this.sendToServer(bytes);
	}


}