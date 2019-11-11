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
 * effect: 角色窗口
 * author :lzw
 * data :2019.6.18
 */
var RoleWin = (function (_super) {
    __extends(RoleWin, _super);
    function RoleWin() {
        return _super.call(this) || this;
    }
    RoleWin.prototype.init = function () {
        _super.prototype.init.call(this);
    };
    return RoleWin;
}(CommunalPageWin));
__reflect(RoleWin.prototype, "RoleWin");
//# sourceMappingURL=RoleWin.js.map