/*
 * @Description: 新手指引箭头
 * @Author: guolinsen
 * @Date: 2019-10-09 10:47:52
 */
class NoviceGuideArrow extends BaseCustComponent {
	public text: eui.Label;
	public constructor() {
		super();
		this.skinName = "NoviceGuideArrowSkin";
	}
	setData(text: string, dir: number) {
		this.text.text = text;
		this.currentState = dir == 1 ? "r" : "l";
		if (dir == 1) {
			this.currentState = "r";
			this.x = -241;
		} else {
			this.currentState = "l";
			this.x = 40;
		}
		this.y = -90;
	}
}