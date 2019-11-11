/**
 * 伤害飘血
*/
class HurtTxtManager extends BaseClass {

	private hurtDic: any = {};
	private volist: HurtVo[] = [];

	public constructor() {
		super();

		App.TimerManager.addFrame(10, this.onTimer, this);
	}

	private onTimer() {
		let i = 0;
		let a = this.volist.length;
		if (a > 10) {
			this.volist.splice(0, a - 10);
			a = 10;
		}
		if (a == 0) return;

		let dic = {};
		for (; i < a; i++) {
			let vo = this.volist[i];
			if (!vo.actor || !vo.actor.pro) continue;
			let cy = vo.actor.cellXY.y * 1000 + Math.floor(vo.actor.cellXY.x / 5);
			let arr;
			if (vo.type != HurtType.SELF) {
				arr = dic[cy];
				if (!arr) {
					arr = dic[cy] = [];
				}
				arr.push(vo);
				vo.y = vo.actor.y - 120 //- arr.length * 20;
				vo.x = vo.actor.x + (arr.length & 1) * 40;
				vo.delay = arr.length - 1;
			} else {
				vo.y = vo.actor.y - 120;
				vo.x = vo.actor.x;
				this.playSingle(vo, 1);
			}
			//this.playSingle(vo);
		}
		this.volist.length = 0;
		for (let key in dic) {
			let arr = dic[key];
			let i = 0, a = arr.length;
			for (; i < a; i++) {
				this.playSingle(arr[i], a - 1);
			}
		}
		dic = null;
	}

	private playSingle(vo: HurtVo, len: number) {
		let txt = ObjectPool.get(HurtTxt) as HurtTxt;
		App.ThingManager.titleLayer.addChild(txt);
		txt.y = vo.y;
		txt.x = vo.x;
		txt.setData(vo.recog, vo.value, vo.type, vo.bon, vo.delay, len);

		let arr: HurtTxt[] = this.hurtDic[vo.recog];
		if (!arr) {
			arr = this.hurtDic[vo.recog] = [];
		}
		arr.push(txt);

		vo.dispose();
		ObjectPool.push(vo);
	}

	/**
	 * recog 玩家句柄
	 * value 伤害值
	 * bon 是否暴击
	 * type 类型
	 * 
	*/
	public play(recog: number, value: number, bon: boolean, type: number, actor: BaseThing) {
		if (!actor || !actor.isInView) return;

		let vo: HurtVo = ObjectPool.get(HurtVo);
		vo.recog = recog;
		vo.value = value;
		vo.bon = bon;
		vo.type = type;
		vo.actor = actor;
		this.volist.push(vo);

		// vo.y = vo.actor.y - 120;
		// vo.x = vo.actor.x;
		// this.playSingle(vo);
	}

	public remove(txt: HurtTxt, needDelete: boolean = true) {
		egret.Tween.removeTweens(txt);
		App.DisplayUtils.removeFromParent(txt);
		ObjectPool.push(txt);
		if (needDelete) {
			let arr: HurtTxt[] = this.hurtDic[txt.recog];
			if (arr) {
				let i = 0;
				let a = arr.length;
				let em: boolean = true;
				for (; i < a; i++) {
					if (arr[i] == txt) {
						arr.splice(i, 1);
						i--;
						a--;
						break;
					}
				}
				if (a == 0) delete this.hurtDic[txt.recog];
			}
		}
	}

	public removeAll() {
		for (let recog in this.hurtDic) {
			let arr: HurtTxt[] = this.hurtDic[recog];
			if (arr) {
				let i = 0;
				let a = arr.length;
				for (; i < a; i++) {
					this.remove(arr[i], false);
				}
			}
		}
		this.hurtDic = {};
	}
}

class HurtTxt extends egret.DisplayObjectContainer {
	public recog: number;

	private _value: any = 0;
	private _type: string = "0";
	private _gap: number;
	private _numCon: egret.DisplayObjectContainer;

	public constructor() {
		super();
		this.touchEnabled = this.touchChildren = false;
		this._gap = -16;

		this._numCon = new egret.DisplayObjectContainer();
		this.addChild(this._numCon);

		this.touchEnabled = this.touchChildren = false;
		//this.filters = [new egret.GlowFilter(0x000000, 1, 3, 3, 12)];
	}

	public setData(recog: number, value: number, type: number, bon: boolean, delay: number, len: number) {
		this.recog = recog;
		this._type = this.getType(type, bon);
		this._value = value != 0 ? value : SpecialHurtBm.MISS;
		this.upNumber();
		this.scaleX = this.scaleY = 1;
		this.alpha = 1;
		this.x = this.x - (this.width >> 1);
		let t = egret.Tween.get(this);
		if (delay) {
			this.visible = false;
			t = t.wait(delay * 50).call(this.onAdd, this);
		}
		if (type == HurtType.NORMAL) {
			this.scaleX = this.scaleY = 1;
			let sc = 1.2;
			t.to({ scaleX: sc, scaleY: sc, y: this.y - 60 }, 50, egret.Ease.cubicOut);
			if (len != delay) {
				//t.wait(50);
				//t.to({ scaleX: 0.8, scaleY: 0.8 }, 50, egret.Ease.cubicOut);
			} else {
				//t.wait(100);
			}
			t.to({ scaleX: 0.6, scaleY: 0.6, alpha: 0, y: this.y - 280 }, 1000, egret.Ease.cubicInOut).call(this.dispose, this);

		} else if (type == HurtType.SELF) {
			t.to({ y: this.y - 120, alpha: 0 }, 1500).call(this.dispose, this);
		}
	}
	protected upNumber(): void {
		let numStr: string = this._value + "";
		let tempBm: egret.Bitmap;
		let lastX: number = 0;
		let num: number = this._numCon.numChildren;
		let len: number = numStr.length;
		let i: number = 0;
		for (; i < len; i++) {
			if (i < num) {
				tempBm = this._numCon.getChildAt(i) as egret.Bitmap
			} else {
				tempBm = ObjectPool.get(egret.Bitmap);
				this._numCon.addChild(tempBm);
			}
			if (i == 0) {
				tempBm.scaleX = tempBm.scaleY = 1;
				tempBm.y = 0;
			} else {
				tempBm.scaleX = tempBm.scaleY = MathUtils.limit(0.9, 0.95);
				tempBm.y = (i & 1) == 1 ? 5 : 3;
			}
			tempBm.texture = this.getSingleNumPic(numStr.charAt(i), this._type);
			tempBm.x = lastX;
			lastX = tempBm.x + tempBm.width + this._gap;
		}
		while (len < num) {
			let bit = this._numCon.removeChildAt(i);
			this.poolBit(bit);
			len++;
		}
		if (!tempBm) {
			return;
		}
		this.width = tempBm.x + tempBm.width;
		this.height = tempBm.height;
	}

	private onAdd() {
		this.visible = true;
	}

	private getType(t, bon): string {
		if (t == HurtType.SELF) {
			return "sel";
		}
		if (t == HurtType.NORMAL) {
			return bon ? "bon" : "nor";
		}
	}

	//获得单个数字Bitmap
	protected getSingleNumPic(num: string, type: string): egret.Texture {
		if (num == ".")
			num = "dot";
		return RES.getRes(`${type}_${num}_png`);
	}

	protected poolBit(bit) {
		bit.scaleX = bit.scaleY = 1;
		bit.x = bit.y = 0;
		ObjectPool.push(bit);
	}


	public dispose() {
		App.HurtTxtManager.remove(this);
	}
}
class HurtVo {
	recog: number;
	value: number;
	bon: boolean;
	type: number;
	actor: BaseThing;
	x: number;
	y: number;
	delay: number;

	dispose() {
		this.recog = null;
		this.value = null;
		this.bon = false;
		this.type = null;
		this.actor = null;
		this.x = null;
		this.y = null;
		this.delay = null;
	}
}

class HurtType {
	static SELF: number = -1;
	static NORMAL: number = 0;
	static CRIT:number = 1;
}

class SpecialHurtBm {
	static MISS = "m";
}