class NumberMC extends eui.Component {
	public roll: boolean = false;
	public rollHand: Handler;	//滚动完毕回调
	public rolling: boolean; //正在滚动中
	private _value: any = 0;
	private _rollValue: number;
	private _type: string = "0";
	private _init: boolean = false;
	private _gap: number = 0;
	private _mask: eui.Rect;
	private _cnValue: any;

	private _alignV: string = "top";
	private _alignH: string = "left";

	public constructor($value: number = 0, $type: string | number = "0", $gap: number = 0) {
		super();
		this._value = $value;
		this._type = $type + "";
		this._gap = $gap;
	}

	/**更新图集类型，不马上更新显示*/
	public updateType(type) {
		this._type = type;
	}

	/**从对象池获取一个 */
	static pool($value: number = 0, $type: number = 0): NumberMC {
		return ObjectPool.get(NumberMC, $value, $type);
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}
	public childrenCreated(): void {
		super.childrenCreated();
		this._init = true;
		if (this._type == "0") return;
		this.upNumber();
	}

	public set value(num) {
		if (this._value == num)
			return;
		this._value = num;
		this.rolling = false;
		this.upNumber();
	}

	public get value(): any {
		if (this.rolling)
			return this._rollValue;
		return this._value;
	}

	public set type(num) {
		if (this._type == num)
			return;
		this._type = num;
		this.upNumber();
	}

	public get type(): any {
		return this._type;
	}

	public set gap(num) {
		if (this._gap == num)
			return;
		this._gap = num;
		this.upNumber();
	}

	public get gap(): number {
		return this._gap;
	}

	private initMask(): void {
		// if (!this._mask) {
		// 	this._mask = new eui.Rect();
		// }
		// this._mask.width = this.width;
		// this._mask.height = this.height;
		// this.addChild(this._mask);
		// this.mask = this._mask;
	}

	public set alignV(val: "mid" | "top" | "bottom") {
		if (this._alignV === val)
			return;
		this._alignV = val;
		this.upAlign();
	}

	public set alignH(val: "center" | "left" | "right") {
		if (this._alignH === val)
			return;
		this._alignH = val;
		this.upAlign();
	}

	private upAlign(): void {
		switch (this._alignH) {
			case "center":
				this.anchorOffsetX = this.width / 2;
				break;
			case "left":
				this.anchorOffsetX = 0;
				break;
			case "right":
				this.anchorOffsetX = this.width;
				break;
			default:
				this.anchorOffsetX = 0;
		}
		switch (this._alignV) {
			case "mid":
				this.anchorOffsetY = this.height / 2;
				break;
			case "top":
				this.anchorOffsetY = 0;
				break;
			case "bottom":
				this.anchorOffsetY = this.height;
				break;
			default:
				this.anchorOffsetY = 0;
		}
	}

	private upNumber(): void {
		if (!this._init) return;
		//this.removeAll();
		let numStr: string = this._value + "";
		let tempBm: eui.Image;
		let lastX: number = 0;
		let num: number = this.numChildren;
		let len: number = numStr.length;
		let i: number = 0;
		for (; i < len; i++) {
			if (i < num) {
				tempBm = this.getChildAt(i) as eui.Image;
			} else {
				tempBm = ObjectPool.get(eui.Image);
				this.addChild(tempBm);
			}
			tempBm.source = this.getSingleNumPic(numStr.charAt(i), this._type);
			tempBm.x = lastX;
			let g = this._gap;
			if (!g) {
				let tx: egret.Texture = RES.getRes(tempBm.source);
				g = tx && tx.textureWidth;
			}
			lastX = lastX + g;
		}
		while (len < num) {
			let bit = this.removeChildAt(i) as eui.Image;
			bit.source = null;
			ObjectPool.push(bit);
			len++;
		}
		if (!tempBm) {
			return;
		}
		this.width = tempBm.x + tempBm.width;
		this.height = tempBm.height;
		this.upAlign();
		this.playRoll();
	}

	private playRoll(): void {
		if (this.roll && !this.rolling) {
			this.rolling = true;
			this._rollValue = this._value;
			this._value = 0;
			this.initMask();
			egret.Tween.removeTweens(this);
			egret.Tween.get(this).to({ rollValue: this._rollValue }, 1000).call(this.tweenComp, this);
		}
	}

	private set rollValue(num) {
		if (this._value == num)
			return;
		this._value = Math.floor(num);
		this.upNumber();
	}
	private get rollValue() {
		return this._value;
	}

	private tweenComp(): void {
		this.rolling = false;
		this.rollHand && this.rollHand.run();
	}


	//获得单个数字资源
	private getSingleNumPic(num: string, type: string): string {
		if (num == ".")
			num = "dot";
		// let bm: egret.Bitmap = ObjectPool.get(egret.Bitmap);
		// bm.texture = RES.getRes(`${type}${num}_png`);
		//return RES.getRes(`${type}${num}_png`);
		return `${type}${num}_png`;
	}

	/**数字简单的一些处理，销毁用destroy */
	private removeAll(): void {
		let len = this.numChildren;
		while (len) {
			len--;
			let bit = this.removeChildAt(len) as eui.Image;
			bit.source = null;
			ObjectPool.push(bit);
		}
	}

	public dispose(): void {
		this.removeAll();
		//ObjectPool.push(this);
	}

	/**汉子转数字处理,最高为99 */
	public set cnValue(num: number) {
		if (this._cnValue == num)
			return;
		this._cnValue = num;
		this.rolling = false;
		if (num < 10) {
			this._value = num;
		}
		if (num >= 10 && num < 20) {
			let mod = num % 10 == 0 ? "" : num % 10
			this._value = "X" + mod;
		}
		if (num >= 20) {
			let mod = num % 10 == 0 ? "" : num % 10
			this._value = Math.floor(num / 10) + "X" + mod;
		}
		this.upNumber();
	}
}
window["NumberMC"] = NumberMC;