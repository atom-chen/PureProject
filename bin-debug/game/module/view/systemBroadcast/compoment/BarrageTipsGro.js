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
 * create by junwei on 06/21/2019
 * 跑马灯条目
 */
var BarrageTipsGro = (function (_super) {
    __extends(BarrageTipsGro, _super);
    function BarrageTipsGro() {
        var _this = _super.call(this) || this;
        _this.skinName = "BarrageTipsSkin";
        return _this;
    }
    BarrageTipsGro.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        //this.content.touchEnabled = true;
        //this.content.addEventListener(egret.TextEvent.LINK, this.onLink, this);
    };
    Object.defineProperty(BarrageTipsGro.prototype, "text", {
        set: function (value) {
            this.content.textFlow = TextFlowUtils.generateTextFlow(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BarrageTipsGro.prototype, "textColor", {
        set: function (value) {
            this.content.textColor = value;
        },
        enumerable: true,
        configurable: true
    });
    BarrageTipsGro.prototype.dispose = function () {
        this.content.removeEventListener(egret.TextEvent.LINK, this.onLink, this);
    };
    BarrageTipsGro.prototype.onLink = function (e) {
        //超文本链接
        TextFlowUtils.hrefType(e.text);
    };
    return BarrageTipsGro;
}(eui.Component));
__reflect(BarrageTipsGro.prototype, "BarrageTipsGro");
//# sourceMappingURL=BarrageTipsGro.js.map