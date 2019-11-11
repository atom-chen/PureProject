var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/*
 * @Description: 调用配置入口
 * @Author: guolinsen
 * @Date: 2019-08-21 20:51:02
 */
var GameConfig = (function () {
    function GameConfig() {
    }
    Object.defineProperty(GameConfig, "scene", {
        /**场景配置*/
        get: function () {
            return ConfigCache.getConfig("scene");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameConfig, "fuben", {
        /**副本配置*/
        get: function () {
            return ConfigCache.getConfig("fuben");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameConfig, "monster", {
        /**怪物配置*/
        get: function () {
            return ConfigCache.getConfig("monster");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameConfig, "clientGlobal", {
        /**全局配置，只有前端*/
        get: function () {
            return ClientGlobalConfig.ins();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameConfig, "globalConfig", {
        /**全局配置2 */
        get: function () {
            return ConfigCache.getConfig("GlobalConfig")[1];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameConfig, "brocast", {
        /**广播配置*/
        get: function () {
            return ConfigCache.getConfig("broadcast");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameConfig, "carousel", {
        /**轮播配置*/
        get: function () {
            return ConfigCache.getConfig("carousel");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameConfig, "noviceGuide", {
        /**新手引导*/
        get: function () {
            return ConfigCache.getConfig("noviceGuide");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameConfig, "npc", {
        /**npc配置*/
        get: function () {
            return ConfigCache.getConfig("npc");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameConfig, "skill", {
        /**技能配置*/
        get: function () {
            return ConfigCache.getConfig("skill");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameConfig, "skillBar", {
        /**技能配置*/
        get: function () {
            return ConfigCache.getConfig("skillBar");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameConfig, "rank", {
        /**排行榜*/
        get: function () {
            return ConfigCache.getConfig("rank");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameConfig, "miwuTower", {
        /**迷雾之塔 副本*/
        get: function () {
            return ConfigCache.getConfig("miwuTower");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameConfig, "miwuTowerJackpot", {
        /**迷雾之塔 副本*/
        get: function () {
            return ConfigCache.getConfig("miwuTowerJackpot");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameConfig, "modControl", {
        /**界面模块配置*/
        get: function () {
            return ConfigCache.getConfig("modControl");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameConfig, "skillEff", {
        /**技能效果配置*/
        get: function () {
            return ConfigCache.getConfig("skillEffect");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameConfig, "daily", {
        /**日常配置*/
        get: function () {
            return ConfigCache.getConfig("daily");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameConfig, "DailyReward", {
        /**日常配置*/
        get: function () {
            return ConfigCache.getConfig("DailyReward");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameConfig, "gashaponDisplay", {
        /**扭蛋配置*/
        get: function () {
            return ConfigCache.getConfig("gashaponDisplay");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameConfig, "adventure", {
        /**冒险配置*/
        get: function () {
            return ConfigCache.getConfig("maoxian");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameConfig, "sign", {
        /**签到配置*/
        get: function () {
            return ConfigCache.getConfig("dailySign");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameConfig, "pet", {
        /**宠物列表*/
        get: function () {
            return ConfigCache.getConfig("pet");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameConfig, "petconfig", {
        /**宠物升级经验*/
        get: function () {
            return ConfigCache.getConfig("petconfig");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameConfig, "petskill", {
        /**宠物技能*/
        get: function () {
            return ConfigCache.getConfig("petskill");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameConfig, "equipAddition", {
        /**套装属性*/
        get: function () {
            return ConfigCache.getConfig("equipAddition");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameConfig, "equipExchangeLevel", {
        /**套装兑换列表*/
        get: function () {
            return ConfigCache.getConfig("equipExchangeLevel");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameConfig, "equipExchange", {
        /**套装兑换内容*/
        get: function () {
            return ConfigCache.getConfig("equipExchange");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameConfig, "mainIconCtr", {
        /**主界面图标*/
        get: function () {
            return ConfigCache.getConfig("mainUIIconControl");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameConfig, "item", {
        /**物品配置 */
        get: function () {
            return ConfigCache.getConfig("item");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameConfig, "quest", {
        /**任务配置*/
        get: function () {
            return ConfigCache.getConfig("quest");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameConfig, "errotips", {
        /***/
        get: function () {
            return ConfigCache.getConfig("errotips");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameConfig, "passMonster", {
        /**关卡·怪物*/
        get: function () {
            return ConfigCache.getConfig("passMonster");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameConfig, "passSpAw", {
        /**闯关额外奖励 */
        get: function () {
            return ConfigCache.getConfig("barrierSpecialAward");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameConfig, "passAw", {
        /**闯关奖励 */
        get: function () {
            return ConfigCache.getConfig("barrierPassAward");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameConfig, "passBOSS", {
        /**闯关boss */
        get: function () {
            return ConfigCache.getConfig("barrierBOSS");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameConfig, "prop", {
        /**属性配置 */
        get: function () {
            return ConfigCache.getConfig("attribute");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameConfig, "buffId", {
        /**buff属性 */
        get: function () {
            return ConfigCache.getConfig("attributeBuffId");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameConfig, "strengthProp", {
        /**强化属性 */
        get: function () {
            return ConfigCache.getConfig("StrsMaster");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameConfig, "strengthCost", {
        /**强化材料 */
        get: function () {
            return ConfigCache.getConfig("StrengthEquip");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameConfig, "transfer", {
        /**转职 */
        get: function () {
            return ConfigCache.getConfig("transfer");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameConfig, "transfertotal", {
        /**转职设置 */
        get: function () {
            return ConfigCache.getConfig("transfertotal");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameConfig, "transferconfig", {
        /**转职道具 */
        get: function () {
            return ConfigCache.getConfig("transferconfig");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameConfig, "instruction", {
        /**玩法说明 */
        get: function () {
            return ConfigCache.getConfig("syshelp");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameConfig, "worldBoss", {
        /**世界BOSS */
        get: function () {
            return ConfigCache.getConfig("WorldBoss");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameConfig, "worldBossAw", {
        /**世界boss奖励 */
        get: function () {
            return ConfigCache.getConfig("");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameConfig, "fashion", {
        /**时装 */
        get: function () {
            return ConfigCache.getConfig("fashionequip");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameConfig, "fashionSuit", {
        /**时装套装 */
        get: function () {
            return ConfigCache.getConfig("fashionesuit");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameConfig, "dress", {
        /**连衣裙*/
        get: function () {
            return ConfigCache.getConfig("dress");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameConfig, "refine", {
        /**精炼 */
        get: function () {
            return ConfigCache.getConfig("ReMaster");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameConfig, "wing", {
        /**翅膀 */
        get: function () {
            return ConfigCache.getConfig("wing");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameConfig, "wingSkill", {
        /**翅膀技能 */
        get: function () {
            return ConfigCache.getConfig("wingSkill");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameConfig, "bagStuff", {
        /**背包杂项 */
        get: function () {
            return ConfigCache.getConfig("bagConfig");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameConfig, "grBoss", {
        /**个人boss */
        get: function () {
            return ConfigCache.getConfig("personalBoss");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameConfig, "copyMaterials", {
        /**材料副本 */
        get: function () {
            return ConfigCache.getConfig("cailiaoCopy");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameConfig, "copyExp", {
        /**经验副本 */
        get: function () {
            return ConfigCache.getConfig("expCopy");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameConfig, "totems", {
        /**图腾 */
        get: function () {
            return ConfigCache.getConfig("Totems");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameConfig, "resonance", {
        /**图腾共鸣 */
        get: function () {
            return ConfigCache.getConfig("TotemsRes");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameConfig, "badge", {
        /**徽章 */
        get: function () {
            return ConfigCache.getConfig("badge");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameConfig, "recharge", {
        /**充值奖励 */
        get: function () {
            return ConfigCache.getConfig("recharge");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameConfig, "chognzhi", {
        /**充值金额 */
        get: function () {
            return ConfigCache.getConfig("chognzhi");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameConfig, "vip", {
        /**vip */
        get: function () {
            return ConfigCache.getConfig("vip");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameConfig, "vipCard", {
        /**vip */
        get: function () {
            return ConfigCache.getConfig("vipCard");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameConfig, "shop", {
        /**shop */
        get: function () {
            return ConfigCache.getConfig("shop");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameConfig, "jingji", {
        /**竞技场 */
        get: function () {
            return ConfigCache.getConfig("arena");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameConfig, "customBtn", {
        /**按钮配置 */
        get: function () {
            return ConfigCache.getConfig("customBtn");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameConfig, "jewel", {
        /**宝石 */
        get: function () {
            return ConfigCache.getConfig("gem");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameConfig, "rune", {
        /**符碑 */
        get: function () {
            return ConfigCache.getConfig("Rune");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameConfig, "runeSkill", {
        /**符碑技能 */
        get: function () {
            return ConfigCache.getConfig("runeSkill");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameConfig, "vipBoss", {
        /**vip boss */
        get: function () {
            return ConfigCache.getConfig("vipBoss");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameConfig, "fail", {
        /**失败跳转配置表 */
        get: function () {
            return ConfigCache.getConfig("failtips");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameConfig, "xsyh", {
        /**限时优惠 */
        get: function () {
            return ConfigCache.getConfig("timeDiscount");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameConfig, "purgatory", {
        /** 炼狱装备 */
        get: function () {
            return ConfigCache.getConfig("equipPurgatory");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameConfig, "purgatoryResonate", {
        /** 炼狱共鸣 */
        get: function () {
            return ConfigCache.getConfig("equipPurgatoryAdd");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameConfig, "purgatoryResolve", {
        /** 炼狱分解  */
        get: function () {
            var cfg = ConfigCache.getConfig("equipPurgatoryResolve");
            return cfg;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameConfig, "xslb", {
        /**限时礼包 */
        get: function () {
            return ConfigCache.getConfig("timeGift");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameConfig, "purgatoryBoss", {
        /** 炼狱boss */
        get: function () {
            var cfg = ConfigCache.getConfig("PurgatoryBoss");
            return cfg;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameConfig, "activityCata", {
        /** 活动目录 */
        get: function () {
            var cfg = ConfigCache.getConfig("activityCata");
            return cfg;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameConfig, "fashionCopy", {
        /**时装副本 */
        get: function () {
            return ConfigCache.getConfig("fashionCopy");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameConfig, "familyCfg", {
        /** 公会 */
        get: function () {
            var cfg = ConfigCache.getConfig("family");
            return cfg[1];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameConfig, "familyLv", {
        /** 公会等级 */
        get: function () {
            var cfg = ConfigCache.getConfig("familyLv");
            return cfg;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameConfig, "familySys", {
        /**公会功能 */
        get: function () {
            var cfg = ConfigCache.getConfig("FamilySys");
            return cfg;
        },
        enumerable: true,
        configurable: true
    });
    return GameConfig;
}());
__reflect(GameConfig.prototype, "GameConfig");
//# sourceMappingURL=GameConfig.js.map