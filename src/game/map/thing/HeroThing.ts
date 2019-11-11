/*
 * @Description: 玩家自己的角色
 * @Author: guolinsen
 * @Date: 2019-08-02 17:07:38
 * @LastEditTime: 2019-11-01 16:42:39
 */
class HeroThing extends HumanThing {
	private lastPostPoint: XY = { x: 0, y: 0 };
	private curHp: number;

	public oldValue: any;

	public constructor() {
		super();
		this.oldValue = {};
		this.canTouch = false;
	}

	public init(pro) {
		super.init(pro);
		this.title.setNameColor(ColorUtil.TITLE_HERO);
		let fInfo = GameCache.family.fInfo;
		if (fInfo) {
			this.title.setFamilyName(fInfo.fName);
		}
	}

	public setPath(path: CWTPoint[]) {
		if (this.isJump) return;
		super.setPath(path);
		this.postPoint();
	}

	public setCellXY(x, y, server) {
		super.setCellXY(x, y, server);
		if (!server) {
			this.postPoint();
		}
		this.lastPostPoint.x = x;
		this.lastPostPoint.y = y;
	}
	protected jumpEnd() {
		super.jumpEnd();
		this.postPoint();
	}

	protected arrivedPathPoint() {
		super.arrivedPathPoint();
		this.postPoint();
		if (this == GameCache.hero.focusPlayer) {
			App.VisitManager.checkArrived();
		}
	}

	protected checkCellXY() {
		super.checkCellXY();
		if (Math.abs(this.lastPostPoint.x - this.cellXY.x) >= 4 || Math.abs(this.lastPostPoint.y - this.cellXY.y) >= 4) {
			this.postPoint();
		}
	}

	/**清除移动路径*/
	public clearPath() {
		super.clearPath();
		this.postPoint();
	}

	private postPoint() {
		if (GameCache.map.isAIMap) return;
		if (this.lastPostPoint.x == this.cellXY.x && this.lastPostPoint.y == this.cellXY.y) return;
		Proxy.move.sendMoveto(this.cellXY.x, this.cellXY.y, this.pro.isMainPlayer ? 0 : this.pro.pro(PropId.AP_ACTOR_ID));
		this.lastPostPoint.x = this.cellXY.x;
		this.lastPostPoint.y = this.cellXY.y;
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
			case PropId.AP_BODY_ID:
			case PropId.AP_HAIR:
			case PropId.AP_HAT:
			case PropId.AP_EYE:
			case PropId.AP_GLASSES:
			case PropId.AP_PANTS:
			case PropId.AP_ASSIST:
			case PropId.AP_WEAPON:
			case PropId.AP_BACK:
			case PropId.AP_SWING:
				App.MessageCenter.dispatch(MsgConst.EQUIP_ATTR_CHANGE);
				break;
			case PropId.AP_CHKPOINT_LV:
				if (this.pro.isMainPlayer)
					GameCache.pass.updateLv(propValue);
				break;
			case PropId.AP_LEVEL:
				// GameCache.sysopen.initCheckList();
				break;
			case PropId.AP_RISK_LVL:
				GameCache.adventure.updatelv(propValue);
				break;
			case PropId.AP_SIGNIN:
				GameCache.sign.updateCounts(propValue);
				break;
			case PropId.AP_CHECKINS:
				GameCache.sign.updateAwardState(propValue);
				break;


		}
		App.MessageCenter.dispatch(MsgConst.PROPERTY + propType);
	}

	protected changeHp(value: number): void {
		super.changeHp(value);
		if (this.curHp == null) {
			this.curHp = value;
			return;
		}
		let hurt = value - this.curHp;
		this.curHp = value;
		(hurt != 0) && App.HurtTxtManager.play(this.pro.recog, hurt, false, HurtType.SELF, this);
	}

	public die() {
		super.die();
		App.MessageCenter.dispatch(MsgConst.HERO_DIE);
		GameCache.hero.resetFocus();
	}

	public reAlive() {
		super.reAlive();
		GameCache.hero.resetFocus();
	}

	public get isFighting() {
		return this.fight.fighting;
	}
	public addPathPoint(x, y) {
	}

	protected showHp() {
		this.getTopTitle();
		this.topTitle.setHp(this.pro.pro(PropId.AP_HP), this.pro.pro(PropId.AP_MAX_HP));
	}
}