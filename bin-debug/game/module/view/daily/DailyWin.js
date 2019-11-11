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
 * @Description: 日常
 * @Author: guolinsen
 * @Date: 2019-07-29 14:01:07
 * @LastEditTime: 2019-08-14 14:09:01
 */
var DailyWin = (function (_super) {
    __extends(DailyWin, _super);
    function DailyWin() {
        return _super.call(this) || this;
    }
    DailyWin.prototype.init = function () {
        _super.prototype.init.call(this);
    };
    return DailyWin;
}(CommunalPageWin));
__reflect(DailyWin.prototype, "DailyWin");
//# sourceMappingURL=DailyWin.js.map