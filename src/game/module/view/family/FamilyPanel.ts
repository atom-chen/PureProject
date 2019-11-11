/*
 * @Description: 公会面板 s0:未加入公会 s1:已加入公会
 * @Author: moyusheng
 * @Date: 2019-10-28 16:12:38
 */
class FamilyPanel extends CommunalPagePannel {

	private familyListPanel: FamilyListPanel;

	public constructor($parent: egret.DisplayObjectContainer = null) {
		super($parent);
		// this.skinName = "FamilyPanelSkin"
	}

	public open(param: ViewProp): void {
		// this.viewContent.visible = false;
		// super.open(param);
		// this.viewContent.removeChildren();
		// this.currentState = "s0";
		// // 状态 判断，当前是否已经加入公会

		// ///
		// if (this.currentState === "s1") {
		// 	this.getView(this.tabBtn.selectedIndex);
		// } else {
		// 	this.familyListPanel || (this.familyListPanel = new FamilyListPanel());
		// 	this.familyListPanel.open(null);
		// 	this.viewContent.addChild(this.familyListPanel);
		// }
		// this.viewContent.visible = true;
		super.open(param);
	}
}