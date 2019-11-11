/*
 * @Description: 公会成员面板
 * @Author: moyusheng
 * @Date: 2019-10-28 20:17:06
 */
class FamilyApplyConfigPanel extends BaseEuiWindow {

	public bg: BaseWinBg;
	public btnSure: eui.Button;
	public chkAuto: eui.CheckBox;
	public labCheck: eui.Label;
	public imgDrop: eui.Image;
	public dropList: eui.List;
	public labSelected: eui.Label;

	private STATE_UP = "up";
	private STATE_DOWN = "down";

	public constructor($parent: egret.DisplayObjectContainer = null) {
		super($parent);
		this.skinName = "FamilyApplyConfigPanelSkin"
	}

	protected init(): void {
		super.init();
		this.bg.setNameImg("family_title_setting");
		this.labCheck.text = Language.lang.familyApplyAuto;
	}

	public open(param: ViewProp): void {
		super.open(param);
		this.currentState = this.STATE_UP;
		this.addTouchEvent(this.imgDrop, this.onDropImgClick);
		this.addTouchEvent(this.dropList, this.onListClick);
		this.addTouchEvent(this.btnSure, this.onBtnSureClick);
		this.dropList.itemRenderer = FamilyDropItem;
		this.updateView();
	}

	public updateView(): void {
		let cfg = GameConfig.familyCfg;
		let con = cfg.condition;
		let limitId = GameCache.family.limitId;
		this.chkAuto.selected = GameCache.family.isAuto;
		this.labSelected.text = StringUtils.substitute(Language.lang.familyApplyCondition, con[limitId || 0]);
		let arr = [];
		for (let i = 0; i < con.length; i++) {
			let c = con[i];
			arr.push({ id: i, sc: c });
		}
		this.setListData(this.dropList, arr);
	}

	private onDropImgClick(e: egret.TouchEvent): void {
		if (this.currentState === this.STATE_UP) {
			this.currentState = this.STATE_DOWN;
		} else {
			this.currentState = this.STATE_UP;
		}
	}

	private onListClick(e: egret.TouchEvent): void {
		let data = e.currentTarget as eui.ListBase;
		let cfg = GameConfig.familyCfg;
		let con = cfg.condition;
		GameCache.family.limitId = data.selectedItem.id;
		this.labSelected.text = StringUtils.substitute(Language.lang.familyApplyCondition, con[data.selectedItem.id]);
		this.currentState = this.STATE_UP;
	}

	private onBtnSureClick(): void {
		Proxy.family.setLimit(this.chkAuto.selected ? 1 : 0, GameCache.family.limitId);
		App.ViewManager.close(this.viewKey);
	}
}