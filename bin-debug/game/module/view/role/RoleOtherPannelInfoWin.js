/*
 * @Description: 其它角色信息
 * @Author: liangzhaowei
 * @Date: 2019-09-27 19:23:01
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
var RoleOtherPannelInfoWin = (function (_super) {
    __extends(RoleOtherPannelInfoWin, _super);
    function RoleOtherPannelInfoWin() {
        var _this = _super.call(this, LayerManager.UI_Tips) || this;
        _this.skinName = "RoleOtherPannelInfoWinSkin";
        return _this;
    }
    RoleOtherPannelInfoWin.prototype.init = function () {
        this.bg.setNameImg("otherRole");
    };
    RoleOtherPannelInfoWin.prototype.open = function (param) {
        _super.prototype.open.call(this);
        this.cn.open();
    };
    return RoleOtherPannelInfoWin;
}(BaseEuiWindow));
__reflect(RoleOtherPannelInfoWin.prototype, "RoleOtherPannelInfoWin");
//# sourceMappingURL=RoleOtherPannelInfoWin.js.map