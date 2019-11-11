class FamilyListItem extends BaseCustComponent {
	public fName: eui.Label;
	public limit: eui.Label;
	public memNum: eui.Label;
	public score: eui.Label;
	public btnApply: eui.Button;

	protected childrenCreated(): void {
		super.childrenCreated();
		this.addTouchEvent(this.btnApply, this.onBtnApplyClick);
	}

	protected dataChanged(): void {
		super.dataChanged();
		this.btnApply.visible = !GameCache.family.isInFamily;
		let data = this.data as FamilyListInfo;
		this.fName.text = StringUtils.substitute(Language.lang.familyName, data.fName, data.fLv);
		let limitScore = GameConfig.familyCfg.condition[data.limitId];
		let limitStr = limitScore > 0 ? StringUtils.substitute(Language.lang.familyLimitScore, limitScore) : Language.lang.familyNoLimit;
		this.limit.textFlow = TextFlowUtils.generateTextFlow(StringUtils.substitute(Language.lang.familyLimit, limitStr));
		this.memNum.textFlow = TextFlowUtils.generateTextFlow(StringUtils.substitute(Language.lang.familyNum, data.memNum, data.memMax));
		this.score.textFlow = TextFlowUtils.generateTextFlow(StringUtils.substitute(Language.lang.familyScore, data.fScore));
	}

	private onBtnApplyClick(): void {
		Proxy.family.familyApplyReq((this.data as FamilyListInfo).fId);
		App.ViewManager.close(ViewConst.FAMILY_LIST);
	}

}