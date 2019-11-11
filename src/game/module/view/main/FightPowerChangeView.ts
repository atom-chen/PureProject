/*
 * @Description: 战力变化效果
 * @Author: guolinsen
 * @Date: 2019-07-31 14:05:19
 * @LastEditTime: 2019-09-03 20:05:39
 */
class FightPowerChangeView extends BaseEuiWindow {

	public fight: FightPowerRoll;
	public change: NumberMC;

	private cur: number;

	public constructor() {
		super(LayerManager.UI_Main2);
		this.skinName = "FightPowerChangeViewSkin";
		this.horizontalCenter = 0;
		this.bottom = 212;
		this.touchEnabled = this.touchChildren = false;
		this.closeDispose = false;
	}

	init(): void {
		super.init();
		this.fight.handler = Handler.create(this, this.rollComplete, null, false);
	}
	open(param: ViewProp) {
		super.open(param);
		this.onShow();
	}

	private onShow() {
		egret.Tween.removeTweens(this);
		egret.Tween.removeTweens(this.change);
		this.change.visible = false;
		this.alpha = 1;

		this.cur = GlobalFun.getTotalPower();
		let old = GameCache.global.oldPower;
		this.fight.playData(old, this.cur);
	}

	private rollComplete() {
		let num = this.cur - GameCache.global.oldPower;
		let str;
		GameCache.global.oldPower = this.cur;
		if (num > 0) {
			this.change.updateType("num_json.pro_zlgreen_");
			str = "+" + num;
		} else {
			this.change.updateType("num_json.pro_zlred_");
			str = num;
		}
		this.change.value = str;
		this.change.visible = true;
		this.change.x = this.fight.x + this.fight.width + 4;
		this.change.y = 48;
		this.change.alpha = 0;
		let cy = this.change.y - this.fight.y;

		egret.Tween.get(this.change)
			.to({ y: this.fight.y, alpha: 1 }, 300)
			.wait(1000)
			.to({ y: this.fight.y - cy, alpha: 0 }, 300)
			.call(this.hide, this);
	}

	private hide() {
		egret.Tween.get(this).to({ alpha: 0 }, 500).call(this.closeView, this);
	}
}