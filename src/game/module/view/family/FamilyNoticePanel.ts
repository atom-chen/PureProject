class FamilyNoticePanel extends BaseEuiWindow {

	public bg: BaseWinBg;
	public btnSure: eui.Button;
	public count: eui.Label;
	public notice: eui.EditableText;

	public constructor($parent: egret.DisplayObjectContainer = null) {
		super($parent);
		this.skinName = "FamilyNoticeSkin";
	}

	protected init(): void {
		super.init();
		this.bg.setNameImg("family_title_notece");
	}

	public open(param: ViewProp): void {
		super.open(param);
		this.message(MsgConst.FAMILY_INFO_UPDATE, this.updateView);
		this.addTouchEvent(this.btnSure, this.onBtnSureClick);
		this.addEvent(egret.TextEvent.CHANGE, this.notice, this.onTextChanging);
		this.updateView();
	}

	private updateView(): void {
		this.notice.text = GameCache.family.fInfo.notice;
		this.count.text = StringUtils.substitute(Language.lang.familyNoticeLimit, this.notice.text.length, 60);
	}

	private onBtnSureClick(): void {
		Proxy.family.sendFamilyNotice(this.notice.text);
		App.ViewManager.close(this.viewKey);
	}

	private onTextChanging(e: egret.TextEvent): void {
		this.count.text = StringUtils.substitute(Language.lang.familyNoticeLimit, this.notice.text.length, 60);
	}
}