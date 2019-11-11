var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/*
 * @Description: 可移动实体
 * @Author: guolinsen
 * @Date: 2019-08-02 17:07:38
 * @LastEditTime: 2019-10-24 13:54:34
 */
var BaseMoveThing = (function (_super) {
    __extends(BaseMoveThing, _super);
    function BaseMoveThing() {
        var _this = _super.call(this) || this;
        _this.moveSpeed = GlobalVar.DEFAULT_MOVE_SPEED; //移动一格需要的时间
        _this.moveSpeedX = 2;
        _this.moveSpeedY = 2;
        _this.isMove = false;
        _this.isJump = false;
        _this.isfollow = false;
        _this._jumpValue = 0;
        _this._jumpStartPos = new XY();
        _this._jumpTopPos = new XY();
        _this._jumpEndPos = new XY();
        _this.touchEnabled = _this.touchChildren = false;
        // this.bodyContainer = new egret.DisplayObjectContainer();
        // this.addChild(this.bodyContainer);
        _this.body = new ThingBody(_this);
        _this.body.callHandler = Handler.create(_this, _this.bodyPlayComplete, null, false);
        return _this;
    }
    BaseMoveThing.prototype.init = function (pro) {
        this.moveSpeed = GlobalVar.DEFAULT_MOVE_SPEED;
        this.playAction(ActionStandard.SA_IDLE);
        this.body.init(pro);
        _super.prototype.init.call(this, pro);
    };
    BaseMoveThing.prototype.updateProperty = function (propType, propValue) {
        _super.prototype.updateProperty.call(this, propType, propValue);
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
    };
    BaseMoveThing.prototype.loadBody = function (bodyId) {
        this.body.changeSkin();
    };
    // public playTempAction(act) {
    // 	this.body.playTempAction(ActionStandard.getSpine(act));
    // }
    BaseMoveThing.prototype.playAction = function (act, num, plaNow) {
        // this.curAction = act;
        // this.body.playAction(ActionStandard.getSpine(act), num);
        // if(this.curAction == ActionStandard.SA_DIE || this.nextAction == ActionStandard.SA_DIE){
        // 	console.log("eeeeeeeeee");
        if (num === void 0) { num = 0; }
        if (plaNow === void 0) { plaNow = false; }
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
    };
    BaseMoveThing.prototype.playNextAction = function () {
        var act = this.nextAction;
        var num = this.nextActionNum;
        if (act == ActionStandard.SA_STRUCK) {
            if (this.curAction != ActionStandard.SA_IDLE && this.curAction != ActionStandard.SA_RUN) {
                this.nextAction = null;
                return;
            }
        }
        this.curAction = act;
        this.body.playAction(ActionStandard.getSpine(act), num);
        this.nextAction = null;
    };
    Object.defineProperty(BaseMoveThing.prototype, "action", {
        get: function () {
            return this.curAction;
        },
        enumerable: true,
        configurable: true
    });
    BaseMoveThing.prototype.moveTo = function (x, y) {
        var p = GameCache.map.findPath(this.cellXY.x, this.cellXY.y, x, y);
        this.setPath(p);
        return p && p.length > 0;
    };
    BaseMoveThing.prototype.stopMove = function () {
        this.clearPath();
        this.endMove();
    };
    BaseMoveThing.prototype.setPath = function (path) {
        this.clearPath();
        if (path && path.length == 0)
            path = null;
        this.path = path;
    };
    BaseMoveThing.prototype.addPathPoint = function (x, y) {
        var p = new CWTPoint();
        p.mX = x;
        p.mY = y;
        if (!this.path)
            this.path = [];
        this.path.push(p);
    };
    /**
     * 覆盖父类的更新函数
     * @param CurrentTick 当前系统运行时间
     *
     */
    BaseMoveThing.prototype.update = function (tick) {
        if (this.isJump)
            return;
        //如果正在移动则处理移动
        var tp = this.tarPoint;
        if (this.tarPoint) {
            if (this.moveTargetTime <= tick) {
                this.arrivedPathPoint();
            }
            else {
                var mx = this.moveSpeedX * (tick - this.moveStarTime);
                var my = this.moveSpeedY * (tick - this.moveStarTime);
                this.x += mx;
                this.y += my;
                this.moveStarTime = tick;
                this.checkCellXY();
            }
        }
        else if (this.path) {
            this.tarPoint = this.path.shift();
            tp = this.tarPoint;
            var cell = this.cellXY;
            if (tp) {
                var dis = Math.pow(Math.pow(cell.x - tp.mX, 2) + Math.pow(cell.y - tp.mY, 2), 0.5);
                var cw = GameCache.map.cellWidth;
                var ch = GameCache.map.cellHeight;
                var costTime = dis * this.moveSpeed;
                this.updateBodyDir(this.cellXY.x, tp.mX);
                var jump = GameCache.map.isJump(cell.x, cell.y, tp.mX, tp.mY);
                if (jump) {
                    //let num: number = Math.ceil(Math.abs(cell.y - tp.mY) / GlobalVar.JUMP_Y);
                    this.jumpTo((tp.mX + 0.5) * cw, (tp.mY + 0.5) * ch, (costTime + this.moveSpeed * 1) * 0.8);
                }
                else {
                    this.moveTargetTime = tick + costTime;
                    this.moveStarTime = tick;
                    this.moveSpeedX = (tp.mX - cell.x) * cw / costTime;
                    this.moveSpeedY = (tp.mY - cell.y) * ch / costTime;
                    this.startMove();
                }
            }
            else {
                this.endMove();
            }
        }
        else {
            this.endMove();
        }
        // if (this.title.x != this.x) this.title.x = this.x;
        // if (this.title.y != this.y) this.title.y = this.y;
        if (this.nextAction != null) {
            this.playNextAction();
        }
    };
    BaseMoveThing.prototype.jumpTo = function (x, y, costTime) {
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
    };
    BaseMoveThing.prototype.jumpStart = function () {
        if (this.disappear)
            return;
        this.playAction(ActionStandard.SA_JUMP, 0, true);
        // egret.Tween.get(this, { onChange: this.jumpProcess, onChangeObj: this }).
        // 	to({ x: this._jumpX, y: this._jumpY }, this._jumpTime, this._jumpY > this.x ? egret.Ease.circIn : egret.Ease.circInOut).call(this.jumpEnd, this);
        this._jumpStartPos.x = this.x;
        this._jumpStartPos.y = this.y;
        this._jumpEndPos.x = this._jumpX;
        this._jumpEndPos.y = this._jumpY;
        var top = 40;
        var xy = this._jumpTopPos;
        if (this.y > this._jumpY) {
            xy.y = this._jumpY - top;
            if (Math.abs(this.x - this._jumpX) <= 1) {
                xy.x = this._jumpX;
            }
            else if (this.x > this._jumpX) {
                xy.x = this._jumpX + top;
            }
            else {
                xy.x = this._jumpX - top;
            }
        }
        else if (this.y < this._jumpY) {
            xy.y = this.y - top;
            if (Math.abs(this.x - this._jumpX) <= 1) {
                xy.x = this.x;
            }
            else if (this.x > this._jumpX) {
                xy.x = this.x - top;
            }
            else {
                xy.x = this.x + top;
            }
        }
        else {
            xy.y = 0;
        }
        this._jumpValue = 0;
        egret.Tween.get(this).to({ factor: 1 }, this._jumpTime).call(this.jumpEnd, this);
    };
    BaseMoveThing.prototype.jumpEnd = function () {
        this.isJump = false;
        egret.Tween.removeTweens(this);
        this.arrivedPathPoint();
        if (this.path && this.path.length > 0) {
            return;
        }
        this.endMove();
    };
    BaseMoveThing.prototype.jumpProcess = function () {
        // if (this.title.x != this.x) this.title.x = this.x;
        // if (this.title.y != this.y) this.title.y = this.y;
    };
    Object.defineProperty(BaseMoveThing.prototype, "factor", {
        get: function () {
            return this._jumpValue;
        },
        set: function (value) {
            this._jumpValue = value;
            var p1 = 1 - value;
            var a1 = p1 * p1;
            var a2 = value * p1 * 2;
            var a3 = value * value;
            this.x = a1 * this._jumpStartPos.x + a2 * this._jumpTopPos.x + a3 * this._jumpEndPos.x;
            this.y = a1 * this._jumpStartPos.y + a2 * this._jumpTopPos.y + a3 * this._jumpEndPos.y;
            this.jumpProcess();
        },
        enumerable: true,
        configurable: true
    });
    BaseMoveThing.prototype.bodyPlayComplete = function (actSpine) {
        if (this.curAction == ActionStandard.SA_DIE)
            return;
        if (this.curAction == ActionStandard.SA_JUMP)
            return;
        if (this.curAction == ActionStandard.SA_JUMP_START) {
            this.jumpStart();
            return;
        }
        this.playAction(this.isMove ? ActionStandard.SA_RUN : ActionStandard.SA_IDLE, 0);
    };
    BaseMoveThing.prototype.startMove = function () {
        if (this.curAction != ActionStandard.SA_RUN)
            this.playAction(ActionStandard.SA_RUN, 0);
        if (this.isMove)
            return;
        this.isMove = true;
    };
    /**寻路完毕*/
    BaseMoveThing.prototype.endMove = function () {
        if (!this.isMove)
            return;
        this.isMove = false;
        this.isfollow = false;
        this.path = null;
        this.playAction(ActionStandard.SA_IDLE, 0);
    };
    BaseMoveThing.prototype.setCellXY = function (x, y, server) {
        _super.prototype.setCellXY.call(this, x, y, server);
    };
    /**到达寻路路径的一个点*/
    BaseMoveThing.prototype.arrivedPathPoint = function () {
        if (!this.tarPoint)
            return;
        this.setCellXY(this.tarPoint.mX, this.tarPoint.mY, false);
        this.tarPoint = null;
    };
    /**直接走到最后一点*/
    BaseMoveThing.prototype.toLastPoint = function () {
        if (this.path) {
            var a = this.path.length;
            if (a > 0)
                this.path = [this.path.pop()];
        }
    };
    /**清除移动路径*/
    BaseMoveThing.prototype.clearPath = function () {
        this.path = null;
        if (!this.isJump)
            this.tarPoint = null;
    };
    BaseMoveThing.prototype.clearJump = function () {
        if (this.isJump) {
            this.isJump = false;
            this.tarPoint = null;
            egret.Tween.removeTweens(this);
        }
    };
    BaseMoveThing.prototype.checkCellXY = function () {
        this.cellXY.x = (this.x / 40) >> 0;
        this.cellXY.y = (this.y / 40) >> 0;
    };
    BaseMoveThing.prototype.updateBodyDir = function (startX, endX) {
        if (startX > endX) {
            this.body.setDir(-1);
        }
        else if (startX < endX) {
            this.body.setDir(1);
        }
    };
    BaseMoveThing.prototype.$onRemoveFromeStage = function () {
        _super.prototype.$onRemoveFromStage.call(this);
        this.body.setStage(false);
    };
    BaseMoveThing.prototype.$onAddToStage = function (stage, nestLevel) {
        _super.prototype.$onAddToStage.call(this, stage, nestLevel);
        this.body.setStage(true);
    };
    BaseMoveThing.prototype.getBodyDir = function () {
        return this.body.dir;
    };
    BaseMoveThing.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.path = null;
        this.isMove = false;
        this.isJump = false;
        this.isfollow = false;
        this.curAction = null;
        this.tarPoint = null;
        egret.Tween.removeTweens(this);
        this.body.onRemove();
    };
    return BaseMoveThing;
}(BaseThing));
__reflect(BaseMoveThing.prototype, "BaseMoveThing");
//# sourceMappingURL=BaseMoveThing.js.map