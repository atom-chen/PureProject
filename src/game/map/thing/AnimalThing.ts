/*
 * @Description: 动物实体、怪物和人物的基类
 * @Author: guolinsen
 * @Date: 2019-06-20 21:58:20
 * @LastEditTime: 2019-10-28 17:35:26
 */
class AnimalThing extends BaseMoveThing {

	protected skillAction: SkillAction;
	protected fight: ThingFight;
	public isDie: boolean = false;
	protected banHavior: number = 0; //禁止所有行为

	protected topTitle: ThingTopTitle;
	protected shadow: egret.DisplayObject;
	protected showTop: boolean = false;

	public constructor() {
		super();
	}
	public init(pro: PropertySet) {
		super.init(pro);
		if (pro.fightAi) {
			this.fight = ObjectPool.get(ThingFight);
			this.fight.register(this);
		}
		this.skillAction = new SkillAction();
		//this.createShadow();
	}

	protected createShadow() {
		if (this.shadow == null) {
			let bit = new eui.Image();
			bit.source = RES_DIR_BODY_SHADOW;
			bit.anchorOffsetX = 39;
			bit.anchorOffsetY = 16;
			this.shadow = bit;
		}
		App.ThingManager.bottomLayer.addChild(this.shadow);
	}

	protected removeShadow() {
		App.DisplayUtils.removeFromParent(this.shadow);
	}

	protected jumpStart() {
		if (this.disappear) return;
		super.jumpStart();
		if (this.shadow) {
			this.shadow.visible = false;
		}
	}

	protected jumpEnd() {
		super.jumpEnd();
		if (this.shadow) {
			this.shadow.visible = true;
		}
	}

	/**
	 * 处理单个属性变更 
	 * @param propType
	 * @param propValue
	 * 
	 */
	public updateProperty(propType: number, propValue: any): void {
		super.updateProperty(propType, propValue);
		switch (propType) {
			case PropId.AP_LEVEL:
				break;
			case PropId.AP_HP:
				this.changeHp(propValue);
				break;
			case PropId.AP_MAX_HP:

				break;
			case PropId.AP_ATTACK_SPEED:
				break;
			case PropId.AP_DIR:
				break;
			case PropId.AP_BODY_COLOR:   //身体颜色
				break;
			case PropId.AP_STATE://状态变更
				if (propValue & ThingState.DEATH)
					this.isDie = true;
				else if (this.isDie)
					this.reAlive();
				break;
		}
	}
	/**
   * 处理HP变更
   * @param value
   * 
   */
	protected changeHp(value: number): void {
		if (this.isDie && value > 0) {
			this.reAlive();
		}
		let maxHp = this.pro.pro(PropId.AP_MAX_HP);
		if (value && maxHp && value < maxHp) {
			if (!App.TimerManager.isExists(this.showHp, this)) {
				App.TimerManager.addDelay(500, 1, 1, this.showHp, this, null, null);
			}
			else if (this.topTitle) {
				this.showHp();
			}
		} else {
			this.removeTopTile();
		}
	}

	protected showHp() {
		this.getTopTitle();
		this.topTitle.setHp(this.pro.pro(PropId.AP_HP), this.pro.pro(PropId.AP_MAX_HP));
	}

	protected clearBehavior() {
		this.stopMove();
		this.skillAction.play = false;
	}

	protected getTopTitle() {
		if (this.topTitle == null) {
			this.topTitle = ObjectPool.get(ThingTopTitle);
			this.topTitle.setHpType(this.pro.hpType);
			this.topTitle.x = this.x;
			this.topTitle.y = this.y - 120;
			App.ThingManager.titleLayer.addChild(this.topTitle);
		}
	}

	protected removeTopTile() {
		App.TimerManager.remove(this.showHp, this);
		if (this.topTitle) {
			this.topTitle.dispose();
			App.DisplayUtils.removeFromParent(this.topTitle);
			this.topTitle = null;
		}
	}

	/**
	  * 死亡的处理 
	  * 
	  */
	public die(): void {
		this.isDie = true;
		this.clearBehavior();
		App.TimerManager.addDelay(200, 1, 1, this.playAction, this, null, null, ActionStandard.SA_DIE, 1);
		//this.playAction(ActionStandard.SA_DIE, 1);
		if (this.pro.pro(PropId.AP_HP) > 0) {
			this.changeHp(0);
		}
		this.removeBubbles();
		this.removeTopTile();
		this.isfollow = false;
	}
	/**
	 * 复活的处理 
	 * 
	 */
	public reAlive(): void {
		this.playAction(ActionStandard.SA_IDLE);
		this.isDie = false;
	}

	public moveTo(x, y): boolean {
		if (this.banHavior > App.TimerManager.getSyncTime()) return false;
		return super.moveTo(x, y);
	}

	public setPath(p) {
		if (this.isDie) return;
		if (this.banHavior > App.TimerManager.getSyncTime()) return;
		super.setPath(p);
	}

	public update(tick: number): void {
		super.update(tick);
		let topTile = this.topTitle;
		if (topTile) {
			if (topTile.x != this.x) topTile.x = this.x;
			if (topTile.y != this.y) topTile.y = this.y - 120;
		}
		let shadow = this.shadow;
		if (shadow) {
			if (shadow.x != this.x) shadow.x = this.x;
			if (shadow.y != this.y) shadow.y = this.y;
		}

		if (this.banHavior > tick) return;

		if (!this.isMove) {
			let sa = this.skillAction
			if (sa.play) {
				sa.play = false;
				this.playSkillAction(sa);
			}
		}
		if (this.fight) {
			this.fight.update(tick);
		}
	}

	protected jumpProcess() {
		let topTile = this.topTitle;
		if (!topTile) return;
		if (topTile.x != this.x) topTile.x = this.x;
		if (topTile.y != this.y) topTile.y = this.y - 120;
	}

	/**主动使用技能*/
	public preSkill() {
		this.clearPath(); //先清除移动
	}

	/**播放技能*/
	public playSkill(skillId: UserSkill, x: number, y: number, tar: number) {
		this.toLastPoint(); //先直接移动到目标点，防止网络卡的时候 其他玩家施法技能的位置不对
		let sa = this.skillAction;
		sa.skill = skillId;
		sa.x = x;
		sa.y = y;
		sa.target = tar;
		sa.play = true;
	}

	protected playSkillAction(sa: SkillAction) {
		let con: StdSkill = GameConfig.skill[sa.skill.nSkillId];
		if (!con) {
			throw (new Error("找不到技能配置," + sa.skill.nSkillId));
		}
		this.updateBodyDir(this.cellXY.x, sa.x);
		if (con.action1) this.playAction(con.action1, 1);
		App.skillPlay.play(this, sa.skill, sa.x, sa.y, sa.target);
	}

	/**0解除 >0禁止时间段*/
	public setBanHavior(t: number) {
		this.banHavior = t + App.TimerManager.getSyncTime() - 1;
	}

	public isTouch(mouseX: number, mouseY: number): boolean {
		if (this.isDie) return false;
		return super.isTouch(mouseX, mouseY);
	}

	public dispose() {
		App.TimerManager.removeAll(this);
		if (this.fight) {
			this.fight.onRemove();
			this.fight = null;
		}
		super.dispose();
		this.removeTopTile();
		this.removeShadow();
		this.skillAction.play = false;
		this.banHavior = 0;
	}
}