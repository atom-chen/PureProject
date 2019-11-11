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
var NoviceGuideStep = (function (_super) {
    __extends(NoviceGuideStep, _super);
    function NoviceGuideStep(dispose) {
        if (dispose === void 0) { dispose = true; }
        var _this = _super.call(this) || this;
        _this._dispose = false;
        _this._dispose = dispose;
        _this.pos = new egret.Point();
        _this.arrow = new NoviceGuideArrow();
        _this.addChild(_this.arrow);
        _this.eff = App.DisplayUtils.addEffectToObj(_this, "guide_0_1", -1, 0, 0);
        _this.touchEnabled = _this.touchChildren = false;
        return _this;
    }
    NoviceGuideStep.prototype.start = function (data) {
        this.isComplete = false;
        this.guidObj = data;
        this.curStep = 0;
        this.curGuide = null;
        this.curTaget = null;
        if (!App.TimerManager.isExists(this.onRefresh, this)) {
            App.TimerManager.add(200, this.onRefresh, this);
        }
        this.eff.play(-1);
        this.next();
    };
    NoviceGuideStep.prototype.hide = function (stop) {
        this.eff.stop();
        App.DisplayUtils.removeFromParent(this);
        stop && App.TimerManager.removeAll(this);
    };
    NoviceGuideStep.prototype.complete = function () {
        this.guidObj = null;
        this.curStep = null;
        this.curGuide = null;
        this.clearTarget();
        if (this._dispose) {
            this.dispose();
        }
        else {
            this.hide();
        }
    };
    NoviceGuideStep.prototype.next = function () {
        if (!this.guidObj)
            return;
        this.curStep++;
        if (this.guidObj[this.curStep]) {
            this.curGuide = this.guidObj[this.curStep];
            this.parseView();
        }
        else {
            this.complete();
        }
    };
    NoviceGuideStep.prototype.back = function () {
        if (!this.guidObj)
            return;
        if (this.curStep <= 1) {
            this.hide(false);
            return;
        }
        this.curStep--;
        if (this.guidObj[this.curStep]) {
            this.curGuide = this.guidObj[this.curStep];
            this.parseView();
        }
        else {
            this.complete();
        }
    };
    NoviceGuideStep.prototype.onRefresh = function () {
        this.curGuide && this.parseView();
    };
    NoviceGuideStep.prototype.parseView = function () {
        var flag = false;
        var guide = this.curGuide;
        if (!guide)
            return;
        if (guide.command[0] == "win") {
            flag = App.ViewManager.isShow(parseInt(ViewConst[guide.command[1]]));
        }
        if (flag) {
            this.next();
            return;
        }
        if (!guide.targetView)
            return;
        var isShow = App.ViewManager.isShow(parseInt(ViewConst[guide.targetView[0]]));
        if (!isShow) {
            if (this.isComplete) {
                this.next();
                return;
            }
            this.back();
            return;
        }
        var view = App.ViewManager.getView(parseInt(ViewConst[guide.targetView[0]]));
        for (var i = 1; i <= 2; i++) {
            if (guide.targetView[i] > -1) {
                var tar = this.tarBtnCheck(view, guide.targetView[i]);
                if (!tar) {
                    tar = view["tabBtn"].getElementAt(guide.targetView[i]);
                    tar && this.arrowTo(tar, false, guide.targetViewText[i - 1]);
                    return;
                }
                else {
                    view = tar;
                }
            }
        }
        this.parseTarget(view, guide.targetEle);
    };
    NoviceGuideStep.prototype.parseTarget = function (view, el) {
        var arr = el.split(".");
        var len = arr.length;
        var vis = true;
        var tar = view;
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].indexOf("[") == 0) {
                var e = parseInt(arr[i].replace(/[^0-9]/g, ""));
                if (tar.numChildren < e + 1) {
                    tar = null;
                    break;
                }
                if (tar instanceof eui.DataGroup) {
                    tar = tar.getElementAt(e);
                }
                else {
                    tar = tar.getChildAt(e);
                }
            }
            else {
                if (arr[i].indexOf("%") != -1) {
                    var tArr = arr[i].split("%");
                    tar = tar[tArr[0]][tArr[1]];
                }
                else {
                    tar = tar[arr[i]];
                }
            }
            if (!tar)
                break;
            if (!tar.visible)
                vis = false;
        }
        if (tar && vis) {
            this.arrowTo(tar, true, null);
        }
        else {
            this.clearTarget();
            App.DisplayUtils.removeFromParent(this);
        }
    };
    NoviceGuideStep.prototype.tarBtnCheck = function (view, index) {
        if (index == -1)
            return view;
        var v = view["viewDic"][index];
        if (v && v.stage && v.visible)
            return v;
        return null;
    };
    NoviceGuideStep.prototype.arrowTo = function (tar, addEvent, text) {
        this.clearTarget();
        this.curTaget = tar;
        addEvent && this.addTarget();
        this.showTarget(text);
    };
    NoviceGuideStep.prototype.addTarget = function () {
        this.curTaget.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTargetTouch, this, true);
    };
    NoviceGuideStep.prototype.clearTarget = function () {
        if (this.curTaget) {
            this.curTaget.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTargetTouch, this, true);
            this.curTaget = null;
        }
    };
    NoviceGuideStep.prototype.onTargetTouch = function () {
        this.handlerCommand("click");
    };
    NoviceGuideStep.prototype.handlerCommand = function (command) {
        var arg = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            arg[_i - 1] = arguments[_i];
        }
        if (this.curGuide && this.curGuide.command[0] == command) {
            if (this.curGuide.isComplete)
                this.isComplete = true;
            this.next();
        }
    };
    NoviceGuideStep.prototype.showTarget = function (text) {
        var parent = this.curTaget.parent;
        if (this.curGuide.layer) {
            parent = LayerManager[this.curGuide.layer];
            this.curTaget.parent.localToGlobal(this.curTaget.x, this.curTaget.y, this.pos);
            parent.globalToLocal(this.pos.x, this.pos.y, this.pos);
        }
        else {
            this.pos.x = this.curTaget.x;
            this.pos.y = this.curTaget.y;
        }
        parent.addChild(this);
        this.x = this.pos.x;
        this.y = this.pos.y;
        if (this.curGuide.offset) {
            this.x = this.pos.x + this.curGuide.offset[0];
            this.y = this.pos.y + this.curGuide.offset[1];
        }
        else {
            this.x = this.pos.x + (this.curTaget.width >> 1);
            this.y = this.pos.y + (this.curTaget.height >> 1);
        }
        this.arrow.setData(text ? text : this.curGuide.text, this.curGuide.dir);
    };
    return NoviceGuideStep;
}(BaseCustComponent));
__reflect(NoviceGuideStep.prototype, "NoviceGuideStep");
//# sourceMappingURL=NoviceGuideStep.js.map