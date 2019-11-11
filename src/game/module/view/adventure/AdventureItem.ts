/*
 * @Description: 冒险系统-单个任务
 * @Author: guolinsen
 * @Date: 2019-08-26 14:00:01
 * @LastEditTime: 2019-10-25 14:57:43
 */
class AdventureItem extends BaseCustComponent {

	public item: BaseCustComponent;
	public nameLab: eui.Label;
	public btn: eui.Button;
	public prize_flag: eui.Image;
	public proLab: eui.Label;


	public constructor() {
		super();
	}

	//用于子类继承
	protected init(): void {
		this.addTouchEvent(this.btn, this.onBtn);
	}

	protected dataChanged(): void {
		super.dataChanged();
		let data = this.data as StdMaoxian;
		let obj = GameCache.adventure.getData(data.item);
		let progress = obj.progress;
		if (GameCache.adventure.isMaxLv()) {
			obj.finish = true;
			obj.prize = true;
		}
		if (obj.finish) progress = data.showval;
		// this.nameLab.textFlow = TextFlowUtils.generateTextFlow(data.dec +
		// 	TextFlowUtils.color(`${progress}/${data.showval}`, ColorUtil.C_GREEN));
		this.nameLab.text = data.dec;
		this.proLab.textColor = obj.finish ? ColorUtil.C_GREEN : ColorUtil.C_RED;
		this.proLab.text = `${progress}/${data.showval}`;
		this.item.data = data.award[0];
		this.prize_flag.visible = obj.prize;
		this.btn.visible = !this.prize_flag.visible;
		this.btn.icon = "res/btn/" + (obj.finish ? "get_2" : "enter") + ".png";
	}

	private onBtn(): void {
		let data = this.data as StdMaoxian;
		let obj = GameCache.adventure.getData(data.item);
		if (obj.finish) {
			Proxy.adventure.sendPrize(data.item);
		} else {
			TextFlowUtils.hrefType(data.mod);
			App.ViewManager.recoredWin(ViewConst.ADVENTURE);
		}
	}
}