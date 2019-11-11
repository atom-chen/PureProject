/**
 * 当前的地图数据
*/
class MapCache extends BaseCache {

	/**地图像素宽*/
	mapWidth: number;
	/**地图像素高*/
	mapHeight: number;
	/**每个格子宽*/
	cellWidth: number = 40;
	/**每个格子高*/
	cellHeight: number = 40;

	/**场景id*/
	mapId: number = 0;
	/**副本id >0是副本 ==0是普通场景*/
	fbId: number = 0;
	/**当前场景配置*/
	mapConfig: StdScene;
	/**当前路径索引*/
	hookIndex: number;
	/**上个场景数据文件*/
	private lastMapFile: string = "";
	private curMapFile: string = "";


	/**天空素材配置*/
	skyDrawVo: MapDrawLayerVo;
	/**地表素材配置*/
	floorDrawVo: MapDrawLayerVo;
	/**景观素材配置*/
	treeDrawVo: MapDrawLayerVo;
	frontDrawVo: MapDrawLayerVo;

	firstEnterScene: boolean = true; //第一次进入场景
	dataInit: boolean = false; //是否已创建完场景数据
	showLoading: boolean = false;
	loadlingList: any[] = [];

	cameraX: number = 0;
	cameraY: number = 0;

	/**是否由前端计算战斗的地图*/
	isAIMap: boolean = false;

	private find: CMapPathData;
	private _xml: MapXML;

	public constructor() {
		super();
		this._xml = new MapXML();
	}

	clear() {
		super.clear();
		this.lastMapFile = "";
		this.firstEnterScene = true;
		this.dataInit = false;
		this.showLoading = false;
		this.loadlingList.length = 0;
	}

	getHookPoint(): number[] {
		let arr = this.mapConfig.hookPath;
		if (arr && arr.length > 0) {
			this.hookIndex++;
			if (this.hookIndex >= arr.length) {
				this.hookIndex = 0;
			}
			return arr[this.hookIndex];
		}
		return null;
	}

	readXML(data) {
		this._xml.read(data);
	}

	/**请求退出当前场景*/
	sendExit() {

	}


	//退出场景时
	exit() {
		this.dataInit = false;
		App.ThingManager.removeAll();
		App.FightManager.mapChange();
		GameCache.hero.exitScene();

		this.isAIMap = false;
		GameCache.pass.close();
		App.FightManager.heroStart(false);
		App.FrameHandler.add(App.ViewManager.destroyView, App.ViewManager, true);
		App.FrameHandler.add(App.DBAvatarManager.onScengChange, App.DBAvatarManager, true);
	}

	/**过场结束后触发*/
	enter() {
		if (this.mapId == GlobalVar.GUAJI_SCENE) {
			GameCache.pass.open();
		} else if (this.mapId == GlobalVar.PASSBOSS_SCENE) {
			GameCache.pass.playBossEffect();
		}
		if (this.isHookMap()) {
			App.FightManager.heroStart(true);
		}
		InfoViewController.autoOpen();
		InfoViewController.openView(this.mapConfig.type);
		App.SoundManager.playMusic(this.mapConfig["music"]);
	}

	//场景刷新，更新需要加载的数据文件等等
	update(mapId: number, fbId: number) {
		this.mapId = mapId;
		this.fbId = fbId;
		let con = GameConfig.scene[mapId];
		this.hookIndex = -1;
		if (!con) {
			throw (new Error("未找到场景配置, id:" + mapId));
		}
		this.mapConfig = con;
		this.curMapFile = con["mapfilename"];
		if (this.mapId == GlobalVar.GUAJI_SCENE) {
			this.curMapFile = GameCache.pass.getMapFile();
			this.isAIMap = true;
		} else if (this.mapId == GlobalVar.PASSBOSS_SCENE) {
			this.curMapFile = GameCache.pass.getMapFile();
		}
	}

	/**返回是否一样地图 */
	isSameMap(): boolean {
		return (this.lastMapFile == this.curMapFile);
	}

	isHookMap(): boolean {
		return this.mapConfig && this.mapConfig.auto > 0;
	}

	/**返回是否刷新配置*/
	getMapData(): boolean {
		this.dataInit = true;
		if (this.lastMapFile == this.curMapFile) return false;
		this.lastMapFile = this.curMapFile;
		let str = this._xml.getConfig(this.curMapFile);
		let d = egret.XML.parse(str);
		let gridData = [];

		let list = d.children;
		let len = list.length;
		for (let i = 0; i < len; i++) {
			let node = list[i];
			if (node["name"] == "step") {
				this.pareseMapSize(node);
			}
			if (node["name"] == "view") {
				this.skyDrawVo = this.parseMapDraw(node);
			}
			if (node["name"] == "floor") {
				this.floorDrawVo = this.parseMapDraw(node);
			}
			if (node["name"] == "tree") {
				this.treeDrawVo = this.parseMapDraw(node);
			}
			if (node["name"] == "front") {
				this.frontDrawVo = this.parseMapDraw(node);
			}

			if (node["name"] == "t") {
				let str: string = node["children"][0].text;
				gridData.push(str.split(","));
			}
		}

		let grid = new CMapTpl();
		grid.parese(gridData);
		this.find = new CMapPathData(grid);
		this.showLoading = true;
		this.loadlingList.length = 0;
		return true;
	}

	findPath(sx, sy, ex, ey) {
		if (sx == ex && sy == ey) return [];
		let p = this.find.FindPath(new CWTPoint(sx, sy), new CWTPoint(ex, ey), new CWTPoint(GlobalVar.JUMP_X, GlobalVar.JUMP_Y));
		p.reverse();
		let i: number = 0;
		let len: number = p.length;
		let p1: CWTPoint;
		let p2: CWTPoint;
		for (; i < len; i++) {
			if (i == 0) {
				p1 = p[i];
			} else {
				p2 = p[i];
				if (p2.mX == p1.mX && p2.mY == p1.mY) {
					p.splice(i, 1);
					len--;
					i--;
				}
				else if (p2.mX == p1.mX && p2.mY > p1.mY) {
					let y1 = p1.mY + 2;
					let y2 = p2.mY;
					for (; y1 < y2; y1++) {
						if (this.canStand(p2.mX, y1)) {
							let p3 = new CWTPoint(p2.mX, y1);
							p.splice(i, 0, p3);
							len++;
							i++;
						}
					}
				}
				p1 = p2;
			}
		}
		return p;
	}

	pareseMapSize(o) {
		let list = o.children;
		let len = list.length;
		for (let i = 0; i < len; i++) {
			if (list[i].name == "w") {
				this.mapWidth = parseInt(list[i].children[0].text);
			}
			else if (list[i].name == "h") {
				this.mapHeight = parseInt(list[i].children[0].text);
			}
		}
	}

	parseMapDraw(o): MapDrawLayerVo {
		let vo = new MapDrawLayerVo();
		let arr = [];
		vo.imgList = arr;
		let list = o.children;
		let len = list.length;
		let indexDic = {};
		for (let i = 0; i < len; i++) {
			if (list[i].name == "p") {
				let vo = new MapImageVo();
				vo.x = parseInt(list[i].attributes.x);
				vo.y = parseInt(list[i].attributes.y);
				vo.w = parseInt(list[i].attributes.w);
				vo.h = parseInt(list[i].attributes.h);
				vo.scaleX = parseFloat(list[i].attributes.scaleX);
				vo.scaleY = parseFloat(list[i].attributes.scaleY);
				vo.url = list[i].children[0].text;
				if (indexDic[vo.url]) vo.index = indexDic[vo.url];
				else {
					vo.index = i + 1;
					indexDic[vo.url] = i + 1;
				}
				arr.push(vo);
			}
			if (list[i].name == "w") {
				vo.width = parseInt(list[i].children[0].text);
			}
			else if (list[i].name == "h") {
				vo.height = parseInt(list[i].children[0].text);
			}
		}
		return vo;
	}

	/**是否斜坡*/
	isRope(x, y) {
		return this.find.IsRope(x, y + 1);
	}

	/**判断两点之间是否需要跳跃*/
	isJump(sx, sy, ex, ey): boolean {
		if (sx == ex && sy == ey) return false;
		let dir: number = MathUtils.getDirByGridPoint(sx, sy, ex, ey);
		let pos: XY = MathUtils.getGridTowardByDir(dir, 1, sx, sy);
		return !this.canStand(pos.x, pos.y);
	}
	/**是否可站立*/
	canStand(x, y): boolean {
		return this.find.canStand(x, y + 1);
	}
}