/**
 * effect: 套装数据
 * author :lzw
 * data :2019.7.25
 */
class SuitCache extends BaseCache {

	//套装内容
	public roleSuit = {};
	public nResolveId = 16;//分解物品id
	// /**红点 */
	// public roleRed = {};

	public constructor() {
		super();
	}

	clear() {
		this.roleSuit = {};
		// this.roleRed = {};
	}



	/**初始化套装内容 */
	public initStList(roleId: number, fight: number, lvList: number[]) {
		let obj = { lv: 1, lvList: [], fight: 0 };
		var max = lvList.length > 0 ? Math.max.apply(null, lvList) : 1;
		obj.lv = max;
		obj.lvList = lvList;
		obj.fight = fight;
		this.roleSuit[roleId] = obj;
	}


	/**更新套装内容 */
	public upStList(roleId: number, fight: number, lv: number) {

		let roleData = this.roleSuit[roleId];
		if (!roleData) {
			let obj = { lv: 1, lvList: [], fight: 0 };
			obj.lv = lv;
			obj.lvList.push(lv);
			obj.fight = fight;
			this.roleSuit[roleId] = obj;
		}
		else {
			roleData.lvList.push(lv);
			roleData.fight = fight;
			var max = roleData.lvList.length > 0 ? Math.max.apply(null, roleData.lvList) : 1;
			roleData.lv = max;
		}
	}

	/**套装兑换列表 */
	public suitChangeList(job: number, serverRoleId: number, roleId: number) {
		let changeList = []
		let suitLv = GameCache.hero.mainPro ? GameCache.hero.mainPro.pro(PropId.AP_LEVEL) : 1;/**套装等级 */
		if (suitLv < 10) {
			suitLv = 1
		}
		else {
			suitLv = Math.floor(suitLv / 10) * 10
		}
		let suitCfg = GameConfig.equipExchangeLevel[job][suitLv];

		if (!suitCfg) {
			return [];
		}
		for (let index in suitCfg) {
			let obj = CommonUtils.copyDataHandler(suitCfg[index]);
			obj.gap = 0;
			obj.roleId = serverRoleId;
			/**计算战力差距 */
			let partItem = GameConfig.item[obj.item]
			if (partItem) {
				let itemPower = ItemUtils.getItemZDL(partItem);
				/**装备 */
				let eqData: UserItem[] = GameCache.equip.roleEquipList[roleId];
				// obj.eqLv = 0;
				if (eqData) {
					if (eqData[partItem.part]) {
						obj.gap = itemPower - ItemUtils.getItemZDL(eqData[partItem.part].stdItem);
					}
					else {
						obj.gap = itemPower;
					}
				}
				else {
					obj.gap = itemPower;
				}
				changeList.push(obj);
			}
		}
		/**根据战力影响排序 */
		changeList.sort(this.sort);

		return changeList;
	}


	public sort(a, b) {
		return a.gab - b.gab;
	}


	/**套装分解列表 */
	public sortResolveList() {
		let list: StdItem[] = [];
		let itemArr: UserItem[] = GameCache.bag.getBagByType(BagType.BAG_TYPE_EQUIP);
		for (let index in itemArr) {
			let item: UserItem = itemArr[index];
			if (item.stdItem.showQuality == 6) {
				for (let cnt in GameCache.equip.roleEquipList) {
					let eqlist = GameCache.equip.roleEquipList[cnt];
					let partItem = eqlist[item.stdItem.part];
					/**部位相等 */
					if (partItem) {
						/**背包的物品战力少于装备的 */
						if (ItemUtils.getItemZDL(item.stdItem) <= ItemUtils.getItemZDL(partItem.stdItem)) {
							list.push(item.stdItem);
						}
					}
				}
			}
		}
		return list;
	}


	/**套装分解列表 */
	public sortResolveRed() {
		let list: StdItem[] = [];
		let itemArr: UserItem[] = GameCache.bag.getBagByType(BagType.BAG_TYPE_EQUIP);
		for (let index in itemArr) {
			let item: UserItem = itemArr[index];
			if (item.stdItem.showQuality == 6) {
				for (let cnt in GameCache.equip.roleEquipList) {
					let eqlist = GameCache.equip.roleEquipList[cnt];
					let partItem = eqlist[item.stdItem.part];
					/**部位相等 */
					if (partItem) {
						/**背包的物品战力少于装备的 */
						if (ItemUtils.getItemZDL(item.stdItem) <= ItemUtils.getItemZDL(partItem.stdItem)) {
							return true
						}
					}
				}
			}
		}
		return false;
	}

	/**套装加成列表 */
	public suitPropertyList(roleId) {
		let listData = [];

		let eqData: UserItem[] = GameCache.equip.roleEquipList[roleId];
		/**套装等级 */
		let suitLv = 0;
		if (eqData) {
			for (let eqIndex in eqData) {
				let eq: UserItem = eqData[eqIndex];
				if (eq && eq.stdItem && eq.stdItem.level && eq.stdItem.showQuality == 6) {
					suitLv = suitLv + eq.stdItem.level;
				}
			}
		}
		for (let item in GameConfig.equipAddition) {
			let cfg: StdEquipaddition = GameConfig.equipAddition[item];
			/**是否已升级 */
			let passed = GameCache.suit.roleSuit[roleId].lvList.indexOf(cfg.level);
			if (suitLv >= cfg.showlevel && (passed == -1)) {
				return true;
			}
		}


		return false;

	}



	/**套装兑换列表 */
	public suitChangeListRed(job: number, roleId: number) {
		let changeList = []
		let suitLv = GameCache.hero.mainPro ? GameCache.hero.mainPro.pro(PropId.AP_LEVEL) : 1;/**人物等级 */
		if (suitLv < 10) {
			suitLv = 1
		}
		else {
			suitLv = Math.floor(suitLv / 10) * 10
		}
		let suitCfg = GameConfig.equipExchangeLevel[job][suitLv];

		if (!suitCfg) {
			return false;
		}
		for (let index in suitCfg) {
			let exchangeId = suitCfg[index].item;
			let exchangeCount = GameConfig.equipExchange[exchangeId] ? GameConfig.equipExchange[exchangeId].needNum[0].count : 0
			if (GameCache.bag.itemCount(this.nResolveId) >= exchangeCount) {
				return true;
			}

		}

		return false;
	}

}