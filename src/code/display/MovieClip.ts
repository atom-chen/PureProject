class MovieClip extends egret.MovieClip {

	public playCount: number;
	private mcName: string;
	public rate: number;


	private _compFun: Handler;
	public autoDispose: boolean = true; //
	private _dir: boolean;

	public constructor() {
		super();
		this.touchEnabled = false;
	}

	/**直接加载播放一个资源 
	 * @param key:特效文件名
	 * @param playCount:播放次数，播放完毕自动dispose
	 * @param compFun:播放完毕回调
	*/
	public loadFile(key: string, playCount?: number, compFun?: Handler): void {
		if (playCount != undefined) {
			this.playCount = playCount;
		}
		this._compFun = compFun;
		if (key.indexOf(`/`) == -1) {
			key = key;
		}
		if (this.mcName && this.movieClipData) {
			McDataManager.removeMovieClipDataByName(this.mcName);
			this.movieClipData = null;
		}
		this.mcName = key;
		this.visible = false;
		App.TimerManager.removeAll(this);
		this.loadSource(key);
	}

	private loadSource(key: string): void {
		var mcData: egret.MovieClipData = McDataManager.getMovieClipDataByName(key);
		if (mcData) {
			this.setMcData(mcData);
			return;
		}
		var self = this;
		var movieClipData;
		let k: string = key;
		if (k.indexOf("/") > -1) {
			let i: number = k.lastIndexOf("/");
			k = key.substr(i + 1);
		}
		var mctexture = RES.getRes(k + "_png");
		if (mctexture) {
			RES.getResByUrl(key + ".json", function (d) {
				movieClipData = d;
				self.resGetComplete(key, mctexture, movieClipData);
			}, self, RES.ResourceItem.TYPE_JSON);
		} else {
			MovieClipLoader.ins().load(this, key);
		}

		//egret.startTick(this.$cresd, this);
	}

	public resGetComplete(key, mctexture, movieClipData): void {
		McDataManager.setMovieClipDataByName(key, movieClipData, mctexture);
		if (this.mcName == key) {
			var mcData: egret.MovieClipData = McDataManager.getMovieClipDataByName(key);
			this.setMcData(mcData);
		}
	}

	private setMcData(mcData: egret.MovieClipData): void {
		if (mcData) {
			if (this.rate)
				mcData.frameRate = this.rate;
			else if (mcData.frameRate == 24) {
				mcData.frameRate = 8;
			}
			this.movieClipData = mcData;
			this.play(this.playCount);
			if (this.playCount > 0) {
				App.TimerManager.addDelay(this.playTime * this.playCount, 0, 1, this.playComplete, this);
			}
			this.visible = true;
		}
	}

	/** 播放总时长(毫秒) */
	private get playTime(): number {
		if (!this.movieClipData)
			return 0;
		return 1 / this.frameRate * this.totalFrames * 1000;
	}

	// private sh: egret.Shape = new egret.Shape();
	// $cresd(): boolean {
	// 	//super["updateRenderNode"]();
	// 	var texture = this.$texture;
	// 	if (texture) {
	// 		var offsetX = Math.round(this["offsetPoint"].x);
	// 		var offsetY = Math.round(this["offsetPoint"].y);
	// 		let gr = this.sh.graphics;
	// 		gr.clear();
	// 		gr.lineStyle(1, 0xff0000);
	// 		gr.drawRect(0, 0, texture.$sourceWidth, texture.$sourceHeight);
	// 		this.sh.x = offsetX;
	// 		this.sh.y = offsetY;
	// 		if (!this.sh.parent && this.parent) {
	// 			this.parent.addChild(this.sh);
	// 		}
	// 	}
	// 	return true;
	// }

	private playComplete() {
		this.visible = false;
		if (this._compFun)
			this._compFun.run();
		if (this.autoDispose) {
			this.dispose();
		}
	}

	public dispose(): void {
		this.autoDispose = true;
		if (this.mcName && this.movieClipData) {
			McDataManager.removeMovieClipDataByName(this.mcName);
			this.mcName = null;
		}
		this.stop();
		this.playCount = 0;
		this.rate = null;
		this.movieClipData = null;
		this._compFun = null;
		this.x = this.y = 0;
		this.scaleX = this.scaleY = 1;
		this.rotation = 0;
		this.visible = false;
		this.touchEnabled = false;
		App.DisplayUtils.removeFromParent(this);
		ObjectPool.push(this);
	}

	$onAddToStage(stage, nestLevel) {
		if (this.movieClipData && this.playCount <= 0) {
			this.play(this.playCount);
		}
		super.$onAddToStage(stage, nestLevel);
	}

	$onRemoveFromStage() {
		if (this.playCount <= 0) {
			this.stop();
		}
		super.$onRemoveFromStage();
	}

	static create(): MovieClip {
		return ObjectPool.get(MovieClip);
	}
}