/**
 * 人物
*/
class HumanThing extends AnimalThing {

	pet: PetThing[] = [];
	private flowUpdateTime: number = 0;

	public constructor() {
		super();
		//this.bodyContainer.scaleX = this.bodyContainer.scaleY = 0.67;

	}

	public init(pro: PropertySet) {
		super.init(pro);
		this.removePet();
		for (let index in pro.petId) {
			this.updatePet(pro.petId[index], pro.petName[index], pro.petStar[index]);
		}
	}

	protected changeHp(value: number): void {
		super.changeHp(value);
		ActorSeleMgr.hpChange(this);
	}

	public updateProperty(propType: number, propValue: any): void {
		super.updateProperty(propType, propValue);
		//称号与徽章预留
		switch (propType) {
			case PropId.AP_BADGE_LVL:
				this.title.setBadge(propValue);
				break;
			case PropId.AP_HP:
				this.changeHp(propValue);
				break;
		}
	}

	public updatePet(id: number, name: string, wStep: number) {
		if (id) {
			let con = GameConfig.pet[id];
			if (!con) return;
			let pro = this.pro;
			let p = new PropertySet();
			p.kind = ThingKind.Pet;
			p.pro(PropId.AP_ACTOR_ID, id);
			p.pro(PropId.AP_BODY_ID, GameCache.pet.getModelId(wStep, id));
			p.pro(PropId.AP_X, this.cellXY.x);
			p.pro(PropId.AP_Y, this.cellXY.y);
			p.masterName = this.pro.charName;
			p.isFlow = true;
			let strName = name;
			if (strName == "") {
				strName = con["name"]
			}
			p.charName = StringUtils.substitute(Language.lang.de, pro.charName, strName);
			p.recog = App.ThingManager.createRecog();
			let pet = App.ThingManager.createThing(p) as PetThing;
			this.pet.push(pet);
		}
	}

	public removePet() {
		for (let index in this.pet) {
			let pet = this.pet[index];
			if (pet) {
				pet.dispose();
				pet = null;
			}
		}
		this.pet.length = 0;
	}

	update(tick: number) {
		super.update(tick);
		let cv = this.flowUpdateTime <= tick;
		cv && (this.flowUpdateTime = tick + 500);
		let xy = this.cellXY;
		let dis = 6 - this.pet.length;
		for (let ani of this.pet) {
			if (cv && !ani.isMove) {
				if (!GameCache.map.canStand(ani.cellXY.x, ani.cellXY.y)) {
					ani.setCellXY(xy.x, xy.y, false);
					continue;
				}
				let needMove = Math.abs(ani.cellXY.x - xy.x) > dis || Math.abs(ani.cellXY.y - xy.y) > dis;
				if (needMove) {
					if (!ani.isfollow) {
						ani.moveSpeed = GlobalVar.DEFAULT_MOVE_SPEED;
						if (ani.cellXY.y == xy.y && ani.moveTo(xy.x, xy.y - this.getBodyDir()))
							ani.isfollow = true;
						else {
							let count = 2;
							let dir = this.getBodyDir();
							while (count > 0) {
								let _x = xy.x - dir * count;
								if (GameCache.map.canStand(_x, xy.y)) {
									ani.setCellXY(_x, xy.y, false);
									ani.updateBodyDir(ani.cellXY.x, xy.x);
									break;
								}
								count--;
							}
							ani.isfollow = false;
						}
					}
				} else {
					ani.clearPath();
					ani.isfollow = false;
				}
				if (xy.x == ani.cellXY.x && xy.y == ani.cellXY.y) {
					let count = 2;
					let dir = this.getBodyDir();
					while (count > 0) {
						let _x = xy.x - dir * count;
						if (GameCache.map.canStand(_x, xy.y)) {
							ani.moveSpeed = GlobalVar.DEFAULT_MOVE_SPEED << 1;
							ani.moveTo(_x, xy.y);
							break;
						}
						count--;
					}
				}
				dis++;
				ani.setOnView(this.isInView);
			}
			ani.update(tick);
		}
	}

	dispose() {
		super.dispose();
		this.removePet();
	}
}