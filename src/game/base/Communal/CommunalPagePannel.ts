/*
 * @Description: 通用分页pannel类,可继承
 * @Author: liangzhaowei
 * @Date: 2019-07-16 15:58:46
 * @LastEditTime: 2019-10-28 16:35:45
 */


class CommunalPagePannel extends BaseSpriteView {


	public constructor($parent: egret.DisplayObjectContainer = null) {
		super($parent);
		this.skinName = "CommunalPagePannelSkin";
	}


	public viewContent: eui.Group;
	public tabBtn: eui.TabBar;
	public oldIndex: number = -1;
	protected viewCl: any[];
	protected viewDic: Object = {};
	protected curView: any;
	private viewProp: ViewProp;//记录打开窗口时传入的窗口信息
	public pannelModuleData;//pannel对应的模块数据
	public line0: eui.Image;
	public line1: eui.Image;
	public line2: eui.Image;
	public line3: eui.Image;
	public bSetTitleInChile = false;//是否在子类设置窗口名称


	public open(param: ViewProp = null): void {
		if (this.isInit) {
			this.addEvent(egret.TouchEvent.CHANGE, this.tabBtn, this.onTabChange);
			this.addEvent(egret.Event.CHANGING, this.tabBtn, this.onTabEvent);
			this.tabBtn.selectedIndex = param ? param.secIndex : 0;
			this.viewProp = param;
			this.onTabChange();
			this.setTabBar();
			/**升级的时候需要刷新 */
			this.message(MsgConst.PROPERTY + PropId.AP_LEVEL, this.setTabBar);
		}


	}

	public init() {
		this.setTabBar();


		/**设置在子类设置标题,父类在切换窗口的时候,就不用重复设置 */
		this.bSetTitleInChile = true;
		// let viewData = this.pannelModuleData[0];
		// if (viewData) {
		// 	let view = App.ViewManager.getView(viewData.viewconst);
		// 	view.bSetTitleInChile = true;
		// }

		/**显示分割线 */
		for (let i = 0; i < 4; i++) {
			this["line" + i].visible = i < (Object.keys(this.pannelModuleData).length - 1);
		}

	}

	public setTabBar() {
		/**icon 列表 */
		let listIcon = [];
		/**pannel列表 */
		let listPanel = [];
		for (let index in this.pannelModuleData) {
			let obj = { icon: "role.png" };
			obj.icon = RES_DIR_PAGEICON + this.pannelModuleData[index].viewIcon;
			if (!App.ViewManager.checkOpenCondition(this.pannelModuleData[index], false)) {
				obj.icon = obj.icon.replace(".png", "_ud.png")
			}
			listIcon.push(obj);
			listPanel.push(this.pannelModuleData[index].module);
		}
		this.setViewData(listIcon, listPanel);
	}

	/**刷新红点 */
	public refreshRed() {
		super.refreshRed();

		if (!this.tabBtn) {
			return;
		}
		for (let i = 0; i < this.tabBtn.numChildren; i++) {
			let moduleNe: string = this.pannelModuleData[i] ? this.pannelModuleData[i].module : "";
			App.ViewManager.showRedPoint(this.tabBtn.getChildAt(i), App.RedPoint.redViewResult[moduleNe])
		}

		/**刷新下级红点方法 */
		if (this.tabBtn.selectedIndex >= 0) {
			let view = this.viewDic[this.tabBtn.selectedIndex];
			if (view && view["refreshRed"]) {
				view["refreshRed"]();
			}
		}


	}


	public close(...param): void {
		super.close();
		this.curView && this.curView['close']();
	}

	/**用于阻止点击事件 */
	public onTabEvent(e: egret.Event) {
		let tab: eui.TabBar = e.target;
		if (this.pannelModuleData[tab.selectedIndex]) {
			let modelData: StdModcontrol = this.pannelModuleData[tab.selectedIndex];
			if (!App.ViewManager.checkOpenCondition(modelData, true)) {
				e.preventDefault();
				return;
			}
		}
	}

	public onTabChange(e?): void {
		let selectedIndex = this.tabBtn.selectedIndex;
		if (this.oldIndex != selectedIndex) {
			if (this.curView) {
				this.curView['close']();
				this.curView['visible'] = false;
			}
			this.oldIndex = selectedIndex;
		}
		let view = this.getView(selectedIndex);
		//第一次打开时候e是没有数据的,可以传入viewProp的数据作为下级页签的打开依据
		if (!e) {
			view["open"](this.viewProp);
			/**刚进入的时候刷新红点方法,避免延时显示红点 */
			if (this["refreshRed"]) {
				this["refreshRed"]()
			}
		}
		else {
			view["open"]();
			/**刚进入的时候刷新红点方法,避免延时显示红点 */
			if (this["refreshRed"]) {
				this["refreshRed"]()
			}
		}
		view['visible'] = true;
		this.curView = view;

		/**设置标题 */
		if (this.pannelModuleData[selectedIndex]) {
			let viewData = this.pannelModuleData[selectedIndex];
			let view = App.ViewManager.getView(viewData.viewconst);
			if (view && viewData && viewData.winTitle) {
				view.setWinTitle(viewData.winTitle)
			}
			/**帮助按钮 */
			if (view && viewData) {
				view.setWinHeleTitle(viewData.helpBtn)
			}


		}

	}

	public setViewData(viewName: any[], viewCl: any[]) {
		this.tabBtn.dataProvider = new eui.ArrayCollection(viewName);
		this.viewCl = viewCl;
	}

	protected getView(index): any {
		let v = this.viewDic[index];
		if (!v) {
			let cl = this.viewCl[index];
			/**将配表中的类名转换成类 */
			if (typeof cl === 'string') {
				cl = window[cl];
			}
			v = new cl();
			if (v && cl.name) {
				v.name = cl.name
			}
			this.viewDic[index] = v;
			this.viewContent.addChild(v);
			v.width = this.viewContent.width;
			v.height = this.viewContent.height;
		}
		return v;
	}


}
