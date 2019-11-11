/**
 * 地图事物基类
*/
class BaseThing extends egret.DisplayObjectContainer implements IThing {

	public cellXY: XY;//当前坐标
	public pro: PropertySet; //角色属性
	public id: number; //角色id
	public disappear: boolean = true; //是否消失
	public canTouch: boolean = true; //不能被点击选中

	public title: ThingTitle;
	protected bubbles: ThingBubbles;

	private isView: boolean = false;

	public constructor() {
		super();
		this.touchEnabled = false;
		this.touchChildren = false;
		this.cellXY = { x: 0, y: 0 };

		this.title = new ThingTitle();
		this.addChild(this.title);
	}

	public init(pro: PropertySet) {
		this.disappear = false;
		this.pro = pro;
		this.initPropertys(pro);
		this.setCellXY(pro.pro(PropId.AP_X), pro.pro(PropId.AP_Y), true);
		this.title.setName(this.pro.charName);
	}
	/**
	 * 处理属性集变更
	 * @param propSet
	 * 
	 */
	protected initPropertys(propSet: PropertySet): void {
		for (let id in propSet) {
			let type = parseInt(id);
			let value = propSet.pro(type);
			this.updateProperty(type, value);
		}
	}

	/**
	 * 处理单个属性变更 
	 * @param propType
	 * @param propValue
	 * 
	 */
	public updateProperty(propType: number, propValue: any): void {
		this.pro.pro(propType, propValue);
		switch (propType) {
			case PropId.AP_ACTOR_ID:
				this.id = propValue;
				break;
		}
	}

	/**
	 * 设定当前坐标位置 
	 * 会基于新的Y值在显示容器中重新排序
	 * @param X
	 * @param Y
	 * @server 是否是后端设置的
	 */
	public setCellXY(X: number, Y: number, server: boolean = false): void {
		this.cellXY.x = X;
		this.cellXY.y = Y;
		this.x = (GameCache.map.cellWidth * (X + 0.5)) >> 0;
		this.y = (GameCache.map.cellHeight * (Y + 0.5)) >> 0;
	}

	public isTouch(mouseX: number, mouseY: number): boolean {
		if (!this.canTouch) return false;
		if (this.disappear) return false;
		return (Math.abs(this.x - mouseX) < 40 && this.y - mouseY < 120 && this.y >= mouseY);
	}

    /**
     * 状态处理函数，子类如果需要周期或循环性的处理某些逻辑则应当覆盖此函数 
     * @param CurrentTick 当前系统运行时间
     * 
     */
	public update(CurrentTick: number): void {

	}

	public checkInView(tx, ty, tw, th) {
		let w = this.getWidth();
		let h = this.getHeight();
		let x = this.x;
		let y = this.y;
		let flag = true;
		if (x + w <= tx) {
			flag = false;
		}
		else if (x >= tx + tw) {
			flag = false;
		}
		else if (y + h <= ty) {
			flag = false;
		}
		else if (y >= ty + th) {
			flag = false;
		}
		this.setOnView(flag);
	}

	public getWidth() {
		return 40;
	}

	public getHeight() {
		return 120;
	}

	public setOnView(flag: boolean) {
		if (this.isView != flag) {
			this.isView = flag;
			if (flag) {
				App.ThingManager.playerLayer.addChild(this);
			} else {
				if (this.parent) {
					this.parent.removeChild(this);
				}
			}
		}
	}

	public get isInView(): boolean {
		return this.isView && this.stage != null;
	}

	/**
	 * 说话气泡
	 * @param thisc 插入的对象
	 */
	public say(content: string, time: number = 5000) {
		this.getBubbles();
		this.bubbles.setData(content, time);
	}

	private getBubbles() {
		if (!this.bubbles || this.bubbles.parent != this) {
			this.bubbles = ObjectPool.get(ThingBubbles);
			this.addChild(this.bubbles);
		}
		this.bubbles.y = -120;
		this.bubbles.x = 0;
	}

	protected removeBubbles() {
		if (this.bubbles) {
			if (this.bubbles.parent == this) {
				this.bubbles.dispose();
			}
			this.bubbles = null;
		}
	}

	/**回收**/
	public dispose(): void {
		this.setOnView(false);
		this.removeBubbles();
		this.pro = null;
		ObjectPool.push(this);
	}
}