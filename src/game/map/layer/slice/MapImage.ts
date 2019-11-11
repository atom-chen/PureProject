/**
 * 地图素材
*/
class MapImage extends eui.Image {
	data: MapImageVo;

	public constructor() {
		super();
	}

	setData(data: MapImageVo) {
		if (GameCache.map.showLoading) {
			let list = GameCache.map.loadlingList;
			let i = list.indexOf(this.source);
			if (i > -1) {
				list.splice(i, 1);
			}
			list.push("res/" + data.url);
		}
		this.data = data;
		this.source = "res/" + data.url;

		this.x = data.x;
		this.y = data.y;
		this.scaleX = data.scaleX;
		this.scaleY = data.scaleY;
	}

	onRemove() {
		this.source = null;
		this.data = null;
		App.DisplayUtils.removeFromParent(this);
	}

}