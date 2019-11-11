import DisplayObjectContainer = egret.DisplayObjectContainer;
/**
 * View基类，继承自eui.Component，使用ViewManager管理
 */
class BaseEuiComponent extends eui.Component {

	protected _myParent: egret.DisplayObjectContainer;
	public isInit: boolean;//窗口是否初始完成

	public openParam: ViewProp;
	protected _initOpen: boolean;  //初始化后要不要调用open

    /**
     * 构造函数
     * @param $controller 所属模块
     * @param $parent 父级
     */
	public constructor($parent: egret.DisplayObjectContainer = null) {
		super();
		this._myParent = $parent;
		this.isInit = false;
		this.touchEnabled = false;
	}


	protected childrenCreated(): void {
		super.childrenCreated();
		this.init();
		this.isInit = true;
	}

	//用于子类继承
	protected init(): void {

	}

    /**
    * 面板开启执行函数，用于子类继承
    * 面板如果还没init的时候，会等到面板init完再回调
    * @param param 参数
    */
	public open(param: ViewProp = null): void {

	}

    /**
     * 面板关闭执行函数，用于子类继承
     * @param param 参数
     */
	public close(param: ViewProp = null): void {
		this.removeAllEvent();
	}

    /**
     * 获取我的父级
     * @returns {egret.DisplayObjectContainer}
     */
	public get myParent(): egret.DisplayObjectContainer {
		return this._myParent;
	}

    /**
     * 面板是否显示
     * @return
     *
     */
	public isShow(): boolean {
		return this.stage != null;
	}

    /**
     * 添加到父级
     */
	public addToParent(): void {
		this._myParent && this._myParent.addChild(this);
	}

    /**
     * 从父级移除
     */
	public removeFromParent(): void {
		this.removeAllEvent();
		//this._myParent && this._myParent.removeChild(this);
		App.DisplayUtils.removeFromParent(this);
		App.DisplayUtils.removeFromParent(this["$modalTipsRect"]);
	}


	public dispose(): void {
		this.destroy();
	}

    /**
     * 销毁
     */
	public destroy(): void {
		this.removeFromParent();
		this._myParent = null;
		this.disposeChildren(this);
		this.removeAllEvent();
	}

	protected disposeChildren(dis): void {
		if (!dis.numChildren) {
			return;
		}
		let len = dis.numChildren;
		let child;
		while (len) {
			len--;
			child = dis.removeChildAt(0);
			if (child instanceof eui.Image && child.texture) {
				child.source = null;
			}
			if (child["clickEff"]) {
				App.DisplayUtils.removeClickEff(child);
			}
			if (child["stop"]) {
				child["stop"]();
			}
			if (child["dispose"]) {
				child["dispose"]();
			}
			if (child instanceof eui.List) {
				child.dataProvider = null;
			}
			this.disposeChildren(child);
		}
	}

    /**
     * 设置是否隐藏
     * @param value
     */
	public setVisible(value: boolean): void {
		this.visible = value;
	}


	/*刷新list数据*/
	/** bReplace */
	public setListData(list: eui.List, data: any[], bReplace = false): void {
		let dp = list.dataProvider as eui.ArrayCollection;
		if (!dp) {
			list.dataProvider = new eui.ArrayCollection(data);
		} else {
			if (dp.length != data.length) {
				dp.source = data;
			} else {
				/**由于数据源被引用,因此需要复制新的数据,防止数据源被修改 */
				if (bReplace) {
					dp.replaceAll(CommonUtils.copyDataHandler(data));
				}
				else {
					dp.source = data;
				}
			}
		}
		//dp ? dp.source = data : list.dataProvider = new eui.ArrayCollection(data);
		//dp ? dp.replaceAll(data) : list.dataProvider = new eui.ArrayCollection(data);
	}

	/****************************下面是界面自带侦听事件，窗口关闭自动移除 ************************/

	/* 添加listView子项点击事件回调 */
	public addItemClick(target: egret.DisplayObject, func: Function): void {
		this.addEvent(eui.ItemTapEvent.ITEM_TAP, target, func)
	}

	private event = [];
	/**控件添加一个点击事件 */
	public addTouchEvent(obj: any, func: Function) {
		this.addEvent(egret.TouchEvent.TOUCH_TAP, obj, func);
	}
	/**控件移除一个点击事件 */
	public removeTouchEvent(obj: any, func: Function) {
		obj.removeEventListener(egret.TouchEvent.TOUCH_TAP, func, this);
	}

	/**控件添加一个事件 */
	public addEvent(ev: string, obj: any, func: Function) {
		obj.addEventListener(ev, func, this);
		this.event.push([ev, func, obj]);
	}

	/**移除所有侦听事件 */
	protected removeAllEvent() {
		for (let ev of this.event) {
			ev[2].removeEventListener(ev[0], ev[1], this);
		}
		this.event = [];
		this.removeMessage();
		App.TimerManager.removeAll(this);
		this.removeFlushFun();
	}

	/**界面自带MessageCenter侦听，界面关闭时自动全部移除侦听 */
	public message(type: string, call: Function) {
		App.MessageCenter.addListener(type, call, this);
	}

	public removeMessage() {
		App.MessageCenter.removeAll(this);
	}

	private flushList: any[] = [];
	/**
	 * 分帧执行的函数，关闭界面的时候如果还没有执行会移除该函数
	 * @fun 函数对象
	 * @checkHas 是否覆盖上次
	*/
	protected flushFun(fun: Function, checkHas: boolean, ...param): void {
		if (checkHas) {
			let i = 0;
			let len = this.flushList.length;
			for (; i < len; i++) {
				if (this.flushList[i]["fun"] == fun) {
					this.flushList.splice(i, 1);
					break;
				}
			}
		}
		this.flushList.push({ fun: fun, param: param });
		if (!App.TimerManager.isExists(this.onFlush, this)) {
			App.TimerManager.addFrame(2, this.onFlush, this);
		}
	}
	private onFlush() {
		let fObj = this.flushList.shift();
		if (fObj) {
			fObj.fun.apply(this, fObj.param);
		}
	}
	private removeFlushFun(): void {
		this.flushList.length = 0;
	}

}