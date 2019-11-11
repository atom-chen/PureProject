/*
 * @Description: 限时优惠面板
 * @Author: xiejunwei
 * @Date: 2019-10-14 10:03:49
 */
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
var XSYHPannel = (function (_super) {
    __extends(XSYHPannel, _super);
    function XSYHPannel($parent) {
        if ($parent === void 0) { $parent = null; }
        return _super.call(this, $parent) || this;
    }
    XSYHPannel.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    XSYHPannel.prototype.init = function () {
        _super.prototype.init.call(this);
    };
    XSYHPannel.prototype.open = function () {
        _super.prototype.open.call(this);
    };
    return XSYHPannel;
}(CommunalPagePannel));
__reflect(XSYHPannel.prototype, "XSYHPannel");
//# sourceMappingURL=XSYHPannel.js.map