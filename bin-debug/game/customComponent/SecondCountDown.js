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
 * @Description: 每秒倒计时
 * @Author: guolinsen
 * @Date: 2019-08-15 15:01:32
 * @LastEditTime: 2019-09-10 15:27:47
 */
var SecondCountDown = (function (_super) {
    __extends(SecondCountDown, _super);
    function SecondCountDown() {
        return _super.call(this) || this;
    }
    /**
     * 每秒定时回调
     * fun 回调函数，参数：剩余秒数
     * funObj
    */
    SecondCountDown.prototype.addCallBack = function (fun, funObj) {
        if (fun && funObj) {
            this.handler = Handler.create(funObj, fun, null, false);
        }
    };
    /**
     * 文本显示
     * text:文本控件
     * lab:文本基本内容 例如：剩余时间：{0}
     * timeFormat:时间格式，参考DateUtils.TIME_FORMAT_1
    */
    SecondCountDown.prototype.addLabel = function (text, lab, timeFormat) {
        this._text = text;
        this._lab = lab;
        this._tf = timeFormat;
    };
    Object.defineProperty(SecondCountDown.prototype, "time", {
        get: function () {
            return this._time;
        },
        /**
         * 剩余时间
        */
        set: function (value) {
            this._time = value;
            App.TimerManager.removeAll(this);
            if (value > 0) {
                App.TimerManager.add(1000, this.onTime, this);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SecondCountDown.prototype, "serverTime", {
        /**
         * 服务器未来时间
        */
        set: function (value) {
            this.time = GlobalFun.getDiffMiniDateTime(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SecondCountDown.prototype, "openDay", {
        /**
         * 开服第几天
         * 例如设置开服第8天，则计算距第8天的倒计时
        */
        set: function (value) {
            var day = GameCache.server.serverOpenDay;
            this.time = (value - day) * 24 * 3600;
        },
        enumerable: true,
        configurable: true
    });
    SecondCountDown.prototype.onTime = function () {
        this._time--;
        if (this._time <= 0) {
            this._time = 0;
            App.TimerManager.removeAll(this);
        }
        if (this._text) {
            this._text.textFlow = TextFlowUtils.generateTextFlow(StringUtils.substitute(this._lab, App.DateUtils.getFormatBySecond(this._time, this._tf)));
        }
        if (this.handler) {
            this.handler.args = [this._time];
            this.handler.run();
        }
    };
    SecondCountDown.prototype.dispose = function () {
        App.TimerManager.removeAll(this);
        if (this.handler) {
            this.handler.dispose();
            this.handler = null;
        }
    };
    return SecondCountDown;
}(egret.HashObject));
__reflect(SecondCountDown.prototype, "SecondCountDown");
//# sourceMappingURL=SecondCountDown.js.map