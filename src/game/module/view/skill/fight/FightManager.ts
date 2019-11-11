/*
 * @Description: 战斗管理
 * @Author: guolinsen
 * @Date: 2019-07-18 13:45:52
 * @LastEditTime: 2019-10-28 17:54:33
 */
class FightManager extends BaseClass {

	/**是否正在开启自动战斗，用于ai初始化*/
	private autoFight: boolean = true;
	private fightDic = {};

	/**英雄正在挂机中*/
	public onHook: boolean = false;

	public constructor() {
		super();
	}
	public mapChange() {
		App.TimerManager.removeAll(this);
	}
	public addFight(fight: ThingFight) {
		this.fightDic[fight.user.pro.recog] = fight;
		fight.open = this.autoFight;
	}
	public removeFight(recog: number) {
		delete this.fightDic[recog];
	}
	public useSkill(actor: AnimalThing, skill: UserSkill, tar: AnimalThing) {
		if (GameCache.map.isAIMap) {
			this.playUseSkill(actor, tar.cellXY.x, tar.cellXY.y, skill, tar.pro.recog);
		} else {
			let dir: number = MathUtils.getDirByGridPoint(actor.cellXY.x, actor.cellXY.y, tar.cellXY.x, tar.cellXY.y);
			Proxy.skill.sendUseSkill(actor.pro["isMainPlayer"] ? 0 : actor.pro.pro(PropId.AP_ACTOR_ID), skill.nSkillId, tar.pro.recog, tar.cellXY.x, tar.cellXY.y, dir);
		}
	}
	/**播放施法效果*/
	public playUseSkill(actor: AnimalThing, x: number, y: number, skill: UserSkill, target: number) {
		actor.setBanHavior(0);
		actor.playSkill(skill, x, y, target);
	}

	/**播放击中效果*/
	public playBeHitSkill(actacker: AnimalThing, defender: AnimalThing, skill: UserSkill) {
		App.skillPlay.playHitEff(actacker, defender, skill.nSkillId);
		if (actacker && defender) {
			// let std: StdSkill = GameConfig.skill[skill];
			// if (std && std.action2) {
			// 	if (!defender.isDie && !defender.disappear)
			// 		defender.playAction(std.action2, 1);
			// }
			if (this.fightDic[defender.pro.recog]) {
				this.fightDic[defender.pro.recog].beHit(actacker);
			}
		}
	}

	/********************************************************************************************/
	//前端假战斗计算
	/**击中目标，用于前端自己计算战斗*/
	public postHitTarget(actor: AnimalThing, skill: UserSkill, tar: number, x: number, y: number) {
		if (!GameCache.map.isAIMap) return;
		if (GameCache.pass.isOpen) {
			if (actor.pro.kind == ThingKind.Monster) return;
		}
		let defender: AnimalThing = App.ThingManager.getThing(tar) as AnimalThing;
		if (!defender) return;
		if (defender.disappear || defender.isDie) return;
		let pro1 = actor.pro;
		let pro2 = defender.pro;
		let std: StdSkill = GameConfig.skill[skill.nSkillId];
		let range: StdSkillRange = std.actRange && std.actRange[0];
		if (range) {
			//单体伤害
			let result = range.acts && range.acts[0] && range.acts[0]["results"] && range.acts[0]["results"];
			if (!result) return;
			if (range.rangeType == 0 || range.rangeType == 1) {
				if (defender.isDie || defender.disappear) return;
				this.doResult(result, actor, defender, skill);
			} else {
				let xStart: number, xEnd: number, yStart: number, yEnd: number;
				let xCenter: number, yCenter: number;
				if (range.rangeCenter == 0 || range.rangeCenter == 2) {
					xCenter = x;
					yCenter = y;
				} else {
					xCenter = actor.cellXY.x;
					yCenter = actor.cellXY.y;
				}
				xStart = xCenter + range.xStart;
				xEnd = xCenter + range.xEnd;
				if (range.rangeType == 2) {
					yStart = yEnd = yCenter;
				}
				//面向区域方向的
				else if (range.rangeType == 6) {
					let dir = x > xCenter ? 1 : -1;
					if (x == xCenter) {
						dir = actor.getBodyDir();
					}
					yStart = yCenter;
					yEnd = yCenter + range.yEnd;
					if (dir == 1) {
						xStart = xCenter;
						xEnd = xCenter + range.xEnd;
					} else {
						xStart = xCenter - range.xEnd;
						xEnd = xCenter;
					}
				}
				else {
					yStart = yCenter + range.yStart;
					yEnd = yCenter + range.yEnd;
				}
				GlobalVar.testSkill && App.gameWorld.drawSkillRange(xStart, yStart, xEnd, yEnd);
				let camList = AICampEnemy[actor.pro.aiCamp];
				let tar: AnimalThing;
				if (camList) {
					let thingDic = App.ThingManager.getThingDic();
					for (let k in thingDic) {
						let thing: AnimalThing = thingDic[k] as AnimalThing;
						if (thing.isDie || thing.disappear) {
							continue;
						}
						if (camList.indexOf(thing.pro.aiCamp) == -1) {
							continue;
						}
						let px: number = thing.cellXY.x;
						let py: number = thing.cellXY.y;
						if (px < xStart || px > xEnd || py < yStart || py > yEnd) {
							continue;
						}
						this.doResult(result, actor, thing, skill);
					}
				}
			}
		}
	}

	private doResult(result, actor: AnimalThing, defender: AnimalThing, skill: UserSkill) {
		let i = 0;
		let a = result.length;
		for (; i < a; i++) {
			if (defender.isDie || defender.disappear) break;
			let r = result[i];
			let hurt = actor.pro.pro(PropId.AP_ATTACK);		   	  //基础攻击值
			let aCri = actor.pro.pro(PropId.AP_CRIT);		      //暴击率
			let aCrihurt = actor.pro.pro(PropId.AP_CRIT_HURT);	  //暴击伤害

			let def = defender.pro.pro(PropId.AP_DEFENCE);		  //防御值
			let defC = GameConfig.globalConfig.DEF; 			  //防御系数
			let reduce = defender.pro.pro(PropId.AP_DAMAGE_DEC);  //伤害减少
			let unCri = defender.pro.pro(PropId.AP_UNCRIT);		  //抗暴
			let maxCri = GameConfig.globalConfig.CRIT_MAX;		  //最大暴击率
			let minCri = GameConfig.globalConfig.CRIT_MIN;		  //最小暴击率

			let float = Math.random() > 0.5 ? 1 : -1;
			float = Math.random() * GameConfig.globalConfig.DMG_FLOAT * float / 10000;   		//伤害浮动值
			float = 1 - float;
			let addHurt = actor.pro.pro(PropId.AP_DAMAGE_INC);								//增加伤害值
			let extraHurt = actor.pro.pro(PropId.AP_DAMAGE_EXT);
			hurt = ((hurt * r.id / 10000 + r.value) * (1 + addHurt) * (1 - def / (def + defC)) * (1 - reduce) * float + extraHurt) >> 0;
			// hurt = (hurt - def + r.value * skill.nLevel + hurt * r.id / 10000) >> 0;
			let cri = Math.min(Math.max(aCri - unCri, minCri), maxCri) / 10000;
			let jugeCri = Math.random();
			let bao = cri >= jugeCri;
			if (bao) hurt = hurt * GameConfig.globalConfig.CRIT_RATE * (1 + aCrihurt);
			this.calHurt(hurt, defender, r.resultType, r.delay, bao);
			this.playBeHitSkill(actor, defender, skill);
		}
	}

	private calHurt(hurt, defender: AnimalThing, type: number, delay: number, bao: boolean) {
		let hutType: number = HurtType.NORMAL;
		let pro2 = defender.pro;
		// let def = pro2.pro(type == 1 ? PropId.AP_PHYSICAL_DEFENCE_MAX : PropId.AP_MAGIC_DEFENCE_MAX);
		// hurt = ((hurt - def) * MathUtils.limit(0.8, 1)) >> 0;
		if (hurt <= 0) hurt = 1;
		let showHurt = hurt;
		if (GameCache.pass.isOpen) {
			hurt = 1;
		}

		let curHp: number = pro2.pro(PropId.AP_HP) - hurt;
		if (curHp <= 0) {
			if (!GameCache.pass.isOpen)
				showHurt = pro2.pro(PropId.AP_HP);
			defender.die();
			App.MessageCenter.dispatch(MsgConst.BATTLE_KILL, defender);
		} else {
			pro2.pro(PropId.AP_HP, curHp, defender);
		}

		if (GameCache.hero.isMySelf(defender.pro.recog)) hutType = HurtType.SELF;
		if (delay) {
			App.TimerManager.addDelay(delay, 1, 1, App.HurtTxtManager.play, App.HurtTxtManager, null, null,
				pro2.recog, showHurt, bao, hutType, defender);
		} else {
			App.HurtTxtManager.play(pro2.recog, showHurt, bao, hutType, defender);
		}
	}
	/********************************************************************************************/

	/**开启AI*/
	public starAllAI(v: boolean) {
		for (let recog in this.fightDic) {
			this.fightDic[recog].open = v;
			this.autoFight = v;
		}
	}

	/******************************************************************************/
	//玩家自己的操作
	public setFightTarget(tar: AnimalThing) {
		if (tar && (tar.isDie || tar.disappear)) {
			this.heroStart(false);
			return;
		}
		let list = GameCache.hero.list;
		for (let hero of list) {
			let recog = hero.pro.recog;
			let fight: ThingFight = this.fightDic[recog];
			fight.target = tar;
		}
		this.heroStart(true);
	}
	//主角开始/结束挂机
	public heroStart(start: boolean, monsterId: number = 0) {
		this.onHook = start;
		let list = GameCache.hero.list;
		for (let hero of list) {
			let recog = hero.pro.recog;
			let fight: ThingFight = this.fightDic[recog];
			fight.open = start;
			fight.monsterId = monsterId;
			if (!start) {
				fight.target = null;
			}
		}
		if (!start) {
			if (GameCache.map.isHookMap() && GameCache.map.dataInit) {
				if (!App.TimerManager.isExists(this.startHook, this)) {
					App.TimerManager.addDelay(5000, 1, 1, this.startHook, this);
				}
			}
		}
	}

	private startHook() {
		if (!GameCache.map.dataInit) return;
		this.heroStart(true);
	}

	public setUseSKill(skill, forever?: boolean) {
		let recog = GameCache.hero.mainPro.recog;
		let fight: ThingFight = this.fightDic[recog];
		forever && (fight.foreverSkill = skill);
		fight.useSkill = skill;
	}
	/*****************************************************************************/
}