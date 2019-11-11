/*
 * @Description: 公会列表面板
 * @Author: moyusheng
 * @Date: 2019-10-28 20:32:56
 */
class FamilyListPanel extends BaseEuiWindow {

	public bg: BaseWinBg;
	public list: eui.List;
	public btnCreate: eui.Button;
	public btnApply: eui.Button;

	public constructor($parent = null) {
		super($parent);
		this.skinName = "FamilyListPanelSkin";
	}

	protected init(): void {
		super.init();
		this.bg.setNameImg("family_title_other")
	}

	public open(param: ViewProp): void {
		super.open(param);
		this.message(MsgConst.FAMILY_LIST_UPDATE, this.updateView);
		Proxy.family.familyListReq();
		this.addTouchEvent(this.btnCreate, this.onBtnCreateClick);
		this.addTouchEvent(this.btnApply, this.onBtnApplyClick);
		this.list.itemRenderer = FamilyListItem;
		// this.updateView();
	}

	private updateView(): void {
		this.btnApply.visible = this.btnCreate.visible = !GameCache.family.isInFamily;
		let listData = GameCache.family.fList;
		if (!listData) {
			return;
		}
		this.setListData(this.list, listData);
	}

	private onBtnApplyClick(): void {

	}

	private onBtnCreateClick(): void {
		App.ViewManager.open(ViewConst.FAMILY_CREATE);
		App.ViewManager.close(this.viewKey);
	}
}