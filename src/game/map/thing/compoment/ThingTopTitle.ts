/*
 * @Description: 头上血条显示
 * @Author: guolinsen
 * @Date: 2019-09-02 14:55:01
 * @LastEditTime: 2019-09-12 14:27:14
 */
class ThingTopTitle extends egret.DisplayObjectContainer {

	private hpProBg: egret.Bitmap;
	private hpPro: egret.Bitmap;
	private hpTx: NumberMC;

	public constructor() {
		super();
		this.touchEnabled = this.touchChildren = false;

		this.hpProBg = new egret.Bitmap();
		this.hpProBg.texture = RES.getRes("zjm_json.zjm_progressbg_png");
		this.addChild(this.hpProBg);

		this.hpPro = new egret.Bitmap();
		this.hpPro.x = 1;
		this.hpPro.y = 1;
		this.hpPro.texture = RES.getRes("zjm_json.zjm_redprogress_png");
		this.addChild(this.hpPro);
		this.hpPro.scale9Grid = new egret.Rectangle(3, 1, 72, 8);

		this.anchorOffsetX = 39;
	}

	public setHpType(type = 0) {
		this.hpPro.texture = RES.getRes((!type) ? "zjm_json.zjm_redprogress_png" : "zjm_json.zjm_greenprogress_png");
	}

	public setHp(cur: number, max: number, showNum: boolean = false) {
		if (showNum) {
			if (!this.hpTx) {
				this.hpTx = new NumberMC();
				this.hpTx.type = "zjm_json.zjm_red_";
				this.hpTx.y = -18;
				this.addChild(this.hpTx);
			}
			this.hpTx.value = cur;
			this.hpTx.x = (this.width - this.hpTx.width) >> 1;
		} else {
			if (this.hpTx) {
				this.hpTx.dispose();
				App.DisplayUtils.removeFromParent(this.hpTx);
				this.hpTx = null;
			}
		}
		let rate = cur / max;
		rate > 1 && (rate = 1);
		this.hpPro.width = rate * 78;
	}

	public dispose() {
		ObjectPool.push(this);
	}
}