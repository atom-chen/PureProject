/*
    author:lzw
    date:2018/12/18 14:42
    explain:通用分页窗口类,可继承
*/

class CommunalPageWin extends BaseEuiWindow {


	public constructor($parent: egret.DisplayObjectContainer = null) {
		super($parent);
		this.skinName = "CommunalPageWinSkin";
	}


	public viewContent: eui.Group;
	public backGrp: eui.Group;
	public tabBtn: eui.TabBar;
	public oldIndex: number = -1;
	protected viewCl: any[];
	protected viewDic: Object = {};
	protected curView: any;
	private viewProp: ViewProp;//记录打开窗口时传入的窗口信息
	public winModuleData = {};//窗口对应的模块数据
	public bg: BaseWinBg;//背景

	/**tab 列表icon */
	public listIcon = [];
	/**tab 列表panel */
	public listPanel = [];


	/**用于同一处理打开时的操作 */
	public open(param: any = null) {
		super.open();

		/**刚进入的时候刷新红点方法,避免延时显示红点 */
		if (this["refreshRed"]) {
			this["refreshRed"]()
		}
	}



	public openView(param: ViewProp): void {
		if (this.isInit) {
			this.addEvent(egret.TouchEvent.CHANGE, this.tabBtn, this.onTabChange);
			this.addEvent(egret.Event.CHANGING, this.tabBtn, this.onTabEvent);
			this.tabBtn.visible = this.viewCl.length > 1;//如果只有一个子项就隐藏切换按钮
			this.tabBtn.selectedIndex = param ? param.firIndex : 0;
			this.viewProp = param;
			this.onTabChange();
		}
		super.openView(param);
	}



	/**刷新红点 */
	private refreshRed() {
		for (let i = 0; i < this.tabBtn.numChildren; i++) {
			let pannelNe: string = this.listPanel[i] ? this.listPanel[i] : "";
			App.ViewManager.showRedPoint(this.tabBtn.getChildAt(i), this.getPanelRedForView(i))
		}

		/**刷新正在显示中的panel的红点方法 */
		if (this.tabBtn.selectedIndex >= 0) {
			let pannel = this.viewDic[this.tabBtn.selectedIndex];
			if (pannel && pannel["refreshRed"]) {
				pannel["refreshRed"]();
			}
		}

	}

	/**获取view中的红点 */
	private getPanelRedForView(index) {
		let bRed = false;
		if (this.winModuleData[index]) {
			let pannelList = this.winModuleData[index];
			if (pannelList) {
				for (let item in pannelList) {
					let modData: StdModcontrol = pannelList[item]
					if (modData.pannel) {
						if (App.RedPoint.redViewResult[modData.pannel] != undefined) {
							bRed = App.RedPoint.redViewResult[modData.pannel];
							break;
						}
						else {
							if (App.RedPoint.redViewResult[modData.module]) {
								bRed = true
								break;
							}
						}
					}
				}
			}
		}
		return bRed;
	}



	/**用于创建类 */
	public init() {
		let cfg = GameConfig.modControl[ViewConst[this.viewKey]];
		/**icon 列表 */
		this.listIcon = [];
		/**pannel列表 */
		this.listPanel = [];
		for (let index in cfg) {
			let pageIndex = 0;
			let obj = { icon: "role_json.role_index_ud_0_png", icon2: "role_json.role_index_0_png" };
			let pannel;
			for (let item in cfg[index]) {
				if (cfg[index][item].pannel) {
					obj.icon = cfg[index][item].pageIcon
					obj.icon2 = cfg[index][item].pageIcon2
					pageIndex = cfg[index][item].firIndex
					pannel = cfg[index][item].pannel
					break;
				}
			}
			this.listIcon.push(obj);
			if (pannel) {
				this.listPanel.push(pannel);
			}
			this.winModuleData[pageIndex] = cfg[index];
		}
		this.setViewData(this.listIcon, this.listPanel);
	}

	public close(...param): void {
		this.curView && this.curView['close']();
	}



	/**用于阻止点击事件 */
	public onTabEvent(e: egret.Event) {
		let tab: eui.TabBar = e.target;
		if (this.winModuleData[tab.selectedIndex]) {
			/**与配表约定选取类型中的第一个功能模块作为开启的依据 */
			let pannelData: StdModcontrol = this.winModuleData[tab.selectedIndex] ? this.winModuleData[tab.selectedIndex][0] : null;
			if (!App.ViewManager.checkOpenCondition(pannelData, true)) {
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
		// 是否需要显示返回按钮
		this.backGrp && (this.backGrp.visible = true);
		/**设置标题 */
		if (this.winModuleData[selectedIndex]) {
			let viewData = this.winModuleData[selectedIndex][0];
			if (!viewData) {
				return;
			}
			if (viewData.winTitle && !view.bSetTitleInChile) {
				this.setWinTitle(viewData.winTitle);
				this.setWinHeleTitle(viewData.helpBtn);
			}
			// 是否需要显示返回按钮
			this.backGrp && (this.backGrp.visible = viewData.showBackBTN > 0);
		}
	}

	public setViewData(viewName: any[], viewCl: any[]) {
		if (viewName.length) {
			this.tabBtn.dataProvider = new eui.ArrayCollection(viewName);
			this.tabBtn.validateNow();
		}

		if (viewCl.length) {
			this.viewCl = viewCl;
		}
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
			v.pannelModuleData = this.winModuleData[index];
			this.viewDic[index] = v;
			this.viewContent.addChild(v);
		}
		return v;
	}


}
