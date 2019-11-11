class DateStyle extends BaseClass {
	/**格式 */
	public format: string[] = [];
	/** 起始精确度*/
	public from: number = 0;
	/**结束精确度 */
	public to: number = 0;
	/**是否补齐0 */
	public isFormatNum: boolean = false;;

	public constructor(format: string[], from: number, to: number, isFormatNum: boolean) {
		super();
		this.format = format;
		this.from = from;
		this.to = to;
		this.isFormatNum = isFormatNum;
	}
}
/**
 * Created by yangsong on 2014/11/22.
 * Date工具类
 */
class DateUtils extends BaseClass {
	/**时间格式1 00:00:00 */
	public static TIME_FORMAT_1: number = 1;
	/**时间格式2 yyyy-mm-dd h:m:s */
	public static TIME_FORMAT_2: number = 2;
	/**时间格式3 00:00 */
	public static TIME_FORMAT_3: number = 3;
	/**时间格式4 xx天前/xx小时前/xx分钟前 */
	public static TIME_FORMAT_4: number = 4;
	/**时间格式5 x天x小时x分x秒 */
	public static TIME_FORMAT_5: number = 5;
	/**时间格式6 h:m:s */
	public static TIME_FORMAT_6: number = 6;
	/**时间格式7 xx天/xx小时/<1小时 */
	public static TIME_FORMAT_7: number = 7;
	/**时间格式8 yyyy-mm-dd h:m */
	public static TIME_FORMAT_8: number = 8;
	/**时间格式9 x小时x分钟x秒 */
	public static TIME_FORMAT_9: number = 9;
	/**时间格式10 x分x秒*/
	public static TIME_FORMAT_10: number = 10;
	/**时间格式11 x分钟 并向上取整*/
	public static TIME_FORMAT_11: number = 11;
	/**时间格式12 x天x小时x分*/
	public static TIME_FORMAT_12: number = 12;
	/**时间格式13 yyyy年mm月dd日h时m分*/
	public static TIME_FORMAT_13: number = 13;
	/**只返回天数 */
	public static TIME_FORMAT_14: number = 14;
	/**时间格式15 yyyy-mm-dd hh:mm:ss */
	public static TIME_FORMAT_15: number = 15;

	/**一秒的毫秒数 */
	public static MS_PER_SECOND: number = 1000;
	/**一分钟的毫秒数 */
	public static MS_PER_MINUTE: number = 60 * 1000;
	/**一小时的毫秒数 */
	public static MS_PER_HOUR: number = 60 * 60 * 1000;
	/**一天的毫秒数 */
	public static MS_PER_DAY: number = 24 * 60 * 60 * 1000;

	public static SECOND_PER_HOUR: number = 3600;//一小时的秒数
	public static SECOND_PER_DAY: number = 86400;//一天的秒数
	public static SECOND_PER_MONTH: number = 2592000;//一个月(30天)的秒数
	public static SECOND_PER_YEAR: number = 31104000;//一年(360天)的秒数

	public static DAYS_PER_WEEK: number = 7;//一周的天数

	public static YEAR_PER_YEAR: number = 1;//每年的年数
	public static MONTH_PER_YEAR: number = 12;//每年的月数
	public static DAYS_PER_MONTH: number = 30;//每月的天数
	public static HOURS_PER_DAY: number = 24;//每天的小时数
	public static MUNITE_PER_HOUR: number = 60;//每小时的分钟数
	public static SECOND_PER_MUNITE: number = 60;//每分钟的秒数
	public static SECOND_PER_SECOND: number = 1;//每秒的秒数字
	/**余数 ,用来计算时间*/
	private mod: number[] = [DateUtils.SECOND_PER_MUNITE, DateUtils.MUNITE_PER_HOUR, DateUtils.HOURS_PER_DAY, DateUtils.DAYS_PER_MONTH, DateUtils.MONTH_PER_YEAR, DateUtils.YEAR_PER_YEAR];
	/**除数 用来计算用来计算时间*/
	private mul: number[] = [DateUtils.SECOND_PER_SECOND, DateUtils.SECOND_PER_MUNITE, DateUtils.SECOND_PER_HOUR, DateUtils.SECOND_PER_DAY, DateUtils.SECOND_PER_MONTH, DateUtils.SECOND_PER_YEAR];
	/**一周的天数 */
	/**一天的小时数 */
	/** 本游戏中使用的MiniDateTime时间的起始日期相对于flash时间(1970-01-01)的时差（毫秒） */
	public static MINI_DATE_TIME_BASE: number = Date.UTC(2010, 0) + new Date().getTimezoneOffset() * DateUtils.MS_PER_MINUTE;
	/**
	 * 时区偏移（毫秒数）<BR>
	 * 目前中国采用东八区，即比世界协调时间（UTC）/格林尼治时间（GMT）快8小时的时区 */
	public static TIME_ZONE_OFFSET: number = 8 * DateUtils.MS_PER_HOUR;

	/**精确度 */
	public static TO_SECOND: number = 0;
	public static TO_MINUTE: number = 1;
	public static TO_HOUR: number = 2;
	public static TO_DAY: number = 3;
	public static TO_MONTH: number = 4;
	public static TO_YEAR: number = 5;
	/** n年n月n日n时n分n秒 */
	private static FORMAT_1: string[] = ["秒", "分", "时", "天", "月", "年"];
	/** xx:xx:xx */
	private static FORMAT_2: string[] = [":", ":", ":", ":", ":", ":"];

	/**x小时x分x秒 */
	public static STYLE_1: DateStyle = new DateStyle(DateUtils.FORMAT_1, DateUtils.TO_SECOND, DateUtils.TO_HOUR, false);
	/** x天x小时x分钟x秒 */
	public static STYLE_2: DateStyle = new DateStyle(DateUtils.FORMAT_1, DateUtils.TO_SECOND, DateUtils.TO_DAY, false);
	/** 00:00:00 */
	public static STYLE_3: DateStyle = new DateStyle(DateUtils.FORMAT_2, DateUtils.TO_SECOND, DateUtils.TO_HOUR, true);
	/** x分x秒 */
	public static STYLE_4: DateStyle = new DateStyle(DateUtils.FORMAT_1, DateUtils.TO_SECOND, DateUtils.TO_MINUTE, true);

	public constructor() {
		super();
	}


	/**
	 * 把MiniDateTime转化为距离1970-01-01的毫秒数
	 * @param mdt 从2010年开始算起的秒数
	 * @return 从1970年开始算起的毫秒数
	 */
	public formatMiniDateTime(mdt: number): number {
		return DateUtils.MINI_DATE_TIME_BASE + (mdt & 0x7FFFFFFF) * DateUtils.MS_PER_SECOND;
	}
	/**转成服务器要用的时间***/
	public formatServerTime(time: number): number {
		return (time - DateUtils.MINI_DATE_TIME_BASE) / DateUtils.MS_PER_SECOND;
	}


	/**
	 * 根据秒数格式化字符串
	 * @param  {number} second			秒数
	 * @param  {number=1} type			时间格式类型（参考DateUtils.TIME_FORMAT_1, DateUtils.TIME_FORMAT_2...)
	 * @param  {showLength}	showLength	显示长度（一个时间单位为一个长度，且仅在type为DateUtils.TIME_FORMAT_5的情况下有效）
	 * @returns string
	 */
	public getFormatBySecond(second: number, type: number = 1, showLength: number = 999): string {
		let str: string = "";
		let ms: number = second * 1000;
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
	}

	/**
	 * 格式1  00:00:00
	 * @param  {number} sec 毫秒数
	 * @returns string
	 */
	private format_1(ms: number): string {
		let n: number = 0;
		let result: string = "##:##:##";

		n = Math.floor(ms / DateUtils.MS_PER_HOUR);
		result = result.replace("##", this.formatTimeNum(n));
		if (n) ms -= n * DateUtils.MS_PER_HOUR;

		n = Math.floor(ms / DateUtils.MS_PER_MINUTE);
		result = result.replace("##", this.formatTimeNum(n));
		if (n) ms -= n * DateUtils.MS_PER_MINUTE;

		n = Math.floor(ms / 1000);
		result = result.replace("##", this.formatTimeNum(n));
		return result;
	}

	/**
	 * 格式2  yyyy-mm-dd h:m:s
	 * @param  {number} ms		毫秒数
	 * @returns string			返回自1970年1月1号0点开始的对应的时间点
	 */
	private format_2(ms: number): string {
		let date: Date = new Date(ms);
		let year: number = date.getFullYear();
		let month: number = date.getMonth() + 1; 	//返回的月份从0-11；
		let day: number = date.getDate();
		let hours: number = date.getHours();
		let minute: number = date.getMinutes();
		let second: number = date.getSeconds();
		return year + "-" + month + "-" + day + " " + hours + ":" + minute + ":" + second;
	}

	/**
	 * 格式3  00:00
	 * @param  {number} ms		毫秒数
	 * @returns string			分:秒
	 */
	private format_3(ms: number): string {
		let str: string = this.format_1(ms);
		let strArr: string[] = str.split(":");
		return strArr[1] + ":" + strArr[2];
	}

	/**
	 * 格式4  xx天前，xx小时前，xx分钟前
	 * @param  {number} ms		毫秒
	 * @returns string
	 */
	private format_4(ms: number): string {
		if (ms < DateUtils.MS_PER_HOUR) {
			return Math.floor(ms / DateUtils.MS_PER_MINUTE) + "分钟前";
		}
		else if (ms < DateUtils.MS_PER_DAY) {
			return Math.floor(ms / DateUtils.MS_PER_HOUR) + "小时前";
		}
		else {
			return Math.floor(ms / DateUtils.MS_PER_DAY) + "天前";
		}
	}

	/**
	 * 格式5 X天X小时X分X秒
	 * @param  {number} ms				毫秒
	 * @param  {number=2} showLength	显示长度（一个时间单位为一个长度）
	 * @returns string
	 */
	private format_5(ms: number, showLength: number = 2): string {
		let result: string = "";
		let unitStr: string[] = ["天", "时", "分", "秒"];
		let arr: number[] = [];

		let d: number = Math.floor(ms / DateUtils.MS_PER_DAY);
		arr.push(d);
		ms -= d * DateUtils.MS_PER_DAY;
		let h: number = Math.floor(ms / DateUtils.MS_PER_HOUR);
		arr.push(h);
		ms -= h * DateUtils.MS_PER_HOUR;
		let m: number = Math.floor(ms / DateUtils.MS_PER_MINUTE);
		arr.push(m);
		ms -= m * DateUtils.MS_PER_MINUTE;
		let s: number = Math.floor(ms / 1000);
		arr.push(s);

		for (let k in arr) {
			if (arr[k] > 0) {
				result += this.formatTimeNum(arr[k]) + unitStr[k];
				showLength--;
				if (showLength <= 0) break;
			}
		}

		return result;
	}

	/**
 * 格式6  h:m:s
 * @param  {number} ms		毫秒
 * @returns string			返回自1970年1月1号0点开始的对应的时间点（不包含年月日）
 */
	private format_6(ms: number): string {
		let date: Date = new Date(ms);
		let hours: number = date.getHours();
		let minute: number = date.getMinutes();
		let second: number = date.getSeconds();
		return this.formatTimeNum(hours) + ":" + this.formatTimeNum(minute) + ":" + this.formatTimeNum(second);
	}

	/**
 * 格式7  X天/X小时/<1小时
 * @param  {number} ms		毫秒
 * @returns string
 */
	private format_7(ms: number): string {
		if (ms < DateUtils.MS_PER_HOUR) {
			return "<1小时";
		}
		else if (ms < DateUtils.MS_PER_DAY) {
			return Math.floor(ms / DateUtils.MS_PER_HOUR) + "小时";
		}
		else {
			return Math.floor(ms / DateUtils.MS_PER_DAY) + "天";
		}
	}

	//8:yyyy-mm-dd h:m
	private format_8(time: number): string {
		var date: Date = new Date(time);
		var year: number = date.getFullYear();
		var month: number = date.getMonth() + 1; 	//返回的月份从0-11；
		var day: number = date.getDate();
		var hours: number = date.getHours();
		var minute: number = date.getMinutes();
		return year + "-" + month + "-" + day + " " + hours + ":" + minute;
	}

	/**
	 * 格式9  x小时x分钟x秒
	 * @param  {number} ms		毫秒
	 * @returns string
	 */
	private format_9(ms: number): string {
		let h: number = Math.floor(ms / DateUtils.MS_PER_HOUR);
		ms -= h * DateUtils.MS_PER_HOUR;
		let m: number = Math.floor(ms / DateUtils.MS_PER_MINUTE);
		ms -= m * DateUtils.MS_PER_MINUTE;
		let s: number = Math.floor(ms / 1000);

		return h + "小时" + m + "分钟" + s + "秒";
	}
	/**
	 * 格式10  x分x秒
	 * @param  {number} ms		毫秒
	 * @returns string
	 */
	private format_10(ms: number): string {
		// let h: number = Math.floor(ms / this.MS_PER_HOUR);
		// ms -= h * this.MS_PER_HOUR;
		let m: number = Math.floor(ms / DateUtils.MS_PER_MINUTE);
		ms -= m * DateUtils.MS_PER_MINUTE;
		let s: number = Math.floor(ms / 1000);
		if (!m) return s + "秒";
		if (!s) return m + "分钟";
		return m + "分钟" + s + "秒";
	}
	/**
	 * 格式11  x分
	 * @param  {number} ms	毫秒
	 * @returns string
	 */
	private format_11(ms: number): string {
		let m: number = Math.ceil(ms / DateUtils.MS_PER_MINUTE);
		return m + "分钟";
	}
	/**
	 * 格式12  x天x小时x分
	 * @param  {number} ms	毫秒
	 * @returns string
	 */
	private format_12(ms: number): string {
		let result: string = "";

		let d: number = Math.floor(ms / DateUtils.MS_PER_DAY);
		ms -= d * DateUtils.MS_PER_DAY;
		let h: number = Math.floor(ms / DateUtils.MS_PER_HOUR);
		ms -= h * DateUtils.MS_PER_HOUR;
		let m: number = ms < DateUtils.MS_PER_MINUTE ? Math.ceil(ms / DateUtils.MS_PER_MINUTE) : Math.floor(ms / DateUtils.MS_PER_MINUTE);
		ms -= m * DateUtils.MS_PER_MINUTE;

		if (d > 0) result += d + `天`;
		result += h + "小时";
		result += m + "分钟";

		return result;
	}

	//14:xx天
	private format_14(ms: number): string {
		return Math.floor(ms / DateUtils.MS_PER_DAY) + "";
	}

	/**
	 * 格式2  yyyy-mm-dd hh:mm:ss
	 * @param  {number} ms		毫秒数
	 * @returns string			返回自1970年1月1号0点开始的对应的时间点
	 */
	private format_15(ms: number): string {
		let date: Date = new Date(ms);
		let year: number = date.getFullYear();
		let month: number = date.getMonth() + 1; 	//返回的月份从0-11；
		let day: number = date.getDate();
		let hours: number = date.getHours();
		let minute: number = date.getMinutes();
		let second: number = date.getSeconds();
		//补0
		let strH = "";
		let strM = "";
		let strS = "";
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
	}


	//13:yyyy年mm月dd日h时m分
	private format_13(time: number): string {
		var date: Date = new Date(time);
		var year: number = date.getFullYear();
		var month: number = date.getMonth() + 1; 	//返回的月份从0-11；
		var day: number = date.getDate();
		var hours: number = date.getHours();
		var minute: number = date.getMinutes();
		return year + "年" + month + "月" + day + "日" + hours + "时" + minute + "分 ";
	}

	//返回距离当天0点剩余时间,格式00:00:00时分秒；
	public DayEndTime(time: number): string {
		let date: Date = new Date();
		date.setTime(time * 1000);
		let h = date.getHours();
		let m = date.getMinutes();
		let s = date.getSeconds();
		return (23 - h) + "小时" + (59 - m) + "分钟" + (59 - s) + "秒";
	}

	//返回距离当天0点剩余时间秒数
	public DayEndTimeSe(time: number): number {
		let sec: number = 0;
		let date: Date = ObjectPool.get(Date);
		date.setTime(time);
		let h = date.getHours();
		let m = date.getMinutes();
		let s = date.getSeconds();
		sec = (23 - h) * 3600 + (59 - m) * 60 + (59 - s);
		ObjectPool.push(date);
		return sec;
	}

	public dayDelta(oTime: number, nTime: number): number {
		if (!oTime) return;
		if (!nTime) return;
		let oDate: Date = new Date();
		let nDate: Date = new Date();
		let day;
		oDate.setTime(oTime * 1000);
		nDate.setTime(nTime * 1000);
		oDate.setHours(0, 0, 0, 0);
		nDate.setHours(0, 0, 0, 0);
		day = Math.floor((nDate.getTime() - oDate.getTime()) / (86400 * 1000));
		return day;
	}

	/**是否过期 */
	public isOverdue(endTime: number): boolean {
		//return GameServer.serverTime > this.formatMiniDateTime(endTime);
		return false;
	}


	/**
	 * 格式化时间数为两位数
	 * @param  {number} t 时间数
	 * @returns String
	 */
	private formatTimeNum(t: number): string {
		return t >= 10 ? t.toString() : "0" + t;
	}
}


