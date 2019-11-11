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
 * @Description: 附加属性模块
 * @Author: moyusheng
 * @Date: 2019-10-11 20:43:01
 */
var PropPartExtr = (function (_super) {
    __extends(PropPartExtr, _super);
    function PropPartExtr() {
        var _this = _super.call(this) || this;
        _this.skinName = "PropPartExtrSkin";
        return _this;
    }
    return PropPartExtr;
}(PropPart));
__reflect(PropPartExtr.prototype, "PropPartExtr");
//# sourceMappingURL=PropPartExtr.js.map