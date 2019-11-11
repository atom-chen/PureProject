/**
 * 寻路至目标实体，除了攻击对象之外
*/
class VisitThingManager extends BaseClass {
	/**本次访问的对象*/
	private target: VisitTarget;
	private m_FindMapLinkExpectList: any[] = [];//查找地图连接的排除地图列表，用于优化性能

	public constructor() {
		super();
		this.target = new VisitTarget();
	}

	public goToNpc(npcId: number) {
		let target = this.target;
		target.clear();
		let con = GameConfig.npc[npcId];
		if (!con) {
			throw new Error("找不到npc配置 " + npcId);
		}
		target.tarX = con["posx"];
		target.tarY = con["posy"];
		target.tarScene = con["scene"];
		target.npcId = npcId;
		this.continue();
	}

	public goToMonster(monsterId: number, sceneId: number, x: number, y: number) {
		let target = this.target;
		target.clear();
		target.tarX = x;
		target.tarY = y;
		target.tarScene = sceneId;
		target.monsterId = monsterId;
		this.continue();
	}

	public goToThing(thing: any) {
		this.target.clear();
		//this.target.tarThing = thing;
		if (thing instanceof BaseThing) {
			let tx: number = thing.cellXY.x;
			let ty: number = thing.cellXY.y;
			let kind: number = thing.pro.kind;
			if (kind == ThingKind.Transfer) {
				this.goToPos(tx, ty);
			} else if (kind == ThingKind.Npc) {
				this.goToNpc((thing as NPCThing).npcid);
			}
		}
		else if (thing instanceof DropItem) {
			this.target.tarThing = thing;
			this.goToPos(thing.cellX, thing.cellY);
		}
	}

	public clear() {
		this.target.clear();
	}

	public checkArrived(): boolean {
		let hero = GameCache.hero.focusPlayer;
		let target = this.target;
		if (target.tarScene == 0) {
			return;
		}
		if (target.tarScene == GameCache.map.mapId) {
			if (target.tarX == hero.cellXY.x && target.tarY == hero.cellXY.y) {
				this.doArrived();
				this.clear();
				return true;
			}
		}
		return false;
	}

	public continue() {
		if (this.target.tarScene == 0) {
			return;
		}
		if (!GameCache.map.dataInit) return;
		if (!this.checkArrived())
			this.onGo();
	}

	private onGo() {
		App.FightManager.heroStart(false);
		let tar = this.target;
		if (GameCache.map.mapId != tar.tarScene) {
			let pos = this.findLinkPos(this.getStdById(GameCache.map.mapId), this.getStdById(tar.tarScene));
			if (pos) {
				this.goToPos(pos.x, pos.y);
			}
		} else {
			if (tar.npcId > 0) {
				let tx = tar.tarX + (Math.random() > 0.5 ? 1 : -1);
				if (GameCache.map.canStand(tx, tar.tarY)) {
					tar.tarX = tx;
					if (this.checkArrived()) return;
				}
			}
			this.goToPos(tar.tarX, tar.tarY);
		}
	}

	private doArrived() {
		let tar = this.target;
		if (tar.npcId > 0) {
			let npc: NPCThing = App.ThingManager.getNpcById(tar.npcId);
			if (npc) {
				this.arrivedNPC(npc.pro.recog, tar.npcId);
			}
		}
		else if (tar.monsterId != 0) {
			App.FightManager.heroStart(true, tar.monsterId > 0 ? tar.monsterId : 0);
		}
		else if (tar.tarThing) {
			if (tar.tarThing instanceof DropItem) {
				tar.tarThing.pick();
			}
		}
	}

	private arrivedNPC(recog, id) {
		if (GameCache.quest.npcId == id) {
			Proxy.main.sendTalkToNPC(recog);
			let viewPorn = new ViewProp();
			viewPorn.exData1 = recog;
			viewPorn.exData2 = id;
			App.ViewManager.open(ViewConst.NPCTALK, viewPorn);
		} else {
			let con = GameConfig.npc[id];
			if (con && con["window"]) {
				TextFlowUtils.hrefType(con["window"]);
			} else {
				//App.ViewManager.open(ViewConst.NPCTALK, recog, id);
				let npc = App.ThingManager.getThing(recog);
				if (npc) {
					let con = GameConfig.npc[id];
					npc.say(con["talk"][MathUtils.limitInteger(0, con["talk"].length)]);
				}
			}
		}
	}

	public goToPos(x, y) {
		let hero = GameCache.hero.focusPlayer;
		hero.moveTo(x, y);
	}
	private getStdById(id): StdScene {
		return GameConfig.scene[id];
	}

	/**
	 * 从起始地图中查找通往目标地图的链接点坐标 
	 * @param source 起始地图
	 * @param target 目标地图
	 * @return 
	 * 
	 */
	public findLinkPos(source: StdScene, target: StdScene): XY {
		if (source == target) {
			return null;
		}
		this.m_FindMapLinkExpectList.length = 0;
		if (source.teleport) {
			var linkDesc: LinkPosDesc;
			linkDesc = this.findNearestLinkPosInEnvir(source, target, this.m_FindMapLinkExpectList);
			if (linkDesc)
				return new XY(linkDesc.lnk.posx, linkDesc.lnk.posy);
		}
		return null;
	}

	/**
	 * 从地图连接数种递归查找通往目标地图的链接点 对象
	 * @param envir 起始地图
	 * @param target 目标地图
	 * @param expectList 排除地图列表，用于避免递归查找的重复查找造成的死递归和栈溢出
	 * @return 
	 * 
	 */
	private findLinkPosInEnvir(envir: StdScene, target: StdScene, expectList: any[]): Object {
		var lnkList: any[] = envir.teleport;
		var lnk: any;
		var lnkEnvir: StdScene;
		var i: number, j: number;

		//添加到排除地图列表中
		expectList.push(envir);
		for (i = 0; i < lnkList.length; ++i) {
			lnk = lnkList[i];
			//找到!
			if (lnk.toSceneid == target.scenceid)
				return lnk;
			lnkEnvir = this.getStdById(lnk.toSceneid);
			if (lnkEnvir && lnkEnvir.teleport) {
				//如果地图存在于已搜索的地图列表中则不检查此地图
				for (j = 0; j < expectList.length; ++j) {
					if (expectList[j] == lnkEnvir) {
						lnkEnvir = null;//置为null以便进行下次循环
						break;
					}
				}
				if (!lnkEnvir)
					continue;
				//从此地图中查找
				if (this.findLinkPosInEnvir(lnkEnvir, target, expectList))
					return lnk;
			}
		}
		return null;
	}

	/**
	 * 从地图连接数种递归查找通往目标地图的链接点 对象
	 * @param envir 起始地图
	 * @param target 目标地图
	 * @param expectList 排除地图列表，用于避免递归查找的重复查找造成的死递归和栈溢出
	 * @return 
	 * 
	 */
	private findNearestLinkPosInEnvir(envir: StdScene, target: StdScene, expectList: any[]): LinkPosDesc {
		var lnkList = envir.teleport;
		var lnk: any;
		var lnkEnvir: StdScene;
		var i: number, j: number;
		var lnkPos: LinkPosDesc, nearestPos: LinkPosDesc;

		//添加到排除地图列表中
		expectList.push(envir);
		for (i = 0; i < lnkList.length; ++i) {
			lnk = lnkList[i];
			//找到!
			if (lnk.toSceneid == target.scenceid) {
				nearestPos = new LinkPosDesc(lnk, 0);
				break;
			}
			lnkEnvir = this.getStdById(lnk.toSceneid);
			if (lnkEnvir && lnkEnvir.teleport) {
				//如果地图存在于已搜索的地图列表中则不检查此地图
				for (j = 0; j < expectList.length; ++j) {
					if (expectList[j] == lnkEnvir) {
						lnkEnvir = null;//置为null以便进行下次循环
						break;
					}
				}
				if (!lnkEnvir)
					continue;
				//从此地图中查找
				lnkPos = this.findNearestLinkPosInEnvir(lnkEnvir, target, expectList);
				if (lnkPos) {
					if (!nearestPos || nearestPos.dist > lnkPos.dist) {
						nearestPos = lnkPos;
						nearestPos.lnk = lnk;
					}
				}
			}
		}
		//从排除地图列表中移除
		expectList.pop();
		if (nearestPos) {
			nearestPos.dist++;
			return nearestPos;
		}
		return null;
	}
	/**
	 * 用于二分查找的都地图id对比函数 
	 * @param id
	 * @param envir
	 * @return 
	 * 
	 */
	private searchEnvirIdCompare(id: number, envir: StdScene): number {
		if (id < envir.scenceid)
			return -1;
		if (id > envir.scenceid)
			return 1;
		return 0;
	}
	/**
	 * 用于二分查找的都地图名称对比函数 
	 * @param id
	 * @param envir
	 * @return 
	 * 
	 */
	private searchEnvirNameCompare(name: string, envir: StdScene): number {
		return name.localeCompare(envir.scencename);
	}
}


class LinkPosDesc {
	public lnk: any;
	public dist: number;//到达目标地图所需经过的地图数量

	public constructor(lnk: any, dist: number) {
		this.lnk = lnk;
		this.dist = dist;
	}
}

class VisitTarget {
	tarX: number;
	tarY: number;
	tarScene: number = 0;
	tarThing: any;
	npcId: number;
	monsterId: number;

	clear() {
		this.tarX = 0;
		this.tarY = 0;
		this.tarScene = 0;
		this.tarThing = null;
		this.npcId = 0;
		this.monsterId = 0;
	}
}