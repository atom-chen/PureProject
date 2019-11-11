/*
 * @Description: 首冲窗口
 * @Author: liangzhaowei
 * @Date: 2019-09-02 17:33:24
 * @LastEditTime: 2019-10-31 20:04:35
 */

class FirstChargeWin extends BaseEuiWindow {
	public constructor() {
		super(LayerManager.UI_Win);
		this.skinName = "FirstChargeWinSkin";
	}

	public tabBtn: eui.TabBar;
	public gCharge: eui.Group;
	public charge0: FirstChargeItem;
	public charge1: FirstChargeItem;
	public charge2: FirstChargeItem;
	public charge3: FirstChargeItem;
	public list0: eui.List;
	public imgGet0: eui.Image;
	public btn0: eui.Button;
	public list1: eui.List;
	public imgGet1: eui.Image;
	public btn1: eui.Button;
	public list2: eui.List;
	public imgGet2: eui.Image;
	public btn2: eui.Button;
	public lbCharge: eui.Label;
	public closeBtn: eui.Image;

	/**模块红点函数 不需要计算的写在前面 */
	static red() {
		return App.ViewManager.bOpened(ViewConst.FIRSTCHARGE);
	}

	public init(): void {
		this.list0.itemRenderer = ItemBase;
		this.list1.itemRenderer = ItemBase;
		this.list2.itemRenderer = ItemBase;
		this.tabBtn.selectedIndex = 0;
	}

	/**用于同一处理打开时的操作 */
	public open(param: ViewProp = null) {
		super.open();
		this.message(MsgConst.PROPERTY + PropId.AP_VIP_POINT, this.upCn);//充值金额
		this.message(MsgConst.FIRST_CHARGE, this.upCn)
		this.addTouchEvent(this.tabBtn, this.tabTouche);


		this.addTouchEvent(this.btn0, this.onClick);
		this.addTouchEvent(this.btn1, this.onClick);
		this.addTouchEvent(this.btn2, this.onClick);
		this.upCn();

	}


	public tabTouche() {
		this.upCn();
	}

	public onClick(e: egret.TouchEvent) {
		let tIndex = 1;
		switch (e.currentTarget) {
			case this.btn0:
				tIndex = 1;
				break;
			case this.btn1:
				tIndex = 2
				break;
			case this.btn2:
				tIndex = 3
				break;

			default:
				break;
		}

		Proxy.firstcharge.getRw(this.tabBtn.selectedIndex + 1, tIndex)

	}
	public upCn() {

		/**充值金额 */
		let pro = GameCache.hero.mainPro;
		if (pro) {
			this.lbCharge.text = StringUtils.substitute(Language.lang.lcn12, pro.pro(PropId.AP_VIP_POINT))
		}

		/**是否首冲过 */
		this.gCharge.visible = GameCache.firstcharge.firstChargeSt == 0;
		for (let index in GameCache.firstcharge.getFirstChargeCfg()) {
			let cfg: StdChognzhi = GameCache.firstcharge.getFirstChargeCfg()[index];
			if (cfg) {
				this["charge" + index].data = cfg;
			}
		}


		/**奖励列表 */
		let reCfg: StdRecharge = GameConfig.recharge[this.tabBtn.selectedIndex + 1];
		if (reCfg && reCfg.Reward) {
			for (let index in reCfg.Reward) {
				this.setListData(this["list" + index], GlobalFun.filterJob(reCfg.Reward[index]));
				let getState: number = 0;
				if (this.tabBtn.selectedIndex == 0) {
					getState = GameCache.firstcharge.firstGetList[index];
				}
				else if (this.tabBtn.selectedIndex == 1) {
					getState = GameCache.firstcharge.totalGetList[index];
				}
				this["imgGet" + index].visible = getState != 1;
				this["btn" + index].visible = getState == 1;
				if (getState == 0) {
					this["imgGet" + index].source = "firstCharge_json.firstCharge" + (parseInt(index) + 5) + "_png"
				} else if (getState == 2) {
					this["imgGet" + index].source = "public_json.luck_img2_png";
				}
			}
		}

	}




}