/*
 * @Description: 扭蛋
 * @Author: liangzhaowei
 * @Date: 2019-10-08 11:32:10
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
var GashaponWin = (function (_super) {
    __extends(GashaponWin, _super);
    function GashaponWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "CommunalPageWin5Skin";
        return _this;
    }
    GashaponWin.prototype.init = function () {
        _super.prototype.init.call(this);
    };
    return GashaponWin;
}(CommunalPageWin));
__reflect(GashaponWin.prototype, "GashaponWin");
//# sourceMappingURL=GashaponWin.js.map