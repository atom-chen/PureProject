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
 * 动态实物层
*/
var BaseMapThingLayer = (function (_super) {
    __extends(BaseMapThingLayer, _super);
    function BaseMapThingLayer() {
        var _this = _super.call(this) || this;
        _this.touchEnabled = _this.touchChildren = false;
        return _this;
    }
    BaseMapThingLayer.prototype.getClickTarget = function (mouseX, mouseY) {
        var list = this.$children;
        var len = list.length;
        var i = len - 1;
        var thing;
        for (; i >= 0; i--) {
            thing = list[i];
            if (thing["isTouch"]) {
                if (thing["isTouch"](mouseX, mouseY)) {
                    return thing;
                }
            }
        }
        return null;
    };
    /**
     * 镜头左上角坐标
    */
    BaseMapThingLayer.prototype.moveTo = function (tx, ty, perX, perY) {
        this.x = tx;
        this.y = ty;
    };
    return BaseMapThingLayer;
}(egret.DisplayObjectContainer));
__reflect(BaseMapThingLayer.prototype, "BaseMapThingLayer", ["ICamera"]);
//# sourceMappingURL=BaseMapThingLayer.js.map