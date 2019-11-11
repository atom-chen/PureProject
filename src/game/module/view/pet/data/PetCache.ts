/*
 * @Description: 宠物数据
 * @Author: guolinsen
 * @Date: 2019-07-31 16:01:47
 * @LastEditTime: 2019-09-23 19:10:36
 */
class PetCache extends BaseCache {

	public petArray = {};/**宠物数据列表 */
	public constructor() {
		super();
	}


	clear() {
		this.petArray = {};
	}

	/**初始化数据 */
	public initData(objList) {
		this.petArray = objList;
		this.updatePet();
	}

	/**更新数据 */
	public upData(pBytes: GameByteArray) {
		let wid = pBytes.readUnsignedShort()
		if (wid && this.petArray[wid]) {
			this.petArray[wid].update(pBytes);
		}
		else {
			let pet = new PetItem();
			pet.wid = wid;
			pet.update(pBytes);
			this.petArray[wid] = pet;
		}
		this.updatePet();
	}

	/**更新人物宠物消息 */
	public updatePet() {
		let hero: HeroThing = GameCache.hero.mainPlayer;
		if (hero && hero.pro) {
			hero.pro.petId = [];
			hero.pro.petName = [];
			/**必须先移除宠物 */
			hero.removePet();
			for (let index in this.petArray) {
				let petData: PetItem = this.petArray[index];
				if (petData.state) {
					hero.pro.petId.push(petData.wid);
					hero.pro.petName.push(petData.name);
					hero.updatePet(petData.wid, petData.name, petData.wStep)
				}
			}
		}
	}

	/**计算排序 */
	public judeSort(pet: StdPet) {
		let sort = 0;
		let petDate: PetItem = GameCache.pet.petArray[pet.id];
		let imgHaveSource = null;
		if (petDate) {
			/**已激活 */
			sort = pet.id + pet.petType * 1000;
		}
		else {
			/**可激活 */
			if (GameCache.bag.getBagEnoughByCondtion(pet.activationNeed)) {
				sort = pet.id + pet.petType * 1000 + 10000;
			}
			else {
				/**不可激活 */
				sort = pet.id + pet.petType * 1000 + 100000;
			}
		}
		return sort;
	}

	/**获取模型id */
	public getModelId(star: number, petId: number) {
		let petData: StdPet = GameConfig.pet[petId];
		if (petData) {
			let a = petData.advancedMod.length;
			let i = a - 1;
			for (; i >= 0; i--) {
				if (star >= petData.advancedMod[i].star) {
					return petData.advancedMod[i].mod;
				}
			}
		}
		return 0;
	}


}