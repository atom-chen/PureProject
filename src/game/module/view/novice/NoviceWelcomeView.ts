/*
 * @Description: 欢迎界面
 * @Author: guolinsen
 * @Date: 2019-09-23 15:22:53
 */
class NoviceWelcomeView extends BaseEuiWindow {
	public constructor() {
		super();
	}

	open() {
		super.open();
		this.addTouchEvent(this, this.onTouch);
	}

	onTouch() {
		this.closeView();
	}

	close() {
		super.close();
		GameCache.quest.autoQuest();
	}
}