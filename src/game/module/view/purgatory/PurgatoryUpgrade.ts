class PurgatoryUpgrade extends BaseEuiWindow {

	public bg: BaseWinBg;
	public imgUp: eui.Image;
	public title: eui.Image;
	public btnUp: eui.Button;
	public item3: EquipItem;
	public item0: EquipItem;
	public item1: EquipItem;
	public item2: EquipItem;
	public eqName: eui.Label;
	public num0: eui.Label;
	public num1: eui.Label;
	public num2: eui.Label;

	private cfgFrom: StdEquippurgatory;
	private cfgTo: StdEquippurgatory;
	private bagCount1: number = 0;
	private bagCount2: number = 0;
	private roleIdx: number;

	public constructor() {
		super(LayerManager.UI_Tips);
		this.skinName = "PurgatoryUpgradeSkin";
	}

	public open(param: ViewProp): void {
		super.open();
		this.message(MsgConst.BAG_ITEM_NUM, this.initData);
		this.addTouchEvent(this.btnUp, this.onBtnUpgrageClick);
		this.roleIdx = Number(param.exData1["roleIdx"]);
		this.cfgFrom = param.exData1["cfgFrom"];
		this.cfgTo = param.exData1["cfgTo"];
		// 没有装备信息代表是激活
		if (!this.cfgFrom) {
			this.currentState = "s0";
			this.title.source = "purgatory_json.purgatory_lab_active_png";
		} else {
			this.currentState = "s1";
			this.title.source = "purgatory_json.purgatory_lab_upgrade_png";
		}
		this.initData();
	}

	private initData(): void {
		this.eqName.text = this.cfgTo.name;
		let job = GameCache.hero.mainPro.pro(PropId.AP_JOB);
		let icon = this.cfgTo.icon[job - 1];
		icon || (icon = this.cfgTo.icon[0]);
		this.item3.setIconImg(`${RES_DIR_PURGATORY_ICON}${icon}.png`);
		this.bagCount1 = GameCache.bag.itemCount(this.cfgTo.cost1.id);
		let itemCfg1 = GameConfig.item[this.cfgTo.cost1.id] as StdItem;
		this.item0.data = itemCfg1;
		let color = this.bagCount1 >= this.cfgTo.cost1.count ? "c0xffffff" : "c0xff0000";
		this.num0.textFlow = TextFlowUtils.generateTextFlow(StringUtils.substitute(Language.lang.purgatoryItemNum, this.bagCount1, this.cfgTo.cost1.count, color));

		this.bagCount2 = GameCache.bag.itemCount(this.cfgTo.cost2.id);
		let itemCfg2 = GameConfig.item[this.cfgTo.cost2.id] as StdItem;
		this.item2.data = itemCfg2;
		color = this.bagCount2 >= this.cfgTo.cost2.count ? "c0xffffff" : "c0xff0000";
		this.num2.textFlow = TextFlowUtils.generateTextFlow(StringUtils.substitute(Language.lang.purgatoryItemNum, this.bagCount2, this.cfgTo.cost2.count, color));

		if (this.cfgFrom) {
			icon = this.cfgTo.icon[job - 1];
			icon || (icon = this.cfgFrom.icon[0]);
			this.item1.setIconImg(`${RES_DIR_PURGATORY_ICON}${icon}.png`);
			this.num1.textFlow = TextFlowUtils.generateTextFlow(StringUtils.substitute(Language.lang.purgatoryItemNum, 1, 1, "c0xffffff"));
		}
	}

	/**
	 * 升级
	 * @returns void
	 */
	private onBtnUpgrageClick(): void {
		if (this.bagCount1 >= this.cfgTo.cost1.count && this.bagCount2 >= this.cfgTo.cost2.count) {
			Proxy.purgatory.upgradeReq(this.roleIdx, this.cfgTo.type, this.cfgTo.level, this.cfgTo.cost1.id, this.cfgTo.cost2.id);
			App.ViewManager.close(ViewConst.PURGATORY_UPGRADE);
		}
	}

}