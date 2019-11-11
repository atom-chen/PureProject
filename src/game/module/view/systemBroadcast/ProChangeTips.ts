/*
 * @Description: 属性变更飘字
 * @Author: guolinsen
 * @Date: 2019-07-31 11:28:01
 * @LastEditTime: 2019-09-18 14:30:17
 */
class ProChangeTips extends BaseClass {
	private curShow: ProChangeItem[] = [];
	private _bottom: number; //最底部的坐标
	private _h: number = 34; //每行高度

	public constructor() {
		super();
	}

	public addPro(list: any[]): void {
		this.onShow(list);
	}

	private onShow(list: any[]): void {

		for (let i: number = 0; i < this.curShow.length; i++) {
			let tar: ProChangeItem = this.curShow[i];
			tar.disappear();
		}
		this.curShow.length = 0;
		App.TimerManager.remove(this.checkClear, this);

		this.show(list);
	}

	public show(data: any[]): void {
		if (this.curShow.length == 0)
			App.TimerManager.add(50, this.checkClear, this);

		let i: number = 0;
		let len: number = data.length;
		this.reset(len);
		let item: ProChangeItem;
		this._bottom = 300;
		for (; i < len; i++) {
			item = ObjectPool.get(ProChangeItem);
			item.setData(data[i]["type"], data[i]["value"]);
			LayerManager.UI_Message.addChild(item);
			this.curShow.push(item);
			item.y = this._bottom;
			item.time = App.TimerManager.getSyncTime() + 2000;
			egret.Tween.get(item).to({ y: this._bottom - (len - i) * this._h }, 300);
		}
	}

	private reset(num: number): void {
		let i: number = 0;
		let len: number = this.curShow.length;
		let r: number = num + len;
		let item: ProChangeItem;
		for (; i < len; i++) {
			item = this.curShow[i];
			egret.Tween.removeTweens(item);
			egret.Tween.get(item).to({ y: this._bottom - (r - i) * this._h }, 300);
		}
	}
	private checkClear(): void {
		if (!this.curShow.length) {
			App.TimerManager.remove(this.checkClear, this);
			return;
		}

		let time: number = App.TimerManager.getSyncTime();
		for (let i: number = 0; i < this.curShow.length; i++) {
			let tar: ProChangeItem = this.curShow[i];
			if (tar.time <= time) {
				egret.Tween.removeTweens(tar);
				this.curShow.splice(i, 1);
				i--;
				tar.disappear();
			}
		}
	}
}

class ProChangeItem extends egret.DisplayObjectContainer {
	private attName: eui.Image;
	private attValue: NumberMC;
	public time: number;
	public constructor() {
		super();
		this.touchEnabled = this.touchChildren = false;

		this.attName = new eui.Image;
		this.attName.x = 50;
		this.attName.y = 4;
		this.addChild(this.attName);

		this.attValue = new NumberMC();
		this.attValue.y = 6;
		this.addChild(this.attValue);
	}

	public setData(type: number, value: number): void {
		let nTx:egret.Texture = RES.getRes("num_json.pro_type_" + type + "_png");
		this.attName.source = nTx;
		let str;
		if (value > 0) {
			this.attValue.updateType("num_json.pro_green_");
			str = "+" + value;
		} else {
			this.attValue.updateType("num_json.pro_red_");
			str = value;
		}
		if(!nTx) return;
		this.attValue.x = this.attName.x + nTx.textureWidth + 2;
		this.attValue.value = str;
		this.x = 120 - this.attValue.x;
	}

	public disappear(): void {
		egret.Tween.get(this).to({ x: -this.width }, 300, egret.Ease.sineIn).call(this.dispose, this)
	}

	private dispose(): void {
		App.DisplayUtils.removeFromParent(this);
		egret.Tween.removeTweens(this);
		ObjectPool.push(this);
	}
}