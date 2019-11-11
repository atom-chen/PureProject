// /*
//  * @Description: 新手指引
//  * @Author: guolinsen
//  * @Date: 2019-09-23 10:21:24
//  */
// class NoviceGuideView extends BaseCustComponent {
// 	private curGuide: StdNoviceguide;
// 	private curStep: number;
// 	private curTaget: any;
// 	private curVisible: boolean;
// 	private guidObj: any;
// 	private _dispose = false;
// 	private pos: egret.Point;

// 	public text: eui.Label;
// 	private eff: MovieClip;
// 	private arrow: NoviceGuideArrow;

// 	public constructor(dispose: boolean = true) {
// 		super();
// 		//this.skinName = "NoviceGuideSkin";
// 		this._dispose = dispose;
// 		this.pos = new egret.Point();
// 		this.arrow = new NoviceGuideArrow();
// 		this.addChild(this.arrow);
// 		this.eff = App.DisplayUtils.addEffectToObj(this, "guide_0_1", -1, 0, 0);
// 		this.touchEnabled = this.touchChildren = false;

// 	}
// 	//用于子类继承
// 	protected init(): void {
// 		this.addTouchEvent(this, this.onTouch);
// 	}

// 	show(data: any) {
// 		this.guidObj = data;
// 		this.curStep = 0;
// 		this.curGuide = null;
// 		this.curTaget = null;
// 		this.curVisible = false;
// 		if (!App.TimerManager.isExists(this.onRefresh, this)) {
// 			App.TimerManager.add(200, this.onRefresh, this);
// 		}
// 		this.eff.play(-1);
// 		this.next();
// 	}

// 	hide() {
// 		this.eff.stop();
// 		App.DisplayUtils.removeFromParent(this);
// 		App.TimerManager.removeAll(this);
// 	}

// 	/**引导回退*/
// 	private back() {
// 		if (this.curStep >= 2) {
// 			this.curStep = this.curStep - 2;
// 			this.next();
// 		}
// 	}

// 	private onTouch() {
// 		if (this.curGuide.command == "click") {
// 			this.curTaget.dispatchEvent(new egret.TouchEvent(egret.TouchEvent.TOUCH_TAP, true));
// 			this.next();
// 		}
// 	}

// 	private onTargetTouch() {
// 		if (this.curGuide.command == "click") {
// 			this.next();
// 		}
// 	}

// 	private onRefresh() {
// 		this.curGuide && this.parseTarget();
// 	}

// 	private next() {
// 		if (!this.guidObj) return;
// 		this.curStep++;
// 		if (this.guidObj[this.curStep]) {
// 			this.curGuide = this.guidObj[this.curStep];
// 			this.parseTarget();
// 		} else {
// 			this.complete();
// 		}
// 	}

// 	private complete() {
// 		this.guidObj = null;
// 		this.curStep = null;
// 		this.curGuide = null;
// 		this.clearTarget();
// 		this.curVisible = false;
// 		if (this._dispose) {
// 			this.dispose();
// 		} else {
// 			this.hide();
// 		}
// 	}

// 	private parseTarget() {
// 		let guide = this.curGuide;
// 		let arr = guide.target.split(".");
// 		let tar: any;
// 		let len: number = arr.length;
// 		let vis: boolean = true;
// 		let win: any;
// 		for (let i = 0; i < arr.length; i++) {
// 			if (i == 0) {
// 				if (App.ViewManager.isShow(ViewConst[arr[0]])) {
// 					tar = App.ViewManager.getView(ViewConst[arr[0]]);
// 					win = tar;
// 				}
// 			} else {
// 				if (arr[i].indexOf("[") == 0) {
// 					let e = parseInt(arr[i].replace(/[^0-9]/g, ""));
// 					if (tar.numChildren < e + 1) {
// 						tar = null;
// 						break;
// 					}
// 					if (tar instanceof eui.List) {
// 						tar = tar.getElementAt(e);
// 					} else {
// 						tar = tar.getElementAt(e) || tar.getChildAt(e);
// 					}
// 				} else {
// 					if (arr[i].indexOf("%") != -1) {
// 						let tArr = arr[i].split("%");
// 						tar = tar[tArr[0]][tArr[1]];
// 					} else {
// 						tar = tar[arr[i]];
// 					}
// 				}
// 			}
// 			if (!tar || !tar.visible) {
// 				vis = false;
// 				break;
// 			}
// 		}
// 		// if (!win) {
// 		// 	this.clearTarget();
// 		// 	App.DisplayUtils.removeFromParent(this);
// 		// 	this.back();
// 		// 	return;
// 		// }
// 		if (this.curTaget != tar || this.curVisible != vis) {
// 			this.clearTarget();
// 			this.curTaget = tar;
// 			this.curVisible = vis && tar.stage;
// 			if (this.curVisible) {
// 				this.showTarget();
// 				this.addTarget();
// 			} else {
// 				App.DisplayUtils.removeFromParent(this);
// 			}
// 		}
// 	}

// 	private showTarget() {
// 		let parent = this.curTaget.parent;
// 		if (this.curGuide.layer) {
// 			parent = LayerManager[this.curGuide.layer];
// 			this.curTaget.parent.localToGlobal(this.curTaget.x, this.curTaget.y, this.pos);
// 			parent.globalToLocal(this.pos.x, this.pos.y, this.pos);
// 		} else {
// 			this.pos.x = this.curTaget.x;
// 			this.pos.y = this.curTaget.y;
// 		}
// 		parent.addChild(this);
// 		this.x = this.pos.x;
// 		this.y = this.pos.y;
// 		if (this.curGuide.offset) {
// 			this.x = this.pos.x + this.curGuide.offset[0];
// 			this.y = this.pos.y + this.curGuide.offset[1];
// 		} else {
// 			this.x = this.pos.x + (this.curTaget.width >> 1);
// 			this.y = this.pos.y + (this.curTaget.height >> 1);
// 		}
// 		this.arrow.setData(this.curGuide.text, this.curGuide.dir);
// 		//this.switchDir(this.curGuide.dir);
// 	}

// 	// private switchDir(dir: number) {
// 	// 	if (dir == 1) {
// 	// 		this.eff.x = 60;
// 	// 		this.eff.y = -60;
// 	// 		this.eff.scaleX = 1;
// 	// 		this.eff.scaleY = 1;
// 	// 		this.eff.rotation = -90;
// 	// 	} else if (dir == 2) {
// 	// 		this.eff.x = 60;
// 	// 		this.eff.y = 60;
// 	// 		this.eff.scaleX = 1;
// 	// 		this.eff.scaleY = 1;
// 	// 		this.eff.rotation = 0;
// 	// 	}
// 	// 	else if (dir == 3) {
// 	// 		this.eff.x = -60;
// 	// 		this.eff.y = 60;
// 	// 		this.eff.scaleX = -1;
// 	// 		this.eff.scaleY = 1;
// 	// 		this.eff.rotation = 0;
// 	// 	}
// 	// 	else if (dir == 4) {
// 	// 		this.eff.x = -60;
// 	// 		this.eff.y = -60;
// 	// 		this.eff.scaleX = -1;
// 	// 		this.eff.scaleY = 1;
// 	// 		this.eff.rotation = 90;
// 	// 	}
// 	// }

// 	private addTarget() {
// 		this.curTaget.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTargetTouch, this, true);
// 	}

// 	private clearTarget() {
// 		if (this.curTaget) {
// 			this.curTaget.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTargetTouch, this, true);
// 			this.curTaget = null;
// 		}
// 	}
// }