class FamilyDismissTipsPanel extends BaseEuiWindow {

	public bg: BaseWinBg;
	public desc: eui.Label;
	public desc2: eui.Label;
	public btnSure: eui.Button;

	public constructor($parent: egret.DisplayObjectContainer = null) {
		super($parent);
		this.skinName = "FamilyDismissTipsSkin";
	}

	protected init(): void {
		super.init();
		this.bg.setNameImg("family_title_dismiss");
	}

	public open(param: ViewProp): void {
		super.open(param);
		this.addTouchEvent(this.btnSure, this.onBtnSureClick);
		this.updateView();
	}

	private updateView(): void {
		this.desc.text = Language.lang.familyDismissDesc;
		this.desc2.text = Language.lang.familyDismissDesc2;
	}

	private onBtnSureClick(): void {
		Proxy.family.dismissFamilyReq();
		App.ViewManager.close(this.viewKey);
	}
}