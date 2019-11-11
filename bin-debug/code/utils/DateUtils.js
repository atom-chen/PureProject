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
var DateStyle = (function (_super) {
    __extends(DateStyle, _super);
    function DateStyle(format, from, to, isFormatNum) {
        var _this = _super.call(this) || this;
        /**格式 */
        _this.format = [];
        /** 起始精确度*/
        _this.from = 0;
        /**结束精确度 */
        _this.to = 0;
        /**是否补齐0 */
        _this.isFormatNum = false;
        _this.format = format;
        _this.from = from;
        _this.to = to;
        _this.isFormatNum = isFormatNum;
        return _this;
    }
    ;
    return DateStyle;
}(BaseClass));
__reflect(DateStyle.prototype, "DateStyle");
/**
 * Created by yangsong on 2014/11/22.
 * Date工具类
 */
var DateUtils = (function (_super) {
    __extends(DateUtils, _super);
    function DateUtils() {
        var _this = _super.call(this) || this;
        /**余数 ,用来计算时间*/
        _this.mod = [DateUtils.SECOND_PER_MUNITE, DateUtils.MUNITE_PER_HOUR, DateUtils.HOURS_PER_DAY, DateUtils.DAYS_PER_MONTH, DateUtils.MONTH_PER_YEAR, DateUtils.YEAR_PER_YEAR];
        /**除数 用来计算用来计算时间*/
        _this.mul = [DateUtils.SECOND_PER_SECOND, DateUtils.SECOND_PER_MUNITE, DateUtils.SECOND_PER_HOUR, DateUtils.SECOND_PER_DAY, DateUtils.SECOND_PER_MONTH, DateUtils.SECOND_PER_YEAR];
        return _this;
    }
    /**
     * 把MiniDateTime转化为距离1970-01-01的毫秒数
     * @param mdt 从2010年开始算起的秒数
     * @return 从1970年开始算起的毫秒数
     */
    DateUtils.prototype.formatMiniDateTime = function (mdt) {
        return DateUtils.MINI_DATE_TIME_BASE + (mdt & 0x7FFFFFFF) * DateUtils.MS_PER_SECOND;
    };
    /**转成服务器要用的时间***/
    DateUtils.prototype.formatServerTime = function (time) {
        return (time - DateUtils.MINI_DATE_TIME_BASE) / DateUtils.MS_PER_SECOND;
    };
    /**
     * 根据秒数格式化字符串
     * @param  {number} second			秒数
     * @param  {number=1} type			时间格式类型（参考DateUtils.TIME_FORMAT_1, DateUtils.TIME_FORMAT_2...)
     * @param  {showLength}	showLength	显示长度（一个时间单位为一个长度，且仅在type为DateUtils.TIME_FORMAT_5的情况下有效）
     * @returns string
     */
    DateUtils.prototype.getFormatBySecond = function (second, type, showLength) {
        if (type === void 0) { type = 1; }
        if (showLength === void 0) { showLength = 999; }
        var str = "";
        var ms = second * 1000;
        switch (type) {
            case DateUtils.TIME_FORMAT_1:
                str = this.format_1(ms);
                break;
            case DateUtils.TIME_FORMAT_2:
                str = this.format_2(ms);
                break;
            case DateUtils.TIME_FORMAT_3:
                str = this.format_3(ms);
                break;
            case DateUtils.TIME_FORMAT_4:
                str = this.format_4(ms);
                break;
            case DateUtils.TIME_FORMAT_5:
                str = this.format_5(ms, showLength);
                break;
            case DateUtils.TIME_FORMAT_6:
                str = this.format_6(ms);
                break;
            case DateUtils.TIME_FORMAT_7:
                str = this.format_7(ms);
                break;
            case DateUtils.TIME_FORMAT_8:
                str = this.format_8(ms);
                break;
            case DateUtils.TIME_FORMAT_9:
                str = this.format_9(ms);
                break;
            case DateUtils.TIME_FORMAT_10:
                str = this.format_10(ms);
                break;
            case DateUtils.TIME_FORMAT_11:
                str = this.format_11(ms);
                break;
            case DateUtils.TIME_FORMAT_12:
                str = this.format_12(ms);
                break;
            case DateUtils.TIME_FORMAT_13:
                str = this.format_13(ms);
                break;
            case DateUtils.TIME_FORMAT_14:
                str = this.format_14(ms);
                break;
            case DateUtils.TIME_FORMAT_15:
                str = this.format_15(ms);
                break;
        }
        return str;
    };
    /**
     * 格式1  00:00:00
     * @param  {number} sec 毫秒数
     * @returns string
     */
    DateUtils.prototype.format_1 = function (ms) {
        var n = 0;
        var result = "##:##:##";
        n = Math.floor(ms / DateUtils.MS_PER_HOUR);
        result = result.replace("##", this.formatTimeNum(n));
        if (n)
            ms -= n * DateUtils.MS_PER_HOUR;
        n = Math.floor(ms / DateUtils.MS_PER_MINUTE);
        result = result.replace("##", this.formatTimeNum(n));
        if (n)
            ms -= n * DateUtils.MS_PER_MINUTE;
        n = Math.floor(ms / 1000);
        result = result.replace("##", this.formatTimeNum(n));
        return result;
    };
    /**
     * 格式2  yyyy-mm-dd h:m:s
     * @param  {number} ms		毫秒数
     * @returns string			返回自1970年1月1号0点开始的对应的时间点
     */
    DateUtils.prototype.format_2 = function (ms) {
        var date = new Date(ms);
        var year = date.getFullYear();
        var month = date.getMonth() + 1; //返回的月份从0-11；
        var day = date.getDate();
        var hours = date.getHours();
        var minute = date.getMinutes();
        var second = date.getSeconds();
        return year + "-" + month + "-" + day + " " + hours + ":" + minute + ":" + second;
    };
    /**
     * 格式3  00:00
     * @param  {number} ms		毫秒数
     * @returns string			分:秒
     */
    DateUtils.prototype.format_3 = function (ms) {
        var str = this.format_1(ms);
        var strArr = str.split(":");
        return strArr[1] + ":" + strArr[2];
    };
    /**
     * 格式4  xx天前，xx小时前，xx分钟前
     * @param  {number} ms		毫秒
     * @returns string
     */
    DateUtils.prototype.format_4 = function (ms) {
        if (ms < DateUtils.MS_PER_HOUR) {
            return Math.floor(ms / DateUtils.MS_PER_MINUTE) + "分钟前";
        }
        else if (ms < DateUtils.MS_PER_DAY) {
            return Math.floor(ms / DateUtils.MS_PER_HOUR) + "小时前";
        }
        else {
            return Math.floor(ms / DateUtils.MS_PER_DAY) + "天前";
        }
    };
    /**
     * 格式5 X天X小时X分X秒
     * @param  {number} ms				毫秒
     * @param  {number=2} showLength	显示长度（一个时间单位为一个长度）
     * @returns string
     */
    DateUtils.prototype.format_5 = function (ms, showLength) {
        if (showLength === void 0) { showLength = 2; }
        var result = "";
        var unitStr = ["天", "时", "分", "秒"];
        var arr = [];
        var d = Math.floor(ms / DateUtils.MS_PER_DAY);
        arr.push(d);
        ms -= d * DateUtils.MS_PER_DAY;
        var h = Math.floor(ms / DateUtils.MS_PER_HOUR);
        arr.push(h);
        ms -= h * DateUtils.MS_PER_HOUR;
        var m = Math.floor(ms / DateUtils.MS_PER_MINUTE);
        arr.push(m);
        ms -= m * DateUtils.MS_PER_MINUTE;
        var s = Math.floor(ms / 1000);
        arr.push(s);
        for (var k in arr) {
            if (arr[k] > 0) {
                result += this.formatTimeNum(arr[k]) + unitStr[k];
                showLength--;
                if (showLength <= 0)
                    break;
            }
        }
        return result;
    };
    /**
 * 格式6  h:m:s
 * @param  {number} ms		毫秒
 * @returns string			返回自1970年1月1号0点开始的对应的时间点（不包含年月日）
 */
    DateUtils.prototype.format_6 = function (ms) {
        var date = new Date(ms);
        var hours = date.getHours();
        var minute = date.getMinutes();
        var second = date.getSeconds();
        return this.formatTimeNum(hours) + ":" + this.formatTimeNum(minute) + ":" + this.formatTimeNum(second);
    };
    /**
 * 格式7  X天/X小时/<1小时
 * @param  {number} ms		毫秒
 * @returns string
 */
    DateUtils.prototype.format_7 = function (ms) {
        if (ms < DateUtils.MS_PER_HOUR) {
            return "<1小时";
        }
        else if (ms < DateUtils.MS_PER_DAY) {
            return Math.floor(ms / DateUtils.MS_PER_HOUR) + "小时";
        }
        else {
            return Math.floor(ms / DateUtils.MS_PER_DAY) + "天";
        }
    };
    //8:yyyy-mm-dd h:m
    DateUtils.prototype.format_8 = function (time) {
        var date = new Date(time);
        var year = date.getFullYear();
        var month = date.getMonth() + 1; //返回的月份从0-11；
        var day = date.getDate();
        var hours = date.getHours();
        var minute = date.getMinutes();
        return year + "-" + month + "-" + day + " " + hours + ":" + minute;
    };
    /**
     * 格式9  x小时x分钟x秒
     * @param  {number} ms		毫秒
     * @returns string
     */
    DateUtils.prototype.format_9 = function (ms) {
        var h = Math.floor(ms / DateUtils.MS_PER_HOUR);
        ms -= h * DateUtils.MS_PER_HOUR;
        var m = Math.floor(ms / DateUtils.MS_PER_MINUTE);
        ms -= m * DateUtils.MS_PER_MINUTE;
        var s = Math.floor(ms / 1000);
        return h + "小时" + m + "分钟" + s + "秒";
    };
    /**
     * 格式10  x分x秒
     * @param  {number} ms		毫秒
     * @returns string
     */
    DateUtils.prototype.format_10 = function (ms) {
        // let h: number = Math.floor(ms / this.MS_PER_HOUR);
        // ms -= h * this.MS_PER_HOUR;
        var m = Math.floor(ms / DateUtils.MS_PER_MINUTE);
        ms -= m * DateUtils.MS_PER_MINUTE;
        var s = Math.floor(ms / 1000);
        if (!m)
            return s + "秒";
        if (!s)
            return m + "分钟";
        return m + "分钟" + s + "秒";
    };
    /**
     * 格式11  x分
     * @param  {number} ms	毫秒
     * @returns string
     */
    DateUtils.prototype.format_11 = function (ms) {
        var m = Math.ceil(ms / DateUtils.MS_PER_MINUTE);
        return m + "分钟";
    };
    /**
     * 格式12  x天x小时x分
     * @param  {number} ms	毫秒
     * @returns string
     */
    DateUtils.prototype.format_12 = function (ms) {
        var result = "";
        var d = Math.floor(ms / DateUtils.MS_PER_DAY);
        ms -= d * DateUtils.MS_PER_DAY;
        var h = Math.floor(ms / DateUtils.MS_PER_HOUR);
        ms -= h * DateUtils.MS_PER_HOUR;
        var m = ms < DateUtils.MS_PER_MINUTE ? Math.ceil(ms / DateUtils.MS_PER_MINUTE) : Math.floor(ms / DateUtils.MS_PER_MINUTE);
        ms -= m * DateUtils.MS_PER_MINUTE;
        if (d > 0)
            result += d + "\u5929";
        result += h + "小时";
        result += m + "分钟";
        return result;
    };
    //14:xx天
    DateUtils.prototype.format_14 = function (ms) {
        return Math.floor(ms / DateUtils.MS_PER_DAY) + "";
    };
    /**
     * 格式2  yyyy-mm-dd hh:mm:ss
     * @param  {number} ms		毫秒数
     * @returns string			返回自1970年1月1号0点开始的对应的时间点
     */
    DateUtils.prototype.format_15 = function (ms) {
        var date = new Date(ms);
        var year = date.getFullYear();
        var month = date.getMonth() + 1; //返回的月份从0-11；
        var day = date.getDate();
        var hours = date.getHours();
        var minute = date.getMinutes();
        var second = date.getSeconds();
        //补0
        var strH = "";
        var strM = "";
        var strS = "";
        if (hours < 10) {
            strH = "0" + hours;
        }
        else {
            strH = "" + hours;
        }
        if (minute < 10) {
            strM = "0" + minute;
        }
        else {
            strM = "" + minute;
        }
        if (hours < 10) {
            strS = "0" + second;
        }
        else {
            strS = "" + second;
        }
        return year + "-" + month + "-" + day + " " + strH + ":" + strM + ":" + strS;
    };
    //13:yyyy年mm月dd日h时m分
    DateUtils.prototype.format_13 = function (time) {
        var date = new Date(time);
        var year = date.getFullYear();
        var month = date.getMonth() + 1; //返回的月份从0-11；
        var day = date.getDate();
        var hours = date.getHours();
        var minute = date.getMinutes();
        return year + "年" + month + "月" + day + "日" + hours + "时" + minute + "分 ";
    };
    //返回距离当天0点剩余时间,格式00:00:00时分秒；
    DateUtils.prototype.DayEndTime = function (time) {
        var date = new Date();
        date.setTime(time * 1000);
        var h = date.getHours();
        var m = date.getMinutes();
        var s = date.getSeconds();
        return (23 - h) + "小时" + (59 - m) + "分钟" + (59 - s) + "秒";
    };
    //返回距离当天0点剩余时间秒数
    DateUtils.prototype.DayEndTimeSe = function (time) {
        var sec = 0;
        var date = ObjectPool.get(Date);
        date.setTime(time);
        var h = date.getHours();
        var m = date.getMinutes();
        var s = date.getSeconds();
        sec = (23 - h) * 3600 + (59 - m) * 60 + (59 - s);
        ObjectPool.push(date);
        return sec;
    };
    DateUtils.prototype.dayDelta = function (oTime, nTime) {
        if (!oTime)
            return;
        if (!nTime)
            return;
        var oDate = new Date();
        var nDate = new Date();
        var day;
        oDate.setTime(oTime * 1000);
        nDate.setTime(nTime * 1000);
        oDate.setHours(0, 0, 0, 0);
        nDate.setHours(0, 0, 0, 0);
        day = Math.floor((nDate.getTime() - oDate.getTime()) / (86400 * 1000));
        return day;
    };
    /**是否过期 */
    DateUtils.prototype.isOverdue = function (endTime) {
        //return GameServer.serverTime > this.formatMiniDateTime(endTime);
        return false;
    };
    /**
     * 格式化时间数为两位数
     * @param  {number} t 时间数
     * @returns String
     */
    DateUtils.prototype.formatTimeNum = function (t) {
        return t >= 10 ? t.toString() : "0" + t;
    };
    /**时间格式1 00:00:00 */
    DateUtils.TIME_FORMAT_1 = 1;
    /**时间格式2 yyyy-mm-dd h:m:s */
    DateUtils.TIME_FORMAT_2 = 2;
    /**时间格式3 00:00 */
    DateUtils.TIME_FORMAT_3 = 3;
    /**时间格式4 xx天前/xx小时前/xx分钟前 */
    DateUtils.TIME_FORMAT_4 = 4;
    /**时间格式5 x天x小时x分x秒 */
    DateUtils.TIME_FORMAT_5 = 5;
    /**时间格式6 h:m:s */
    DateUtils.TIME_FORMAT_6 = 6;
    /**时间格式7 xx天/xx小时/<1小时 */
    DateUtils.TIME_FORMAT_7 = 7;
    /**时间格式8 yyyy-mm-dd h:m */
    DateUtils.TIME_FORMAT_8 = 8;
    /**时间格式9 x小时x分钟x秒 */
    DateUtils.TIME_FORMAT_9 = 9;
    /**时间格式10 x分x秒*/
    DateUtils.TIME_FORMAT_10 = 10;
    /**时间格式11 x分钟 并向上取整*/
    DateUtils.TIME_FORMAT_11 = 11;
    /**时间格式12 x天x小时x分*/
    DateUtils.TIME_FORMAT_12 = 12;
    /**时间格式13 yyyy年mm月dd日h时m分*/
    DateUtils.TIME_FORMAT_13 = 13;
    /**只返回天数 */
    DateUtils.TIME_FORMAT_14 = 14;
    /**时间格式15 yyyy-mm-dd hh:mm:ss */
    DateUtils.TIME_FORMAT_15 = 15;
    /**一秒的毫秒数 */
    DateUtils.MS_PER_SECOND = 1000;
    /**一分钟的毫秒数 */
    DateUtils.MS_PER_MINUTE = 60 * 1000;
    /**一小时的毫秒数 */
    DateUtils.MS_PER_HOUR = 60 * 60 * 1000;
    /**一天的毫秒数 */
    DateUtils.MS_PER_DAY = 24 * 60 * 60 * 1000;
    DateUtils.SECOND_PER_HOUR = 3600; //一小时的秒数
    DateUtils.SECOND_PER_DAY = 86400; //一天的秒数
    DateUtils.SECOND_PER_MONTH = 2592000; //一个月(30天)的秒数
    DateUtils.SECOND_PER_YEAR = 31104000; //一年(360天)的秒数
    DateUtils.DAYS_PER_WEEK = 7; //一周的天数
    DateUtils.YEAR_PER_YEAR = 1; //每年的年数
    DateUtils.MONTH_PER_YEAR = 12; //每年的月数
    DateUtils.DAYS_PER_MONTH = 30; //每月的天数
    DateUtils.HOURS_PER_DAY = 24; //每天的小时数
    DateUtils.MUNITE_PER_HOUR = 60; //每小时的分钟数
    DateUtils.SECOND_PER_MUNITE = 60; //每分钟的秒数
    DateUtils.SECOND_PER_SECOND = 1; //每秒的秒数字
    /**一周的天数 */
    /**一天的小时数 */
    /** 本游戏中使用的MiniDateTime时间的起始日期相对于flash时间(1970-01-01)的时差（毫秒） */
    DateUtils.MINI_DATE_TIME_BASE = Date.UTC(2010, 0) + new Date().getTimezoneOffset() * DateUtils.MS_PER_MINUTE;
    /**
     * 时区偏移（毫秒数）<BR>
     * 目前中国采用东八区，即比世界协调时间（UTC）/格林尼治时间（GMT）快8小时的时区 */
    DateUtils.TIME_ZONE_OFFSET = 8 * DateUtils.MS_PER_HOUR;
    /**精确度 */
    DateUtils.TO_SECOND = 0;
    DateUtils.TO_MINUTE = 1;
    DateUtils.TO_HOUR = 2;
    DateUtils.TO_DAY = 3;
    DateUtils.TO_MONTH = 4;
    DateUtils.TO_YEAR = 5;
    /** n年n月n日n时n分n秒 */
    DateUtils.FORMAT_1 = ["秒", "分", "时", "天", "月", "年"];
    /** xx:xx:xx */
    DateUtils.FORMAT_2 = [":", ":", ":", ":", ":", ":"];
    /**x小时x分x秒 */
    DateUtils.STYLE_1 = new DateStyle(DateUtils.FORMAT_1, DateUtils.TO_SECOND, DateUtils.TO_HOUR, false);
    /** x天x小时x分钟x秒 */
    DateUtils.STYLE_2 = new DateStyle(DateUtils.FORMAT_1, DateUtils.TO_SECOND, DateUtils.TO_DAY, false);
    /** 00:00:00 */
    DateUtils.STYLE_3 = new DateStyle(DateUtils.FORMAT_2, DateUtils.TO_SECOND, DateUtils.TO_HOUR, true);
    /** x分x秒 */
    DateUtils.STYLE_4 = new DateStyle(DateUtils.FORMAT_1, DateUtils.TO_SECOND, DateUtils.TO_MINUTE, true);
    return DateUtils;
}(BaseClass));
__reflect(DateUtils.prototype, "DateUtils");
//# sourceMappingURL=DateUtils.js.map