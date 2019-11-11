class MonsterThing extends AnimalThing {
	private monsterType: number;
	public constructor() {
		super();
	}

	public init(pro: PropertySet) {
		let mConfig = GameConfig.monster[pro.pro(PropId.AP_ACTOR_ID)];
		if (mConfig) {
			this.monsterType = mConfig.monsterType;
			App.ThingManager.dropCellX = pro.pro(PropId.AP_X);
			App.ThingManager.dropCellY = pro.pro(PropId.AP_Y);
		}
		else {
			this.monsterType = 1;
		}
		super.init(pro);

		this.pro.aiCamp = AICampType.MONSTER;
		this.title.visible = false;
	}

	/**
   * 处理HP变更
   * @param value
   * 
   */
	protected changeHp(value: number): void {
		super.changeHp(value);
		// if (value > 0) {
		// 	this.title.visible = value < this.pro.pro(PropId.AP_MAX_HP);
		// } else {
		// 	this.title.visible = false;
		// }
		ActorSeleMgr.hpChange(this);
	}

	protected showHp() {
		if (this.monsterType == MonsterType.BOSS) return;
		super.showHp();
		this.title.visible = true;
	}

	public die() {
		super.die();
		App.ThingManager.dropCellX = this.cellXY.x;
		App.ThingManager.dropCellY = this.cellXY.y;
		ActorSeleMgr.hpChange(this);
		egret.Tween.get(this).wait(1000).to({ aplha: 0 }, 600).call(this.onRemove, this);
	}

	private onRemove() {
		this.disappear = true;
	}

	public dispose() {
		super.dispose();
		this.alpha = 1;
	}

	public get configId() {
		return this.pro.pro(PropId.AP_ACTOR_ID);
	}

}