class EmailPanel extends BaseSpriteView {

	public countTx: eui.Label;
	public list: eui.List;
	public deleteBtn: eui.Button;
	public getBtn: eui.Button;

	public constructor() {
		super();
		this.skinName = "EmailWinSkin";
	}

	protected init() {
		super.init();
		this.list.itemRenderer = EmailItem;
	}

	public open() {
		super.open();

		this.addTouchEvent(this.deleteBtn, this.onDelete);
		this.addTouchEvent(this.getBtn, this.onGet);
		this.message(MsgConst.EMAIL_REFRESH, this.onRefresh);
		this.message(MsgConst.EMAIL_UPDATE, this.onRefresh);
		this.onRefresh();
	}

	private onRefresh() {
		let data = GameCache.email.list;
		this.setListData(this.list, data);
		data.sort(GameCache.email.onEmailDate);
		let dp = this.list.dataProvider as eui.ArrayCollection;
		dp ? dp.replaceAll(data) : this.list.dataProvider = new eui.ArrayCollection(data);
		this.countTx.text = `${data.length}/${GameConfig.globalConfig.nMailMaxCount}`
	}

	private onDelete() {
		Proxy.email.sendDelete(0);
	}

	private onGet() {
		Proxy.email.sendPrize(0);
	}
}