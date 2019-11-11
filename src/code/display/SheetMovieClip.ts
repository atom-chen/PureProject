/**共享图集的MovieClip*/
class SheetMovieClip extends egret.MovieClip {
	private static mcData: Object = {};
	public sheetName: string;
	public rate: number;
	public constructor() {
		super();
	}

	public loadFile(url: string): void {
		if (this.sheetName == null) {
			return;
		}
		if (SheetMovieClip.mcData[url]) {
			this.movieClipData = SheetMovieClip.mcData[url];
			if (this.movieClipData.frames.length > 1) {
				this.play(-1);
			}
			else {
				this.gotoAndStop(1);
			}
			return;
		}

		let self = this;
		let key = url;
		if (key.indexOf(`/`) == -1) {
			key =  key;
		}
		RES.getResByUrl(this.sheetName, function (e): void {
			RES.getResByUrl(key + ".json", function (json): void {
				let mcDataFactory = new egret.MovieClipDataFactory();
				mcDataFactory.texture = RES.getRes(this.sheetName + "." + url + "_png");
				mcDataFactory.mcDataSet = json;
				let movieClipData = mcDataFactory.generateMovieClipData();
				movieClipData.frameRate = this.rate ? this.rate : movieClipData.frameRate;
				if (movieClipData.frameRate >= 24) {
					movieClipData.frameRate = 8;
				}
				SheetMovieClip.mcData[url] = movieClipData;
				this.movieClipData = movieClipData;
				if (movieClipData.frames.length > 1) {
					this.play(-1);
				}
				else {
					this.gotoAndStop(1);
				}
				mcDataFactory.clearCache();
			}, self, RES.ResourceItem.TYPE_JSON);
		}, self, RES.ResourceItem.TYPE_SHEET);
	}

	public dispose(): void {
		this.stop();
		App.DisplayUtils.removeFromParent(this);
		ObjectPool.push(this);
	}

	public static create(): SheetMovieClip {
		return ObjectPool.get(SheetMovieClip);
	}
}