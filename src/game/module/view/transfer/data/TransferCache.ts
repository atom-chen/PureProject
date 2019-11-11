/*
 * @Description: 转职数据
 * @Author: liangzhaowei
 * @Date: 2019-10-28 17:37:37
 */

class TransferCache extends BaseCache {

	//转职内容
	public syData = {};

	public constructor() {
		super();
	}

	clear() {
		this.syData = {};
	}



	/**初始化套装内容 */
	public initData(data: TransferItem) {
		this.syData[data.roldId] = data;
	}

	/**转数配表转换 */
	public truanChange(job: number, trunNum: number, trunLv: number) {
		let index = 0;
		if ((typeof job == 'number') && (typeof trunNum == 'number') && (typeof trunLv == 'number')) {
			let roldIndex = GameCache.hero.transServerFromeId(job);
			index = trunLv + trunNum * 1000 + job * 1000 * 1000
		}
		return index
	}


	/**更新转生等级 */
	public upTrunLv(roleId: number, num: number, lv: number, exp: number) {
		let data: TransferItem = this.syData[roleId]
		if (data) {
			data.turnNum = num;
			data.turnLv = lv;
			data.exp = exp;
		}
	}


	/**更新使用转职经验道具结果 */
	public upItemInfo(roleId: number, exp: number, itemIndex: number, time: number) {
		let data: TransferItem = this.syData[roleId]
		if (data) {
			data.exp = exp;
			data.itemUseIime[itemIndex] = time;
		}
	}

	/**满足经验红点 */
	public enoughExpRed(roleId: number) {
		let transferItem: TransferItem = this.syData[roleId];
		if (!transferItem) {
			return false
		}


		/**都是拿下一级的去显示 */
		let cfgOr: StdTransfer = GameConfig.transfer[GameCache.transfer.truanChange(GameCache.hero.getJobByRoleId(roleId) , transferItem.turnNum, transferItem.turnLv)]
		if (!cfgOr) {
			return false
		}
		let cfgtr: StdTransfer = GameConfig.transfer[cfgOr.next]
		if (!cfgtr) {
			return false
		}

		if (transferItem.exp >= cfgtr.transferExe) {
			return true;
		}

		return false;
	}

	/**满足升级红点 */
	public enoughUpRed() {
		for (let index in GameConfig.transferconfig) {
			let cfg = GameConfig.transferconfig[index]
			let count = GameCache.bag.itemCount(cfg.id);
			if (count) {
				return true;
			}
		}
		return false;

	}

}