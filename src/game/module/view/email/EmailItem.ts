class EmailItem extends BaseCustComponent {

	public stateImg: eui.Image;
	public titleTx: eui.Label;
	public timeTx: eui.Label;
	public getFlag: eui.Image;
	public fujianFlag: eui.Image;

	public constructor() {
		super();

		this.touchChildren = false;
	}

	//用于子类继承
	protected init(): void {
		this.addTouchEvent(this, this.onTouch);
		//App.MessageCenter.addListener(MsgConst.EMAIL_UPDATE, this.refresh, this);
	}

	private onTouch() {
		let pro = new ViewProp();
		pro.exData1 = this.data.emailId;
		App.ViewManager.open(ViewConst.EMAIL_DETAIL, pro);
	}

	protected dataChanged(): void {
		super.dataChanged();
		this.refresh();
	}

	private refresh() {
		let data: EmailInfo = this.data;
		this.titleTx.text = data.title;
		this.timeTx.text = App.DateUtils.getFormatBySecond(data.emailTime, DateUtils.TIME_FORMAT_15);
		if (data.attachmentLength > 0) {
			this.getFlag.visible = data.emailState == EmailInfo.STATE_READ_PRIZE;
			this.fujianFlag.visible = !this.getFlag.visible;
		} else {
			this.getFlag.visible = false;
			this.fujianFlag.visible = false;
		}
		this.stateImg.source = `email_json.email_${data.emailState == EmailInfo.STATE_NOREAD ? "close" : "open"}_png`;
	}
}