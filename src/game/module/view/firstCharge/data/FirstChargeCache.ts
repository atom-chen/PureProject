/*
 * @Description: 首冲数据
 * @Author: liangzhaowei
 * @Date: 2019-09-02 17:15:45
 * @LastEditTime: 2019-09-04 15:44:13
 */


class FirstChargeCache extends BaseCache {

	/**首冲领取列表 */
	public firstGetList = [];
	/**累冲领取列表 */
	public totalGetList = [];
	/**首冲金额列表 */
	public firstChargeCfg = [];

	public firstChargeSt = 0;
	public secondChargeSt = {};


	public constructor() {
		super();
	}


	clear() {
		this.firstGetList = [];
		this.totalGetList = [];
		this.firstChargeCfg = [];
		this.secondChargeSt = {};
		this.firstChargeSt = 0;
	}



	/**更新数据  类型1:首冲2:累充*/
	public update(data: number[], type: number) {
		if (type == 1) {
			this.firstGetList = data;
		}
		else if (type == 2) {
			this.totalGetList = data;
		}
	}

	/** 获取首冲金额列表*/
	public getFirstChargeCfg() {
		if (this.firstChargeCfg.length == 0) {
			for (let index in GameConfig.chognzhi) {
				let cfg: StdChognzhi = GameConfig.chognzhi[index]
				if (cfg.fourfoldDimond) {
					this.firstChargeCfg.push(cfg)
				}
			}
		}
		return this.firstChargeCfg;
	}




}