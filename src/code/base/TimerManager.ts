/**
 * Created by yangsong on 2014/11/23.
 * Timer管理器
 */
class TimerManager extends BaseClass {
	//private _handlers: Array<TimerHandler>;
	private _handlerDic: any;
	private _currTime: number;
	private _currFrame: number;
	private _doTime: boolean;

	/**
	 * 构造函数
	 */
	public constructor() {
		super();
		//this._handlers = [];
		this._handlerDic = {};

		this._currTime = egret.getTimer();
		this._currFrame = 0;

		egret.startTick(this.onEnterFrame, this);
	}

	public getFrameId(): number {
		return this._currFrame;
	}

	/**获取当前运行时间egret.getTimer() */
	public getSyncTime(): number {
		return this._currTime;
	}

	private static DeleteHandle(handler: TimerHandler) {
		handler.clear();
		ObjectPool.push(handler);
	}

	/**
	 * 每帧执行函数
	 * @param frameTime
	 */
	private onEnterFrame(time: number): boolean {
		this._currTime = time;//egret.getTimer();
		this._currFrame++;
		this.doTime();
		App.FrameHandler.onFrame();
		return false;
	}

	// private onTimer(): void {
	// 	this.doTime(this._currTime);
	// }

	private doTime(): void {
		let time = this._currTime;
		let frame = this._currFrame;
		for (let code in this._handlerDic) {
			let _handlers = this._handlerDic[code];
			let len: number = _handlers.length;
			if (len <= 0) {
				delete this._handlerDic[code];
				continue;
			}
			let i: number = 0;
			let handler: TimerHandler;
			let flag = false;
			for (; i < len; i++) {
				handler = _handlers[i];
				if (!handler) {
					return;
				}
				if (handler.needDelete) {
					_handlers.splice(i, 1);
					i--;
					len--;
					TimerManager.DeleteHandle(handler);
					continue;
				}
				flag = false;
				if (handler.exeTime > 0 && handler.exeTime <= time) {
					handler.exeTime = time + handler.delay;
					flag = true;
				} else if (handler.exeFrame > 0 && handler.exeFrame <= frame) {
					handler.exeFrame = frame + handler.delay;
					flag = true;
				}
				if (flag) {
					handler.method.apply(handler.methodObj, handler.methodParam);
					let repeat: boolean = handler.forever;
					if (!repeat) {
						if (handler.repeatCount > 1) {
							handler.repeatCount--;
							repeat = true;
						} else {
							if (handler.repeatCount == 1 && handler.onFinish) {
								handler.onFinish.apply(handler.finishObj);
							}
						}
					}
					if (!repeat) {
						_handlers.splice(i, 1);
						i--;
						len--;
						TimerManager.DeleteHandle(handler);
					}
				}
			}
		}
	}

	private create(startTime: number, delay: number, repeat: number, method: Function, methodObj: egret.HashObject,
		onFinish: Function, fobj: any, onTime = true, ...methodParam): void {
		if (delay < 0 || repeat < 0 || method == null) {
			return;
		}
		if(!methodObj.hashCode){
			throw(new Error("计时器对象必须是HashObject"));
		}
		let handler: TimerHandler = ObjectPool.get(TimerHandler);
		handler.forever = repeat == 0;
		handler.repeatCount = repeat;
		handler.delay = delay;
		handler.method = method;
		handler.methodObj = methodObj;
		handler.methodParam = methodParam;
		handler.onFinish = onFinish;
		handler.finishObj = fobj;
		handler.exeTime = startTime + this._currTime;
		handler.exeFrame = 0;

		let arr = this._handlerDic[methodObj.hashCode];
		if (!arr) arr = this._handlerDic[methodObj.hashCode] = [];
		arr.push(handler);
	}

	/**
	 *
	 * 定时执行
	 * @param delay 执行间隔:毫秒
	 * @param repeat 执行次数, 0为无限次
	 * @param method 执行函数
	 * @param methodObj 执行函数所属对象
	 * @param onFinish 完成执行函数
	 * @param fobj 完成执行函数所属对象
	 * @param remove 是否删除已经存在的
	 *
	 */
	public add(delay: number, method: Function, methodObj: any, repeat: number = 0
		, onFinish: Function = null, fobj: any = null): void {
		this.create(delay, delay, repeat, method, methodObj, onFinish, fobj);
	}

	/**
	 *
	 * 定时执行,首次延时
	 * @param startTime 延迟多久第一次执行
	 * @param delay 执行间隔:毫秒
	 * @param repeat 执行次数, 0为无限次
	 * @param method 执行函数
	 * @param methodObj 执行函数所属对象
	 * @param onFinish 完成执行函数
	 * @param fobj 完成执行函数所属对象
	 * @param remove 是否删除已经存在的
	 *
	 */
	public addDelay(startTime: number, delay: number, repeat: number, method: Function, methodObj: egret.HashObject
		, onFinish: Function = null, fobj: any = null, ...methodParam): void {
		this.create(startTime, delay, repeat, method, methodObj, onFinish, fobj, true, ...methodParam);
	}


	/**
	 *
	 * 定帧执行
	 * @param frame 执行间隔:多少帧执行一次
	 * @param repeat 执行次数, 0为无限次
	 * @param method 执行函数
	 * @param methodObj 执行函数所属对象
	 *
	 */
	public addFrame(frame: number, method: Function, methodObj: any, repeat: number = 0): void {
		if (frame < 0 || repeat < 0 || method == null) {
			return;
		}
		let handler: TimerHandler = ObjectPool.get(TimerHandler);
		handler.forever = repeat == 0;
		handler.repeatCount = repeat;
		handler.delay = frame;
		handler.method = method;
		handler.methodObj = methodObj;
		handler.exeTime = 0;
		handler.exeFrame = frame + this._currFrame;

		let arr = this._handlerDic[methodObj.hashCode];
		if (!arr) arr = this._handlerDic[methodObj.hashCode] = [];
		arr.push(handler);
	}

	/**
	 * 清理
	 * @param method 要移除的函数
	 * @param methodObj 要移除的函数对应的对象
	 */
	public remove(method: Function, methodObj: egret.HashObject): void {
		let handlers = this._handlerDic[methodObj.hashCode];
		if (!handlers) return;
		for (let i = handlers.length - 1; i >= 0; i--) {
			let handler = handlers[i];
			if (handler.method == method) {
				handler.needDelete = true;
			}
		}
		(handlers.length == 0) && (delete this._handlerDic[methodObj.hashCode]);
	}

	/**
	 * 清理
	 * @param methodObj 要移除的函数对应的对象
	 */
	public removeAll(methodObj: egret.HashObject): void {
		let handlers = this._handlerDic[methodObj.hashCode];
		if (!handlers) return;
		for (let i = handlers.length - 1; i >= 0; i--) {
			let handler = handlers[i];
			handler.needDelete = true;
		}
		delete this._handlerDic[methodObj.hashCode];
	}

	/**
	 * 检测是否已经存在
	 * @param method
	 * @param methodObj
	 *
	 */
	public isExists(method: Function, methodObj: egret.HashObject): boolean {
		let handlers = this._handlerDic[methodObj.hashCode];
		if (!handlers) return;
		for (let i = handlers.length - 1; i >= 0; i--) {
			let handler = handlers[i];
			if (handler.method == method) {
				return true;
			}
		}
		return false;
	}
}


class TimerHandler {
	/**执行间隔*/
	public delay: number = 0;
	/**是否重复执行*/
	public forever: boolean = false;
	/**重复执行次数*/
	public repeatCount: number = 0;
	/**执行时间*/
	public exeTime: number = 0;
	/**执行帧*/
	public exeFrame: number = 0;
	/**处理函数*/
	public method: Function;
	/**处理函数所属对象*/
	public methodObj: egret.HashObject;
	/**处理函数参数*/
	public methodParam: any[];
	/**完成处理函数*/
	public onFinish: Function;
	/**完成处理函数所属对象*/
	public finishObj: any;

	public needDelete: boolean = false;

	/**清理*/
	public clear(): void {
		this.method = null;
		this.methodObj = null;
		this.methodParam = null;
		this.onFinish = null;
		this.finishObj = null;
		this.forever = false;
		this.needDelete = false;
	}
}