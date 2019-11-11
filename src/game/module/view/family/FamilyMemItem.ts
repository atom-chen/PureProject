class FamilyMemItem extends BaseCustComponent {

	public btnQuit: eui.Button;
	public btnKick: eui.Button;
	public btnPro: eui.Button;
	public btnDe: eui.Button;
	public icon: eui.Image;
	public mFlag: eui.Image;
	public mLvl: eui.Label;
	public labName: eui.Label;
	public labScore: eui.Label;
	public labDevote: eui.Label;
	public labState: eui.Label;


	protected childrenCreated(): void {
		super.childrenCreated();
		this.addTouchEvent(this.btnQuit, this.onBtnQuitClick);
		this.addTouchEvent(this.btnKick, this.onBtnKickClick);
		this.addTouchEvent(this.btnPro, this.onBtnProClick);
		this.addTouchEvent(this.btnDe, this.onBtnDeClick);
	}

	private onBtnQuitClick(): void {
		Proxy.family.quitFamilyReq();
	}

	private onBtnKickClick(): void {
		Proxy.family.kickMember((this.data.mInfo as FamilyMemInfo).memId);
	}

	private onBtnProClick(): void {

	}

	private onBtnDeClick(): void {

	}

	protected dataChanged(): void {
		super.dataChanged();
		let mInfo: FamilyMemInfo = this.data.mInfo;
		this.icon.source = GlobalFun.getRoleIcon(mInfo.job, mInfo.sex, 1);
		this.mFlag.source = `family_json.family_mem_flag${mInfo.position}_png`;
		this.mLvl.text = mInfo.lv.toString();
		this.labName.text = StringUtils.substitute(Language.lang.familyMemName, mInfo.memName, mInfo.lv);
		this.labScore.textFlow = TextFlowUtils.generateTextFlow(StringUtils.substitute(Language.lang.familyMemScore, mInfo.score));
		this.labDevote.textFlow = TextFlowUtils.generateTextFlow(StringUtils.substitute(Language.lang.familyMemDevote, mInfo.devote));
		// 显示当前状态
		let stateStr;
		if (mInfo.state === 1) {
			stateStr = Language.lang.familyMemOnline;
		} else {
			let offlineTime = GameCache.server.serverTime - mInfo.lastLogin;
			stateStr = StringUtils.substitute(Language.lang.familyMemOffline, App.DateUtils.getFormatBySecond(offlineTime, DateUtils.TIME_FORMAT_4));
		};
		this.labState.textFlow = TextFlowUtils.generateTextFlow(stateStr);
		// 按钮显示
		let fInfo = GameCache.family.fInfo;
		this.btnDe.visible = this.btnKick.visible = this.btnPro.visible = this.btnQuit.visible = false;
		if (mInfo.memId === GameCache.hero.mainPro.pro(PropId.AP_ACTOR_ID)) {
			this.btnQuit.visible = true;
			return;
		}
		let permits: number[] = GameConfig.familyCfg.privilege[fInfo.position];
		if (this.data.state === FamilyConst.STATE_MEM) {
			// 有踢人的权限
			if (permits.indexOf(FamilyConst.PERMIT_2) && mInfo.position < fInfo.position) {
				this.btnKick.visible = true;
			}
		} else {
			// 有升降职的权限
			if (permits.indexOf(FamilyConst.PERMIT_1) && mInfo.position < fInfo.position) {
				if (mInfo.position === FamilyConst.FAMILY_POS_ELDER) {
					this.btnDe.visible = true;
				} else {
					this.btnPro.visible = true;
				}
			}
		}
	}
}