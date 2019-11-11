class ItemExpend extends eui.Component implements eui.UIComponent {
	public label: string = "消耗：";

	public countTxt: eui.Label;
	public gainWay: eui.Label;
	public lab: eui.Label;
	public numColor_0 = 0x00a2ff;
	private iconImg: eui.Image;
	private _item: number = 0;
	private _needNum: number = 0;
	private _packType: number = 0;
	private _haveNum: number = 0;
	public showHaveNum: boolean = true;
	private _dataItem: any = null;
	public constructor() {
		super();
		this.skinName = "ItemExpendSkin";
		// if (GlobalVar.isWeXin) this.skinName = "ItemExpendSkin";
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}


	protected childrenCreated(): void {
		super.childrenCreated();
		this.gainWay.textFlow = TextFlowUtils.generateTextFlow(`<(u)${this.gainWay.text}>`);
		this.update();
	}

	public $onAddToStage(stage: egret.Stage, nestLevel: number): void {
		super.$onAddToStage(stage, nestLevel);
		App.MessageCenter.addListener(MsgConst.BAG_INFO, this.update, this);
		App.MessageCenter.addListener(MsgConst.BAG_ITEM_NUM, this.update, this);
		App.MessageCenter.addListener(MsgConst.PROPERTY + PropId.AP_COIN, this.update, this);
		App.MessageCenter.addListener(MsgConst.PROPERTY + PropId.AP_YUANBAO, this.update, this);
		this.gainWay.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openTips, this);
		this.iconImg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openTips, this);
		// App.MessageCenter.addProperty(this.update, this, ATTRIBUTE.GOLD, ATTRIBUTE.CONTRIBUTION, ATTRIBUTE.COIN, ATTRIBUTE.ZHENFA_RELIC);
		// this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
		this.update();
	}

	private onTouch(): void {
		if (this._item) {
			// App.ViewManager.open(ViewConst.ITEMTIPSWIN, this._item);
		}
	}

	private openTips(): void {
		let item: StdItem = GameConfig.item[this._item];
		let v = new ViewProp();
		v.itemData = item;
		App.ViewManager.open(ViewConst.ITEMTIPS, v);
	}

	public $onRemoveFromStage(): void {
		super.$onRemoveFromStage();
		this.gainWay.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.openTips, this);
		this.iconImg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.openTips, this);
		// this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
		App.MessageCenter.removeAll(this);
	}

	public set item(id: number) {
		this._item = id;
		this.update();
	}

	public get item(): number {
		return this._item;
	}

	public set needNum(value: number) {
		this._needNum = value;
		this.update();
	}
	public get needNum(): number {
		return this._needNum;
	}
	public get have(): number {
		return this._haveNum;
	}
	public get isExpend(): boolean {
		return this._haveNum >= this._needNum;
	}
	public get dataItem(): any {
		return this._dataItem;
	}

	public checkEnough(): boolean {
		if (this._haveNum < this._needNum) {
			if (this._item == GlobalVar.GOLD) {
				GlobalFun.gotoCharge();
			} else {
				this.openTips();
			}
		}
		return this._haveNum >= this._needNum;;
	}

	public setData(item: number, needNum: number = undefined, packType: number = BagType.BAG_TYPE_OTHER): void {
		this._item = item;
		this._needNum = needNum;
		this._packType = packType;
		this.update();
	}

	public setItemName() {
		if (this._item) {
			let item: StdItem = GameConfig.item[this._item] ? GameConfig.item[this._item] : null;
			this.lab.text = item ? item.name + "：" : "";
		}
	}

	private update(msg?): void {
		if (!this.iconImg || !this._item) return;
		if (!GameConfig.item[this._item]) return;
		this._dataItem = GameConfig.item[this._item];
		let item: StdItem = GameConfig.item[this._item]
		let strImg = item ? item.icon : "";
		this.iconImg.source = RES_DIR_IMAGES_ITEM + strImg + ".png";
		this["stuffName"] && (this["stuffName"].text = item.name);
		if (this._needNum != undefined) {
			let str: string = GlobalFun + "";
			if (this.showHaveNum) {
				this._haveNum = this.haveNumber();
				let haveStr = GlobalFun.numCut(this._haveNum);
				// str = this._haveNum >= this._needNum ? TextFlowUtils.color(CommonUtils.overLength(this._haveNum) + "", "0x00FF00") : TextFlowUtils.color(this._haveNum + "", "0xFF0000");
				str = haveStr + "";
				str = str + " / " + this._needNum;
				str = this._haveNum >= this._needNum ? `<(c${this.numColor_0})${str}>` : `<(c0xFF0000)${str}>`;
				if (this.currentState == "single") str = `<(c${this.numColor_0})${this._needNum}>`;
			}
			this.countTxt.textFlow = TextFlowUtils.generateTextFlow(str);
		} else {
			this.countTxt.textFlow = TextFlowUtils.generateTextFlow(this.haveNumber() + "");
		}
	}
	private haveNumber(): number {
		let num: number;
		return num = GameCache.bag.itemCount(this._item);
	}


	public cleanMsg(): void {
		App.MessageCenter.removeListener(MsgConst.BAG_INFO, this);
		App.MessageCenter.removeListener(MsgConst.BAG_ITEM_NUM, this);
	}

	public dispose(): void {
		if (this.iconImg) {
			this.iconImg.source = null;
		}
	}
}