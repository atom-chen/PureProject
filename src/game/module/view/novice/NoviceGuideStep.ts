class NoviceGuideStep extends BaseCustComponent {

	private curGuide: StdNoviceguide;
	private curStep: number;
	private curTaget: any;
	private guidObj: any;
	private _dispose = false;
	private pos: egret.Point;
	private isComplete: boolean;

	public text: eui.Label;
	private eff: MovieClip;
	private arrow: NoviceGuideArrow;

	public constructor(dispose: boolean = true) {
		super();
		this._dispose = dispose;
		this.pos = new egret.Point();
		this.arrow = new NoviceGuideArrow();
		this.addChild(this.arrow);
		this.eff = App.DisplayUtils.addEffectToObj(this, "guide_0_1", -1, 0, 0);
		this.touchEnabled = this.touchChildren = false;
	}

	start(data: any) {
		this.isComplete = false;
		this.guidObj = data;
		this.curStep = 0;
		this.curGuide = null;
		this.curTaget = null;
		if (!App.TimerManager.isExists(this.onRefresh, this)) {
			App.TimerManager.add(200, this.onRefresh, this);
		}
		this.eff.play(-1);
		this.next();
	}


	hide(stop?) {
		this.eff.stop();
		App.DisplayUtils.removeFromParent(this);
		stop && App.TimerManager.removeAll(this);
	}

	private complete() {
		this.guidObj = null;
		this.curStep = null;
		this.curGuide = null;
		this.clearTarget();
		if (this._dispose) {
			this.dispose();
		} else {
			this.hide();
		}
	}

	private next() {
		if (!this.guidObj) return;
		this.curStep++;
		if (this.guidObj[this.curStep]) {
			this.curGuide = this.guidObj[this.curStep];
			this.parseView();
		} else {
			this.complete();
		}
	}

	private back() {
		if (!this.guidObj) return;
		if (this.curStep <= 1) {
			this.hide(false);
			return;
		}
		this.curStep--;
		if (this.guidObj[this.curStep]) {
			this.curGuide = this.guidObj[this.curStep];
			this.parseView();
		} else {
			this.complete();
		}
	}

	private onRefresh() {
		this.curGuide && this.parseView();
	}

	private parseView() {
		let flag = false;
		let guide = this.curGuide;
		if (!guide) return;
		if (guide.command[0] == "win") {
			flag = App.ViewManager.isShow(parseInt(ViewConst[guide.command[1]]));
		}
		if (flag) {
			this.next();
			return;
		}
		if (!guide.targetView) return;
		let isShow = App.ViewManager.isShow(parseInt(ViewConst[guide.targetView[0]]));
		if (!isShow) {
			if (this.isComplete) {
				this.next();
				return;
			}
			this.back();
			return;
		}
		let view = App.ViewManager.getView(parseInt(ViewConst[guide.targetView[0]]));
		for (let i = 1; i <= 2; i++) {
			if (guide.targetView[i] > -1) {
				let tar = this.tarBtnCheck(view, guide.targetView[i]);
				if (!tar) {
					tar = view["tabBtn"].getElementAt(guide.targetView[i]);
					tar && this.arrowTo(tar, false, guide.targetViewText[i - 1]);
					return;
				} else {
					view = tar;
				}
			}
		}
		this.parseTarget(view, guide.targetEle);
	}

	private parseTarget(view, el: string) {
		let arr = el.split(".");
		let len: number = arr.length;
		let vis: boolean = true;
		let tar: any = view;
		for (let i = 0; i < arr.length; i++) {
			if (arr[i].indexOf("[") == 0) {
				let e = parseInt(arr[i].replace(/[^0-9]/g, ""));
				if (tar.numChildren < e + 1) {
					tar = null;
					break;
				}
				if (tar instanceof eui.DataGroup) {
					tar = tar.getElementAt(e);
				} else {
					tar = tar.getChildAt(e);
				}
			} else {
				if (arr[i].indexOf("%") != -1) {
					let tArr = arr[i].split("%");
					tar = tar[tArr[0]][tArr[1]];
				} else {
					tar = tar[arr[i]];
				}
			}
			if (!tar) break;
			if (!tar.visible) vis = false;
		}
		if (tar && vis) {
			this.arrowTo(tar, true, null)
		} else {
			this.clearTarget();
			App.DisplayUtils.removeFromParent(this);
		}

	}

	private tarBtnCheck(view, index): any {
		if (index == -1) return view;
		let v = view["viewDic"][index];
		if (v && v.stage && v.visible) return v;
		return null;
	}

	private arrowTo(tar: any, addEvent: boolean, text: string) {
		this.clearTarget();
		this.curTaget = tar;
		addEvent && this.addTarget();
		this.showTarget(text);
	}

	private addTarget() {
		this.curTaget.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTargetTouch, this, true);
	}

	private clearTarget() {
		if (this.curTaget) {
			this.curTaget.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTargetTouch, this, true);
			this.curTaget = null;
		}
	}

	private onTargetTouch() {
		this.handlerCommand("click");
	}

	public handlerCommand(command: string, ...arg) {
		if (this.curGuide && this.curGuide.command[0] == command) {
			if (this.curGuide.isComplete) this.isComplete = true;
			this.next();
		}
	}

	private showTarget(text) {
		let parent = this.curTaget.parent;
		if (this.curGuide.layer) {
			parent = LayerManager[this.curGuide.layer];
			this.curTaget.parent.localToGlobal(this.curTaget.x, this.curTaget.y, this.pos);
			parent.globalToLocal(this.pos.x, this.pos.y, this.pos);
		} else {
			this.pos.x = this.curTaget.x;
			this.pos.y = this.curTaget.y;
		}
		parent.addChild(this);
		this.x = this.pos.x;
		this.y = this.pos.y;
		if (this.curGuide.offset) {
			this.x = this.pos.x + this.curGuide.offset[0];
			this.y = this.pos.y + this.curGuide.offset[1];
		} else {
			this.x = this.pos.x + (this.curTaget.width >> 1);
			this.y = this.pos.y + (this.curTaget.height >> 1);
		}
		this.arrow.setData(text ? text : this.curGuide.text, this.curGuide.dir);
	}
}