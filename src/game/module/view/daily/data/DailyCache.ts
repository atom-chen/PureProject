/*
 * @Description: 日常数据
 * @Author: liangzhaowei
 * @Date: 2019-08-14 15:00:25
 * @LastEditTime: 2019-10-25 14:00:46
 */

class DailyCache extends BaseCache {

	public dailyListData = {};

	public constructor() {
		super();
	}

	clear() {
		this.dailyListData = {};
	}


	/**初始化日常列表内容 */
	public initServer(list) {
		this.dailyListData = list;
	}

	/**更新数据 */
	public upData(pBytes: GameByteArray) {
		let id = pBytes.readByte()
		if (id && this.dailyListData[id]) {
			this.dailyListData[id].update(pBytes);
		}
		else {
			let pet = new DailyItem();
			pet.id = id;
			pet.update(pBytes);
			this.dailyListData[id] = pet;
		}
	}


	/**获取当前活跃度 */
	public getActNum(): number {
		let num = 0;
		for (let index in this.dailyListData) {
			let daily: DailyItem = this.dailyListData[index];
			if (daily.state == 3) {
				num = GameConfig.daily[daily.id] ? (num + GameConfig.daily[daily.id].award) : num;
			}
		}
		return num;
	}

	/**获取总活跃度 */
	public getAllActNum(): number {
		let num = GameConfig.DailyReward[4].value;
		// for (let index in GameConfig.daily) {
		// 	let daily: StdDaily = GameConfig.daily[index];
		// 	if (daily && daily.award) {
		// 		num = num + daily.award
		// 	}
		// }
		return num;
	}


	public getStreaList(): number[] {
		let pro = GameCache.hero.mainPro;
		let actGetBit = 0;
		if (pro) {
			actGetBit = pro.pro(PropId.AP_ACTIVITY_AWARD_FLAG)
		}

		let listStrea = [0, 0, 0, 0];
		for (let index in listStrea) {
			// if ((this.getActNum() / this.getAllActNum()) >= (parseInt(index) + 1) * 25 / 100) {
			if (this.getActNum() >= GameConfig.DailyReward[parseInt(index) + 1].value) {
				if (GlobalFun.BitHas(actGetBit, parseInt(index))) {
					listStrea[index] = 2;
				}
				else {
					listStrea[index] = 1;
				}
			}
			else {
				listStrea[index] = 0;
			}
		}

		return listStrea;
	}

	/**获取日常红点 */
	public getDailyTaskRed() {
		for (let index in this.dailyListData) {
			let daily: DailyItem = this.dailyListData[index];
			if (daily.state == 2) {
				return true;
			}
		}
		return false;
	}

	/**获取日常活跃度红点 */
	public getDailyStreaRed() {
		let list = this.getStreaList();
		for (let index in list) {
			let st = list[index];
			if (st == 1) {
				return true;
			}
		}
		return false;
	}


}