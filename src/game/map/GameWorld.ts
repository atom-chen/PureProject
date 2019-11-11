/**
 * 游戏场景，地图、模型等
*/
class GameWorld extends BaseEuiWindow {
	/**天空层*/
	private skyDraw: BaseMapDrawLayer;
	/**地表层*/
	private floorDraw: BaseMapDrawLayer;
	/**景观层*/
	private treeDraw: BaseMapDrawLayer;
	/**前景层*/
	private frontDraw: BaseMapDrawLayer;

	private bottomLayer: BaseMapThingLayer;
	/**玩家层*/
	private playerLayer: BaseMapThingLayer;
	private topLayer: BaseMapThingLayer;

	/**镜头*/
	private camera: Camera;
	/**下次排序时间*/
	private nextSortTime: number = 0;

	public constructor() {
		super(LayerManager.Game_Main);

		this.skyDraw = new BaseMapDrawLayer();
		this.floorDraw = new BaseMapDrawLayer();
		this.treeDraw = new BaseMapDrawLayer();
		this.frontDraw = new BaseMapDrawLayer();
		this.bottomLayer = new BaseMapThingLayer();
		this.playerLayer = new BaseMapThingLayer();
		this.topLayer = new BaseMapThingLayer();

		this.addChild(this.skyDraw);
		this.addChild(this.treeDraw);
		this.addChild(this.floorDraw);
		this.addChild(this.bottomLayer);
		this.addChild(this.playerLayer);
		this.addChild(this.topLayer);
		this.addChild(this.frontDraw);

		this.camera = new Camera();
		//this.camera.register(this.skyDraw);
		this.camera.register(this.floorDraw);
		this.camera.register(this.treeDraw);
		this.camera.register(this.frontDraw);
		this.camera.register(this.playerLayer);
		this.camera.register(this.bottomLayer);
		this.camera.register(this.topLayer);

		App.ThingManager.playerLayer = this.playerLayer;
		App.ThingManager.titleLayer = this.topLayer;
		App.ThingManager.bottomLayer = this.bottomLayer;

		this.touchEnabled = true;
		this.closeDispose = false;
		ThingKind.initIndex();

		this.initEvent();
	}

	private initEvent() {
		App.TimerManager.addFrame(DeviceUtils.IsPC ? 1 : 2, this.onFrame, this);
		this.addTouchEvent(this, this.onTouch);

		App.MessageCenter.addListener(MsgConst.FOCUS_CHANGE, this.onFocusChange, this);
		App.MessageCenter.addListener(MsgConst.RESIZE_STAGE, this.resizeStage, this);
		App.MessageCenter.addListener(MsgConst.ENTER_SCENE, this.onEnterScene, this);

		this.resizeStage();
	}
	/**
	* 面板开启执行函数，用于子类继承
	* 面板如果还没init的时候，会等到面板init完再回调
	* @param param 参数
	*/
	public open(param: ViewProp = null): void {
	}
	public shake() {
		App.DisplayUtils.shakeIt(this.floorDraw, 10, 100, 2);
		App.DisplayUtils.shakeIt(this.treeDraw, 10, 100, 2);
		App.DisplayUtils.shakeIt(this.playerLayer, 10, 100, 2);
	}
	public resizeStage() {
		super.resizeStage();
		if (this.skyDraw) {
			this.skyDraw.focusToCenter();
		}
	}

	public drawCell() {
		let w = GameCache.map.mapWidth / GameCache.map.cellWidth;
		let h = GameCache.map.mapHeight / GameCache.map.cellHeight;
		let s = new egret.Shape();
		s.graphics.lineStyle(1, 0x000000, 1);
		for (let i = 0; i < w; i++) {
			s.graphics.moveTo(i * 40, 0);
			s.graphics.lineTo(i * 40, h * 40);
		}
		for (let i = 0; i < h; i++) {
			s.graphics.moveTo(0, i * 40);
			s.graphics.lineTo(w * 40, i * 40);
		}
		this.playerLayer.addChild(s);
	}

	private onFrame() {
		let tick: number = App.TimerManager.getSyncTime();
		App.ThingManager.onUpdate();
		if (tick >= this.nextSortTime) {
			this.sortThingIndex();
			this.nextSortTime = tick + 300;
		}
		if (GameCache.map.dataInit) {
			this.camera.unpdate(tick);
		}
	}

	private sortThingIndex() {
		this.playerLayer.$children.sort(this.onSortThingIndex);
	}

	private onSortThingIndex(d1: BaseThing, d2: BaseThing): number {
		if (!d1.pro || !d2.pro) return 0;
		if (d1.cellXY.y > d2.cellXY.y) {
			return 1;
		}
		else if (d1.cellXY.y == d2.cellXY.y) {
			let k1 = ThingKind.getIndexByKind(d1.pro.kind);
			let k2 = ThingKind.getIndexByKind(d2.pro.kind);
			if (k1 > k2) return 1;
			else if (k1 == k2) return 0;
		}
		return -1;
	}

	private onTouch(e: egret.TouchEvent) {
		App.VisitManager.clear();

		let x = e.stageX;
		let y = e.stageY;
		let hero: HeroThing = GameCache.hero.focusPlayer;
		if (!hero) return;
		if (GameCache.map.mapConfig.untouch) return;
		let tXY = this.playerLayer.globalToLocal(x, y);
		let clickTarget: BaseThing = this.topLayer.getClickTarget(tXY.x, tXY.y);
		if (!clickTarget) clickTarget = this.playerLayer.getClickTarget(tXY.x, tXY.y);
		if (clickTarget != null && !GameCache.hero.isMySelf(clickTarget.pro.recog)) {
			this.onTouchThing(clickTarget);
			return;
		}
		this.onTouchThing(null);
		App.FightManager.heroStart(false);
		if (!hero.isJump) {
			let cx = (tXY.x / GameCache.map.cellWidth) >> 0;
			let cy = (tXY.y / GameCache.map.cellHeight) >> 0;
			hero.moveTo(cx, cy)
		}
	}

	private onTouchThing(thing: BaseThing) {
		if (!thing) {
			App.FightManager.setFightTarget(null);
			return;
		}
		let kind: number = thing.pro ? thing.pro.kind : -1;
		if (kind == ThingKind.Monster) {
			App.FightManager.setFightTarget(thing as AnimalThing);
		} else if (kind == ThingKind.Human && GameCache.map.mapConfig.nopk == 0) {
			App.FightManager.setFightTarget(thing as AnimalThing);
		} else {
			App.FightManager.heroStart(false);
			App.VisitManager.goToThing(thing);
		}
	}

	private onFocusChange() {
		this.camera.regPlayer(GameCache.hero.focusPlayer);
	}

	public refreshDraw() {
		this.camera.exitScene();
		let cache: MapCache = GameCache.map;
		if (cache.getMapData()) {
			let vo = cache.skyDrawVo;
			let sw = cache.mapWidth;
			let sh = cache.mapHeight;
			this.skyDraw.setData(vo.imgList, vo.width, vo.height, sw, sh);
			vo = cache.floorDrawVo;
			this.floorDraw.setData(vo.imgList, vo.width, vo.height, sw, sh);
			vo = cache.treeDrawVo;
			this.treeDraw.setData(vo.imgList, vo.width, vo.height, sw, sh);
			vo = cache.frontDrawVo;
			this.frontDraw.setData(vo.imgList, vo.width, vo.height, sw, sh);
			this.skyDraw.focusToCenter();
		}
	}

	private onEnterScene() {
		GameCache.map.enter();
		App.VisitManager.continue();
	}

	private skillRange: egret.Shape;
	public drawSkillRange(sx, sy, ex, ey) {
		if (!this.skillRange) {
			this.skillRange = new egret.Shape();
			this.topLayer.addChild(this.skillRange);
		}
		let gh = this.skillRange.graphics;
		gh.clear();
		let x, y, w, h;
		if (ex > sx) {
			x = sx;
			w = ex - sx;
		} else {
			x = ex;
			w = sx - ex;
		}
		w++;
		if (ey > sy) {
			y = sy;
			h = ey - sy;
		} else {
			y = ey;
			h = sy - ey;
		}
		h++;
		gh.beginFill(0x00ff00, 0.6);
		gh.drawRect(0, 0, w * GameCache.map.cellWidth, h * GameCache.map.cellHeight);
		gh.endFill();
		this.skillRange.x = x * GameCache.map.cellWidth;
		this.skillRange.y = y * GameCache.map.cellHeight;
	}

	/**在手机上关闭的时候并没有移除,因此需要继续接收事件来刷新 */
	protected removeAllEvent() {

	}

	/**在有必要整个移除的时候,需要重写调用父类方法来移除事件以及整个界面 */
	public dispose() {
		super.removeAllEvent();
		super.dispose();
	}
}