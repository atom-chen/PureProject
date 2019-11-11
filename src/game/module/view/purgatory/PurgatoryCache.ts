/*
 * @Description: 炼狱装备数据
 * @Author: moyusheng
 * @Date: 2019-10-14 16:07:41
 */
class PurgatoryCache extends BaseCache {
	/** 角色炼狱装备数据 */
	public purgatoryData: { [roleId: number]: { [pos: number]: number } } = {};
	/** 各阶数个数记录 */
	public rsnData: { [roldId: number]: { [k: number]: number } } = {};

	/** 最大阶数 */
	public cfgMaxLv: number;


	public constructor() {
		super();
	}

	clear(): void {
		this.purgatoryData = {};
		this.rsnData = {};
	}

	/** 初始化角色身上的炼狱装备 */
	public updatePurgatory(roleId: number, map: { [part: number]: number }): void {
		if (map) {
			this.purgatoryData[roleId] || (this.purgatoryData[roleId] = []);
			for (let i in map) {
				this.purgatoryData[roleId][i] = map[i];
			}
			this.updateResonateLv(roleId);
		}
	}

	public getPurgatoryCfg(part: number, lv: number): StdEquippurgatory {
		return GameConfig.purgatory[part][lv];
	}

	public get maxLv() {
		if (!this.cfgMaxLv) {
			this.cfgMaxLv = 0;
			let arr: any[] = GameConfig.purgatory[0];
			for (let i in arr) {
				if (Number(i) > this.cfgMaxLv)
					this.cfgMaxLv = Number(i);
			}
		}
		return this.cfgMaxLv;
	}

	/**
	 * 取得各个共鸣等级的装备件数
	 * @param  {number} roleId
	 * @returns number
	 */
	public getResonateLvNum(roleId: number, lv: number): number {
		let data = this.rsnData[roleId];
		let num = 0;
		if (!data) {
			return num;
		}
		data[lv] && (num = data[lv]);
		return num;
	}

	/**
	 * 计算共鸣等级
	 * @returns number
	 */
	private updateResonateLv(roleId: number): void {
		let eqData = this.purgatoryData[roleId];
		if (!eqData) {
			return;
		}
		let rsnMap = {};
		/** 各阶数个数记录 */
		for (let i in eqData) {
			let l = eqData[i];
			if (!l) continue;
			for (let k = 1; k <= l; k++) {
				rsnMap[k] || (rsnMap[k] = 0);
				rsnMap[k]++;
			}
		}
		this.rsnData[roleId] = rsnMap;
	}

}