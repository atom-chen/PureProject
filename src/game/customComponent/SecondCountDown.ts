/*
 * @Description: 每秒倒计时
 * @Author: guolinsen
 * @Date: 2019-08-15 15:01:32
 * @LastEditTime: 2019-09-10 15:27:47
 */
class SecondCountDown extends egret.HashObject{
	private handler: Handler;
	private _time: number;

	private _text: egret.TextField;
	private _lab: string;
	private _tf: number;

	public constructor() {
		super();
	}
	/**
	 * 每秒定时回调
	 * fun 回调函数，参数：剩余秒数
	 * funObj 
	*/
	public addCallBack(fun, funObj) {
		if (fun && funObj) {
			this.handler = Handler.create(funObj, fun, null, false);
		}
	}
	/**
	 * 文本显示
	 * text:文本控件
	 * lab:文本基本内容 例如：剩余时间：{0}
	 * timeFormat:时间格式，参考DateUtils.TIME_FORMAT_1
	*/
	public addLabel(text: egret.TextField, lab: string, timeFormat: number) {
		this._text = text;
		this._lab = lab;
		this._tf = timeFormat;
	}
	/**
	 * 剩余时间
	*/
	public set time(value) {
		this._time = value;
		App.TimerManager.removeAll(this);
		if (value > 0) {
			App.TimerManager.add(1000, this.onTime, this);
		}
	}

	/**
	 * 服务器未来时间
	*/
	public set serverTime(value) {
		this.time = GlobalFun.getDiffMiniDateTime(value);
	}

	/**
	 * 开服第几天
	 * 例如设置开服第8天，则计算距第8天的倒计时
	*/
	public set openDay(value) {
		let day = GameCache.server.serverOpenDay;
		this.time = (value - day) * 24 * 3600;
	}

	public get time(): number {
		return this._time;
	}

	private onTime() {
		this._time--;
		if (this._time <= 0) {
			this._time = 0;
			App.TimerManager.removeAll(this);
		}
		if (this._text) {
			this._text.textFlow = TextFlowUtils.generateTextFlow(
				StringUtils.substitute(this._lab, App.DateUtils.getFormatBySecond(this._time, this._tf)));
		}
		if (this.handler) {
			this.handler.args = [this._time];
			this.handler.run();
		}
	}
	public dispose() {
		App.TimerManager.removeAll(this);
		if (this.handler) {
			this.handler.dispose();
			this.handler = null;
		}
	}
}