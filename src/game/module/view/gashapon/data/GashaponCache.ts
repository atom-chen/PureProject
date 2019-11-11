/*
 * @Description: 扭蛋数据
 * @Author: liangzhaowei
 * @Date: 2019-10-08 14:04:38
 */

enum GashaponType {
	/**宠物类型*/
	Pet = 1,
}

class GashaponCache extends BaseCache {

	/**扭蛋仓库 */
	public bagSeries = {};
	/**是否第一次请求了仓库内容 */
	public bOpenList = {};

	public constructor() {
		super();
	}

	clear() {
		this.bagSeries = {};
		this.bOpenList = {};
	}

	public addBagItems(type: number, bagItems: UserItem): void {
		if (!this.bagSeries[type]) {
			this.bagSeries[type] = {};
		}
		this.bagSeries[type][bagItems.series.toString()] = bagItems;
	}

	public removeBagItems(type: number, series: string): void {
		if (this.bagSeries[type] && this.bagSeries[type][series]) {
			delete this.bagSeries[type][series];
		}
	}




}