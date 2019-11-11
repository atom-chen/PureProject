/*
 * @Description: 充值窗口
 * @Author: liangzhaowei
 * @Date: 2019-09-03 19:39:35
 * @LastEditTime: 2019-09-03 19:40:04
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
var VipChargeWin = (function (_super) {
    __extends(VipChargeWin, _super);
    function VipChargeWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "CommunalPageWin3Skin";
        return _this;
    }
    VipChargeWin.prototype.init = function () {
        _super.prototype.init.call(this);
    };
    return VipChargeWin;
}(CommunalPageWin));
__reflect(VipChargeWin.prototype, "VipChargeWin");
//# sourceMappingURL=VipChargeWin.js.map