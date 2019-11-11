class Handler {

	private static pool: Array<Handler> = [];
	static hashCode: number = 0;

	caller: any;
	method: Function;
	args: Array<any>;
	once: boolean;
	isDispose: boolean = false;
	hashCode: number;

	public constructor(caller: any, method: Function, args: Array<any> = [], once: boolean = false) {
		this.setData(caller, method, args, once);
	}

	private setData(caller: any, method: Function, args: Array<any>, once: boolean): Handler {
		this.caller = caller;
		this.method = method;
		this.args = args;
		this.once = once;
		return this;
	}

	public run() {
		if (this.method) {
			this.method.apply(this.caller, this.args);
		}
		if (this.once) {
			this.dispose();
		}
	}

	public dispose() {
		if (this.isDispose) {
			return;
		}
		this.isDispose = true;
		this.caller = null;
		this.method = null;
		this.args = null;
		Handler.pool.push(this);
	}


	/**
    * 从对象池内创建一个Handler，默认会执行一次并立即回收，如果不需要自动回收，设置once参数为false。
    * @param	caller 执行域(this)。
    * @param	method 回调方法。
    * @param	args 携带的参数。
    * @param	once 是否只执行一次，如果为true，回调后执行recover()进行回收，默认为true。
    * @return  返回创建的handler实例。
    */
	static create(caller: any, method: Function, args: Array<any> = [], once: boolean = true): Handler {
		let han: Handler;
		if (this.pool.length > 0) {
			han = this.pool.pop();
			han.isDispose = false;
			han.setData(caller, method, args, once);
			han.hashCode = Handler.hashCode++;
			return han;
		}
		han = new Handler(caller, method, args, once);
		han.hashCode = Handler.hashCode++;
		return han;
	}

}