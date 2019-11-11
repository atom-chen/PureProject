/*
 * @Description: 保存主角数据
 * @Author: guolinsen
 * @Date: 2019-07-18 13:45:49
 * @LastEditTime: 2019-10-31 17:24:13
 */
class HeroCache extends BaseCache {
	private _focus: HeroThing;
	public list: HeroThing[] = [];
	public pet: PetThing[] = [];
	/**主角属性*/
	public mainPro: PropertySet;
	public constructor() {
		super();

		App.TimerManager.add(200, this.onFollow, this);
	}

	clear() {
		this._focus = null;
		for (let hero of this.list) {
			hero.dispose();
		}
		this.list = [];
		this.mainPro = null;
	}

	private onFollow() {
		if (App.FightManager.onHook) return;
		if (!this._focus) return;

		let xy = this._focus.cellXY;
		let dis = 5 - this.list.length;
		for (let hero of this.list) {
			if (hero == this._focus) continue;
			if (hero.isDie) continue;
			if (hero.isFighting) continue;

			let needMove = Math.abs(hero.cellXY.x - xy.x) > dis || Math.abs(hero.cellXY.y - xy.y) > dis;
			if (needMove) {
				if (!hero.isfollow) {
					hero.isfollow = hero.moveTo(xy.x, xy.y);
				}
			} else {
				hero.clearPath();
				hero.isfollow = false;
			}
			dis++;
		}
	}

	public exitScene() {
		for (let hero of this.list) {
			hero.clearPath();
		}
	}

	public addHero(hero: HeroThing) {
		if (hero.pro.isMainPlayer) {
			this.list.unshift(hero);
			this.focusPlayer = hero;
		} else {
			for (let i = 0; i < this.list.length; i++) {
				if (this.list[i].pro.isMainPlayer) continue;
				if (hero.pro.pro(PropId.AP_ACTOR_ID) < this.list[i].pro.pro(PropId.AP_ACTOR_ID)) {
					this.list.splice(i, 0, hero);
					return;
				}
			}
			this.list.push(hero);
		}
		App.MessageCenter.dispatch(MsgConst.NEW_HERO);
	}

	public clearJump() {
		for (let hero of this.list) {
			hero.clearJump();
		}
	}

	public setPosition(x, y) {
		for (let hero of this.list) {
			hero.setCellXY(x, y, true);
		}
	}

	public set focusPlayer(p: HeroThing) {
		this._focus = p;
		App.MessageCenter.dispatch(MsgConst.FOCUS_CHANGE);
	}

	/**当前操作实体*/
	public get focusPlayer(): HeroThing {
		return this._focus;
	}

	/**主角实体*/
	public get mainPlayer(): HeroThing {
		return this.list[0];
	}

	public isMySelf(recog: number): boolean {
		for (let thing of this.list) {
			if (thing.pro.recog == recog) return true;
		}
	}

	public getThing(recog: number): HeroThing {
		for (let thing of this.list) {
			if (thing.pro.recog == recog) return thing;
		}
	}

	public resetFocus() {
		for (let i = 0; i < this.list.length; i++) {
			let h = this.list[i];
			if (!h.isDie) {
				if (h != this._focus) {
					this.focusPlayer = h;
				}
				break;
			}
		}
	}

	/**根据职业获取角色实体*/
	public getHeroByJob(job): HeroThing {
		for (let i = 0; i < this.list.length; i++) {
			let h = this.list[i];
			if (h.pro.pro(PropId.AP_JOB) == job) return h;
		}
	}

	/**根据职业获取角色属性集*/
	public getProByJob(job): PropertySet {
		for (let i = 0; i < this.list.length; i++) {
			let h = this.list[i];
			if (h.pro.pro(PropId.AP_JOB) == job) return h.pro;
		}
	}

	/**根据索引获取角色属性集*/
	public getProByIndex(index): PropertySet {
		return this.list[index] && this.list[index].pro;
	}

	/**根据职业获取角色id，发送给后端时使用，-1未创角该职业的角色*/
	public getServerIdByJob(job): number {
		let pro = this.getProByJob(job);
		if (!pro) return -1;
		if (pro == this.mainPro) return 0;
		return pro.pro(PropId.AP_ACTOR_ID);
	}

	/**根据索引获取角色id，发送给后端时使用*/
	public getServerIdByIndex(index): number {
		let pro = this.getProByIndex(index);
		if (pro == this.mainPro) return 0;
		return pro.pro(PropId.AP_ACTOR_ID);
	}

	/**收到到的id转化为实体id*/
	public transIdFromeServer(id) {
		if (id == 0) return this.mainPro.pro(PropId.AP_ACTOR_ID);
		return id;
	}



	/**根据索引获取对应的数据*/
	public getDataByIndex(index: number, data: any) {
		let pro = this.getProByIndex(index);
		if (pro) {
			return data[pro.pro(PropId.AP_ACTOR_ID)];
		}
		return null;
	}

	/**根据职业获取对应的数据*/
	public getDataByJob(job: number, data: any) {
		let pro = this.getProByJob(job);
		if (pro) {
			return data[pro.pro(PropId.AP_ACTOR_ID)];
		}
		return null;
	}

	/**根据索引获取对应的角色id*/
	public getRoleIdByIndex(index: number) {
		let pro = this.getProByIndex(index)
		if (pro) {
			return pro.pro(PropId.AP_ACTOR_ID);
		}
		return null;
	}


	/**根据角色id获取职业*/
	public getJobByRoleId(id): number {
		for (let i = 0; i < this.list.length; i++) {
			let h = this.list[i];
			if (h.id == id) return h.pro.job;
		}
	}

	/**收到的实体id转化为serverid*/
	public transServerFromeId(id) {
		if (id == this.mainPro.pro(PropId.AP_ACTOR_ID)) return 0;
		return id;
	}

	/**根据索引获取角色开启状态 index为 0/1/2 */
	/**0为未解锁,1未开启已解锁,2为已开启 */
	public getRoleStateByIndex(index: number): number {
		/**已有角色 */
		if (GameCache.hero.list[index]) {
			return 2;
		}
		else {
			//需要判断是否开启/解锁
			let adCache = GameCache.adventure;
			let award = adCache.topAward;
			if (!award) return 0;
			let isRole = adCache.topAward.type == AwardType.CREATE_HERO;
			if (!isRole) { //不是解锁任务，不可开启
				return 0;
			}
			else {
				return adCache.taskList.length == adCache.topProgress ? 1 : 0;
			}
		}

	}

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}