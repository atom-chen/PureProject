/*
 * @Description: 数据
 * @Author: guolinsen
 * @Date: 2019-08-21 19:44:11
 */
var GameCache;
(function (GameCache) {
    function init() {
        GameCache.hero = new HeroCache();
        GameCache.map = new MapCache();
        GameCache.global = new GlobalCache();
        GameCache.server = new ServerCache();
        GameCache.settings = new SettingsCache();
        GameCache.novice = new NoviceCache();
        GameCache.skill = new SkillCache();
        GameCache.pet = new PetCache();
        GameCache.shop = new ShopCache();
        GameCache.email = new EmailCache();
        GameCache.suit = new SuitCache();
        GameCache.equip = new EquipCache();
        GameCache.bag = new BagCache();
        GameCache.gashapon = new GashaponCache();
        GameCache.buff = new BuffCache();
        GameCache.daily = new DailyCache();
        GameCache.transfer = new TransferCache();
        GameCache.sign = new SignCache();
        GameCache.adventure = new AdventrueCache();
        GameCache.quest = new QuestCache();
        GameCache.pass = new PassCache();
        GameCache.strength = new StrengthCache();
        GameCache.fashion = new FashionCache();
        GameCache.boss = new BossCache();
        GameCache.wing = new WingCache();
        GameCache.copy = new CopyCache();
        GameCache.vip = new VipCache();
        GameCache.rank = new RankCache();
        GameCache.revive = new ReviveCache();
        GameCache.firstcharge = new FirstChargeCache();
        GameCache.copytower = new CopyTowerCache();
        GameCache.badge = new BadgeCache();
        GameCache.totems = new TotemsCache();
        GameCache.jingji = new JingjiCache();
        GameCache.jewel = new JewelCache();
        GameCache.rune = new RuneCache();
        GameCache.sysopen = new SysOpenCache();
        GameCache.chat = new ChatCache();
        GameCache.activity = new ActivityCache();
        GameCache.purgatory = new PurgatoryCache();
        GameCache.award = new AwardCache();
        GameCache.pgtBoss = new PgtBossCache();
        GameCache.family = new FamilyCache();
    }
    GameCache.init = init;
})(GameCache || (GameCache = {}));
//# sourceMappingURL=GameCache.js.map