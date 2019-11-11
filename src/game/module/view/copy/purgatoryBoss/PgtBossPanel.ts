/*
 * @Description: 炼狱boss
 * @Author: moyusheng
 * @Date: 2019-10-21 16:14:50
 */
class PgtBossPanel extends BaseSpriteView {

	public constructor($parent: egret.DisplayObjectContainer = null) {
		super($parent);
		this.skinName = "PgtBossPanelSkin"
	}

	public imgCost: eui.Image;
	public labCount: eui.Label;
	public labTime: eui.Label;
	public labName: eui.Label;
	public labCost: eui.Label;
	public addBtn: eui.Button;
	public awdList: eui.List;
	public bossList: eui.List;
	public btnChallenge: eui.Button;
	public tab: eui.TabBar;
	public boss: UIAvatar;
	public power: NumberMC;
	public hpBar: eui.ProgressBar;
	public labBossCd: eui.Label;
	public labHp: eui.Label;
	public labLock: eui.Label;

	// 当前选中的bossid
	private entityId: number;
	private item: { type, id, count };
	private isLock: boolean = false;

	public init() {
		super.init();
		// 分页图标
		let pageNames = [];
		for (let i = 1; i <= GameCache.pgtBoss.maxPage; i++) {
			pageNames.push({ icon: `${RES_DIR_PAGEICON}pgt_boss_tab_${i}.png` });
		}
		// 控制分割线的显示
		for (let i = 1; i < 5; i++) {
			let line = this[`line${i}`] as eui.Image;
			line.visible = i < GameCache.pgtBoss.maxPage;
		}
		this.tab.dataProvider = new eui.ArrayCollection(pageNames);
		this.power.alignV = "mid";
		this.power.gap = 21;
		this.hpBar.labelDisplay.visible = false;
	}

	public open(param: ViewProp = null) {
		super.open(param);
		this.message(MsgConst.PURGATORY_BOSS_UPDATE, this.initPanel);
		this.message(MsgConst.BAG_ITEM_NUM, this.initPanel);
		// Proxy.boss.pgtBossInfoReq();
		this.addTouchEvent(this.btnChallenge, this.onBtnChallengeClick);
		this.addTouchEvent(this.addBtn, this.onBtnAddClick);
		this.addTouchEvent(this.imgCost, this.onCostTouch);
		this.addEvent(egret.TouchEvent.CHANGE, this.bossList, this.onListClick);
		this.addEvent(egret.TouchEvent.CHANGE, this.tab, this.onTabChanged);
		this.awdList.itemRenderer = ItemBase;
		this.bossList.itemRenderer = PgtBossItem;
		this.tab.selectedIndex = 0;
		this.initPanel();
	}

	private initPanel(): void {
		this.updatePgtInfo();
		let entityIds = GameCache.pgtBoss.pgtBossPage[this.page];
		if (!entityIds || entityIds.length == 0) return;
		this.entityId = entityIds[0];
		this.setListData(this.bossList, entityIds.concat([]));
		this.bossList.scrollV = 0;
		this.updateBossInfo();
	}

	public updateBossInfo(): void {
		let cfg: StdPurgatoryboss = GameConfig.purgatoryBoss[this.entityId];
		let mstCfg: StdMonster = GameConfig.monster[cfg.entityid];
		this.boss.showMonster(mstCfg.modelid);
		this.boss.scaleY = this.boss.scaleX = 0.7;
		let data = GameCache.pgtBoss.pgtBossMap[this.entityId];
		this.labName.text = mstCfg.name;
		this.power.value = cfg.power;
		this.hpBar.maximum = 100;
		this.hpBar.value = data.hp;
		this.labHp.text = `${data.hp}%`;
		let [{type, id, count}] = cfg.consume;
		this.item = { type, id, count };
		let itemCfg: StdItem = GameConfig.item[id];
		this.imgCost.source = `${RES_DIR_IMAGES_ITEM}${itemCfg.icon}.png`;
		let itemCount = GameCache.bag.itemCount(id);
		let costColor = itemCount >= count ? "c0xffc600" : "c0xff0000";
		let str = StringUtils.substitute(Language.lang.pgtBossCost, count, costColor, itemCount);
		this.labCost.textFlow = TextFlowUtils.generateTextFlow(str);
		this.setListData(this.awdList, cfg.reward_show);
		//判断是否解锁
		this.isLock = false;
		let lastCfg = GameCache.pgtBoss.getPgtBossCfg(cfg.difficulty - 1, cfg.level);
		if (lastCfg) {
			let lastData = GameCache.pgtBoss.pgtBossMap[lastCfg.entityid];
			this.isLock = lastData.complete == 0;
		}
		let cd = this.getCd(data);
		this.labLock.visible = false;
		if (cd > 0) {
			let cdStr = cd > 0 ? App.DateUtils.getFormatBySecond(cd) : "00:00:00";
			this.labBossCd.text = StringUtils.substitute(Language.lang.pgtBossCd, cdStr);
			// 隐藏挑战按钮，消耗等信息
			this.imgCost.visible = this.labCost.visible = this.btnChallenge.visible = false;
			this.labBossCd.visible = true;
			if (!App.TimerManager.isExists(this.timeCount, this))
				App.TimerManager.addDelay(0, 1000, 0, this.timeCount, this);
		} else {
			this.labBossCd.text = null;
			this.btnChallenge.visible = true;
			this.labBossCd.visible = false;
			// boss是否解锁
			this.btnChallenge.enabled = this.imgCost.visible = this.labCost.visible = !this.isLock;
			this.labLock.visible = this.isLock;
			this.labLock.text = Language.lang.pgtBossLock;
			this.btnChallenge.filters = this.isLock ? FilterUtils.DefaultGrayFilters : null;
		}
	}


	private updatePgtInfo(): void {
		if (!App.TimerManager.isExists(this.timeCount, this))
			App.TimerManager.addDelay(0, 1000, 0, this.timeCount, this);
		this.labCount.text = StringUtils.substitute(Language.lang.pgtBossChallenge, GameCache.pgtBoss.pgtChallenge, GameConfig.globalConfig.PurgatoryChallenge);
		this.labTime.text = StringUtils.substitute(Language.lang.pgtBossRefreshTime, App.DateUtils.getFormatBySecond(this.getRefreshTime()));
	}

	private timeCount(): void {
		let data = GameCache.pgtBoss.pgtBossMap[this.entityId];
		let cd = this.getCd(data);
		if (cd > 0) {
			let cdStr = App.DateUtils.getFormatBySecond(cd);
			this.labBossCd.text = StringUtils.substitute(Language.lang.pgtBossCd, cdStr);
		} else {
			this.labBossCd.text = null;
		}
		let refreshTime = this.getRefreshTime();
		this.labTime.text = StringUtils.substitute(Language.lang.pgtBossRefreshTime, refreshTime > 0 ? App.DateUtils.getFormatBySecond(refreshTime) : "00:00:00");
	}

	private onCostTouch(): void {
		if (!this.item) {
			return;
		}
		GlobalFun.openItemTips(this.item.id);
	}

	private onTabChanged(e: egret.TouchEvent): void {
		this.initPanel();
	}

	private onListClick(e: egret.TouchEvent): void {
		this.entityId = (e.target as eui.List).selectedItem;
		// 刷新
		this.updateBossInfo();
	}

	/**挑战 */
	private onBtnChallengeClick(): void {
		GameCache.pgtBoss.currentBossId = this.entityId;
		let cfg: StdPurgatoryboss = GameConfig.purgatoryBoss[this.entityId];
		if (GameCache.hero.mainPro.pro(PropId.AP_LEVEL) < cfg.level) {
			GlobalFun.SysMsg(Language.lang.roleLevelLack);
			return;
		}
		let itemCount = GameCache.bag.itemCount(this.item.id);
		if (itemCount < this.item.count) {
			if (this.item.id == GlobalVar.GOLD) {
				GlobalFun.gotoCharge();
			} else {
				GlobalFun.openItemTips(this.item.id);
			}
			return;
		}
		if (GameCache.pgtBoss.pgtChallenge == 0) {
			GlobalFun.openEnterBuy("pgtboss");
			return;
		}
		Proxy.boss.sendBossFubenOpt(1, this.entityId);
		App.ViewManager.close(ViewConst.COPY);
	}

	/** 购买次数 */
	private onBtnAddClick(): void {
		GlobalFun.openEnterBuy("pgtboss");
	}

	/**
	 * 获取boss复活cd（秒）
	 * @param  {PgtBossData} data
	 * @returns number
	 */
	private getCd(data: PgtBossData): number {
		if (!data) return 0;
		let delta = data.cd - GameCache.server.serverTime;
		// let remain = cfg.time * 1000 - delta;
		return delta <= 0 ? 0 : delta / 1000;
	}

	/**
	 * 获取刷新时间（秒）
	 * @returns number
	 */
	private getRefreshTime(): number {
		if (!GameCache.pgtBoss.pgtRefresh) return 0;
		let delta = GameCache.pgtBoss.pgtRefresh - GameCache.server.serverTime;
		return delta <= 0 ? 0 : delta / 1000;
	}

	public close(): void {
		super.close();
		this.awdList.itemRenderer = null;
		this.bossList.itemRenderer = null;
		App.TimerManager.remove(this.timeCount, this);
	}

	// (分页)
	private get page(): number {
		return this.tab.selectedIndex + 1;
	}

}