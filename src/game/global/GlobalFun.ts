/**
 * 一些通用的函数
*/
class GlobalFun {
	public constructor() {
	}

	/**
	 * 把MiniDateTime转化为距离1970-01-01的毫秒数
	 * @param mdt
	 * @return
	 *
	 */
	static formatMiniDateTime(mdt: number): number {
		return GlobalVar.MiniDateTimeBase + (mdt & 0x7FFFFFFF) * 1000;
	}

	/**
	* 获取两个日期相差的毫秒数
	* 可以利用该方法判断mdt时间是否过期
	* @param mdt MiniDateTime(单位秒)
	* @param mdt2 MiniDateTime，如果值为0xFFFFFFFF，则使用服务器的当前时间(单位秒)
	* @return
	*
	*/
	static getDiffMiniDateTime(mdt: number, mdt2: number = 0xFFFFFFFF): number {
		if (mdt2 == 0xFFFFFFFF)
			return this.formatMiniDateTime(mdt) - GameCache.server.serverTime;
		else
			return (mdt - mdt2) * 1000;
	}


	/**获取物品id图片 */
	static getItemSourceById(id: number) {
		let str = null
		if (id && GameConfig.item[id]) {
			str = RES_DIR_IMAGES_ITEM + GameConfig.item[id].icon + ".png"
		}
		return str;
	}


	/**获取背包是否满足使用物品条件 */
	static getBagEnounghUseCondition(listData: any[] = null, obj: Object = null) {

		if (listData) {
			let list = [];
			for (let index in listData) {
				list.push(compure(listData[index]));
			}
			return list.indexOf(true) >= 0;
		}

		if (obj) {
			return compure(obj);
		}

		function compure(obj) {
			let res = false;
			if (typeof (obj.id) == "number" && typeof (obj.count) == "number") {
				return GameCache.bag.itemCount(obj.id) >= obj.count
			}
			return false;
		}

		return false;

	}

	/**获取主职业对应的道具 */
	static filterJob(list: any[]) {
		let retList = []
		for (let index in list) {
			let data = list[index]
			if (data.id) {
				let item: StdItem = GameConfig.item[data.id];
				let job = GameCache.hero.mainPro.pro(PropId.AP_JOB)
				if (ItemUtils.getEquipJob(item) == job) {
					retList.push(data);
				}
			}
		}
		return retList
	}

	/**str 提示内容 */
	static SysMsg(str: string, type: number = 2): void {
		App.ChatMgr.doMessage(str, type);
	}

	/**
	 * 弹框提示
	 * des: 文字说明
	 * call:点击确定回调函数
	 * callObj
	 * state：2确定与取消 1只显示确定
	*/
	static alert(des: string, call: Function, callObj: any, state = 2) {
		let view = new ViewProp();
		view.exData1 = {};
		view.exData1["func"] = call;
		view.exData1["thisc"] = callObj;
		view.exData1["desc"] = des;
		view.exData1["state"] = state;
		App.ViewManager.open(ViewConst.SYSTIPS, view);
	}

	/**获取角色战力之和*/
	static getTotalPower(): number {
		let list = GameCache.hero.list;
		let n = 0;
		for (let hero of list) {
			n += hero.pro.pro(PropId.AP_BATTLE_POWER);
		}
		return n;
	}

	/**数值对象相加或减
	 * @param oldObj旧值对象 newobj 新值对象 c加减系数 1为加 -1为减 对象规格固定为 [{type:number,value:number}]
	*/
	static ObjPlusOrMinus(oldObj, newObj, c = 1) {
		let obj = {};
		let result = [];
		if (oldObj) {
			for (let i in oldObj) {
				let item = oldObj[i];
				obj[item.type] = item.value;
			}
		}
		if (newObj) {
			for (let i in newObj) {
				let item = newObj[i];
				if (item.value == 0) continue;
				if (obj[item.type]) {
					obj[item.type] = Math.floor(c * newObj[i].value + obj[item.type]);
				} else {
					obj[item.type] = newObj[i].value;
				}
			}
		}
		for (let i in obj) {
			let item = {
				type: parseInt(i),
				value: obj[i]
			}
			result.push(item);
		}
		return result;
	}


	/**数值对象相乘
	 * @param oldObj旧值对象 c为倍数  对象规格固定为 [{type:number,value:number}]
	*/
	static ObjPlusRide(oldObj, c = 1) {
		let obj = {};
		let result = [];
		if (oldObj) {
			for (let i in oldObj) {
				let item = oldObj[i];
				obj[item.type] = item.value;
			}
		}

		for (let i in obj) {
			let item = {
				type: parseInt(i),
				value: Math.floor(obj[i] * c)
			}
			result.push(item);
		}
		return result;
	}


	/**获取人物等级 */
	static getRoleLv(): number {
		let pro = GameCache.hero.mainPro;
		if (pro) {
			return pro.pro(PropId.AP_LEVEL)
		}
		return 0
	}

	/**获取人物头像
	 * job职业 
	 * sex性别 undefined使用默认性别女  0男 1女
	 * type:0普通 1小的
	*/
	static getRoleIcon(job: number, sex: number = undefined, type: number = 0): string {
		if (sex == undefined) sex = 1;
		if (type == 0) {
			return RES_DIR_ROLE_ICON + "role_" + job + "_" + sex + ".png";
		} else if (type == 1) {
			return RES_DIR_ROLE_ICON + "role_s_" + job + "_" + sex + ".png";
		}
	}

	/* 位操作  */
	static BitHas(value: number, bit: number): boolean {
		return (value & (1 << bit)) > 0
	}

	/**寻找最小数值，返回数值与下标;若存在多个相同最小值，返回第一个最小值下标;
	 * @param arr 数值数组 
	 */
	static Min(arr: number[]): number[] {
		let idx = 0;
		let temp = arr[0];
		for (let i = 0; i < arr.length; i++) {
			if (arr[i] < temp) {
				temp = arr[i];
				idx = i;
			}
		}
		return [temp, idx];
	}

	/**寻找最大数值，返回数值与下标;若存在多个相同最大值，返回第一个最大值下标;
	 * @param arr 数值数组 
	 */
	static Max(arr: number[]): number[] {
		let idx = 0;
		let temp = arr[0];
		for (let i = 0; i < arr.length; i++) {
			if (arr[i] > temp) {
				temp = arr[i];
				idx = i;
			}
		}
		return [temp, idx];
	}

	/**vip 窗口跳转 */
	static gotoCharge() {
		// if (GameCache.firstcharge.firstChargeSt) {
		// 	App.ViewManager.open(ViewConst.CHARGE);
		// }
		// else {
		// 	App.ViewManager.open(ViewConst.FIRSTCHARGE);
		// }
		GameCache.vip.openRechargeWin();
	}

	/**数值缩写 */
	static numCut(num: number): string {
		let nNum = num / Math.pow(10, 4);
		let str = Math.floor(num) + "";
		if (num / Math.pow(10, 4) > 1 && num / Math.pow(10, 8) < 1) {
			let result = (num / Math.pow(10, 4));
			str = result % 1 == 0 ? result + "" : result.toFixed(2);
			return StringUtils.substitute(Language.lang.numLevels[0], str);
		}
		if (num / Math.pow(10, 4) > 1 && num / Math.pow(10, 8) < 1) {
			let result = (num / Math.pow(10, 8));
			str = result % 1 == 0 ? result + "" : result.toFixed(2);
			return StringUtils.substitute(Language.lang.numLevels[1], str);
		}
		return str;
	}

	/**
	 * 打开物品TIPS
	 * @param item 类型可为stdItem userItem 或物品ID
	 */
	static itemTips(item, exData2?, handlerData?): void {
		let stdItem;
		let userItem;
		if (typeof (item) == "number") {
			stdItem = GameConfig.item[item];
		} else if (item instanceof UserItem) {
			stdItem = item.stdItem;
			userItem = item;
		} else {
			stdItem = item;
		}
		let view = new ViewProp();
		view.itemData = stdItem;
		userItem && (view.exData1 = userItem);
		exData2 && (view.exData2 = exData2);
		handlerData && (view.firData = handlerData);
		App.ViewManager.open(ViewConst.ITEMTIPS, view);
	}

	/**
	 * 检查是否能提升VIP等级
	 */
	static checkVipLvl(str): void {
		let lvl = GameCache.vip.realValue() + 1;
		let conf = GameConfig.vip[lvl];
		let hint = "";
		if (conf) {
			hint = StringUtils.substitute(Language.lang.vipLvlHint, str);
		} else {
			hint = Language.lang.vipLvlMax;
		}
		GlobalFun.SysMsg(hint);
	}

	/**对象转换成数组 */
	static objChangeList(obj): any[] {
		let list = []
		for (let index in obj) {
			list.push(obj[index]);
		}
		return list
	}

	/**单个item渐现效果 */
	static createItemEffect(item: ItemBase, i: number) {
		let leftTime = 100;
		item.alpha = 0;
		egret.Tween.get(item).wait(i * leftTime).to({ alpha: 1 }, 1).call(function play() {
			App.DisplayUtils.addEffectToObj(item, "pnint_0_1", 1, 40, 40);
		});
	}

	/**
	 * 打开进入次数购买
	 * @param type 购买类型
	 */
	static openEnterBuy(type): void {
		let func;
		let thisc;
		let arg = [];
		let max = [];
		let price = 0;
		switch (type) {
			case "wboss": //世界BOSS
				func = Proxy.boss.sendBossFubenOpt;
				thisc = Proxy.boss;
				arg = [3, 29];
				max = GameCache.boss.getWorldBossBuyMax();
				price = GameConfig.globalConfig.worldBossCons;
				break;
			case "jingji": //竞技
				func = Proxy.other.sendBuyChance;
				thisc = Proxy.other;
				max = GameCache.jingji.getJingjiBuyMax();
				price = GameConfig.jingji["1"].consume[0].count;
				break;
			case "exp": //经验副本
				func = Proxy.copy.sendCopyExpBuy;
				thisc = Proxy.copy;
				let fbid = GameCache.copy.getCopyExpId()[1];
				let conf = GameConfig.fuben[fbid];
				max = GameCache.copy.getCopyExpBuyData();
				let count = max[1];
				price = conf.buyTimesConsume[count] ? conf.buyTimesConsume[count] : conf.buyTimesConsume[conf.buyTimesConsume.length - 1];
				break;
			case "pgtboss": // 炼狱boss
				func = Proxy.boss.pgtBossBuy;
				thisc = Proxy.boss;
				max = GameCache.pgtBoss.getBuyMax();
				price = GameConfig.globalConfig.PurgatoryCons;
				break;
			case "fashionCopy":
				func = Proxy.copy.sendCopyEnterBuy;
				thisc = Proxy.copy;
				arg = [GameConfig.globalConfig.fashionCopyId];
				price = GameConfig.globalConfig.fashionCopyBuyPrice;
				max = GameCache.copy.getFashionCopyBuyData();
				break;
		}
		let view = new ViewProp();
		view.firData = {};
		view.firData["func"] = func;
		view.firData["thisc"] = thisc;
		view.firData["arg"] = arg;
		view.firData["max"] = max;
		view.firData["price"] = price;

		App.ViewManager.open(ViewConst.WBBUY, view);
	}

	/**
	 * 生成随机数,自定义位数
	 */
	static getRandom(val): number {
		let total = 0;
		for (let i = 1; i <= val; i++) {
			total += Math.pow(10, i) * Math.random();
		}
		return total / Math.pow(10, val);
	}


    /** 
     * 打开物品提示
     * @param  {} itemId
     * @returns void
     */
	static openItemTips(itemId): void {
		let item: StdItem = GameConfig.item[itemId];
		let v = new ViewProp();
		v.itemData = item;
		App.ViewManager.open(ViewConst.ITEMTIPS, v);
	}
	/**
     * 存储系统设置 index 从零开始
    */
	static setRemindSet(index, sel: boolean, type) {
		let vale = sel ? 0 : 1;
		let v = GameCache.settings.getValue(type);

		v = v & (0xffffffff - (1 << index));
		if (vale == 1) {
			v += (1 << index);
		}
		GameCache.settings.update(type, v, true);
	}

	/**
	 * 获取系统设置
	 */
	static getRemindSet(index, type): boolean {
		let v = GameCache.settings.getValue(type);
		return ((v >> index) & 1) != 1;
	}
}