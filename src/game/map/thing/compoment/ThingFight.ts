/*
 * @Description: 战斗AI
 * @Author: guolinsen
 * @Date: 2019-08-21 19:44:10
 * @LastEditTime: 2019-10-14 15:03:14
 */
class ThingFight {
	private _open: boolean = false;

	public user: AnimalThing;
	private tar: AnimalThing;
	private moveTar: AnimalThing; //正在移动的对象
	private nextUpdateTime: number = 0;
	private waitSkill: UserSkill;
	private skillList: UserSkill[] = []; //挂机使用的技能列表
	private skillIndex: number = 0;
	private isPassive: boolean = false;
	private attackHuman: number = 0; //攻击对象是玩家的话 就是玩家的id

	public monsterId: number = 0;//指定怪物id
	public foreverSkill: UserSkill; //只使用这个技能

	public constructor() {
	}
	public register(user: AnimalThing) {
		this.user = user;
		App.FightManager.addFight(this);
		if (user.pro.kind == ThingKind.Monster) {
			this.isPassive = true;
		}
		this.createSkillList();
	}
	private createSkillList() {
		let list = this.user.pro.skillList;
		if (!list) return;
		let i = 0;
		let a = list.length;
		for (; i < a; i++) {
			let skill = UserSkill.create(list[i][0], list[i][1]);
			this.skillList.push(skill);
		}
	}
	/**设置下个使用的技能*/
	public set useSkill(id: UserSkill) {
		this.waitSkill = id;
	}
	/**设置攻击目标*/
	public set target(tar: AnimalThing) {
		this.tar = tar;
		if (this.user == GameCache.hero.focusPlayer) {
			ActorSeleMgr.onSele(tar);
		}
		
		this.attackHuman = 0;
		if (tar && tar.pro.aiCamp == AICampType.NORMAL) {
			if (tar.pro.kind == ThingKind.Human) {
				this.attackHuman = tar.pro.pro(PropId.AP_ACTOR_ID);
			} else if (tar.pro.kind == ThingKind.HeroPet) {
				this.attackHuman = tar.pro.masterId;
			}
		}
	}
	public set open(v: boolean) {
		this._open = v;
		if (!v) {
			this.tar = null;
			this.waitSkill = null;
		}
	}
	public get open() {
		return this._open;
	}
	public get fighting() {
		return this._open || this.tar;
	}
	public update(tick: number) {
		if (tick <= this.nextUpdateTime) return;
		if (this.user.action >= ActionStandard.SA_NORMHIT) return;

		let self = this;
		let user = self.user;
		if (user.isJump) return;
		if (user.isDie || user.disappear) return;

		if (GameCache.hero.focusPlayer == user) {
			let drop = this.getDropItem(user);
			if (drop) {
				this.nextUpdateTime = tick + this.user.moveSpeed;
				return;
			}
		}

		if (self.tar && (self.tar.disappear || self.tar.isDie)) self.tar = null;

		(self.open || self.tar) && self.getSkill();
		self.open && self.getTarget(); //开启ai后自动找怪
		let tar = self.tar;
		if (tar && this.waitSkill) {
			if (self.inAttackDis()) {
				this.nextUpdateTime = tick + this.user.pro.pro(PropId.AP_ATTACK_SPEED);
				this.waitSkill.dwResumeTick = GameConfig.skill[this.waitSkill.nSkillId]["cooldownTime"] + tick + 100;
				user.preSkill();
				user.setBanHavior(2000);
				App.FightManager.useSkill(user, this.waitSkill, tar);
				this.waitSkill = null;
			} else {
				this.nextUpdateTime = tick + this.user.moveSpeed;
				if (tar != this.moveTar || !user.isMove) {
					if (user.pro.kind == ThingKind.Monster) {
						if (user.cellXY.y != tar.cellXY.y) {
							this.tar = null;
							return;
						}
					}
					user.moveTo(tar.cellXY.x, tar.cellXY.y);
					this.moveTar = tar;
				}
			}
		} else {
			if (user.pro.kind == ThingKind.Monster && !user.isMove && Math.random() > 0.99) {
				this.nextUpdateTime = tick + this.user.moveSpeed;
				let dir = Math.random() > 0.5 ? 1 : -1;
				user.moveTo(user.cellXY.x + dir, user.cellXY.y);
			}
			if (GameCache.hero.focusPlayer == user) {
				this.nextUpdateTime = tick + this.user.moveSpeed;
				if (!user.isMove) {
					let p = GameCache.map.getHookPoint();
					if (p) {
						user.moveTo(p[0], p[1]);
					}
				}
			}
		}

	}

	private getDropItem(hero: AnimalThing) {
		let list = App.ThingManager.dropList;
		let i = 0;
		let a = list.length;
		let cellXY = hero.cellXY;
		let curItem: DropItem;
		let curDis: number = 0;
		for (; i < a; i++) {
			let item = list[i];
			if (!item.isTrue) {
				return null;
			}
			if (item.canPick()) {
				item.pick();
				hero.stopMove();
				return item;
			}
			let dis: number = Math.abs(cellXY.x - item.cellY) + Math.abs(cellXY.y - item.cellY);
			if (!curDis || curDis > dis) {
				curItem = item;
			}
		}
		if (curItem) {
			hero.moveTo(curItem.cellX, curItem.cellY);
		}
		return curItem;
	}

	public beHit(target: AnimalThing) {
		if (this.isPassive) {
			this.tar = target;
		}
	}

	private inAttackDis(): boolean {
		let std: StdSkill = GameConfig.skill[this.waitSkill.nSkillId];
		let tar = this.tar;
		if (std && tar) {
			let dis = std.skilldis ? std.skilldis : 0;
			return Math.abs(this.user.cellXY.x - tar.cellXY.x) <= dis && this.user.cellXY.y == tar.cellXY.y;
		}
		return false;
	}

	public onRemove() {
		App.FightManager.removeFight(this.user.pro.recog);
		this.user = null;
		this.tar = null;
		this.moveTar = null;
		this.waitSkill = null;
		for (let skill of this.skillList) {
			skill.dispose();
		}
		this.skillList.length = 0;
		this.isPassive = null;
		this.monsterId = 0;
		this.foreverSkill = null;
		ObjectPool.push(this);

	}

	private getSkill(): number {
		if (this.waitSkill) return;
		if (this.foreverSkill && this.foreverSkill.canUse) {
			this.waitSkill = this.foreverSkill;
			return;
		}
		let kind = this.user.pro.kind;
		let list = this.skillList;
		if (kind == ThingKind.Hero) {
			list = GameCache.skill.getFightSkilList(this.user.pro.pro(PropId.AP_ACTOR_ID));
		}
		if (!list || list.length == 0) return;
		let i = this.skillIndex + 1;
		let a = list.length;
		if (this.skillIndex >= a) {
			this.skillIndex = 0;
			i = 0;
		}
		let flag = false;
		for (; true; i++) {
			if (i == this.skillIndex + 1 && flag) break;
			if (i >= a) i = 0;
			flag = true;
			let useSkill = list[i];
			if (useSkill && useSkill.canUse) {
				this.waitSkill = useSkill;
				this.skillIndex = i;
				break;
			}
		}
	}
	private getTarget() {
		if (this.tar) return;
		if (this.isPassive) return;

		if (this.waitSkill) {
			let stdSkill: StdSkill = GameConfig.skill[this.waitSkill.nSkillId];
			if (!stdSkill) return;
			let camList = AICampEnemy[this.user.pro.aiCamp];
			let tar: AnimalThing;
			if (camList) {
				let thingDic = App.ThingManager.getThingDic();
				let maxDis: number = stdSkill.skilldis;
				let curDis: number = 9999999;
				for (let k in thingDic) {
					let thing: AnimalThing = thingDic[k] as AnimalThing;
					if (thing.isDie || thing.disappear) {
						continue;
					}
					if (camList.indexOf(thing.pro.aiCamp) == -1) {
						continue;
					}
					if (this.user.pro.aiCamp == AICampType.MONSTER && Math.random() > 0.6) {
						this.tar = thing;
						return;
					}
					if (this.monsterId) {
						if (this.monsterId != (thing as MonsterThing).configId) {
							continue;
						}
					}
					let dis = Math.abs(this.user.cellXY.x - thing.cellXY.x) + Math.abs(this.user.cellXY.y - thing.cellXY.y);
					if (!tar || curDis > dis) {
						tar = thing;
						curDis = dis;
					}
				}
			}
			this.target = tar;
		}
	}
}