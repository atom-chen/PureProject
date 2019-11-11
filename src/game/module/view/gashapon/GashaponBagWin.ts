/*
 * @Description:扭蛋仓库
 * @Author: liangzhaowei
 * @Date: 2019-10-08 17:28:38
 */


class GashaponBagWin extends BaseEuiWindow {
	public constructor() {
		super(LayerManager.UI_Tips);
		this.skinName = "GashaponBagWinSkin";
	}

	public mBtn: eui.Button;
	public closeBtn: eui.Image;
	public list: eui.List;

	/**仓库类型 */
	public type = 1;


	public init(): void {
		this.list.itemRenderer = ItemBase;
	}

	/**用于同一处理打开时的操作 */
	public open(param: ViewProp = null) {
		super.open();
		this.addTouchEvent(this.mBtn, this.onClick);
		if (param && param.exData1) {
			this.type = param.exData1;
		}
		this.message(MsgConst.GASHAPON_BAG, this.upCn)
		this.upCn();

	}



	public onClick(e: egret.TouchEvent) {
		switch (e.currentTarget) {
			case this.mBtn:
				Proxy.gashapon.getAllRw(this.type);
				break;
			default:
				break;
		}


	}
	public upCn() {
		if (!GameCache.gashapon.bagSeries[this.type]) {
			return;
		}
		let bagList = GlobalFun.objChangeList(GameCache.gashapon.bagSeries[this.type]);
		this.setListData(this.list, bagList);

	}




}