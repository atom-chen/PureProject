class FamilyApplyPanel extends BaseEuiWindow {

	public bg: BaseWinBg;
	public list: eui.List;

	public constructor($parent: egret.DisplayObjectContainer = null) {
		super($parent);
		this.skinName = "FamilyApplyPanelSkin";
	}

	protected init(): void {
		super.init();
		this.bg.setNameImg("family_title_apply")
	}

	public open(param: ViewProp): void {
		super.open(param);
		this.message(MsgConst.FAMILY_APPLY_UPDATE, this.updateView);
		Proxy.family.applyListReq();
		this.list.itemRenderer = FamilyApplyItem;
	}

	private updateView(): void {
		this.setListData(this.list, GameCache.family.applyList || []);
	}
}	