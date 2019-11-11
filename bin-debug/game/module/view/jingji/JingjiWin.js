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
 * @Description: 竞技窗口
 * @Author: xiejunwei
 * @Date: 2019-09-03 19:07:15
 * @LastEditTime: 2019-09-04 15:02:40
 */
var JingjiWin = (function (_super) {
    __extends(JingjiWin, _super);
    function JingjiWin() {
        return _super.call(this) || this;
    }
    JingjiWin.prototype.init = function () {
        _super.prototype.init.call(this);
    };
    JingjiWin.prototype.open = function () {
        _super.prototype.open.call(this);
    };
    JingjiWin.prototype.close = function () {
    };
    return JingjiWin;
}(CommunalPageWin));
__reflect(JingjiWin.prototype, "JingjiWin");
//# sourceMappingURL=JingjiWin.js.map