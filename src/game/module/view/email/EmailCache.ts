/*
 * @Description: 邮件数据
 * @Author: guolinsen
 * @Date: 2019-09-16 19:09:19
 */
class EmailCache extends BaseCache {
	public list: EmailInfo[] = [];
	public dic: any = {};
	public constructor() {
		super();
	}
	clear() {
		this.list.length = 0;
		this.dic = {};
	}

	/**
   * 根据Email日期降序 
   * @param src  
   * @param tar
   * @return 
   * 
   */
	public onEmailDate(src: EmailInfo, tar: EmailInfo): number {
		let r1 = (src.emailState == EmailInfo.STATE_READ && !src.attachmentLength) || (src.emailState == EmailInfo.STATE_READ_PRIZE);
		let r2 = (tar.emailState == EmailInfo.STATE_READ && !tar.attachmentLength) || (tar.emailState == EmailInfo.STATE_READ_PRIZE);
		if (r1 && !r2) {
			return 1;
		}
		if (!r1 && r2) {
			return -1;
		}
		if (src.emailTime < tar.emailTime) {
			return 1;
		}
		else if (src.emailTime > tar.emailTime) {
			return -1;
		}
		return 0;
	}

	public updateState(id: number, state: number): void {
		if (this.dic[id]) {
			this.dic[id].emailState = state;
		} else {
			console.log("无法查询到邮件", id);
		}
	}

	public deleteEmail(id: number): void {
		if (this.dic[id]) {
			delete this.dic[id];
		}
		let i = 0;
		let a = this.list.length;
		for (; i < a; i++) {
			if (this.list[i].emailId == id) {
				this.list.splice(i, 1);
				break;
			}
		}
	}

	public setEmailInfo(id, bytes: GameByteArray): void {
		if (this.dic[id]) {
			this.dic[id].updateInfo(bytes);
		} else {
			console.log("无法查询到邮件", id);
		}
	}
}