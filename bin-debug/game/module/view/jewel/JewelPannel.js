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
 * @Description: 宝石面板
 * @Author: xiejunwei
 * @Date: 2019-09-10 11:32:09
 * @LastEditTime: 2019-09-10 11:33:00
 */
var JewelPannel = (function (_super) {
    __extends(JewelPannel, _super);
    function JewelPannel($parent) {
        if ($parent === void 0) { $parent = null; }
        return _super.call(this, $parent) || this;
    }
    JewelPannel.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    JewelPannel.prototype.open = function (param) {
        if (param === void 0) { param = null; }
        _super.prototype.open.call(this, param);
    };
    JewelPannel.prototype.init = function () {
        _super.prototype.init.call(this);
    };
    return JewelPannel;
}(CommunalPagePannel));
__reflect(JewelPannel.prototype, "JewelPannel");
//# sourceMappingURL=JewelPannel.js.map