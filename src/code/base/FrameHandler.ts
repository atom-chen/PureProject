/**
 * 分帧执行函数，只执行一次
 * 所有添加到这里的函数，都会放进队列，每帧执行一个
*/
class FrameHandler extends BaseClass {
	private _handler: Handler[] = [];

	public constructor() {
		super();
	}
	public add(call: Function, thisC: any, checkHas: boolean, ...args) {
		if (checkHas) {
			let i = 0, a = this._handler.length;
			for (; i < a; i++) {
				if (this._handler[i].method == call && this._handler[i].caller == thisC) {
					this._handler[i].args = args;
					return;
				}
			}
		}
		let h: Handler = Handler.create(thisC, call, args);
		this._handler.push(h);
	}

	public remove(call: Function, thisC) {
		let i = 0;
		let list = this._handler;
		let l = list.length;
		for (; i < l; i++) {
			let h = list[i];
			if (h.method == call && h.caller == thisC) {
				h.dispose();
				list.splice(i, 1);
				break;
			}
		}
	}

	public has(call, thisC): boolean {
		let i = 0;
		let list = this._handler;
		let l = list.length;
		for (; i < l; i++) {
			let h = list[i];
			if (h.method == call && h.caller == thisC) {
				return true;
			}
		}
		return false;
	}

	public onFrame(): void {
		let h = this._handler.shift();
		if (h) {
			h.run();
		}
	}
}