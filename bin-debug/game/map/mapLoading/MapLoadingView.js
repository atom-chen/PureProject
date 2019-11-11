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
/**
 * 过场动画
*/
var MapLoadingView = (function (_super) {
    __extends(MapLoadingView, _super);
    function MapLoadingView() {
        var _this = _super.call(this, LayerManager.UI_Guide) || this;
        _this.loadList = [];
        _this.maxW = 380;
        _this.skinName = "MapLoadingViewSkin";
        _this.closeDispose = false;
        return _this;
    }
    MapLoadingView.prototype.open = function (p) {
        _super.prototype.open.call(this);
        this.focusToStage();
        App.TimerManager.add(500, this.onFrame, this, 10, this.exit, this);
        this.message(MsgConst.UPDATE_SCENE_MAPITEM, this.onStart);
        this._w = 0;
        this.tips.text = GameConfig.clientGlobal.maptips[MathUtils.limitInteger(0, GameConfig.clientGlobal.maptips.length)];
    };
    MapLoadingView.prototype.resizeStage = function () {
        _super.prototype.resizeStage.call(this);
    };
    MapLoadingView.prototype.close = function () {
        _super.prototype.close.call(this);
    };
    MapLoadingView.prototype.onFrame = function () {
        this.updatePro();
    };
    MapLoadingView.prototype.updatePro = function () {
        var value = this.cur / this.total;
        if (isNaN(value))
            value = 0;
        egret.Tween.removeTweens(this);
        egret.Tween.get(this).to({ w: value }, 500).call(this.checkCom, this);
    };
    MapLoadingView.prototype.checkCom = function () {
        if (this.w >= 1) {
            this.exit();
        }
    };
    Object.defineProperty(MapLoadingView.prototype, "w", {
        get: function () {
            return this._w;
        },
        set: function (value) {
            if (value > 1)
                value = 1;
            this._w = value;
            this.progress.x = this.maxW * value;
            this.percent.text = Math.ceil((value) * 100) + "%";
        },
        enumerable: true,
        configurable: true
    });
    MapLoadingView.prototype.onStart = function () {
        this.loadList = GameCache.map.loadlingList;
        this.total = this.loadList.length;
        this.cur = 0;
        this.w = 0;
        this.loadNext();
        this.removeMessage();
    };
    MapLoadingView.prototype.loadNext = function () {
        var url = this.loadList.shift();
        RES.getResByUrl(url, this.loadCom, this);
    };
    MapLoadingView.prototype.loadCom = function () {
        this.cur++;
        if (this.loadList.length) {
            this.loadNext();
        }
        else {
            App.TimerManager.removeAll(this);
            egret.Tween.removeTweens(this);
            egret.Tween.get(this).to({ w: 1 }, 500).call(this.checkCom, this);
        }
    };
    MapLoadingView.prototype.exit = function () {
        if (!GameCache.map.dataInit) {
            console.log(">>>>> 无法进入场景");
            App.TimerManager.add(500, this.onFrame, this, 6, this.exit, this);
            return;
        }
        egret.Tween.removeTweens(this);
        this.closeView();
        GameCache.map.showLoading = false;
        this.loadList.length = 0;
        App.MessageCenter.dispatch(MsgConst.ENTER_SCENE);
    };
    return MapLoadingView;
}(BaseEuiWindow));
__reflect(MapLoadingView.prototype, "MapLoadingView");
//# sourceMappingURL=MapLoadingView.js.map