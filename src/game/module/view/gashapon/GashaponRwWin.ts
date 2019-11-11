/*
 * @Description: 抽奖奖励框
 * @Author: liangzhaowei
 * @Date: 2019-10-08 17:28:38
 */


class GashaponRwWin extends BaseEuiWindow {
	public constructor() {
		super(LayerManager.UI_Tips);
		this.skinName = "GashaponRwWinSkin";
	}

	public btn0: eui.Button;
	public closeBtn: eui.Button;
	public price1: DoubbleItemExpend;
	public item0: ItemBase;
	public item1: ItemBase;
	public item2: ItemBase;
	public item3: ItemBase;
	public item4: ItemBase;
	public item5: ItemBase;
	public item6: ItemBase;
	public item7: ItemBase;
	public item8: ItemBase;
	public item9: ItemBase;
	public gEff: eui.Group;



	/**扭蛋类型 */
	public type = 1;
	/**抽取次数 */
	public time = 1;
	/**是否可以点击 */
	public press = false;

	public cfg;


	public init(): void {
		App.DisplayUtils.addEffectToObj(this, "matrix_0_1", -1, 320, 185);
		App.DisplayUtils.addEffectToObj(this.gEff, "point_0_1", -1, 260, 250);
		let eff = App.DisplayUtils.addEffectToObj(this.gEff, "point_0_1", -1, 380, 250);
		eff.scaleX = -1;
	}

	/**用于同一处理打开时的操作 */
	public open(param: ViewProp = null) {

		/**设置背景透明度 */
		if (this.myParent["setRectAlpha"]) {
			this.myParent["setRectAlpha"](0.9);
		}

		super.open();
		if (param && param.exData1) {
			let cfg: StdGashapondisplay = GameConfig.gashaponDisplay[param.exData1]
			this.cfg = cfg;
			this.type = param.exData1;
			if (cfg && cfg.ten) {
				this.price1.setData(cfg.ten);
			}
		}


		if (param && param.exData2) {
			if (param.exData2.length > 1) {
				this.btn0.icon = "res/btn/luck_2.png";
			}
			else {
				this.btn0.icon = "res/btn/luck_1.png";
			}
			this.time = param.exData2.length;

			/**创建奖励特效 */
			for (let i = 0; i < 10; i++) {
				let item = this["item" + i];
				if (param.exData2[i]) {
					item.data = param.exData2[i];
					GlobalFun.createItemEffect(item, i);
				}
			}
		}


		this.addTouchEvent(this.btn0, this.onClick);

		App.TimerManager.add(1200, this.tieme, this, 1)

		this.press = false;
	}

	public tieme() {
		this.press = true;
	}



	public close(param: ViewProp = null) {
		/**重置回来背景的透明度 */
		if (this.myParent["resetAlpha"]) {
			this.myParent["resetAlpha"]();
		}
		super.close();
	}


	public onClick(e: egret.TouchEvent) {
		switch (e.currentTarget) {
			case this.btn0:
				if (!GlobalFun.getBagEnounghUseCondition(this.cfg.ten)) {
					GlobalFun.gotoCharge();
					return;
				}

				if (this.press) {
					Proxy.gashapon.askGashapon(this.time, this.type);
					this.closeView();
				}
				break;
			default:
				break;
		}

	}

}