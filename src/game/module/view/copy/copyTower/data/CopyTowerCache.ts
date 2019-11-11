/*
 * @Description: 副本爬塔数据
 * @Author: guolinsen
 * @Date: 2019-07-31 16:01:47
 * @LastEditTime: 2019-10-23 15:35:38
 */
class CopyTowerCache extends BaseCache {

	public copyTowerData: CopyTowerItem;/**爬塔数据 */
	public rankList: any[] = [];/**爬塔排行榜数据 */
	public myRank: number = 0;
	public constructor() {
		super();
	}

	clear() {
		this.copyTowerData = null;
		this.rankList = [];
	}

	/**初始化数据 */
	public initData(pBytes: GameByteArray) {
		if (!this.copyTowerData) {
			this.copyTowerData = new CopyTowerItem();
		}
		this.copyTowerData.init(pBytes);
	}


	/**更新排行榜内容 */
	public rankData(pBytes: GameByteArray) {
		this.myRank = pBytes.readByte();
		let count = pBytes.readByte();
		this.rankList = [];
		for (let i = 0; i < count; i++) {
			let obj = { num: 1, layer: 1, name: "" }
			obj.num = pBytes.readByte();
			obj.layer = pBytes.readUnsignedShort();
			obj.name = pBytes.readCustomBytes();
			this.rankList.push(obj);
		}
	}


	/** 返回爬塔层级 */
	public get copyTowerLayer(): number {
		return this.copyTowerData.layer;;
	}

	/**是否可以领取每日奖励 */
	public bGetDailyRw() {
		if (this.copyTowerData) {
			if (this.copyTowerData.layer && this.copyTowerData.getState == 0) {
				return true;
			}
		}
		return false;
	}




}