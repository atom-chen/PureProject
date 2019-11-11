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
 * @Description: 每秒计时
 * @Author: guolinsen
 * @Date: 2019-09-03 11:10:45
 * @LastEditTime: 2019-09-03 11:11:31
 */
var SecondTimer = (function (_super) {
    __extends(SecondTimer, _super);
    function SecondTimer() {
        return _super.call(this) || this;
    }
    SecondTimer.prototype.add = function () {
    };
    return SecondTimer;
}(BaseClass));
__reflect(SecondTimer.prototype, "SecondTimer");
//# sourceMappingURL=SecondTimer.js.map