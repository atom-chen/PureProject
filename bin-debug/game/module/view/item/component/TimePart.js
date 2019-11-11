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
 * @Description: 时限模块
 * @Author: xiejunwei
 * @Date: 2019-08-12 21:46:16
 * @LastEditTime: 2019-10-14 15:29:07
 */
var TimePart = (function (_super) {
    __extends(TimePart, _super);
    function TimePart() {
        var _this = _super.call(this) || this;
        _this.time = 0;
        _this.skinName = "TimePartSkin";
        return _this;
    }
    TimePart.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    TimePart.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
    };
    TimePart.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        App.TimerManager.removeAll(this);
    };
    /**
     * 设置数据
     * @param type 1为普通道具时限 2为时装时限
     */
    TimePart.prototype.setData = function (time) {
        if (time === void 0) { time = 0; }
        this.time = time;
        if (this.time) {
            if (!App.TimerManager.isExists(this.timeCount, this))
                App.TimerManager.addDelay(0, 1000, 0, this.timeCount, this);
        }
    };
    TimePart.prototype.timeCount = function () {
        var sT = Math.ceil(GameCache.server.serverTime / 1000);
        var d = this.time - sT;
        if (d > 0) {
            this.countDown.text = StringUtils.substitute(Language.lang.relistTime, App.DateUtils.getFormatBySecond(d, DateUtils.TIME_FORMAT_12));
        }
        else {
            App.TimerManager.removeAll(this);
            this.countDown.text = StringUtils.substitute(Language.lang.relistTime, App.DateUtils.getFormatBySecond(0, DateUtils.TIME_FORMAT_12));
        }
    };
    TimePart.prototype.cleanTime = function () {
        App.TimerManager.removeAll(this);
    };
    return TimePart;
}(BaseCustComponent));
__reflect(TimePart.prototype, "TimePart");
//# sourceMappingURL=TimePart.js.map