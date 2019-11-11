class FamilyProxy extends BaseProxy {
	public constructor() {
		super(PacketTypes.FAMILY);
		this.regNetMsg(1, this.updateFamilyInfo);
		this.regNetMsg(2, this.updateFamilyMemInfo);
		this.regNetMsg(3, this.updateFamilyList);
		this.regNetMsg(6, this.dismissFamilyRes);
		this.regNetMsg(11, this.updateApplyList);
		this.regNetMsg(13, this.kickMemberRes);
		this.regNetMsg(18, this.setLimitRes);
		this.regNetMsg(20, this.onFamilyInfoNew);
		this.regNetMsg(21, this.onFamilyListNew);
		this.regNetMsg(22, this.onFamilyApplyNew);
		this.regNetMsg(23, this.quitFamilyRes);
	}

	/**
	 * 请求家族信息
	 * @returns void
	 */
	public familyInfoReq(): void {
		this.sendMsgId(1);
	}

	/**
	 * 更新家族信息
	 * @param  {GameByteArray} bytes
	 * @returns void
	 */
	public updateFamilyInfo(bytes: GameByteArray): void {
		// 1 无家族 0 有家族	
		let isInFamily = bytes.readUnsignedByte();
		GameCache.family.isInFamily = isInFamily === 0;
		if (isInFamily === 1) {
			GameCache.family.fInfo = null;
			return;
		}
		let fInfo = {} as FamilyInfo;
		fInfo.position = bytes.readUnsignedByte();
		fInfo.fName = bytes.readCustomBytes();
		fInfo.fLv = bytes.readUnsignedByte();
		fInfo.lId = bytes.readInt();
		fInfo.lName = bytes.readCustomBytes();
		fInfo.notice = bytes.readCustomBytes();
		fInfo.memNum = bytes.readInt();
		fInfo.fund = bytes.readInt();
		fInfo.fScore = bytes.readInt();
		fInfo.devote = bytes.readInt();
		fInfo.devoteTotal = bytes.readInt();
		// 更新家族信息
		GameCache.family.fInfo = fInfo;
		GameCache.family.isAuto = bytes.readUnsignedByte() === 1;
		GameCache.family.limitId = bytes.readUnsignedByte();

		GameCache.hero.focusPlayer.title.setFamilyName(fInfo.fName);

		App.MessageCenter.dispatch(MsgConst.FAMILY_INFO_UPDATE);
	}

	/**
	 * 请求家族成员信息列表
	 * @returns void
	 */
	public familyMemInfoReq(): void {
		this.sendMsgId(2);
	}

	/**
	 * 更新成员信息
	 * @param  {GameByteArray} bytes
	 * @returns void
	 */
	public updateFamilyMemInfo(bytes: GameByteArray): void {
		let len = bytes.readInt();
		let memList = [];
		for (let i = 0; i < len; i++) {
			let memInfo = {} as FamilyMemInfo;
			memInfo.memId = bytes.readInt();
			memInfo.sex = bytes.readByte();
			memInfo.lv = bytes.readByte();
			memInfo.job = bytes.readByte();
			memInfo.position = bytes.readByte();
			memInfo.state = bytes.readByte();
			memInfo.lastLogin = GlobalFun.formatMiniDateTime(bytes.readInt());
			memInfo.memName = bytes.readCustomBytes();
			memInfo.score = bytes.readInt();
			memInfo.devote = bytes.readInt();
			memInfo.devoteTotal = bytes.readInt();
			memList.push(memInfo);
		}
		GameCache.family.mList = memList;
		App.MessageCenter.dispatch(MsgConst.FAMILY_MEM_UPDATE);
	}

	/**
	 * 请求家族列表
	 * @returns void
	 */
	public familyListReq(): void {
		this.sendMsgId(3);
	}

	/**
	 * 更新家族列表
	 * @param  {GameByteArray} bytes
	 * @returns void
	 */
	public updateFamilyList(bytes: GameByteArray): void {
		let len = bytes.readUnsignedShort();
		let fList: FamilyListInfo[] = [];
		for (let i = 0; i < len; i++) {
			let fInfo = {} as FamilyListInfo;
			fInfo.fId = bytes.readInt();
			fInfo.memNum = bytes.readInt();
			fInfo.memMax = bytes.readInt();
			fInfo.fName = bytes.readCustomBytes();
			fInfo.leadName = bytes.readCustomBytes();
			fInfo.fLv = bytes.readByte();
			fInfo.fScore = bytes.readInt();
			fInfo.limitId = bytes.readInt();
			fList.push(fInfo);
		}
		GameCache.family.fList = fList;
		App.MessageCenter.dispatch(MsgConst.FAMILY_LIST_UPDATE);
	}

	/**
	 * 请求申请列表
	 * @returns void
	 */
	public applyListReq(): void {
		this.sendMsgId(11);
	}

	/**
	 * 更新申请列表
	 * @param  {GameByteArray} bytes
	 * @returns void
	 */
	public updateApplyList(bytes: GameByteArray): void {
		let len = bytes.readInt();
		let applyList = [];
		for (let i = 0; i < len; i++) {
			let apply = {} as FamilyApplyInfo;
			apply.aid = bytes.readInt();
			apply.sex = bytes.readByte();
			apply.job = bytes.readByte();
			apply.lv = bytes.readInt();
			apply.name = bytes.readCustomBytes();
			apply.score = bytes.readInt();
			applyList.push(apply);
		}
		GameCache.family.applyList = applyList;
		App.MessageCenter.dispatch(MsgConst.FAMILY_APPLY_UPDATE);
	}

	/**
	 * 创建公会
	 * @param  {string} name
	 * @returns void
	 */
	public createFamilyReq(name: string): void {
		let bytes = this.getBytes(5);
		bytes.writeString(name);
		this.sendToServer(bytes);
	}

	/**
	 * 解散
	 * @returns void
	 */
	public dismissFamilyReq(): void {
		this.sendMsgId(6);
	}

	/**
	 * 解散返回
	 * @param  {GameByteArray} bytes
	 * @returns void
	 */
	public dismissFamilyRes(bytes: GameByteArray): void {
		GameCache.family.dismiss();
		this.familyInfoReq();
		App.ViewManager.close(ViewConst.FAMILY);
	}

	/**
	 * 申请加入家族
	 * @param  {number} fid
	 * @returns void
	 */
	public familyApplyReq(fid: number): void {
		let bytes = this.getBytes(10);
		bytes.writeInt(fid);
		this.sendToServer(bytes);
	}

	/**
	 * 设置家族公告
	 * @param  {string} note
	 * @returns void
	 */
	public sendFamilyNotice(note: string): void {
		let bytes = this.getBytes(17);
		bytes.writeString(note);
		this.sendToServer(bytes);
	}

	/**
	 * 设置是否自动通过家族申请
	 * @param  {number} isAuto 0：取消直接加入 1：设置直接加入
	 * @returns void
	 */
	public setLimit(isAuto: 0 | 1, limitId: number): void {
		let bytes = this.getBytes(18);
		bytes.writeByte(isAuto);
		bytes.writeByte(limitId);
		this.sendToServer(bytes);
	}

	/**
	 * 设置自动通过家族申请返回
	 * @param  {GameByteArray} bytes
	 * @returns void
	 */
	public setLimitRes(bytes: GameByteArray): void {
		GameCache.family.isAuto = bytes.readByte() === 1;
		GameCache.family.limitId = bytes.readUnsignedByte();
	}

	/**
	 * 家族信息有新内容
	 * @param  {GameByteArray} bytes
	 * @returns void
	 */
	public onFamilyInfoNew(bytes: GameByteArray): void {
		this.familyInfoReq();
	}

	/**
	 * 家族列表有新内容
	 * @param  {GameByteArray} bytes
	 * @returns void
	 */
	public onFamilyListNew(bytes: GameByteArray): void {
		this.familyListReq();
	}

	/**
	 * 家族申请列表有新内容
	 * @param  {GameByteArray} bytes
	 * @returns void
	 */
	public onFamilyApplyNew(bytes: GameByteArray): void {
		this.applyListReq();
	}

	public quitFamilyReq(): void {
		this.sendMsgId(16);
	}

	public quitFamilyRes(bytes: GameByteArray): void {
		// 0加入家族 1退出家族
		let opt = bytes.readUnsignedByte();
		GameCache.family.isInFamily = opt === 0;
		if (opt === 1) {
			GlobalFun.SysMsg(Language.lang.familyQuitMsg);
			GameCache.family.fInfo = null;
			App.ViewManager.close(ViewConst.FAMILY);
		}
		if (opt === 0) {
			App.ViewManager.close(ViewConst.FAMILY_LIST);
			GlobalFun.SysMsg(Language.lang.familyEnterMsg);
		}
	}

	/**
	 * 
	 * @param  {boolean} agree
	 * @param  {number} aId
	 * @returns void
	 */
	public familyApplyResponse(agree: boolean, aId: number): void {
		let bytes = this.getBytes(12);
		bytes.writeInt(aId);
		bytes.writeByte(agree ? 1 : 0);
		this.sendToServer(bytes);
	}

	/**
	 * 踢出
	 * @param  {number} memId
	 * @returns void
	 */
	public kickMember(memId: number): void {
		let bytes = this.getBytes(13);
		bytes.writeInt(memId);
		this.sendToServer(bytes);
	}

	/**
	 * @param  {GameByteArray} bytes
	 * @returns void
	 */
	public kickMemberRes(bytes: GameByteArray): void {
		let state = bytes.readUnsignedByte();
		if (state === 1) {
			this.familyMemInfoReq();
		}
	}


	public familyPromoteReq(): void {

	}

	public familyDemote(): void {

	}
}	