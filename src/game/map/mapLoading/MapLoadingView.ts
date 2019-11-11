/**
 * 过场动画
*/
class MapLoadingView extends BaseEuiWindow {

	public tips: eui.Label;
	public progress: eui.Group;
	public percent: eui.Label;

	private loadList: any[] = [];
	private total: number;
	private cur: number;
	private maxW: number = 380;
	private _w: number;

	public constructor() {
		super(LayerManager.UI_Guide);
		this.skinName = "MapLoadingViewSkin";
		this.closeDispose = false;
	}

	open(p: ViewProp) {
		super.open();
		this.focusToStage();
		App.TimerManager.add(500, this.onFrame, this, 10, this.exit, this);
		this.message(MsgConst.UPDATE_SCENE_MAPITEM, this.onStart);
		this._w = 0;
		this.tips.text = GameConfig.clientGlobal.maptips[MathUtils.limitInteger(0, GameConfig.clientGlobal.maptips.length)];
	}

	resizeStage() {
		super.resizeStage();
	}

	close() {
		super.close();
	}

	private onFrame() {
		this.updatePro();
	}
	private updatePro() {
		let value = this.cur / this.total;
		if (isNaN(value)) value = 0;
		egret.Tween.removeTweens(this);
		egret.Tween.get(this).to({ w: value }, 500).call(this.checkCom, this);
	}

	private checkCom() {
		if (this.w >= 1) {
			this.exit();
		}
	}

	private set w(value: number) {
		if (value > 1) value = 1;
		this._w = value;
		this.progress.x = this.maxW * value;
		this.percent.text = Math.ceil((value) * 100) + "%";
	}

	private get w() {
		return this._w;
	}

	private onStart() {
		this.loadList = GameCache.map.loadlingList;
		this.total = this.loadList.length;
		this.cur = 0;
		this.w = 0;
		this.loadNext();
		this.removeMessage();
	}

	private loadNext() {
		let url = this.loadList.shift();
		RES.getResByUrl(url, this.loadCom, this);
	}

	private loadCom() {
		this.cur++;
		if (this.loadList.length) {
			this.loadNext();
		} else {
			App.TimerManager.removeAll(this);
			egret.Tween.removeTweens(this);
			egret.Tween.get(this).to({ w: 1 }, 500).call(this.checkCom, this);
		}
	}

	private exit() {
		if (!GameCache.map.dataInit) {
			console.log(">>>>> 无法进入场景");
			App.TimerManager.add(500, this.onFrame, this, 6, this.exit, this);
			return;
		}
		egret.Tween.removeTweens(this);
		this.closeView();
		GameCache.map.showLoading = false;
		this.loadList.length = 0;
		App.MessageCenter.dispatch(MsgConst.ENTER_SCENE);
	}


}