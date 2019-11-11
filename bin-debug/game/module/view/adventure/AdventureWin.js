/*
 * @Description: 冒险系统
 * @Author: liangzhaowei
 * @Date: 2019-10-25 14:54:46
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
var AdventureWin = (function (_super) {
    __extends(AdventureWin, _super);
    function AdventureWin() {
        return _super.call(this) || this;
    }
    AdventureWin.prototype.init = function () {
        _super.prototype.init.call(this);
    };
    return AdventureWin;
}(CommunalPageWin));
__reflect(AdventureWin.prototype, "AdventureWin");
//# sourceMappingURL=AdventureWin.js.map