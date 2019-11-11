class FamilyInfoPanel extends BaseSpriteView {

	public title: eui.Label;
	public icon: eui.Image;
	public leaderName: eui.Label;
	public memNum: eui.Label;
	public money: eui.Label;
	public score: eui.Label;
	public notice: eui.Label;
	public optionList: eui.List;
	public noteceBan: eui.Image;

	public constructor($parent: egret.DisplayObjectContainer = null) {
		super($parent);
		this.skinName = "FamilyInfoPanelSkin";
	}

	protected init(): void {
		super.init();
		this.icon.source = "family_json.family_icon_png";
	}

	public open(param: ViewProp) {
		super.open(param);
		this.message(MsgConst.FAMILY_INFO_UPDATE, this.updateView);
		this.addTouchEvent(this.noteceBan, this.onNoticeClick);
		this.addTouchEvent(this.optionList, this.onListClick);
		this.optionList.itemRenderer = FamilyOption;
		this.updateView();
	}

	private updateView(): void {
		let fInfo = GameCache.family.fInfo;
		if (!fInfo) {
			App.ViewManager.close(ViewConst.FAMILY);
			return;
		}
		this.title.text = StringUtils.substitute(Language.lang.familyTitle, fInfo.fName, fInfo.fLv);
		this.leaderName.textFlow = TextFlowUtils.generateTextFlow(StringUtils.substitute(Language.lang.familyLeaderName, fInfo.lName));
		let lvCfg = GameConfig.familyLv[fInfo.fLv];
		this.memNum.textFlow = TextFlowUtils.generateTextFlow(StringUtils.substitute(Language.lang.familyMemNum, fInfo.memNum, lvCfg.memCountLimit));
		this.money.textFlow = TextFlowUtils.generateTextFlow(StringUtils.substitute(Language.lang.familyFund, fInfo.fund, lvCfg.upLvConsume));
		this.score.textFlow = TextFlowUtils.generateTextFlow(StringUtils.substitute(Language.lang.familyScore, fInfo.fScore));
		this.notice.text = fInfo.notice;
		let familySys = [];
		for (let k in GameConfig.familySys) {
			let sys: StdFamilysys = GameConfig.familySys[k];
			if (sys.open <= fInfo.position) {
				familySys.push(sys);
			}
		}
		this.setListData(this.optionList, familySys);
	}

	private onListClick(e: egret.TouchEvent): void {
		let data: StdFamilysys = (e.currentTarget as eui.ListBase).selectedItem;
		if (GameCache.family.fInfo && GameCache.family.fInfo.position >= data.open) {
			TextFlowUtils.hrefType(data.jump);
		}
	}

	private onNoticeClick(): void {
		App.ViewManager.open(ViewConst.FAMILY_NOTICE);
	}
}