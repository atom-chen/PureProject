/**
 * 动态实物层
*/
class BaseMapThingLayer extends egret.DisplayObjectContainer implements ICamera {
	public constructor() {
		super();

		this.touchEnabled = this.touchChildren = false;
	}

	public getClickTarget(mouseX: number, mouseY: number): any {
		let list: egret.DisplayObject[] = this.$children;
		let len: number = list.length;
		let i: number = len - 1;
		let thing: any;
		for (; i >= 0; i--) {
			thing = list[i];
			if (thing["isTouch"]) {
				if (thing["isTouch"](mouseX, mouseY)) {
					return thing;
				}
			}
		}
		return null;
	}
	/**
	 * 镜头左上角坐标
	*/
	moveTo(tx, ty, perX, perY) {
		this.x = tx;
		this.y = ty;
	}
}