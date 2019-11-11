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
 * @Description: 签到
 * @Author: guolinsen
 * @Date: 2019-09-09 21:19:05
 * @LastEditTime: 2019-09-10 14:20:11
 */
var SignCache = (function (_super) {
    __extends(SignCache, _super);
    function SignCache() {
        var _this = _super.call(this) || this;
        /**已签到次数*/
        _this.signCounts = 0;
        /**可签到次数*/
        _this.canSign = 0;
        _this.awardFlag = 0;
        /**每日奖励配置*/
        _this.dailyAwardList = [];
        /**累积奖励配置*/
        _this.totalAwardList = [];
        _this.init();
        return _this;
    }
    SignCache.prototype.clear = function () {
        this.signCounts = 0;
        this.canSign = 0;
        this.awardFlag = 0;
    };
    SignCache.prototype.init = function () {
        var con = GameConfig.sign;
        var i = GameConfig.globalConfig.signNeed;
        for (var id in con) {
            var std = con[id];
            (std.need ? this.totalAwardList : this.dailyAwardList).push(std);
        }
    };
    SignCache.prototype.updateCounts = function (value) {
        this.signCounts = NumericUtils.LoWord(value);
        var total = NumericUtils.HiWord(value);
        this.canSign = total - this.signCounts;
    };
    SignCache.prototype.updateAwardState = function (value) {
        this.awardFlag = value;
    };
    /**
     * return 是否已领取
    */
    SignCache.prototype.getAwardState = function (index) {
        var v = this.awardFlag;
        return ((v >> index) & 1) == 1;
    };
    return SignCache;
}(BaseCache));
__reflect(SignCache.prototype, "SignCache");
//# sourceMappingURL=SignCache.js.map