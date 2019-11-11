/*
 * @Description: 技能数据
 * @Author: guolinsen
 * @Date: 2019-08-21 19:44:11
 * @LastEditTime: 2019-10-24 22:09:05
 */
class SkillCache extends BaseCache {
	/**技能列表 */
	public learnSkill: any = {};
	/**技能顺序 */
	public sortSkill: any = {};
	/**挂机技能*/
	public hookSkill: any = {};

	/**角色技能列表 */
	public roleSkilList: any;

	/**默认的技能结构*/
	private allDefaultUserSkill: any = {};

	public constructor() {
		super();
	}
	clear() {
		this.learnSkill = {};
		this.sortSkill = {};
		this.hookSkill = {};
	}

	public addSKill(id: number, skillList) {
		this.roleSkillCfg();
		this.learnSkill[id] = skillList;
	}

	public initSortSKill(actorId: number, skillSort) {
		let learn = this.learnSkill[actorId];
		if (!learn) return;

		this.sortSkill[actorId] = skillSort;
		let arr = this.hookSkill[actorId] = [];
		let hasSkill = false;
		for (let key in skillSort) {
			let id = skillSort[key];
			if (id && learn[id]) {
				arr.push(learn[id]);
				hasSkill = true;
			}
		}
		(!hasSkill) && this.setDefaulHookSkill(actorId);
	}

	private setDefaulHookSkill(id) {
		let sortSkill = this.sortSkill[id];
		for (let key in sortSkill) {
			if (sortSkill[key]) return;
		}
		let arr = this.hookSkill[id];
		(!arr) && (arr = this.hookSkill[id] = []);
		let learn = this.learnSkill[id];
		if (!learn) return;
		if (arr.length == 0) {
			for (let i in learn) {
				arr.push(learn[i]);
			}
		}
	}


	public getSkillByActorId(id): UserSkill[] {
		return this.learnSkill[id];
	}

	/**技能顺序列表 */
	public getFightSkilList(id): UserSkill[] {
		return this.hookSkill[id];
	}

	/**更新技能等级 */
	public updataSkill(actorId: number, skillId: number, lv: number) {
		let skillList = this.learnSkill[actorId];
		if (!skillList) {
			skillList = this.learnSkill[actorId] = {};
		}
		for (let index in skillList) {
			let skill: UserSkill = skillList[index];
			if (skill.nSkillId == skillId) {
				skill.nLevel = lv;
				return;
			}
		}
		let skill = new UserSkill();
		skill.nSkillId = skillId;
		skill.nLevel = lv;
		skill.dwResumeTick = 0;
		skill.exp = 0;
		skillList[skill.nSkillId] = skill;
		this.setDefaulHookSkill(actorId);
	}

	/**人物技能列表 */
	public roleSkillCfg() {
		if (this.roleSkilList) return;
		let obj = this.roleSkilList = {};
		for (let index in GameConfig.skill) {
			let data = GameConfig.skill[index];
			let job = data.vocation;
			if (job) {
				let arr = obj[job];
				(!arr) && (arr = obj[job] = []);
				arr.push(data);
			}
		}
	}

	/**通过id构造一个UserSkill*/
	public getDefaultUserSkill(id: number): UserSkill {
		let skill = this.allDefaultUserSkill[id];
		if (!skill) {
			skill = UserSkill.create(id, 1);
			this.allDefaultUserSkill[id] = skill;
		}
		return skill;
	}

	/**技能升级红点 */
	public skillUpRed(roleId) {
		if (!roleId) {
			return false;
		}
		let skillList = this.getSkillByActorId(roleId);
		for (let index in skillList) {
			let skill: UserSkill = skillList[index];
			let skillCfg: StdSkill = GameConfig.skill[skill.nSkillId];
			if (skill.nLevel < GlobalFun.getRoleLv()) {
				if (skillCfg.need) {
					let actNeed = CommonUtils.copyDataHandler(skillCfg.need);
					for (let item in actNeed) {
						let obj = actNeed[item];
						let nCt = obj.count + 0;
						if (obj.count) {
							obj.count = (skill.nLevel + 1) * nCt + 0;
						}
					}
					if (GlobalFun.getBagEnounghUseCondition(actNeed)) {
						return true;
					}
				}
			}
		}
		return false;
	}

	/**技能配置红点 */
	public skillDeployRed(roleId) {
		if (!roleId) {
			return false;
		}
		let skillIdList = this.sortSkill[roleId];
		for (let index in skillIdList) {
			let skillBar: StdSkillbar = GameConfig.skillBar[index];
			if (skillBar) {
				if (GlobalFun.getRoleLv() >= skillBar.level) {
					if (skillIdList[index] == 0) {
						return true;
					}
				}
			}
		}

		return false;
	}

}