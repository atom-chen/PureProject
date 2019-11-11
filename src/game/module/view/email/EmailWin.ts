/*
 * @Description: 邮件UI
 * @Author: guolinsen
 * @Date: 2019-09-16 19:09:48
 */
class EmailWin extends CommunalPageWin {
	public constructor() {
		super();
	}

	static red(): boolean {
		let cache = GameCache.email;
		let list = cache.list;
		if (list) {
			let i = 0;
			let a = list.length;
			for (; i < a; i++) {
				let email = list[i];
				if (email.emailState == EmailInfo.STATE_NOREAD) {
					return true;
				}
				if(email.attachmentLength && email.emailState != EmailInfo.STATE_READ_PRIZE){
					return true;
				}
			}
		}
		return false;
	}

	/**需要刷新是红点消息列表 */
	static changeMsg() {
		return [MsgConst.EMAIL_REFRESH, MsgConst.EMAIL_UPDATE];
	}

	public init(): void {
		super.init();
		this.setWinTitle("email");
		let classArr = [EmailPanel];
		let listData = [];
		for (let i = 0; i < classArr.length; i++) {
			let obj = {}
			obj['icon'] = "apEmail_json.apEmail_u_" + i + "_png";
			obj['icon2'] = "apEmail_json.apEmail_" + i + "_png";
			listData.push(obj);
		}
		this.setViewData(listData, classArr);
	}
}