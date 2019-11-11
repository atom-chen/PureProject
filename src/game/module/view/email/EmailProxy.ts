/*
 * @Description: 邮件系统
 * @Author: guolinsen
 * @Date: 2019-09-16 19:08:30
 */
class EmailProxy extends BaseProxy {
	public constructor() {
		super(PacketTypes.NEW_EAMIL);

		this.regNetMsg(1, this.doInit);
		this.regNetMsg(2, this.doTakePrize);
		this.regNetMsg(3, this.doDelete);
		this.regNetMsg(4, this.doEmailInfo);
		this.regNetMsg(5, this.doNewEmail);
	}
	private doInit(bytes: GameByteArray): void {
		let cache = GameCache.email;
		let flag = bytes.readByte();
		let emailArray: EmailInfo[] = flag ? cache.list : [];
		(!flag) && (cache.dic = {});

		let count: number = bytes.readUnsignedShort();
		let emailInfo: EmailInfo;
		for (let i: number = 0; i < count; i++) {
			emailInfo = new EmailInfo(bytes);
			emailArray.push(emailInfo);
			cache.dic[emailInfo.emailId] = emailInfo;
		}
		cache.list = emailArray;
		App.MessageCenter.dispatch(MsgConst.EMAIL_REFRESH);
	}

	private doTakePrize(bytes: GameByteArray): void {
		let count: number = bytes.readUnsignedShort();
		for (let i: number = 0; i < count; i++) {
			let id = bytes.readDouble();
			// let state = bytes.readByte();//状态(0:成功 1:背包太满无法领取2:邮件不存在 3:邮件无附件无法被领取)
			// if (!state) {
			// 	GlobalFun.SysMsg(Language.lang["email_read_error" + state])
			// 	continue;
			// }
			GameCache.email.updateState(id, EmailInfo.STATE_READ_PRIZE);
		}
		App.MessageCenter.dispatch(MsgConst.EMAIL_UPDATE);
	}

	private doDelete(bytes: GameByteArray): void {
		let count: number = bytes.readUnsignedShort();
		for (let i: number = 0; i < count; i++) {
			let id = bytes.readDouble();
			// let state = bytes.readByte();//状态(0:成功 1:背包太满无法领取2:邮件不存在 3:邮件无附件无法被领取)
			// if (!state) {
			// 	GlobalFun.SysMsg(Language.lang["email_delete_error" + state])
			// 	continue;
			// }
			GameCache.email.deleteEmail(id);
		}
		App.MessageCenter.dispatch(MsgConst.EMAIL_REFRESH);
	}

	private doEmailInfo(bytes: GameByteArray): void {
		let id = bytes.readDouble();
		GameCache.email.setEmailInfo(id, bytes);
		App.MessageCenter.dispatch(MsgConst.EMAIL_UPDATE);
	}

	private doNewEmail(bytes: GameByteArray): void {
		var emailInfo: EmailInfo = new EmailInfo(bytes);
		GameCache.email.list.push(emailInfo);//把新邮件添加到数组
		GameCache.email.dic[emailInfo.emailId] = emailInfo;
		App.MessageCenter.dispatch(MsgConst.EMAIL_REFRESH);
	}

	//邮件ID(为0则表示一键领取)
	public sendPrize(id: number = 0): void {
		let bytes = this.getBytes(1);
		bytes.writeDouble(id);
		this.sendToServer(bytes);
	}

	//邮件ID(为0则表示一键删除)
	public sendDelete(id: number = 0): void {
		let bytes = this.getBytes(2);
		bytes.writeDouble(id);
		this.sendToServer(bytes);
	}

	public sendGetContent(id: number): void {
		let bytes = this.getBytes(3);
		bytes.writeDouble(id);
		this.sendToServer(bytes);
	}

}