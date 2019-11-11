/*
 * @Description: vip数据
 * @Author: liangzhaowei
 * @Date: 2019-08-27 16:30:47
 * @LastEditTime: 2019-10-30 20:20:24
 */

class VipCache extends BaseCache {

	/**特权卡时间 */
	public privilegeCardTime = 0;
	/**福利内容 */
	public vipWelfare = { dailyGet: 0, exclusiveList: [] }
	/**充值页面列表 */
	public chargeCfg = [];

	public vipCardSt = {};

	public constructor() {
		super();
	}


	clear() {
		this.privilegeCardTime = 0;
		this.vipWelfare = { dailyGet: 0, exclusiveList: [] };
		this.chargeCfg = [];
		this.vipCardSt = {};
	}



	/**更新vip 福利数据 */
	public upWelfare(serverData) {
		this.vipWelfare = serverData;
	}

	/**vip realValue */
	public realValue() {
		let vip = 1;
		let pro = GameCache.hero.mainPro;
		if (pro) {
			vip = Math.max(pro.pro(PropId.AP_VIP_TEMPROARY), pro.pro(PropId.AP_VIP_GRADE))
		}
		return vip;
	}


	/** 获取首冲金额列表*/
	public getchargeCfg() {
		if (this.chargeCfg.length == 0) {
			for (let index in GameConfig.chognzhi) {
				let cfg: StdChognzhi = GameConfig.chognzhi[index]
				if (cfg.sort) {
					this.chargeCfg.push(cfg)
				}
			}
			this.chargeCfg.sort(this.sort);
		}
		return this.chargeCfg;
	}

	public sort(a, b) {
		return a.sort - b.sort;
	}


	public openRechargeWin(): void {
		let view = new ViewProp();
		view.exData1 = {};
		view.exData1["func"] = this.openRechargeFunc;
		view.exData1["thisc"] = this;
		view.exData1["desc"] = Language.lang.reChargeHint;
		App.ViewManager.open(ViewConst.SYSTIPS, view);
	}

	public openRechargeFunc(): void {
		if (GameCache.firstcharge.firstChargeSt) {
			let vipLvl = this.realValue();
			if (vipLvl < 6) {
				App.ViewManager.open(ViewConst.VIP);
			} else {
				App.ViewManager.open(ViewConst.CHARGE);
			}
		}
		else {
			App.ViewManager.open(ViewConst.FIRSTCHARGE);
		}
	}

}