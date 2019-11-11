/*
 * @Description: 额外奖励窗口
 * @Author: liangzhaowei
 * @Date: 2019-10-14 13:59:33
 */


class RewardExWin extends BaseEuiWindow {
	public constructor() {
		super(LayerManager.UI_Tips);
		this.skinName = "RewardExWinSkin";
	}

	public gRw: eui.Group;
	public layout: eui.TileLayout;

	private itemList: ItemList;



	public init(): void {
		let layout: eui.TileLayout = new eui.TileLayout();
		layout.requestedRowCount = 2;
		layout.horizontalGap = 25;
		this.layout = layout;
		this.gRw.layout = layout;

		if (!this.itemList) {
			this.itemList = ObjectPool.get(ItemList);
		}


	}

	/**用于同一处理打开时的操作 */
	public open(param: ViewProp = null) {
		super.open();

		/**设置背景透明度 */
		if (this.myParent["setRectAlpha"]) {
			this.myParent["setRectAlpha"](0.9);
		}

		this.addTouchEvent(this, this.closeView);

		if (param && param.exData1) {
			let list = [];

			if (param.exData1 instanceof Array) {
				list = param.exData1;
			}
			else {
				return;
			}

			if (list.length) {
				this.itemList.setData(list, this.gRw);
				/**逐渐弹出效果 */
				for (let i = 0; i < this.itemList.itemArr.length; i++) {
					GlobalFun.createItemEffect(this.itemList.itemArr[i], i);
				}
				if (list.length < 6) {
					this.y = 188;
					this.layout.requestedRowCount = 1
				}
				else {
					this.y = 152;
					this.layout.requestedRowCount = 2;
				}
			}
		}
	}

	public dispose(): void {
		super.dispose();
		this.itemList.dispose();
	}

	public close(param: ViewProp = null) {
		/**重置回来背景的透明度 */
		if (this.myParent["resetAlpha"]) {
			this.myParent["resetAlpha"]();
		}
		super.close();
	}



}