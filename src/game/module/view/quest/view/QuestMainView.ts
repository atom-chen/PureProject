/**
 * 主界面上的任务面板
*/
class QuestMainView extends BaseEuiWindow {

	public labTitle: eui.Label;
	public labDes: eui.Label;
	public progress: eui.Label;
	public titleGroup: eui.Group;
	private mc: MovieClip;
	public imgRect: eui.Image;

	public constructor() {
		super(LayerManager.UI_Main);
		this.skinName = "QuestMainViewSkin";

		this.left = 12;
		this.bottom = 210;

		this.touchChildren = false;
		this.touchEnabled = true;
	}
	protected init(): void {
		super.init();
	}

	public open(param: ViewProp = null) {
		super.open();

		this.message(MsgConst.QUEST_REFRESH_MAIN, this.onUpdate);
		this.message(MsgConst.ENTER_SCENE, this.visitToggle);
		this.addTouchEvent(this, this.onTouch);
		this.onUpdate();
	}

	private onTouch() {
		GameCache.quest.autoQuest();
	}

	private onUpdate() {
		let id = GameCache.quest.questId;
		if (id >= 0) {
			let std: StdQuest = GameConfig.quest[id];
			let title = std.name;
			let prog: string = "";
			if (GameCache.quest.state == 2) {
				prog = "<(c0x36ff00)（完成）>";
				this.showEff();
			} else {
				let curValue = GameCache.quest.progress;
				let count = std.target.count;
				if(std.target.type == TaskTargetType.enTask_ChkToLvl){
					curValue --;
					count --;
				}
				prog = `<(c0xff0000)（${curValue}/${count}）>`;
				this.hideEff();
			}
			this.labTitle.textFlow = TextFlowUtils.generateTextFlow(title + prog);
			this.labDes.textFlow = TextFlowUtils.generateTextFlow(std.content);
			//this.progress.textFlow = TextFlowUtils.generateTextFlow(prog);

			//this.imgRect.width = this.labTitle.textWidth + 8;
			//this.progress.x = this.imgRect.x + this.imgRect.width + 6;
		} else {
			this.closeView();
		}
	}

	private showEff() {
		if (!this.mc) {
			let mc = App.DisplayUtils.addEffectToObj(this, "newquest_0_1", -1, 120, 33);
			this.mc = mc;
		}
		this.mc.play(-1);
		this.mc.visible = true;
	}

	private hideEff() {
		if (this.mc) {
			this.mc.visible = false;
			this.mc.stop();
		}
	}

	private visitToggle() {
		this.visible = GameCache.map.mapConfig.task == 1 ? true : false;
	}
}