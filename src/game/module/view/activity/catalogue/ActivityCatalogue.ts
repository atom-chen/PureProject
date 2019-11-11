class ActivityCatalogue extends BaseEuiWindow {

	public list: eui.List;

	static isRed: boolean = false;

	constructor($parent: egret.DisplayObjectContainer = null) {
		super($parent);
		this.skinName = "ActivityCataSkin";
	}

	public open(param: ViewProp): void {
		super.open(param);
		this.addTouchEvent(this.list, this.onListClick);
		this.list.itemRenderer = ActivityCatalogueItem;
		this.refreshPanel();
	}

	static red() {
		let red = false;
		for (let k in GameConfig.activityCata) {
			let cfg = GameConfig.activityCata[k];
			/**任务开启 */
			if (!App.ViewManager.checkOpenCondition({ openLv: cfg.openLv, openQuest: cfg.openQuest } as StdModcontrol, false)) {
				continue;
			}
			let panel = cfg.pannel;
			if (window[panel] && window[panel]["red"] && window[panel]["red"]()) {
				return true;
			}
		}
		return red;
	}


	/**需要刷新是红点消息列表 */
	static changeMsg() {
		return [];
	}

	public refreshPanel(): void {
		let openList = [];
		for (let k in GameConfig.activityCata) {
			let cfg = GameConfig.activityCata[k];
			/**任务开启 */
			if (!App.ViewManager.checkOpenCondition({ openLv: cfg.openLv, openQuest: cfg.openQuest } as StdModcontrol, false)) {
				continue;
			}
			if (!openList[cfg.id]) {
				openList[cfg.id] = cfg;
			}
		}
		this.setListData(this.list, openList);
	}

	private onListClick(e: egret.TouchEvent): void {
		let tar = e.currentTarget;
		TextFlowUtils.hrefType(tar.selectedItem.jump);
		App.ViewManager.close(ViewConst.ACTIVITY_CATALOGUE);
	}

	public close(): void {
		super.close();
		for (let item of this.list.$children) {
			(item as BaseCustComponent).dispose();
		}
		this.list.itemRenderer = null;
	}
}