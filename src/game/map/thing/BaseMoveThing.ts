/*
 * @Description: 可移动实体
 * @Author: guolinsen
 * @Date: 2019-08-02 17:07:38
 * @LastEditTime: 2019-10-24 13:54:34
 */
class BaseMoveThing extends BaseThing {
	private path: CWTPoint[];
	private tarPoint: CWTPoint;
	private moveStarTime: number;
	private moveTargetTime: number;
	public moveSpeed = GlobalVar.DEFAULT_MOVE_SPEED; //移动一格需要的时间
	private moveSpeedX = 2;
	private moveSpeedY = 2;

	//protected bodyContainer: egret.DisplayObjectContainer;
	private body: ThingBody;
	private curAction: number;
	private nextAction: number;
	private nextActionNum: number;

	isMove: boolean = false;
	isJump = false;
	isfollow: boolean = false;

	private _jumpValue = 0;
	private _jumpStartPos: XY = new XY();
	private _jumpTopPos: XY = new XY();
	private _jumpEndPos: XY = new XY();

	public constructor() {
		super();
		this.touchEnabled = this.touchChildren = false;
		// this.bodyContainer = new egret.DisplayObjectContainer();
		// this.addChild(this.bodyContainer);
		this.body = new ThingBody(this);
		this.body.callHandler = Handler.create(this, this.bodyPlayComplete, null, false);
	}

	public init(pro: PropertySet) {
		this.moveSpeed = GlobalVar.DEFAULT_MOVE_SPEED;
		this.playAction(ActionStandard.SA_IDLE);
		this.body.init(pro);
		super.init(pro)
	}
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
				this.body.changeSkin();
				break;
			case PropId.AP_MOVE_SPEED:
				this.moveSpeed = propValue;
				break;
		}
	}

	public loadBody(bodyId: number) {
		this.body.changeSkin();
	}

	// public playTempAction(act) {
	// 	this.body.playTempAction(ActionStandard.getSpine(act));
	// }

	public playAction(act, num = 0, plaNow: boolean = false) {
		// this.curAction = act;
		// this.body.playAction(ActionStandard.getSpine(act), num);
		// if(this.curAction == ActionStandard.SA_DIE || this.nextAction == ActionStandard.SA_DIE){
		// 	console.log("eeeeeeeeee");

		// }
		if (act == ActionStandard.SA_STRUCK) {
			if (this.nextAction || (this.curAction != ActionStandard.SA_IDLE && this.curAction != ActionStandard.SA_RUN)) {
				return;
			}
		}
		this.nextAction = act;
		this.nextActionNum = num;
		if (plaNow) {
			this.playNextAction();
		}
	}

	protected playNextAction() {
		let act = this.nextAction;
		let num = this.nextActionNum;
		if (act == ActionStandard.SA_STRUCK) {
			if (this.curAction != ActionStandard.SA_IDLE && this.curAction != ActionStandard.SA_RUN) {
				this.nextAction = null;
				return;
			}
		}
		this.curAction = act;
		this.body.playAction(ActionStandard.getSpine(act), num);
		this.nextAction = null;
	}

	public get action() {
		return this.curAction;
	}

	public moveTo(x, y): boolean {
		let p = GameCache.map.findPath(this.cellXY.x, this.cellXY.y, x, y);
		this.setPath(p);
		return p && p.length > 0;
	}

	public stopMove() {
		this.clearPath();
		this.endMove();
	}

	public setPath(path: CWTPoint[]) {
		this.clearPath();
		if (path && path.length == 0) path = null;
		this.path = path;
	}

	public addPathPoint(x, y) {
		let p: CWTPoint = new CWTPoint();
		p.mX = x;
		p.mY = y;
		if (!this.path) this.path = [];
		this.path.push(p);
	}

	/**
     * 覆盖父类的更新函数 
     * @param CurrentTick 当前系统运行时间
     * 
     */
	public update(tick: number): void {
		if (this.isJump) return;
		//如果正在移动则处理移动
		let tp = this.tarPoint;
		if (this.tarPoint) {
			if (this.moveTargetTime <= tick) {
				this.arrivedPathPoint();
			} else {
				let mx = this.moveSpeedX * (tick - this.moveStarTime);
				let my = this.moveSpeedY * (tick - this.moveStarTime);
				this.x += mx;
				this.y += my;
				this.moveStarTime = tick;
				this.checkCellXY();
			}
		} else if (this.path) {
			this.tarPoint = this.path.shift();
			tp = this.tarPoint;
			let cell = this.cellXY;
			if (tp) {
				let dis = Math.pow(Math.pow(cell.x - tp.mX, 2) + Math.pow(cell.y - tp.mY, 2), 0.5);
				let cw = GameCache.map.cellWidth;
				let ch = GameCache.map.cellHeight;
				let costTime = dis * this.moveSpeed;
				this.updateBodyDir(this.cellXY.x, tp.mX);
				let jump = GameCache.map.isJump(cell.x, cell.y, tp.mX, tp.mY);
				if (jump) {
					//let num: number = Math.ceil(Math.abs(cell.y - tp.mY) / GlobalVar.JUMP_Y);
					this.jumpTo((tp.mX + 0.5) * cw, (tp.mY + 0.5) * ch, (costTime + this.moveSpeed * 1) * 0.8);
				} else {
					this.moveTargetTime = tick + costTime;
					this.moveStarTime = tick;
					this.moveSpeedX = (tp.mX - cell.x) * cw / costTime;
					this.moveSpeedY = (tp.mY - cell.y) * ch / costTime;
					this.startMove();
				}
			} else {
				this.endMove();
			}
		} else {
			this.endMove();
		}
		// if (this.title.x != this.x) this.title.x = this.x;
		// if (this.title.y != this.y) this.title.y = this.y;
		if (this.nextAction != null) {
			this.playNextAction();
		}
	}

	private _jumpX: number;
	private _jumpY: number;
	private _jumpTime: number;
	private jumpTo(x, y, costTime) {

		this.isJump = true;
		this.isMove = true;

		// this._jumpValue = 1;
		// this._jumpStartPos.x = this.x;
		// this._jumpStartPos.y = this.y;
		// this._jumpEndPos.x = x;
		// this._jumpEndPos.y = y;

		this._jumpX = x;
		this._jumpY = y;
		this._jumpTime = costTime;
		//this.playAction(ActionStandard.SA_JUMP_START, 1, true);
		this.jumpStart();
	}

	protected jumpStart() {
		if (this.disappear) return;
		this.playAction(ActionStandard.SA_JUMP, 0, true);
		// egret.Tween.get(this, { onChange: this.jumpProcess, onChangeObj: this }).
		// 	to({ x: this._jumpX, y: this._jumpY }, this._jumpTime, this._jumpY > this.x ? egret.Ease.circIn : egret.Ease.circInOut).call(this.jumpEnd, this);
		this._jumpStartPos.x = this.x;
		this._jumpStartPos.y = this.y;
		this._jumpEndPos.x = this._jumpX;
		this._jumpEndPos.y = this._jumpY;
		let top: number = 40;
		let xy = this._jumpTopPos;
		if (this.y > this._jumpY) {
			xy.y = this._jumpY - top;
			if (Math.abs(this.x - this._jumpX) <= 1) {
				xy.x = this._jumpX;
			} else if (this.x > this._jumpX) {
				xy.x = this._jumpX + top;
			} else {
				xy.x = this._jumpX - top;
			}
		} else if (this.y < this._jumpY) {
			xy.y = this.y - top;
			if (Math.abs(this.x - this._jumpX) <= 1) {
				xy.x = this.x;
			} else if (this.x > this._jumpX) {
				xy.x = this.x - top;
			} else {
				xy.x = this.x + top;
			}
		} else {
			xy.y = 0;
		}

		this._jumpValue = 0;
		egret.Tween.get(this).to({ factor: 1 }, this._jumpTime).call(this.jumpEnd, this);
	}

	protected jumpEnd() {
		this.isJump = false;
		egret.Tween.removeTweens(this);
		this.arrivedPathPoint();
		if (this.path && this.path.length > 0) {
			return;
		}
		this.endMove();
	}

	protected jumpProcess() {
		// if (this.title.x != this.x) this.title.x = this.x;
		// if (this.title.y != this.y) this.title.y = this.y;
	}

	public get factor(): number {
		return this._jumpValue;
	}

	public set factor(value: number) {
		this._jumpValue = value;
		let p1 = 1 - value;
		let a1 = p1 * p1;
		let a2 = value * p1 * 2;
		let a3 = value * value;
		this.x = a1 * this._jumpStartPos.x + a2 * this._jumpTopPos.x + a3 * this._jumpEndPos.x;
		this.y = a1 * this._jumpStartPos.y + a2 * this._jumpTopPos.y + a3 * this._jumpEndPos.y;
		this.jumpProcess();
	}

	protected bodyPlayComplete(actSpine: string) {
		if (this.curAction == ActionStandard.SA_DIE) return;
		if (this.curAction == ActionStandard.SA_JUMP) return;
		if (this.curAction == ActionStandard.SA_JUMP_START) {
			this.jumpStart();
			return;
		}
		this.playAction(this.isMove ? ActionStandard.SA_RUN : ActionStandard.SA_IDLE, 0);
	}

	protected startMove() {
		if (this.curAction != ActionStandard.SA_RUN) this.playAction(ActionStandard.SA_RUN, 0);
		if (this.isMove) return;
		this.isMove = true;
	}

	/**寻路完毕*/
	protected endMove() {
		if (!this.isMove) return;
		this.isMove = false;
		this.isfollow = false;
		this.path = null;
		this.playAction(ActionStandard.SA_IDLE, 0);
	}

	public setCellXY(x, y, server) {
		super.setCellXY(x, y, server);
	}

	/**到达寻路路径的一个点*/
	protected arrivedPathPoint() {
		if (!this.tarPoint) return;
		this.setCellXY(this.tarPoint.mX, this.tarPoint.mY, false);
		this.tarPoint = null;
	}

	/**直接走到最后一点*/
	protected toLastPoint() {
		if (this.path) {
			let a = this.path.length;
			if (a > 0) this.path = [this.path.pop()];
		}
	}

	/**清除移动路径*/
	public clearPath() {
		this.path = null;
		if (!this.isJump)
			this.tarPoint = null;
	}

	clearJump() {
		if (this.isJump) {
			this.isJump = false;
			this.tarPoint = null;
			egret.Tween.removeTweens(this);
		}
	}

	protected checkCellXY() {
		this.cellXY.x = (this.x / 40) >> 0;
		this.cellXY.y = (this.y / 40) >> 0;
	}

	updateBodyDir(startX, endX) {
		if (startX > endX) {
			this.body.setDir(-1);
		} else if (startX < endX) {
			this.body.setDir(1);
		}
	}

	$onRemoveFromeStage() {
		super.$onRemoveFromStage();
		this.body.setStage(false);
	}

	$onAddToStage(stage, nestLevel) {
		super.$onAddToStage(stage, nestLevel);
		this.body.setStage(true);
	}

	public getBodyDir() {
		return this.body.dir;
	}

	public dispose(): void {
		super.dispose();
		this.path = null;
		this.isMove = false;
		this.isJump = false;
		this.isfollow = false;
		this.curAction = null;
		this.tarPoint = null;
		egret.Tween.removeTweens(this);
		this.body.onRemove();
	}
}