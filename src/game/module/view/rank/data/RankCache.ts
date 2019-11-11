/*
 * @Description: 排行榜数据
 * @Author: liangzhaowei
 * @Date: 2019-09-25 11:29:40
 */



class RankCache extends BaseCache {

	public rankData = {};
	/**临时存储其它玩家信息 */
	public otherRoleData: any = {};

	public constructor() {
		super();
	}

	clear() {
		this.rankData = {};
		this.otherRoleData = {};
	}

	/**初始化数据 */
	public initData(type: number, sigleRank) {
		this.rankData[type] = sigleRank;
	}






}