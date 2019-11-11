/*
 * @Description: 战力数字滚动
 * @Author: guolinsen
 * @Date: 2019-08-21 14:32:46
 * @LastEditTime: 2019-08-28 19:17:28
 */
class FightPowerRoll extends BaseEuiComponent {
	private roollIndex: number;
	private roollStartNum: number;
	private roollEndNum: number;
	private oldValue: string;
	private newValue: string;
	public handler: Handler;
	public constructor() {
		super();
	}

	public playData(oldValue, newValue) {
		if(oldValue == newValue) return;
		let old = oldValue + "";
		let cur = newValue + "";
		let a = old.length;
		let b = cur.length;
		let c = Math.max(a, b);
		while (a < c) {
			old = "0" + old;
			a++;
		}
		while (b < c) {
			cur = "0" + cur;
			b++;
		}
		this.oldValue = old;
		this.newValue = cur;

		let num: number = this.numChildren;
		let i = 0;
		let tempBm: egret.Bitmap;
		let lastX: number = 0;
		for (; i < c; i++) {
			if (i < num) {
				tempBm = this.getChildAt(i) as egret.Bitmap;
			} else {
				tempBm = ObjectPool.get(egret.Bitmap);
				this.addChild(tempBm);
			}
			tempBm.texture = this.getSingleNumPic(old.charAt(i));
			tempBm.x = lastX;
			lastX = tempBm.x + tempBm.width + 1;
		}
		while (c < num) {
			let bit = this.removeChildAt(i);
			this.poolBit(bit);
			c++;
		}
		this.width = tempBm.x + tempBm.width;
		this.height = tempBm.height;
		this.startRoll();
	}

	private startRoll() {
		this.roollIndex = this.numChildren - 1;
		this.roollStartNum = parseInt(this.oldValue.charAt(this.roollIndex));
		this.roollEndNum = parseInt(this.newValue.charAt(this.roollIndex));
		if (this.roollStartNum == this.roollEndNum) {
			this.roollNext();
		}
		App.TimerManager.removeAll(this);
		App.TimerManager.addFrame(4, this.onRoll, this);
	}

	private roollNext() {
		this.roollIndex--;
		if (this.roollIndex < 0) {
			this.complete();
			return;
		}
		this.roollStartNum = parseInt(this.oldValue.charAt(this.roollIndex));
		this.roollEndNum = parseInt(this.newValue.charAt(this.roollIndex));
		if (this.roollStartNum == this.roollEndNum) {
			this.roollNext();
		}
	}

	private onRoll() {
		this.roollStartNum++;
		if (this.roollStartNum > 9) this.roollStartNum = 0;
		let bit = this.getChildAt(this.roollIndex) as egret.Bitmap;
		if (bit) {
			bit.texture = this.getSingleNumPic(this.roollStartNum + "");
		}
		if (this.roollStartNum == this.roollEndNum) {
			this.roollNext();
		}
	}

	private complete() {
		if (this.handler) {
			this.handler.run();
		}
		App.TimerManager.removeAll(this);
	}

	protected poolBit(bit) {
		ObjectPool.push(bit);
	}

	//获得单个数字Bitmap
	protected getSingleNumPic(num: string): egret.Texture {
		if (num == ".")
			num = "dot";
		return RES.getRes(`num_json.pro_zl_${num}_png`);
	}
}