/**
 * 
 *素材地图层 
*/
class BaseMapDrawLayer extends egret.DisplayObjectContainer implements ICamera {

	private imagList: MapImage[] = [];
	private dataList: MapImageVo[] = [];

	private layerWidth: number;
	private layerHeight: number;

	private stepWidth: number;
	private stepHeight: number;

	private widthRate: number;
	private heightRate: number;

	public constructor() {
		super();
		this.touchEnabled = false;
		this.touchChildren = false;
	}

	setData(arr: MapImageVo[], lw: number, lh: number, sw: number, sh: number) {
		this.dataList = arr;
		this.layerWidth = lw;
		this.layerHeight = lh;
		this.stepWidth = sw;
		this.stepHeight = sh;
		this.widthRate = lw / sw;
		this.heightRate = lh / sh;
		this.removeAll();
	}

	focusToCenter() {
		let tx = -(this.layerWidth - App.StageUtils.getWidth()) >> 1;
		let ty = -(this.layerHeight - App.StageUtils.getHeight()) >> 1;
		this.x = tx;
		this.y = ty;
		this.onUpdate(-tx, -ty, App.StageUtils.getWidth(), App.StageUtils.getHeight());
	}

	/**
	 * 镜头左上角坐标
	*/
	moveTo(tx, ty, perX, perY) {
		 this.x = tx ;
		 this.y = ty ;
		//this.x = (-(this.layerWidth - App.StageUtils.getWidth())) / 100 * perX;
		//this.y = (-(this.layerHeight - App.StageUtils.getHeight())) / 100 * perY;
		this.onUpdate(-this.x, -this.y, App.StageUtils.getWidth(), App.StageUtils.getHeight());
	}

	onUpdate(x, y, w, h) {
		let i = 0;
		let len = this.dataList.length;
		let hasUpdate = false;
		for (; i < len; i++) {
			let d: MapImageVo = this.dataList[i];
			let show = d.onScreen(x, y, w, h);
			let img = this.imagList[i];
			if (show) {
				if (!img) {
					img = new MapImage();
					img.setData(d);
					this.imagList[i] = img;
				}
				if (!img.parent) {
					hasUpdate = true;
					this.addChild(img);
				}
			} else {
				if (img && img.parent) this.removeChild(img);
			}
		}
		if (hasUpdate) {
			this.$children.sort(this.sortImg);
		}
	}

	private sortImg(d1: MapImage, d2: MapImage): number {
		if (d1.data.index > d2.data.index) {
			return 1;
		} else if (d1.data.index < d2.data.index) {
			return -1;
		} else {
			return 0;
		}
	}


	private removeAll() {
		let i = 0;
		let len = this.imagList.length;
		for (; i < len; i++) {
			if (this.imagList[i]) {
				this.imagList[i].onRemove();
			}
		}
		this.imagList.length = 0;
	}
}