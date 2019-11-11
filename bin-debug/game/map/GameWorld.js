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
 * 游戏场景，地图、模型等
*/
var GameWorld = (function (_super) {
    __extends(GameWorld, _super);
    function GameWorld() {
        var _this = _super.call(this, LayerManager.Game_Main) || this;
        /**下次排序时间*/
        _this.nextSortTime = 0;
        _this.skyDraw = new BaseMapDrawLayer();
        _this.floorDraw = new BaseMapDrawLayer();
        _this.treeDraw = new BaseMapDrawLayer();
        _this.frontDraw = new BaseMapDrawLayer();
        _this.bottomLayer = new BaseMapThingLayer();
        _this.playerLayer = new BaseMapThingLayer();
        _this.topLayer = new BaseMapThingLayer();
        _this.addChild(_this.skyDraw);
        _this.addChild(_this.treeDraw);
        _this.addChild(_this.floorDraw);
        _this.addChild(_this.bottomLayer);
        _this.addChild(_this.playerLayer);
        _this.addChild(_this.topLayer);
        _this.addChild(_this.frontDraw);
        _this.camera = new Camera();
        //this.camera.register(this.skyDraw);
        _this.camera.register(_this.floorDraw);
        _this.camera.register(_this.treeDraw);
        _this.camera.register(_this.frontDraw);
        _this.camera.register(_this.playerLayer);
        _this.camera.register(_this.bottomLayer);
        _this.camera.register(_this.topLayer);
        App.ThingManager.playerLayer = _this.playerLayer;
        App.ThingManager.titleLayer = _this.topLayer;
        App.ThingManager.bottomLayer = _this.bottomLayer;
        _this.touchEnabled = true;
        _this.closeDispose = false;
        ThingKind.initIndex();
        _this.initEvent();
        return _this;
    }
    GameWorld.prototype.initEvent = function () {
        App.TimerManager.addFrame(DeviceUtils.IsPC ? 1 : 2, this.onFrame, this);
        this.addTouchEvent(this, this.onTouch);
        App.MessageCenter.addListener(MsgConst.FOCUS_CHANGE, this.onFocusChange, this);
        App.MessageCenter.addListener(MsgConst.RESIZE_STAGE, this.resizeStage, this);
        App.MessageCenter.addListener(MsgConst.ENTER_SCENE, this.onEnterScene, this);
        this.resizeStage();
    };
    /**
    * 面板开启执行函数，用于子类继承
    * 面板如果还没init的时候，会等到面板init完再回调
    * @param param 参数
    */
    GameWorld.prototype.open = function (param) {
        if (param === void 0) { param = null; }
    };
    GameWorld.prototype.shake = function () {
        App.DisplayUtils.shakeIt(this.floorDraw, 10, 100, 2);
        App.DisplayUtils.shakeIt(this.treeDraw, 10, 100, 2);
        App.DisplayUtils.shakeIt(this.playerLayer, 10, 100, 2);
    };
    GameWorld.prototype.resizeStage = function () {
        _super.prototype.resizeStage.call(this);
        if (this.skyDraw) {
            this.skyDraw.focusToCenter();
        }
    };
    GameWorld.prototype.drawCell = function () {
        var w = GameCache.map.mapWidth / GameCache.map.cellWidth;
        var h = GameCache.map.mapHeight / GameCache.map.cellHeight;
        var s = new egret.Shape();
        s.graphics.lineStyle(1, 0x000000, 1);
        for (var i = 0; i < w; i++) {
            s.graphics.moveTo(i * 40, 0);
            s.graphics.lineTo(i * 40, h * 40);
        }
        for (var i = 0; i < h; i++) {
            s.graphics.moveTo(0, i * 40);
            s.graphics.lineTo(w * 40, i * 40);
        }
        this.playerLayer.addChild(s);
    };
    GameWorld.prototype.onFrame = function () {
        var tick = App.TimerManager.getSyncTime();
        App.ThingManager.onUpdate();
        if (tick >= this.nextSortTime) {
            this.sortThingIndex();
            this.nextSortTime = tick + 300;
        }
        if (GameCache.map.dataInit) {
            this.camera.unpdate(tick);
        }
    };
    GameWorld.prototype.sortThingIndex = function () {
        this.playerLayer.$children.sort(this.onSortThingIndex);
    };
    GameWorld.prototype.onSortThingIndex = function (d1, d2) {
        if (!d1.pro || !d2.pro)
            return 0;
        if (d1.cellXY.y > d2.cellXY.y) {
            return 1;
        }
        else if (d1.cellXY.y == d2.cellXY.y) {
            var k1 = ThingKind.getIndexByKind(d1.pro.kind);
            var k2 = ThingKind.getIndexByKind(d2.pro.kind);
            if (k1 > k2)
                return 1;
            else if (k1 == k2)
                return 0;
        }
        return -1;
    };
    GameWorld.prototype.onTouch = function (e) {
        App.VisitManager.clear();
        var x = e.stageX;
        var y = e.stageY;
        var hero = GameCache.hero.focusPlayer;
        if (!hero)
            return;
        if (GameCache.map.mapConfig.untouch)
            return;
        var tXY = this.playerLayer.globalToLocal(x, y);
        var clickTarget = this.topLayer.getClickTarget(tXY.x, tXY.y);
        if (!clickTarget)
            clickTarget = this.playerLayer.getClickTarget(tXY.x, tXY.y);
        if (clickTarget != null && !GameCache.hero.isMySelf(clickTarget.pro.recog)) {
            this.onTouchThing(clickTarget);
            return;
        }
        this.onTouchThing(null);
        App.FightManager.heroStart(false);
        if (!hero.isJump) {
            var cx = (tXY.x / GameCache.map.cellWidth) >> 0;
            var cy = (tXY.y / GameCache.map.cellHeight) >> 0;
            hero.moveTo(cx, cy);
        }
    };
    GameWorld.prototype.onTouchThing = function (thing) {
        if (!thing) {
            App.FightManager.setFightTarget(null);
            return;
        }
        var kind = thing.pro ? thing.pro.kind : -1;
        if (kind == ThingKind.Monster) {
            App.FightManager.setFightTarget(thing);
        }
        else if (kind == ThingKind.Human && GameCache.map.mapConfig.nopk == 0) {
            App.FightManager.setFightTarget(thing);
        }
        else {
            App.FightManager.heroStart(false);
            App.VisitManager.goToThing(thing);
        }
    };
    GameWorld.prototype.onFocusChange = function () {
        this.camera.regPlayer(GameCache.hero.focusPlayer);
    };
    GameWorld.prototype.refreshDraw = function () {
        this.camera.exitScene();
        var cache = GameCache.map;
        if (cache.getMapData()) {
            var vo = cache.skyDrawVo;
            var sw = cache.mapWidth;
            var sh = cache.mapHeight;
            this.skyDraw.setData(vo.imgList, vo.width, vo.height, sw, sh);
            vo = cache.floorDrawVo;
            this.floorDraw.setData(vo.imgList, vo.width, vo.height, sw, sh);
            vo = cache.treeDrawVo;
            this.treeDraw.setData(vo.imgList, vo.width, vo.height, sw, sh);
            vo = cache.frontDrawVo;
            this.frontDraw.setData(vo.imgList, vo.width, vo.height, sw, sh);
            this.skyDraw.focusToCenter();
        }
    };
    GameWorld.prototype.onEnterScene = function () {
        GameCache.map.enter();
        App.VisitManager.continue();
    };
    GameWorld.prototype.drawSkillRange = function (sx, sy, ex, ey) {
        if (!this.skillRange) {
            this.skillRange = new egret.Shape();
            this.topLayer.addChild(this.skillRange);
        }
        var gh = this.skillRange.graphics;
        gh.clear();
        var x, y, w, h;
        if (ex > sx) {
            x = sx;
            w = ex - sx;
        }
        else {
            x = ex;
            w = sx - ex;
        }
        w++;
        if (ey > sy) {
            y = sy;
            h = ey - sy;
        }
        else {
            y = ey;
            h = sy - ey;
        }
        h++;
        gh.beginFill(0x00ff00, 0.6);
        gh.drawRect(0, 0, w * GameCache.map.cellWidth, h * GameCache.map.cellHeight);
        gh.endFill();
        this.skillRange.x = x * GameCache.map.cellWidth;
        this.skillRange.y = y * GameCache.map.cellHeight;
    };
    /**在手机上关闭的时候并没有移除,因此需要继续接收事件来刷新 */
    GameWorld.prototype.removeAllEvent = function () {
    };
    /**在有必要整个移除的时候,需要重写调用父类方法来移除事件以及整个界面 */
    GameWorld.prototype.dispose = function () {
        _super.prototype.removeAllEvent.call(this);
        _super.prototype.dispose.call(this);
    };
    return GameWorld;
}(BaseEuiWindow));
__reflect(GameWorld.prototype, "GameWorld");
//# sourceMappingURL=GameWorld.js.map