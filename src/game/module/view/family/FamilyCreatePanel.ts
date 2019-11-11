class FamilyCreatePanel extends BaseEuiWindow {

	public bg: BaseWinBg;
	public btnSure: eui.Button;
	public labDesc: eui.Label;
	public imgDrop: eui.Image;
	public labCost: eui.Label;
	public cost: ItemExpend;
	public input: eui.EditableText;

	public constructor($parent: egret.DisplayObjectContainer = null) {
		super($parent);
		this.skinName = "FamilyCreatePanelSkin"
	}

	public open(param: ViewProp): void {
		super.open(param);
		this.addTouchEvent(this.btnSure, this.onBtnSureClick);
		this.updateView();
	}

	protected init(): void {
		super.init();
		this.bg.setNameImg("family_title_create");
		this.labCost.text = Language.lang.consume;
	}

	private updateView(): void {
		let cfg = GameConfig.familyCfg;
		this.labDesc.text = StringUtils.substitute(Language.lang.familyCreateLimit, cfg.createMinVipLevel);
		this.cost.item = GlobalVar.GOLD;
		this.cost.countTxt.textFlow = TextFlowUtils.generateTextFlow(StringUtils.substitute(Language.lang.familyCreateCost, cfg.needYbCount));
	}

	private onBtnSureClick(): void {
		let vip = GameCache.hero.mainPro.pro(PropId.AP_VIP_GRADE);
		if (vip < GameConfig.familyCfg.createMinVipLevel) {
			GlobalFun.SysMsg(Language.lang.familyCreateVIPLack);
			return;
		}
		Proxy.family.createFamilyReq(this.input.text);
		App.ViewManager.close(this.viewKey);
	}

	public close(): void {
		super.close();
	}
}