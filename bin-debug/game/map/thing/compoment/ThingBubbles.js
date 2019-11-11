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
 * 独白气泡
 */
var ThingBubbles = (function (_super) {
    __extends(ThingBubbles, _super);
    function ThingBubbles() {
        var _this = _super.call(this) || this;
        _this.bg = new egret.Bitmap();
        _this.bg.texture = RES.getRes("zjm_json.zjm_dhk_png");
        _this.bg.scale9Grid = new egret.Rectangle(48, 7, 50, 30);
        _this.addChild(_this.bg);
        _this.decsTxt = App.DisplayUtils.newTextField("", 10, 10, 0xe04902, "left", 16);
        // this.decsTxt.width = 200;
        _this.decsTxt.lineSpacing = 5;
        _this.addChild(_this.decsTxt);
        //父类调成不可点击
        _this.touchEnabled = _this.touchChildren = false;
        return _this;
    }
    ThingBubbles.prototype.setData = function (content, time) {
        if (time === void 0) { time = 10000; }
        this.reset();
        this.decsTxt.textFlow = TextFlowUtils.generateTextFlow(content);
        this.decsTxt.width = 128;
        this.bg.width = this.decsTxt.width + 20;
        this.bg.height = this.decsTxt.height + 30;
        this.width = this.bg.width;
        this.height = this.bg.height;
        this.bg.y = -this.bg.height - 6;
        this.decsTxt.y = this.bg.y + 7;
        this.bg.x = -60;
        this.decsTxt.x = -50;
        if (time) {
            this.alpha = 0;
            egret.Tween.get(this).to({ alpha: 1 }, 200).wait(time).to({ alpha: 0 }, 200).call(this.dispose, this);
        }
        else {
            this.alpha = 1;
        }
    };
    ThingBubbles.prototype.reset = function () {
        this.bg.y = 0;
        this.bg.x = 0;
        this.decsTxt.y = 0;
        this.decsTxt.width = 128;
        egret.Tween.removeTweens(this);
    };
    ThingBubbles.prototype.hasShow = function () {
        return this.parent ? true : false;
    };
    ThingBubbles.prototype.dispose = function () {
        this.x = 0;
        this.y = 0;
        egret.Tween.removeTweens(this);
        App.DisplayUtils.removeFromParent(this);
        ObjectPool.push(this);
    };
    return ThingBubbles;
}(egret.DisplayObjectContainer));
__reflect(ThingBubbles.prototype, "ThingBubbles");
//# sourceMappingURL=ThingBubbles.js.map