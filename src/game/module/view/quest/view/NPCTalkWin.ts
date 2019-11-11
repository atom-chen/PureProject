/**
 * npc对话框
*/
class NPCTalkWin extends BaseEuiWindow {

	public labTalk: eui.Label;
	public closeBtn: eui.Image;
	public submitBtn: eui.Image;
	public iG: eui.Group;
	public npcName: eui.Image;
	public npcBody: eui.Image;

	private recog: number;
	private npcId: number;
	private itemList: ItemList;
	private bubbles: ThingBubbles;

	public constructor() {
		super(LayerManager.UI_Main2);
		this.skinName = "NPCTalkWinSkin";

		this.horizontalCenter = 0;
		this.verticalCenter = 0;
	}

	public open(param: ViewProp = null) {
		super.open();
		this.recog = param.exData1;
		this.npcId = param.exData2;

		this.bubbles = ObjectPool.get(ThingBubbles);
		this.addChild(this.bubbles);

		this.message(MsgConst.QUEST_REFRESH_MAIN, this.update);
		this.addTouchEvent(this.submitBtn, this.submit);
		this.update();
	}

	public close() {
		super.close();
		this.bubbles.dispose();
		this.bubbles = null;
	}

	public dispose() {
		this.itemList.dispose();
		super.dispose();
	}

	private update() {
		let questId = GameCache.quest.questId;
		if (questId >= 0 && GameCache.quest.npcId != this.npcId) {
			questId = -1;
		}
		let con = GameConfig.npc[this.npcId];
		let talk = con["talk"][MathUtils.limitInteger(0, con["talk"].length)];
		this.submitBtn.visible = questId >= 0;
		if (questId >= 0) {
			let std: StdQuest = GameConfig.quest[questId];
			this.labTalk.text = std.npcTalk;
			this.setAward(std);
		} else {
			this.labTalk.text = talk;
			this.setAward(null);
		}

		this.npcBody.source = RES_DIR_NPC_BODY + con["modelid"] + ".png";
		this.npcBody.x = con["offx"] + 126;
		this.npcBody.y = con["offy"] + 294;

		this.bubbles.setData(talk, 0);
		this.bubbles.y = this.npcBody.y - 10;
		this.bubbles.x = this.npcBody.x + 24;

		this.npcName.source = RES_DIR_NPC_BODY + this.npcId + "n.png";
	}

	private submit() {
		Proxy.quest.sendSumitQuest();
		this.closeView();
	}


	private setAward(std: StdQuest): void {
		if (std && std.awards) {
			if (!this.itemList) {
				this.itemList = ObjectPool.get(ItemList);
			}
			this.itemList.setData(std.awards, this.iG);
		}else{
			this.itemList.dispose();
		}
	}

}