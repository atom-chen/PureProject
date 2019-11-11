/*
 * @Description: 炼狱boss
 * @Author: moyusheng
 * @Date: 2019-10-22 16:15:00
 */
declare type PgtBossData = { bossid: number, hp: number, cd: number, complete: number };
class PgtBossCache extends BaseCache {

	public pgtBossMap: { [k: number]: PgtBossData }; // 炼狱boss数据
	public pgtBossPage: { [p: number]: number[] }; // 分页：副本id数组
	public pgtChallenge: number; // 挑战次数
	public pgtBuy: number; // 购买次数
	public pgtRefresh: number; // 刷新时间
	public currentBossId: number;

	private pgtMaxPage: number;

	private fbId2bossId: {};

	private pgtBossCfgMap: { [k: number]: { [k2: number]: StdPurgatoryboss } };

	public constructor() {
		super();
		this.pgtBossMap = {};
		this.pgtBossPage = {};
		this.pgtChallenge = 0;
		this.pgtBuy = 0;
		this.pgtRefresh = 0;
		this.pgtMaxPage = 0;
		this.fbId2bossId = {};
	}

	clear(): void {
		super.clear();
		this.pgtBossMap = {};
		this.pgtBossPage = {};
		this.pgtChallenge = 0;
		this.pgtBuy = 0;
		this.pgtRefresh = 0;
		this.pgtMaxPage = 0;
		this.pgtBossCfgMap = null;
		this.fbId2bossId = {};
	}

	/**
	 * 更新炼狱boss信息
	 * @param  {{bossId:number} datas
	 * @param  {number} hp
	 * @param  {number}[]} lastKill
	 * @returns void
	 */
	public updatePgtBossData(info: PgtBossData[]): void {
		if (!info) return;
		for (let k in info) {
			let data = info[k];
			let cfg: StdPurgatoryboss = GameConfig.purgatoryBoss[data.bossid];
			this.pgtBossMap[data.bossid] = data;
			if (!this.pgtBossPage[cfg.page]) {
				this.pgtBossPage[cfg.page] = [];
			}
			if (this.pgtBossPage[cfg.page].lastIndexOf(data.bossid) == -1) {
				this.pgtBossPage[cfg.page].push(data.bossid);
			}
			this.fbId2bossId[cfg.fubenid] = cfg.entityid;
		}

		// 排序
		for (let k in this.pgtBossPage) {
			let page = this.pgtBossPage[k];
			page.sort((a, b) => {
				let cfgA: StdPurgatoryboss = GameConfig.purgatoryBoss[a];
				let cfgB: StdPurgatoryboss = GameConfig.purgatoryBoss[b];
				return cfgA.level - cfgB.level;
			});
		}
	}

	public get maxPage() {
		if (this.pgtMaxPage) return this.pgtMaxPage;
		this.initCfg();
		return this.pgtMaxPage;
	}

	private initCfg(): void {
		this.pgtBossCfgMap = {};
		this.pgtMaxPage = 0;
		for (let k in GameConfig.purgatoryBoss) {
			let cfg: StdPurgatoryboss = GameConfig.purgatoryBoss[k];
			(!this.pgtBossCfgMap[cfg.difficulty]) && (this.pgtBossCfgMap[cfg.difficulty] = {});
			let diffMap = this.pgtBossCfgMap[cfg.difficulty];
			diffMap[cfg.level] = cfg;
			if (cfg.page > this.pgtMaxPage) {
				this.pgtMaxPage = cfg.page;
			}
		}
	}

	/**
	 * 获取炼狱boss配置
	 * @param  {number} diff
	 * @param  {number} lv
	 */
	public getPgtBossCfg(diff: number, lv: number) {
		if (!this.pgtBossCfgMap) {
			this.initCfg();
		}
		if (!this.pgtBossCfgMap[diff]) {
			return null;
		}
		return this.pgtBossCfgMap[diff][lv];
	}

	public openExitTips(skipTips = false): void {
		if (skipTips) {
			this.exit();
			return;
		}
		let view = new ViewProp();
		let obj = {};
		let cfg: StdPurgatoryboss = GameConfig.purgatoryBoss[this.currentBossId];
		let desc = Language.lang.pgtBossExit;
		if (cfg) {
			let fbCfg: StdFuben = GameConfig.fuben[cfg.fubenid];
			desc = fbCfg.exitDec;
		}
		obj["desc"] = desc;
		obj["thisc"] = this;
		obj["func"] = this.exit;
		view.exData1 = obj;
		App.ViewManager.open(ViewConst.SYSTIPS, view);
	}

	public exit(): void {
		if (!this.currentBossId && GameCache.map.fbId > 0) {
			this.currentBossId = this.fbId2bossId[GameCache.map.fbId];
		}
		Proxy.boss.sendBossFubenOpt(2, this.currentBossId);
	}

	public takeAwd(): void {
		Proxy.boss.sendRecieveAw(this.currentBossId);
		this.exit();
	}

	public getBuyMax(): number[] {
		let bought = this.pgtBuy ? this.pgtBuy : 0;
		let vipLvl = GameCache.vip.realValue();
		let vipConf = GameConfig.vip[vipLvl];
		let nextConf = GameConfig.vip[vipLvl + 1] ? GameConfig.vip[vipLvl + 1] : vipConf;
		let max = vipConf.PurgatoryBoss;
		let next = nextConf.PurgatoryBoss;
		return [max, bought, next];
	}
}