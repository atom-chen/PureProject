/**
 * 掉落物
*/
class DropItem extends egret.DisplayObjectContainer implements IThing {

	/**掉落的道具图标 */
	private icon: eui.Image;
	/**掉落打道具名字、数量 */
	//private contentTxt: egret.TextField;
	public packetId: number;
	public cellX: number;
	public cellY: number;
	private pickTime: number;
	public isTrue: boolean;

	public constructor() {
		super();
		this.touchEnabled = this.touchChildren = false;

		this.icon = new eui.Image();
		this.icon.width = 64;
		this.icon.height = 64;
		this.addChild(this.icon);

		// this.contentTxt = new egret.TextField();
		// this.contentTxt.y = 70;
		// this.contentTxt.size = 14;
		// this.contentTxt.stroke = 1;
		// this.addChild(this.contentTxt);

		this.anchorOffsetY = 40;
	}

	/**真实掉落*/
	public initData1(packetId: number, itemId: number, x: number, y: number) {
		this.isTrue = true;
		this.packetId = packetId;
		this.pickTime = App.TimerManager.getSyncTime();

		this.setItem(itemId);
		this.setCellXY(x, y);

		this.icon.alpha = 0;
		this.icon.y = 0;
		this.icon.rotation = 0;
		let t = egret.Tween.get(this.icon).wait(MathUtils.limitInteger(-30, 200)).to({ y: -90, alpha: 1 }, 100).to({ y: 0 }, 100 + MathUtils.limitInteger(50, 100), egret.Ease.backOut);
		this.alpha = 1;
	}

	/**假掉落*/
	public initData2(packetId: number, itemId: number, sx: number, sy: number, ex: number, ey: number) {
		this.isTrue = false;
		this.packetId = packetId;
		this.setItem(itemId);
		this.icon.alpha = 1;
		this.icon.y = 0;
		this.alpha = 1;

		this._startPos.x = (GameCache.map.cellWidth * (sx + 0.5)) >> 0;
		this._startPos.y = ((GameCache.map.cellHeight * (sy + 0.5)) >> 0) - 90;
		this._endPos.x = (GameCache.map.cellWidth * (ex + 0.5)) >> 0;
		this._endPos.y = (GameCache.map.cellHeight * (ey + 0.5)) >> 0;
		this._cuPos.x = (this._startPos.x + this._endPos.x) >> 1;
		this._cuPos.y = this._startPos.y - 80;

		this.icon.rotation = 0;
		this._cuValue = 0;
		this.x = this._startPos.x;
		this.y = this._startPos.y;
		egret.Tween.get(this).to({ factor: 1 }, 300).call(this.factorEnd, this);
		// egret.Tween.get(this.icon, { loop: true })
		// 	.to({ rotation: 360 }, 200).call(this.setIconRotation, this, [0]);
	}

	////////////////////
	//假掉落效果

	private _cuValue: number;
	private _cuPos: XY = new XY();
	private _startPos: XY = new XY();
	private _endPos: XY = new XY();
	public get factor(): number {
		return this._cuValue;
	}

	public set factor(value: number) {
		this._cuValue = value;
		let p1 = 1 - value;
		let a1 = p1 * p1;
		let a2 = value * p1 * 2;
		let a3 = value * value;
		this.x = a1 * this._startPos.x + a2 * this._cuPos.x + a3 * this._endPos.x;
		this.y = a1 * this._startPos.y + a2 * this._cuPos.y + a3 * this._endPos.y;
	}

	private setIconRotation(r) {
		this.icon.rotation = r;
	}

	private factorEnd() {
		egret.Tween.removeTweens(this.icon);
		this.icon.rotation = 0;
		// let hero = GameCache.hero.focusPlayer;
		// egret.Tween.get(this).wait(1000).to({ x: hero.x, y: hero.y, alpha: 0 }, 800, egret.Ease.cubicIn).call(
		// 	App.ThingManager.removeDrop, App.ThingManager, [this.packetId]
		// );
		App.TimerManager.addDelay(1000 + MathUtils.limit(0, 400), 1, 1, this.flyToBag, this);
	}

	private flyToBag() {
		let main = App.ViewManager.getView(ViewConst.MAIN_UI_COCER) as MainUICover;
		let btn = main ? main.getBagBtn() : null;
		if (btn) {
			let layer = LayerManager.UI_Main2;
			let p = this.parent.localToGlobal(this.x, this.y);
			//layer.globalToLocal(p.x, p.y, p);
			layer.addChild(this);
			this.x = p.x;
			this.y = p.y;
			btn.parent.localToGlobal(btn.x, btn.y, p);
			let t = (Math.abs(this.x - p.x) + Math.abs(this.y - p.y));
			egret.Tween.get(this).to({ x: p.x + (btn.width >> 1), y: p.y + (btn.height >> 1) }, t, egret.Ease.cubicOut).call(
				App.ThingManager.removeDrop, App.ThingManager, [this.packetId]
			);
		}
	}
	////////////////////

	private setItem(id: number) {
		let std: StdItem = GameConfig.item[id];
		this.icon.source = RES_DIR_IMAGES_ITEM + std.icon + ".png";
		// this.contentTxt.textFlow = TextFlowUtils.generateTextFlow(ItemUtils.getItemNamewithColor(std));
		// this.contentTxt.x = (64 - this.contentTxt.textWidth) >> 1;
	}

	public setCellXY(x: number, y: number, server: boolean = false): void {
		this.cellX = x;
		this.cellY = y;
		this.x = (GameCache.map.cellWidth * (x + 0.5)) >> 0;
		this.y = (GameCache.map.cellHeight * (y + 0.5)) >> 0;
	}

	public isTouch(mouseX: number, mouseY: number): boolean {
		return (Math.abs(this.x - mouseX) < 40 && this.y - mouseY < 40 && this.y >= mouseY);
	}

	public canPick(): boolean {
		if (!this.isTrue) return false;
		let hero = GameCache.hero.focusPlayer;
		if (hero.cellXY.y != this.cellY) return false;
		if (this.pickTime > App.TimerManager.getSyncTime()) return false;
		return Math.abs(hero.cellXY.x - this.cellX) <= 1;
	}

	public pick() {
		this.pickTime = App.TimerManager.getSyncTime() + 2000;
		Proxy.drop.sendPickupDropItem(this.packetId);
	}

	public dispose() {
		this.factorEnd();
		this.icon.source = null;
		ObjectPool.push(this);
		App.DisplayUtils.removeFromParent(this);
		egret.Tween.removeTweens(this);
		App.TimerManager.removeAll(this);
	}
}