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
 * @Description: Vip窗口
 * @Author: liangzhaowei
 * @Date: 2019-08-27 15:55:39
 * @LastEditTime: 2019-08-29 11:18:08
 */
var VipWin = (function (_super) {
    __extends(VipWin, _super);
    function VipWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "CommunalPageWin3Skin";
        return _this;
    }
    VipWin.prototype.init = function () {
        _super.prototype.init.call(this);
    };
    return VipWin;
}(CommunalPageWin));
__reflect(VipWin.prototype, "VipWin");
//# sourceMappingURL=VipWin.js.map