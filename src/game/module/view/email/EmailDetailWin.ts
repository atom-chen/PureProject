/*
 * @Description: 单个邮件详情
 * @Author: guolinsen
 * @Date: 2019-09-18 13:52:18
 */
class EmailDetailWin extends BaseEuiWindow {

	public closeBtn: eui.Image;
	public iG: eui.Group;
	public line1: eui.Image;
	public line2: eui.Image;
	public getBtn: eui.Button;
	public deleteBtn: eui.Button;
	public titleTx: eui.Label;
	public contentTx: eui.Label;
	private itemList: ItemList;
	private getFlag: eui.Image;

	private id: number;
	public constructor() {
		super();
		this.skinName = "EmailDetailWinSkin";


	}

	public init(): void {
		super.init();
		this.setWinTitle("email");
	}
	public open(param: ViewProp): void {
		super.open(param);
		this.id = param.exData1;
		this.addTouchEvent(this.deleteBtn, this.onDelete);
		this.addTouchEvent(this.getBtn, this.onGet);
		this.message(MsgConst.EMAIL_UPDATE, this.update);
		this.message(MsgConst.EMAIL_REFRESH, this.update);
		this.update();
	}
	public dispose() {
		this.itemList.dispose();
		super.dispose();
	}

	private update() {
		let info: EmailInfo = GameCache.email.dic[this.id];
		if (!info) {
			this.closeView();
			return;
		}
		if (!info.content) {
			Proxy.email.sendGetContent(this.id);
		} else {
			this.contentTx.textFlow = TextFlowUtils.generateTextFlow(info.content);
		}
		this.titleTx.text = StringUtils.substitute(Language.lang.email_title, info.title);
		this.setAward(info.itemArray);
		this.getFlag.visible = false;
		let canGet = false;
		if (info.attachmentLength) {
			this.getFlag.visible = info.emailState == EmailInfo.STATE_READ_PRIZE;
			canGet = !this.getFlag.visible;
		}
		this.getBtn.filters = canGet ? null : FilterUtils.DefaultGrayFilters;
	}

	private setAward(list): void {
		//list = [list[0], list[0], list[0], list[0], list[0]]
		if (list && list.length > 0) {
			if (!this.itemList) {
				this.itemList = ObjectPool.get(ItemList);
			}
			this.itemList.setData(list, this.iG);
			this.iG.visible = true;
		} else {
			this.iG.visible = false;
		}
	}

	private onDelete() {
		Proxy.email.sendDelete(this.id);
	}

	private onGet() {
		Proxy.email.sendPrize(this.id);
	}
}