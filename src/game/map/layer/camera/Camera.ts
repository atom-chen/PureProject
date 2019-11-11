/**
 * 镜头管理
*/
class Camera {

	private isMoving: boolean = false;
	private layers: ICamera[] = [];
	private focusPlayer: HeroThing; //当前聚焦的玩家
	private curPos: XY;

	private pos: XY;

	public constructor() {

	}
	/**
	 * 
	*/
	public register(layer: ICamera) {
		this.layers.push(layer);
	}
	/**
	 * 注册需要聚焦的玩家
	*/
	public regPlayer(player: HeroThing) {
		this.focusPlayer = player;

		let tx = (App.StageUtils.getWidth() >> 1) - this.focusPlayer.x;
		let ty = this.getPlayerFocusY();
		this.setXY(tx, ty);
	}

	public exitScene() {
		this.curPos = null;
	}

	public unpdate(tick: number) {
		if (this.focusPlayer) {
			let tx = (App.StageUtils.getWidth() >> 1) - this.focusPlayer.x;
			let ty = this.getPlayerFocusY();
			this.setXY(tx, ty);
		}
	}

	private getPlayerFocusY(): number {
		let player = this.focusPlayer;
		return (App.StageUtils.getHeight() >> 1) - this.focusPlayer.y;
	}


	/**设置当前坐标*/
	public setXY(x, y) {
		if (!GameCache.map.dataInit) return;
		if (GameCache.map.mapWidth < App.StageUtils.getWidth()) {
			x = (App.StageUtils.getWidth() - GameCache.map.mapWidth) >> 1;
		}
		if (GameCache.map.mapHeight < App.StageUtils.getHeight()) {
			y = (App.StageUtils.getHeight() - GameCache.map.mapHeight) >> 1;
		}
		if (x > 0) x = 0;
		if (y > 0) y = 0;
		let stageW: number = App.StageUtils.getWidth();
		let stageH: number = App.StageUtils.getHeight();
		if (-x + stageW > GameCache.map.mapWidth)
			x = -(GameCache.map.mapWidth - stageW);
		if (-y + stageH > GameCache.map.mapHeight)
			y = -(GameCache.map.mapHeight - stageH);

		let cur = this.curPos;
		if (cur && cur.x == x && cur.y == y) {
			return;
		}
		if (!cur) cur = this.curPos = { x: x, y: y };
		cur.x = x; cur.y = y;
		this.resetLayer();
		App.MessageCenter.dispatch(MsgConst.UPDATE_SCENE_MAPITEM);
	}

	/**移动至坐标*/
	private moveToXY(x, y, t) {
		if (!this.curPos) return;

		this.pos = { x: this.curPos.x, y: this.curPos.y };
		egret.Tween.get(this.pos, { onChange: this.onChange, onChangeObj: this }).to({ x: x, y: y }, t);
	}

	private onChange() {
		this.setXY(this.pos.x, this.pos.y);
	}

	private resetLayer() {
		let cur = this.curPos;
		let perX: number = (-cur.x) / GameCache.map.mapWidth * 100;
		let perY: number = (-cur.y) / GameCache.map.mapHeight * 100;

		for (let c of this.layers) {
			c.moveTo(cur.x, cur.y, perX, perY);
		}

		GameCache.map.cameraX = -cur.x;
		GameCache.map.cameraY = -cur.y;
	}
}