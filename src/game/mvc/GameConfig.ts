/*
 * @Description: 调用配置入口
 * @Author: guolinsen
 * @Date: 2019-08-21 20:51:02
 */
class GameConfig {

	/**场景配置*/
	static get scene() {
		return ConfigCache.getConfig("scene");
	}
	/**副本配置*/
	static get fuben() {
		return ConfigCache.getConfig("fuben");
	}
	/**怪物配置*/
	static get monster() {
		return ConfigCache.getConfig("monster");
	}
	/**全局配置，只有前端*/
	static get clientGlobal(): ClientGlobalConfig {
		return ClientGlobalConfig.ins();
	}
	/**全局配置2 */
	static get globalConfig(): StdGlobalconfig {
		return ConfigCache.getConfig("GlobalConfig")[1];
	}
	/**广播配置*/
	static get brocast() {
		return ConfigCache.getConfig("broadcast");
	}
	/**轮播配置*/
	static get carousel() {
		return ConfigCache.getConfig("carousel");
	}
	/**新手引导*/
	static get noviceGuide() {
		return ConfigCache.getConfig("noviceGuide");
	}
	/**npc配置*/
	static get npc() {
		return ConfigCache.getConfig("npc");
	}
	/**技能配置*/
	static get skill() {
		return ConfigCache.getConfig("skill");
	}

	/**技能配置*/
	static get skillBar() {
		return ConfigCache.getConfig("skillBar");
	}

	/**排行榜*/
	static get rank() {
		return ConfigCache.getConfig("rank");
	}

	/**迷雾之塔 副本*/
	static get miwuTower() {
		return ConfigCache.getConfig("miwuTower");
	}

	/**迷雾之塔 副本*/
	static get miwuTowerJackpot() {
		return ConfigCache.getConfig("miwuTowerJackpot");
	}

	/**界面模块配置*/
	static get modControl() {
		return ConfigCache.getConfig("modControl");
	}
	/**技能效果配置*/
	static get skillEff() {
		return ConfigCache.getConfig("skillEffect");
	}
	/**日常配置*/
	static get daily() {
		return ConfigCache.getConfig("daily");
	}

	/**日常配置*/
	static get DailyReward() {
		return ConfigCache.getConfig("DailyReward");
	}

	/**扭蛋配置*/
	static get gashaponDisplay() {
		return ConfigCache.getConfig("gashaponDisplay");
	}

	/**冒险配置*/
	static get adventure() {
		return ConfigCache.getConfig("maoxian");
	}

	/**签到配置*/
	static get sign() {
		return ConfigCache.getConfig("dailySign");
	}

	/**宠物列表*/
	static get pet() {
		return ConfigCache.getConfig("pet");
	}
	/**宠物升级经验*/
	static get petconfig() {
		return ConfigCache.getConfig("petconfig");
	}

	/**宠物技能*/
	static get petskill() {
		return ConfigCache.getConfig("petskill");
	}

	/**套装属性*/
	static get equipAddition() {
		return ConfigCache.getConfig("equipAddition");
	}

	/**套装兑换列表*/
	static get equipExchangeLevel() {
		return ConfigCache.getConfig("equipExchangeLevel");
	}

	/**套装兑换内容*/
	static get equipExchange() {
		return ConfigCache.getConfig("equipExchange");
	}

	/**主界面图标*/
	static get mainIconCtr() {
		return ConfigCache.getConfig("mainUIIconControl");
	}
	/**物品配置 */
	static get item() {
		return ConfigCache.getConfig("item");
	}
	/**任务配置*/
	static get quest() {
		return ConfigCache.getConfig("quest");
	}

	/***/
	static get errotips() {
		return ConfigCache.getConfig("errotips");
	}

	/**关卡·怪物*/
	static get passMonster() {
		return ConfigCache.getConfig("passMonster");
	}

	/**闯关额外奖励 */
	static get passSpAw() {
		return ConfigCache.getConfig("barrierSpecialAward");
	}

	/**闯关奖励 */
	static get passAw() {
		return ConfigCache.getConfig("barrierPassAward");
	}

	/**闯关boss */
	static get passBOSS() {
		return ConfigCache.getConfig("barrierBOSS");
	}

	/**属性配置 */
	static get prop() {
		return ConfigCache.getConfig("attribute");
	}

	/**buff属性 */
	static get buffId() {
		return ConfigCache.getConfig("attributeBuffId");
	}

	/**强化属性 */
	static get strengthProp() {
		return ConfigCache.getConfig("StrsMaster");
	}

	/**强化材料 */
	static get strengthCost() {
		return ConfigCache.getConfig("StrengthEquip");
	}

	/**转职 */
	static get transfer() {
		return ConfigCache.getConfig("transfer");
	}

	/**转职设置 */
	static get transfertotal() {
		return ConfigCache.getConfig("transfertotal");
	}

	/**转职道具 */
	static get transferconfig() {
		return ConfigCache.getConfig("transferconfig");
	}

	/**玩法说明 */
	static get instruction() {
		return ConfigCache.getConfig("syshelp");
	}

	/**世界BOSS */
	static get worldBoss() {
		return ConfigCache.getConfig("WorldBoss");
	}

	/**世界boss奖励 */
	static get worldBossAw() {
		return ConfigCache.getConfig("");
	}

	/**时装 */
	static get fashion() {
		return ConfigCache.getConfig("fashionequip");
	}

	/**时装套装 */
	static get fashionSuit() {
		return ConfigCache.getConfig("fashionesuit");
	}

	/**连衣裙*/
	static get dress() {
		return ConfigCache.getConfig("dress");
	}

	/**精炼 */
	static get refine() {
		return ConfigCache.getConfig("ReMaster");
	}

	/**翅膀 */
	static get wing() {
		return ConfigCache.getConfig("wing");
	}

	/**翅膀技能 */
	static get wingSkill() {
		return ConfigCache.getConfig("wingSkill");
	}

	/**背包杂项 */
	static get bagStuff() {
		return ConfigCache.getConfig("bagConfig");
	}

	/**个人boss */
	static get grBoss() {
		return ConfigCache.getConfig("personalBoss");
	}

	/**材料副本 */
	static get copyMaterials() {
		return ConfigCache.getConfig("cailiaoCopy");
	}

	/**经验副本 */
	static get copyExp() {
		return ConfigCache.getConfig("expCopy");
	}

	/**图腾 */
	static get totems() {
		return ConfigCache.getConfig("Totems");
	}

	/**图腾共鸣 */
	static get resonance() {
		return ConfigCache.getConfig("TotemsRes");
	}

	/**徽章 */
	static get badge() {
		return ConfigCache.getConfig("badge");
	}

	/**充值奖励 */
	static get recharge() {
		return ConfigCache.getConfig("recharge");
	}

	/**充值金额 */
	static get chognzhi() {
		return ConfigCache.getConfig("chognzhi");
	}

	/**vip */
	static get vip() {
		return ConfigCache.getConfig("vip");
	}

	/**vip */
	static get vipCard() {
		return ConfigCache.getConfig("vipCard");
	}

	/**shop */
	static get shop() {
		return ConfigCache.getConfig("shop");
	}

	/**竞技场 */
	static get jingji() {
		return ConfigCache.getConfig("arena");
	}

	/**按钮配置 */
	static get customBtn() {
		return ConfigCache.getConfig("customBtn");
	}

	/**宝石 */
	static get jewel() {
		return ConfigCache.getConfig("gem");
	}

	/**符碑 */
	static get rune() {
		return ConfigCache.getConfig("Rune");
	}

	/**符碑技能 */
	static get runeSkill() {
		return ConfigCache.getConfig("runeSkill");
	}

	/**vip boss */
	static get vipBoss() {
		return ConfigCache.getConfig("vipBoss");
	}

	/**失败跳转配置表 */
	static get fail() {
		return ConfigCache.getConfig("failtips");
	}

	/**限时优惠 */
	static get xsyh() {
		return ConfigCache.getConfig("timeDiscount");
	}

	/** 炼狱装备 */
	static get purgatory() {
		return ConfigCache.getConfig("equipPurgatory");
	}

	/** 炼狱共鸣 */
	static get purgatoryResonate() {
		return ConfigCache.getConfig("equipPurgatoryAdd");
	}

	/** 炼狱分解  */
	static get purgatoryResolve() {
		let cfg = ConfigCache.getConfig("equipPurgatoryResolve");
		return cfg;
	}

	/**限时礼包 */
	static get xslb() {
		return ConfigCache.getConfig("timeGift");
	}

	/** 炼狱boss */
	static get purgatoryBoss() {
		let cfg = ConfigCache.getConfig("PurgatoryBoss");
		return cfg;
	}

	/** 活动目录 */
	static get activityCata(): StdActivitycata[] {
		let cfg = ConfigCache.getConfig("activityCata");
		return cfg;
	}

	/**时装副本 */
	static get fashionCopy() {
		return ConfigCache.getConfig("fashionCopy");
	}

	/** 公会 */
	static get familyCfg(): StdFamily {
		let cfg = ConfigCache.getConfig("family");
		return cfg[1];
	}

	/** 公会等级 */
	static get familyLv(): StdFamilylv[] {
		let cfg = ConfigCache.getConfig("familyLv");
		return cfg;
	}

	/**公会功能 */
	static get familySys(): StdFamilysys[] {
		let cfg = ConfigCache.getConfig("FamilySys");
		return cfg;
	}
}