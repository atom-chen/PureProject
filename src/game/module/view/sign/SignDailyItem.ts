/*
 * @Description: 每日签到奖励
 * @Author: guolinsen
 * @Date: 2019-09-10 14:15:25
 * @LastEditTime: 2019-09-11 23:09:13
 */
class SignDailyItem extends BaseCustComponent {

	public item: ItemBase;
	public canSign: eui.Image;
	public finish1: eui.Image;
	public finish2: eui.Image;
	public indexTx: eui.Label;

	public constructor() {
		super();
	}
	//用于子类继承
	protected init(): void {
		this.item.setBgImg(null);
	}
	protected dataChanged(): void {
		super.dataChanged();
		let data: StdDailysign = this.data as StdDailysign;
		this.indexTx.text = data.id + "";
		this.item.data = data.reward[0];
		let finish = GameCache.sign.signCounts >= data.id;
		this.removeTouch();
		if (finish) {
			this.finish1.visible = this.finish2.visible = true;
			this.canSign.visible = false;
		} else {
			this.finish1.visible = this.finish2.visible = false;
			this.canSign.visible = GameCache.sign.signCounts + GameCache.sign.canSign >= data.id;
			this.canSign.visible && this.addTouch();
		}
	}
	private addTouch() {
		this.item.enabled = false;
		this.addTouchEvent(this, this.onTouch);
	}
	private removeTouch() {
		this.item.enabled = true;
		this.removeAllEvent();
	}
	private onTouch() {
		Proxy.sign.sendPrize(this.data.id);
	}
}