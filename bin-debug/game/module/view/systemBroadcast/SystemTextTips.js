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
var SystemTextTips = (function (_super) {
    __extends(SystemTextTips, _super);
    function SystemTextTips() {
        var _this = _super.call(this) || this;
        _this.skinName = "SystemTextTipsSkin";
        _this.horizontalCenter = 0;
        _this.touchEnabled = _this.touchChildren = false;
        _this._init = false;
        return _this;
    }
    SystemTextTips.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this._init = true;
        this.text = this._text;
    };
    Object.defineProperty(SystemTextTips.prototype, "text", {
        set: function (str) {
            this._text = str;
            if (!this._init)
                return;
            this.txt.textFlow = TextFlowUtils.generateTextFlow(str);
            egret.Tween.removeTweens(this);
            this.alpha = 1;
            this.y = App.StageUtils.getHeight() - 280;
            egret.Tween.get(this).to({ y: this.y - 40 }, 1500).to({ alpha: 0 }, 500).call(this.remove, this);
        },
        enumerable: true,
        configurable: true
    });
    SystemTextTips.prototype.remove = function () {
        App.DisplayUtils.removeFromParent(this);
    };
    return SystemTextTips;
}(eui.Component));
__reflect(SystemTextTips.prototype, "SystemTextTips");
//# sourceMappingURL=SystemTextTips.js.map