/*
 * @Description: 龙骨套装替换测试
 * @Author: guolinsen
 * @Date: 2019-09-27 15:40:20
 */
class DragonTestWin extends BaseEuiWindow {

	public partList: eui.List;
	public actionList: eui.List;
	public sBtn: eui.Button;

	public constructor() {
		super(LayerManager.UI_Message);
		this.skinName = "DragonTestSkin";
		this.left = 0;
		this.top = 0;
	}

	init() {
		super.init();
		this.partList.itemRenderer = DragonTestItem;
		this.actionList.itemRenderer = DragonTestActionItem;
	}

	open() {
		super.open();
		this.addTouchEvent(this.sBtn, this.onRefresh);
	}

	private onRefresh() {
		DeBugMgr.dragonTest = {};
		let len = this.partList.numElements;
		for (let i = 0; i < len; i++) {
			let item = this.partList.getElementAt(i) as DragonTestActionItem;
			DeBugMgr.dragonTest[item.data.partPro] = item.inText.text;
		}
		GameCache.hero.mainPlayer.loadBody(1);
	}
}