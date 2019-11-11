/**
 * 管理地图事物
*/
class ThingManager extends BaseClass {
	bottomLayer: BaseMapThingLayer;
	playerLayer: BaseMapThingLayer;
	titleLayer: BaseMapThingLayer;

	private waitList: PropertySet[] = [];
	private thingList: BaseThing[] = [];
	private thingDic: any = {};
	private checkViewTime: number = 0;
	public dropList: DropItem[] = [];
	public dropCellX: number = 0;
	public dropCellY: number = 0;

	public constructor() {
		super();

		//App.MessageCenter.addListener(MsgConst.RECONNECTED, this.onReconnected, this);
	}

	clear(){
		this.removeAll();
		this.thingDic = {}; //
		GameCache.hero.clear();
	}

	public addDrop(packetId: number, itemId: number, x: number, y: number, fly: boolean) {
		let item: DropItem = ObjectPool.get(DropItem);
		if (!x && !y) {
			x = this.dropCellX;
			y = this.dropCellY;
		}
		if (!packetId) {
			packetId = this.createRecog();
		}
		item.initData1(packetId, itemId, x, y);
		this.titleLayer.addChild(item);
		this.dropList.push(item);
	}

	//添加一组掉落效果，非真实掉落
	public addDropList(list: any[]) {
		if (!list || !list.length) return;
		let x = this.dropCellX;
		let y = this.dropCellY;
		if (!x && !y) return;
		let len = list.length;
		let starX = len >> 1;
		if (starX > 5) starX = 5;
		x = x - starX * 2;
		x < 1 && (x = 1);
		let i = 0;
		for (; i < len; i++) {
			let item: DropItem = ObjectPool.get(DropItem);
			item.initData2(this.createRecog(), list[i].id, this.dropCellX, this.dropCellY, x + (i % 10) * 2, y);
			this.titleLayer.addChild(item);
			this.dropList.push(item);
		}
	}

	public removeDrop(packetId) {
		let i = 0;
		let len = this.dropList.length;
		for (; i < len; i++) {
			let item = this.dropList[i];
			if (item.packetId == packetId) {
				this.dropList.splice(i, 1);
				item.dispose();
				break;
			}
		}
	}

	public onUpdate() {
		if (GameCache.hero.list.length == 0) return;
		if (!GameCache.map.dataInit) return;

		let tick = App.TimerManager.getSyncTime();
		let chV = tick >= this.checkViewTime;
		if (chV) {
			this.checkViewTime = tick + 500;
		}
		let tx = GameCache.map.cameraX;
		let ty = GameCache.map.cameraY;
		let tw = App.StageUtils.getWidth();
		let th = App.StageUtils.getHeight();

		for (let hero of GameCache.hero.list) {
			hero.update(tick);
			chV && hero.checkInView(tx, ty, tw, th);
		}

		let i = 0;
		let list = this.thingList;
		let len = list.length;
		for (; i < len; i++) {
			let thing = list[i];
			if (thing.disappear) {
				delete this.thingDic[thing.pro.recog];
				list.splice(i, 1);
				i--;
				len--;
				thing.dispose();
				continue;
			}
			thing.update(tick);
			chV && thing.checkInView(tx, ty, tw, th);
		}
		let pro = this.waitList.shift();
		if (pro) this.createThing(pro);
	}

	/**
	 * 添加一个等待创建的实体到队列
	*/
	public createThingToList(pro: PropertySet) {
		this.waitList.push(pro);
		return null;
	}
	/**
	 * 创建一个实体
	*/
	public createThing(pro: PropertySet): BaseThing {
		let cl = this.getThingCl(pro.kind);
		if (cl) {
			let thing: BaseThing = ObjectPool.get(cl);
			thing.init(pro);
			// thing.title.x = thing.x;
			// thing.title.y = thing.y;
			thing.checkInView(GameCache.map.cameraX, GameCache.map.cameraY, App.StageUtils.getWidth(), App.StageUtils.getHeight());
			if (!pro.isFlow) {
				if (pro.kind != ThingKind.Hero)
					this.thingList.push(thing);
				this.thingDic[pro.recog] = thing;
			}
			return thing;
		}
		return null;
	}

	/**
	 * 移除一个实体
	 * 返回被移除的
	*/
	public removeThing(recog: number): BaseThing {
		if (GameCache.hero.isMySelf(recog)) return;
		let thing: BaseThing = this.thingDic[recog];
		if (thing) {
			thing.disappear = true;
			return thing;
		} else {
			let i = 0;
			let list = this.waitList;
			let len = list.length;
			for (; i < len; i++) {
				if (list[i].recog == recog) {
					list.splice(i, 1);
					break;
				}
			}
		}
	}

	public removeAll() {
		let list = this.thingList;
		for (let i = 0; i < list.length; i++) {
			this.thingList[i].dispose();
		}
		this.thingList.length = 0;

		let dic = {};
		let hero = GameCache.hero.list;
		for (let index in hero) {
			(dic[hero[index].pro.recog] = hero[index]);
		}
		this.thingDic = dic;
		this.waitList.length = 0;

		let i = 0;
		let len = this.dropList.length;
		for (; i < len; i++) {
			let item = this.dropList[i];
			item.dispose();
		}
		this.dropList.length = 0;
	}

	public updatePoseInWaite(reg: number, x: number, y: number) {
		let i = 0;
		let list = this.waitList;
		let len = list.length;
		for (; i < len; i++) {
			if (list[i].recog == reg) {
				list[i].pro(PropId.AP_X, x);
				list[i].pro(PropId.AP_Y, y);
				break;
			}
		}
	}

	public getThing(recog: number, checkAlive: boolean = true): BaseThing {
		let thing: AnimalThing = this.thingDic[recog];
		if (checkAlive && thing && (thing.isDie || thing.disappear)) {
			return null;
		}
		return thing;
	}

	public getNpcById(npcId): NPCThing {
		let list = this.thingList;
		let i = 0;
		let a = list.length;
		for (; i < a; i++) {
			let thing = list[i] as NPCThing;
			if (thing.npcid == npcId) {
				return thing;
			}
		}
	}

	public getThingDic(): any {
		return this.thingDic;
	}


	private getThingCl(kind: number): any {
		if (kind == ThingKind.Human) return HumanThing;
		if (kind == ThingKind.Monster) return MonsterThing;
		if (kind == ThingKind.Hero) return HeroThing;
		if (kind == ThingKind.Transfer) return TransferThing;
		if (kind == ThingKind.Npc) return NPCThing;
		if (kind == ThingKind.HeroPet) return HumanThing;
		if (kind == ThingKind.Pet) return PetThing;
	}

	private recog: number = -10;
	public createRecog(): number {
		this.recog--;
		return this.recog;
	}
}