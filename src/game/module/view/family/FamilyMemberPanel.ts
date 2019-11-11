/*
 * @Description: 公会成员面板
 * @Author: moyusheng
 * @Date: 2019-10-28 20:17:06
 */
class FamilyMemberPanel extends BaseSpriteView {

	public list: eui.List;
	public btnSetting: eui.Button;
	public btnCheck: eui.Button;
	public btnPosition: eui.Button;
	public btnMem: eui.Button;

	private curState: string;

	public constructor($parent: egret.DisplayObjectContainer = null) {
		super($parent);
		this.skinName = "FamilyMemberPanelSkin"
	}

	public open(param: ViewProp): void {
		super.open(param);
		this.message(MsgConst.FAMILY_MEM_UPDATE, this.updateView);
		Proxy.family.familyMemInfoReq();
		this.curState = this.currentState = FamilyConst.STATE_MEM;
		this.addTouchEvent(this.btnSetting, this.onBtnSettingClick);
		this.addTouchEvent(this.btnCheck, this.onBtnApplyClick);
		this.addTouchEvent(this.btnPosition, this.onBtnPosClick);
		this.addTouchEvent(this.btnMem, this.onBtnMemClick);
		this.list.itemRenderer = FamilyMemItem;
	}

	private updateView(): void {
		let listData = [];
		for (let i in GameCache.family.mList) {
			let mInfo = GameCache.family.mList[i];
			listData.push({ state: this.currentState, mInfo: mInfo });
		}
		this.setListData(this.list, listData);
	}

	private onBtnSettingClick(): void {
		let permit: number[] = GameConfig.familyCfg.privilege[GameCache.family.fInfo.position];
		if (permit.indexOf(FamilyConst.PERMIT_5) == -1) {
			GlobalFun.SysMsg(Language.lang.familyNoPermit);
			return;
		}
		App.ViewManager.open(ViewConst.FAMILY_SETTING);
	}

	private onBtnApplyClick(): void {
		let param = new ViewProp();
		param.winTitle = "family_title_apply";
		App.ViewManager.open(ViewConst.FAMILY_APPLY);
	}

	private onBtnPosClick(): void {
		if (this.curState === FamilyConst.STATE_POS) {
			return;
		}
		this.curState = this.currentState = FamilyConst.STATE_POS;
		this.updateView();
	}

	private onBtnMemClick(): void {
		if (this.curState === FamilyConst.STATE_MEM) {
			return;
		}
		this.curState = this.currentState = FamilyConst.STATE_MEM;
		this.updateView();
	}
}