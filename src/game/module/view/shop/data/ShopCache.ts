/*
 * @Description: 商店数据
 * @Author: liangzhaowei
 * @Date: 2019-09-23 16:17:12
 */


enum ShopType {
	/**道具*/
	prop,
	/**金币*/
	gold,
	/**积分*/
	score
}


class ShopCache extends BaseCache {

	public shopData = {};

	public constructor() {
		super();
	}

	clear() {
		this.shopData = {};
	}





	/**初始化数据 */
	public initData(type: number, shopData: any) {
		this.shopData[type] = shopData;
	}


	/**更新套装内容 */
	public upStList(roleId: number, fight: number, lv: number) {


	}



}