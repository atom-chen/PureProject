/*
 * @Description: 保存服务器的一些数据 如服务器当前时间，开服时间
 * @Author: guolinsen
 * @Date: 2019-06-06 17:16:50
 * @LastEditTime: 2019-10-25 13:58:31
 */
class ServerCache extends BaseCache {
	/**开服时间*/
	serverOpenTime: number;
	/**开服天数*/
	serverOpenDay: number;
	/**合服时间*/
	serverCombineTime:number;
	/**合服天数*/
	serverCombineDay:number;
	
	/**服务器版本号*/
	serverVersion: string;

	_serverTimeBase: number = 0;


	public constructor() {
		super();
	}

	set serverTimeBase(value) {
		this._serverTimeBase = value;
	}
	/**
	 * 实时获取开服天数，每次获取都要计算一次
	 * 如果是同一次计算的时候需要多次用到开服天数，可先保存在一个临时变量
	*/
	// get serverOpenDay(): number {
	// 	let d = new Date();
	// 	d.setTime(this.serverTime);
	// 	let sd = new Date(d.getFullYear(), d.getMonth(), d.getDate());
	// 	d.setTime(this.serverOpenTime);
	// 	let od = new Date(d.getFullYear(), d.getMonth(), d.getDate());

	// 	return (sd.getTime() - od.getTime()) / 1000 / 3600 / 24 + 1;
	// }

	/**
	 * 获取当前服务器时间
	*/
	get serverTime(): number {
		return this._serverTimeBase + egret.getTimer();
	}

	clear() {
		super.clear();
		this.serverOpenTime = null;
		this._serverTimeBase = 0;
	}
}