/*
 * @Description: 单个邮件数据
 * @Author: guolinsen
 * @Date: 2019-09-16 19:15:48
 */
class EmailInfo {
	static STATE_NOREAD = 0; //未读
	static STATE_READ = 1;   //已读
	static STATE_READ_PRIZE = 2; //已读已领取

	/**邮件ID int64*/
	public emailId: number;
	/**邮件标题*/
	public title: string;
	/**邮件内容string*/
	public content: string
	/**附件长度byte*/
	public attachmentLength: number;
	/**物品集合*/
	public itemArray: EmailAttachmentItem[] = [];
	/**发送时间unsigned int*/
	public emailTime: number;
	/**到期时间**/
	public endTime: number;
	/**邮件状态0表示未读，1已读 byte*/
	public emailState: number;

	public sendRole: string;

	public constructor(bytes: GameByteArray = null) {
		if (bytes) {
			this.emailId = bytes.readDouble();
			this.emailState = bytes.readUnsignedByte();
			this.emailTime = GlobalFun.formatMiniDateTime(bytes.readUnsignedInt()) / 1000;
			this.endTime = bytes.readUnsignedInt();
			this.attachmentLength = bytes.readUnsignedByte();
			//this.sendRole = bytes.readCustomBytes();
			this.title = bytes.readCustomBytes();
		}
	}

	public updateInfo(bytes: GameByteArray): void {
		this.emailState = bytes.readByte();
		this.content = bytes.readCustomBytes();
		this.attachmentLength = bytes.readUnsignedByte();
		if (this.attachmentLength != 0) {
			for (var i: number = 0; i < this.attachmentLength; i++) {
				var emailItem: EmailAttachmentItem = new EmailAttachmentItem();
				emailItem.type = bytes.readByte();
				emailItem.id = bytes.readUnsignedShort();
				emailItem.bind = bytes.readByte();
				emailItem.count = bytes.readUnsignedInt();
				emailItem.strong = bytes.readByte();
				emailItem.quality = bytes.readByte();
				this.itemArray.push(emailItem);
			}
		}
	}
}

class EmailAttachmentItem {
	/**物品类型*/
	public type: number;
	/**物品ID*/
	public id: number;
	/**物品数量*/
	public count: number;
	/**物品品质*/
	public quality: number;
	/**物品强化*/
	public strong: number;
	/**物品绑定*/
	public bind: number;
}