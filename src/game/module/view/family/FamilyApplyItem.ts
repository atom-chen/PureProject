class FamilyApplyItem extends BaseCustComponent {

	public btnAgree: eui.Button;
	public btnSubject: eui.Button;
	public icon: eui.Image;
	public mLvl: eui.Label;
	public labName: eui.Label;
	public labLv: eui.Label;
	public labScore: eui.Label;

	protected childrenCreated(): void {
		super.childrenCreated();
		this.addEvent(egret.TextEvent.LINK, this.labName, this.onLink);
		this.addTouchEvent(this.btnAgree, this.onBtnAgreeClick);
		this.addTouchEvent(this.btnSubject, this.onBtnSubjectClick);
	}

	private onBtnSubjectClick(): void {
		let data = this.data as FamilyApplyInfo;
		Proxy.family.familyApplyResponse(false, data.aid)
	}

	private onBtnAgreeClick(): void {
		let data = this.data as FamilyApplyInfo;
		Proxy.family.familyApplyResponse(true, data.aid)
	}

	protected dataChanged(): void {
		super.dataChanged();
		let data = this.data as FamilyApplyInfo;
		this.icon.source = GlobalFun.getRoleIcon(data.job, data.sex);
		this.mLvl.text = data.lv.toString();
		this.labName.textFlow = TextFlowUtils.generateTextFlow(StringUtils.substitute(Language.lang.roleNameLinke, data.aid, data.name));
		this.labLv.textFlow = TextFlowUtils.generateTextFlow(StringUtils.substitute(Language.lang.familyMemLv, data.lv));
		this.labScore.textFlow = TextFlowUtils.generateTextFlow(StringUtils.substitute(Language.lang.familyMemScore, data.score));
	}

	private onLink(e: egret.TextEvent): void {
		let text = e.text;
		TextFlowUtils.hrefType(text);
	}

}