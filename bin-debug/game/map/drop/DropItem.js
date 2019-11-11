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
 * 掉落物
*/
var DropItem = (function (_super) {
    __extends(DropItem, _super);
    function DropItem() {
        var _this = _super.call(this) || this;
        _this._cuPos = new XY();
        _this._startPos = new XY();
        _this._endPos = new XY();
        _this.touchEnabled = _this.touchChildren = false;
        _this.icon = new eui.Image();
        _this.icon.width = 64;
        _this.icon.height = 64;
        _this.addChild(_this.icon);
        // this.contentTxt = new egret.TextField();
        // this.contentTxt.y = 70;
        // this.contentTxt.size = 14;
        // this.contentTxt.stroke = 1;
        // this.addChild(this.contentTxt);
        _this.anchorOffsetY = 40;
        return _this;
    }
    /**真实掉落*/
    DropItem.prototype.initData1 = function (packetId, itemId, x, y) {
        this.isTrue = true;
        this.packetId = packetId;
        this.pickTime = App.TimerManager.getSyncTime();
        this.setItem(itemId);
        this.setCellXY(x, y);
        this.icon.alpha = 0;
        this.icon.y = 0;
        this.icon.rotation = 0;
        var t = egret.Tween.get(this.icon).wait(MathUtils.limitInteger(-30, 200)).to({ y: -90, alpha: 1 }, 100).to({ y: 0 }, 100 + MathUtils.limitInteger(50, 100), egret.Ease.backOut);
        this.alpha = 1;
    };
    /**假掉落*/
    DropItem.prototype.initData2 = function (packetId, itemId, sx, sy, ex, ey) {
        this.isTrue = false;
        this.packetId = packetId;
        this.setItem(itemId);
        this.icon.alpha = 1;
        this.icon.y = 0;
        this.alpha = 1;
        this._startPos.x = (GameCache.map.cellWidth * (sx + 0.5)) >> 0;
        this._startPos.y = ((GameCache.map.cellHeight * (sy + 0.5)) >> 0) - 90;
        this._endPos.x = (GameCache.map.cellWidth * (ex + 0.5)) >> 0;
        this._endPos.y = (GameCache.map.cellHeight * (ey + 0.5)) >> 0;
        this._cuPos.x = (this._startPos.x + this._endPos.x) >> 1;
        this._cuPos.y = this._startPos.y - 80;
        this.icon.rotation = 0;
        this._cuValue = 0;
        this.x = this._startPos.x;
        this.y = this._startPos.y;
        egret.Tween.get(this).to({ factor: 1 }, 300).call(this.factorEnd, this);
        // egret.Tween.get(this.icon, { loop: true })
        // 	.to({ rotation: 360 }, 200).call(this.setIconRotation, this, [0]);
    };
    Object.defineProperty(DropItem.prototype, "factor", {
        get: function () {
            return this._cuValue;
        },
        set: function (value) {
            this._cuValue = value;
            var p1 = 1 - value;
            var a1 = p1 * p1;
            var a2 = value * p1 * 2;
            var a3 = value * value;
            this.x = a1 * this._startPos.x + a2 * this._cuPos.x + a3 * this._endPos.x;
            this.y = a1 * this._startPos.y + a2 * this._cuPos.y + a3 * this._endPos.y;
        },
        enumerable: true,
        configurable: true
    });
    DropItem.prototype.setIconRotation = function (r) {
        this.icon.rotation = r;
    };
    DropItem.prototype.factorEnd = function () {
        egret.Tween.removeTweens(this.icon);
        this.icon.rotation = 0;
        // let hero = GameCache.hero.focusPlayer;
        // egret.Tween.get(this).wait(1000).to({ x: hero.x, y: hero.y, alpha: 0 }, 800, egret.Ease.cubicIn).call(
        // 	App.ThingManager.removeDrop, App.ThingManager, [this.packetId]
        // );
        App.TimerManager.addDelay(1000 + MathUtils.limit(0, 400), 1, 1, this.flyToBag, this);
    };
    DropItem.prototype.flyToBag = function () {
        var main = App.ViewManager.getView(ViewConst.MAIN_UI_COCER);
        var btn = main ? main.getBagBtn() : null;
        if (btn) {
            var layer = LayerManager.UI_Main2;
            var p = this.parent.localToGlobal(this.x, this.y);
            //layer.globalToLocal(p.x, p.y, p);
            layer.addChild(this);
            this.x = p.x;
            this.y = p.y;
            btn.parent.localToGlobal(btn.x, btn.y, p);
            var t = (Math.abs(this.x - p.x) + Math.abs(this.y - p.y));
            egret.Tween.get(this).to({ x: p.x + (btn.width >> 1), y: p.y + (btn.height >> 1) }, t, egret.Ease.cubicOut).call(App.ThingManager.removeDrop, App.ThingManager, [this.packetId]);
        }
    };
    ////////////////////
    DropItem.prototype.setItem = function (id) {
        var std = GameConfig.item[id];
        this.icon.source = RES_DIR_IMAGES_ITEM + std.icon + ".png";
        // this.contentTxt.textFlow = TextFlowUtils.generateTextFlow(ItemUtils.getItemNamewithColor(std));
        // this.contentTxt.x = (64 - this.contentTxt.textWidth) >> 1;
    };
    DropItem.prototype.setCellXY = function (x, y, server) {
        if (server === void 0) { server = false; }
        this.cellX = x;
        this.cellY = y;
        this.x = (GameCache.map.cellWidth * (x + 0.5)) >> 0;
        this.y = (GameCache.map.cellHeight * (y + 0.5)) >> 0;
    };
    DropItem.prototype.isTouch = function (mouseX, mouseY) {
        return (Math.abs(this.x - mouseX) < 40 && this.y - mouseY < 40 && this.y >= mouseY);
    };
    DropItem.prototype.canPick = function () {
        if (!this.isTrue)
            return false;
        var hero = GameCache.hero.focusPlayer;
        if (hero.cellXY.y != this.cellY)
            return false;
        if (this.pickTime > App.TimerManager.getSyncTime())
            return false;
        return Math.abs(hero.cellXY.x - this.cellX) <= 1;
    };
    DropItem.prototype.pick = function () {
        this.pickTime = App.TimerManager.getSyncTime() + 2000;
        Proxy.drop.sendPickupDropItem(this.packetId);
    };
    DropItem.prototype.dispose = function () {
        this.factorEnd();
        this.icon.source = null;
        ObjectPool.push(this);
        App.DisplayUtils.removeFromParent(this);
        egret.Tween.removeTweens(this);
        App.TimerManager.removeAll(this);
    };
    return DropItem;
}(egret.DisplayObjectContainer));
__reflect(DropItem.prototype, "DropItem", ["IThing"]);
//# sourceMappingURL=DropItem.js.map