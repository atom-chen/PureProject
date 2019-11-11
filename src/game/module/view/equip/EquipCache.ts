/**
 * effect: 装备数据
 * author :lzw
 * data :2019.6.20
 */
class EquipCache extends BaseCache {

	//角色装备
	public roleEquipList = {};
	//角色装备强化信息
	public roleStrengthList = {};
	//角色精炼信息
	public roleRefineList = {};

	/**角色红点列表 */
	public roleRed = [];


	public constructor() {
		super();
	}

	clear() {
		this.roleEquipList = {};
		this.roleStrengthList = {};
		this.roleRefineList = {};
	}



	/**初始化装备内容 */
	public initEqList(roleId: number, list: UserItem[]) {
		if (list) {
			this.roleEquipList[roleId] = list;
		}
	}

	/**穿戴装备 */
	public wearEq(roleId: number, equipSeries: ItemSeries) {
		let item = GameCache.bag.getUserItemBySeries(equipSeries);
		if (item) {
			let list = this.roleEquipList[roleId];
			if (!list) {
				list = this.roleEquipList[roleId] = [];
			}
			item.sourceType = ItemSourceType.ROLEEQUIP;
			list[item.stdItem.part] = item;
		}
	}

	/**卸下装备 */
	public dropEquip(roleId: number, equipSeries: ItemSeries) {
		let list = this.roleEquipList[roleId];
		for (let index in list) {
			let userItem: UserItem = list[index];
			if (userItem && userItem.series.isEquals(equipSeries)) {
				list[index] = null;
			}
		}
	}

	/**
	 * 比较人物身上的装备战力
	 * 返回 当前item - 人物身上对应部位战力
	*/
	public compartPower(item: StdItem) {
		let job = ItemUtils.getEquipJob(item);
		let hero = GameCache.hero.getProByJob(job);
		if (!hero) return 0;
		let part = item.part;
		let list = GameCache.hero.getDataByJob(job, this.roleEquipList);
		if (!list) return 1;
		let equip: UserItem = list[part];
		if (!equip) return 1;
		return ItemUtils.getItemZDL(item) - ItemUtils.getItemZDL(equip.stdItem);
	}


	/**
	 * 获取神圣是否有这个装备
	*/
	public bEquip(item: StdItem) {
		let job = ItemUtils.getEquipJob(item);
		let hero = GameCache.hero.getProByJob(job);
		if (!hero) return false;
		let part = item.part;
		let list = GameCache.hero.getDataByJob(job, this.roleEquipList);
		if (!list) return false;
		let equip: UserItem = list[part];
		if (!equip) return false;
		return true;
	}


	/**获取角色战力 */
	public getRolePower(roleId: number) {
		let power: number = 0;
		for (let index in this.roleEquipList[roleId]) {
			power = power + ItemUtils.getItemZDL(this.roleEquipList[roleId][index])
		}
		return power;
	}

	/**执行一键穿戴
	 * @param role 为0时，为全角色一键穿戴
	 */
	public quickWear(job = 0): void {
		if (job == 0) {
			for (let i = 1; i <= 3; i++) {
				this.quickWear(i);
			}
			return;
		}
		let suggestBag = GameCache.bag.roleSuggestBag[job];
		if (!suggestBag) return;
		let roleId = GameCache.hero.getServerIdByJob(job);
		if (roleId == -1) return;
		let arr = [];
		for (let i in suggestBag) {
			// Proxy.equip.sendWearEquip(suggestBag[i].series, 2, roleId);
			arr.push(suggestBag[i]);
		}
		Proxy.equip.sendQuickEquip(roleId, arr);
		//清空推荐列表
		GameCache.bag.roleSuggestBag[job] = {};
	}
}