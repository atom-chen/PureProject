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
 * create by junwei on 04/21/2019
 * 中央提示条目
 */
var CenterTipsItem = (function (_super) {
    __extends(CenterTipsItem, _super);
    function CenterTipsItem() {
        var _this = _super.call(this) || this;
        // this.bg = new egret.Bitmap();
        // this.bg.texture = RES.getRes("zjm_json.zjm_name_bg_png");
        // this.bg.scale9Grid = new egret.Rectangle(46, 11, 30, 2);
        _this.decsTxt = App.DisplayUtils.newTextField("", 84, 4, 0xF9D72A, "left", 18);
        _this.decsTxt.stroke = 1;
        _this.decsTxt.strokeColor = 0x000000;
        _this.decsTxt.lineSpacing = 5;
        // this.addChild(this.bg);
        _this.addChild(_this.decsTxt);
        _this.touchEnabled = _this.touchChildren = false;
        return _this;
    }
    Object.defineProperty(CenterTipsItem.prototype, "text", {
        set: function (str) {
            this.decsTxt.textFlow = TextFlowUtils.generateTextFlow(str);
            var w = this.decsTxt.width;
            if (w < 126) {
                w = 126;
            }
            this.decsTxt.x = (-this.decsTxt.width) >> 1;
            // this.width = this.bg.width;
            this.width = this.decsTxt.textWidth;
        },
        enumerable: true,
        configurable: true
    });
    return CenterTipsItem;
}(egret.DisplayObjectContainer));
__reflect(CenterTipsItem.prototype, "CenterTipsItem");
//# sourceMappingURL=CenterTipsItem.js.map