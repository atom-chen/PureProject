/**
 * Created by yangsong on 2014/12/3.
 * Stage相关工具类
 */
class StageUtils extends BaseClass {
	private _uiStage: eui.UILayer;

	private stageWidth: number;
	private stageHeight: number;

	/**
	 * 构造函数
	 */
	public constructor() {
		super();

		if (this._uiStage == null) {
			this._uiStage = new eui.UILayer();
			this._uiStage.touchEnabled = false;
			this._uiStage.percentHeight = 100;
			this._uiStage.percentWidth = 100;

			this.getStage().addChild(this._uiStage);
		}
	}

	/**
	 * 获取游戏的高度
	 * @returns {number}
	 */
	public getHeight(): number {
		return this.stageHeight;
	}

	/**
	 * 获取游戏宽度
	 * @returns {number}
	 */
	public getWidth(): number {
		return this.stageWidth;
	}

	/**
	 * 指定此对象的子项以及子孙项是否接收鼠标/触摸事件
	 * @param value
	 */
	public setTouchChildren(value: boolean): void {
		this.getStage().touchChildren = value;
	}

	/**
	 * 设置同时可触发几个点击事件，默认为2
	 * @param value
	 */
	public setMaxTouches(value: number): void {
		this.getStage().maxTouches = value;
	}

	/**
	 * 设置帧频
	 * @param value
	 */
	public setFrameRate(value: number): void {
		this.getStage().frameRate = value;
	}

	/**
	 * 设置适配方式
	 * @param value
	 */
	public setScaleMode(value: string): void {
		this.getStage().scaleMode = value;
	}

	/**
	 * 设置游戏横竖版
	 * @param {egret.OrientationMode}
	 */
	public setOrientation(orientationMode?: string): void {
		if (!DeviceUtils.IsPC) {
			if (orientationMode) {
				this.getStage().orientation = orientationMode;
			} else if (this.getStage().orientation == egret.OrientationMode.LANDSCAPE) {
				this.getStage().orientation = egret.OrientationMode.PORTRAIT;
				this.getStage().setContentSize(580, 930);
			} else {
				this.getStage().orientation = egret.OrientationMode.LANDSCAPE;
				this.getStage().setContentSize(930, 580);
			}
		}
	}

	/**
	 * 获取游戏Stage对象
	 * @returns {egret.MainContext}
	 */
	public getStage(): egret.Stage {
		return egret.MainContext.instance.stage;
	}

	/**
	 * 获取唯一UIStage
	 * @returns {eui.UILayer}
	 */
	public getUIStage(): eui.UILayer {
		return this._uiStage;
	}

	public resize() {
		let curStage = this.getStage();
		let w: number = curStage.stageWidth;
		let h: number = curStage.stageHeight;
		this.stageWidth = w;
		this.stageHeight = h;
	}

	public init(): void {
		let curStage = this.getStage();

		if (DeviceUtils.IsPC) {
			//curStage.setContentSize(w, h);
			if (window.innerHeight < GlobalVar.GAME_PC_HEIGHT) {
				curStage.setContentSize(window.innerWidth, GlobalVar.GAME_PC_HEIGHT);
				curStage.scaleMode = egret.StageScaleMode.FIXED_HEIGHT;
			} else {
				curStage.scaleMode = egret.StageScaleMode.NO_SCALE;
			}
		}
		else {
			let designP: number = GlobalVar.GAME_HEIGHT / GlobalVar.GAME_WIDTH;
			let phoneP: number = window.innerHeight / window.innerWidth;
			if (designP >= phoneP) {
				curStage.setContentSize(GlobalVar.GAME_HEIGHT * window.innerWidth / window.innerHeight, GlobalVar.GAME_HEIGHT);
				curStage.scaleMode = egret.StageScaleMode.SHOW_ALL;
			} else {
				curStage.setContentSize(GlobalVar.GAME_WIDTH, GlobalVar.GAME_WIDTH * window.innerHeight / window.innerWidth);
				curStage.scaleMode = egret.StageScaleMode.SHOW_ALL;
			}
		}

		let w: number = curStage.stageWidth;
		let h: number = curStage.stageHeight;
		this.stageWidth = w;
		this.stageHeight = h;
		curStage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onStageTouch, this);
	}

	private onStageTouch(e: egret.TouchEvent) {
		App.DisplayUtils.addEffectToObj(this.getStage(), "click_0_1", 1, e.stageX, e.stageY);
		//this.logCh(this.getStage());
	}

	private logCh(con: egret.DisplayObjectContainer) {
		let i = 0;
		let num = con.numChildren;
		for (; i < num; i++) {
			let dis = con.getChildAt(i);
			var claName1: string = dis["__class__"];
			// console.log(claName1);
			if (dis instanceof egret.DisplayObjectContainer) {
				this.logCh(dis);
			}
		}
	}
}
