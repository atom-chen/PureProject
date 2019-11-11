/*
 * @Description: 冒险系统
 * @Author: guolinsen
 * @Date: 2019-08-26 11:02:19
 * @LastEditTime: 2019-10-25 15:47:38
 */
class AdventurePanel extends BaseSpriteView {
	public list: eui.List;
	public pro: eui.ProgressBar;
	public role: eui.Group;
	public roleAddImg: eui.Image;
	public roleTextImg: eui.Image;
	public roleLockImg: eui.Image;
	public item: eui.Group;
	public itemPrize: ItemBase;
	public itemAddImg: eui.Image;
	public banner: eui.Image;

	private mc: MovieClip;

	public constructor() {
		super();
		this.skinName = "AdventurePanelSkin";
	}

	/**界面整个界面的红点 */
	static red() {
		return GameCache.adventure.topFinish;
	}


	/**需要刷新是红点消息列表 */
	static changeMsg() {
		return [MsgConst.ADVENTURE_UPDATE_SINGLE,MsgConst.ADVENTURE_UPDATE_LV];
	}

	protected init() {
		this.list.itemRenderer = AdventureItem;
	}

	public open() {
		super.open();

		this.addTouchEvent(this.itemAddImg, this.onAct);
		this.addTouchEvent(this.roleAddImg, this.onAct);

		this.message(MsgConst.ADVENTURE_UPDATE_LV, this.onUpdateLv);
		this.message(MsgConst.ADVENTURE_UPDATE_SINGLE, this.onUpdateLv);
		this.onUpdateLv();
	}

	private onAct() {
		if (GameCache.adventure.isMaxLv()) {
			GlobalFun.SysMsg(Language.lang.adventrueMaxLv);
			return;
		}
		if (!GameCache.adventure.topAward) return;
		if (GameCache.adventure.topAward.type == AwardType.CREATE_HERO) {
			App.ViewManager.open(ViewConst.CREATE_HERO);
		} else {
			Proxy.adventure.sendPrize(0);
		}
	}

	private onUpdateLv() {
		this.updateTop();
		this.flushFun(this.onUpdate, true);
	}

	private updateTop() {
		let award = GameCache.adventure.topAward;
		let isRole = GameCache.adventure.topAward.type == AwardType.CREATE_HERO;
		this.role.visible = isRole;
		this.item.visible = !isRole;
		let finish = GameCache.adventure.taskList.length == GameCache.adventure.topProgress;
		let eff = false;
		if (isRole) {
			this.roleAddImg.visible = finish;
			this.roleLockImg.visible = !finish;
			eff = finish;
			this.roleTextImg.source = `adventure_json.adventureRole${GameCache.hero.list.length}_png`;
		} else {
			this.itemPrize.data = award;
		}
		if (eff) this.showEff();
		else this.hideEff();

		this.banner.source = `${RES_DIR_ADVENTURE}${GameCache.adventure.banner}.png`;
	}

	private showEff() {
		if (!this.mc) {
			let mc = App.DisplayUtils.addEffectToObj(this, "maoxian_zhaomu_0_1", -1, 436, 96);
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

	private onUpdate() {
		this.setListData(this.list, GameCache.adventure.taskList);
		this.pro.maximum = GameCache.adventure.taskList.length;
		this.pro.value = GameCache.adventure.topProgress;
	}
}