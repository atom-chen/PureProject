/*
 * @Description: 遭遇战
 * @Author: guolinsen
 * @Date: 2019-08-19 19:17:40
 * @LastEditTime: 2019-09-09 17:39:24
 */

class BattleManager extends BaseClass {
	private countDic: any;
	private handler: Handler;
	public constructor() {
		super();
	}
	test() {
		let hero = GameCache.hero.list;
		let pro = [];
		for (let h of hero) {
			let p = h.pro.clone();
			let skillList = GameCache.skill.getFightSkilList(p.pro(PropId.AP_ACTOR_ID));
			p.skillList = [];
			for (let skill of skillList) {
				p.skillList.push([skill.nSkillId, skill.nLevel]);
			}
			p.charName = "目标"
			p.kind = ThingKind.Human;
			p.pro(PropId.AP_X, h.cellXY.x + 12);
			p.pro(PropId.AP_Y, h.cellXY.y);
			p.pro(PropId.AP_HP, p.pro(PropId.AP_HP) * 100);
			p.pro(PropId.AP_MAX_HP, p.pro(PropId.AP_MAX_HP) * 100);
			pro.push(p);
		}
		this.start(pro, null, null);
	}
	/**
	 * pro：目标属性集列表
	 * call：每一个实体被击杀的回调，回调参数：call(本方剩余人员，地方剩余人员)
	 * callObj：this
	*/
	start(pro: PropertySet[], call, callObj) {
		this.countDic = { 1: 0, 2: 0 };
		for (let h of GameCache.hero.list) {
			h.pro.aiCamp = AICampType.BATTLE1;
			this.countDic[1]++;
		}
		let cellXY = GameCache.hero.mainPlayer.cellXY;
		for (let p of pro) {
			p.pro(PropId.AP_X, cellXY.x + 8);
			p.pro(PropId.AP_Y, cellXY.y);
			p.kind = ThingKind.Human;

			p.recog = App.ThingManager.createRecog();
			p.aiCamp = AICampType.BATTLE2;
			p.hpType = null;
			p.fightAi = true;
			App.ThingManager.createThing(p);
			this.countDic[2]++;
		}
		if (call && callObj) {
			this.handler = Handler.create(callObj, call, null, false);
		}
		GameCache.map.isAIMap = true;
		App.FightManager.starAllAI(true);
		App.MessageCenter.addListener(MsgConst.BATTLE_KILL, this.onKill, this);
	}

	exit() {
		GameCache.map.isAIMap = false;
		App.MessageCenter.removeAll(this);
		App.FightManager.starAllAI(false);
		// for (let h of GameCache.hero.list) {
		// 	h.pro.aiCamp = AICampType.SELF;
		// 	if (h.isDie) {
		// 		h.reAlive();
		// 	}
		// 	h.pro.pro(PropId.AP_HP, h.pro.pro(PropId.AP_MAX_HP), h);
		// }
		if (this.handler) {
			this.handler.dispose();
			this.handler = null;
		}
	}

	/**外部调用，重置角色人物状态*/
	resetState(): void {
		for (let h of GameCache.hero.list) {
			h.pro.aiCamp = AICampType.SELF;
			if (h.isDie) {
				h.reAlive();
			}
			h.pro.pro(PropId.AP_HP, h.pro.pro(PropId.AP_MAX_HP),h);
		}
	}

	private onKill(user: AnimalThing) {
		if (user.pro.aiCamp == AICampType.BATTLE1) {
			this.countDic[1]--;
		}
		else if (user.pro.aiCamp == AICampType.BATTLE2) {
			this.countDic[2]--;
		}
		if (this.handler) {
			this.handler.args = [this.countDic[1], this.countDic[2]];
			this.handler.run();
		}
		for (let k in this.countDic) {
			if (this.countDic[k] == 0) {
				this.exit();
				return;
			}
		}
	}
}