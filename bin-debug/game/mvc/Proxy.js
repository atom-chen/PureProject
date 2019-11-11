/*
 * @Description: 通信
 * @Author: guolinsen
 * @Date: 2019-08-21 19:44:11
 */
var Proxy;
(function (Proxy) {
    function init() {
        Proxy.login = new LoginProxy();
        Proxy.main = new MainProxy();
        Proxy.move = new MoveProxy();
        Proxy.other = new OtherProxy();
        Proxy.skill = new SkillProxy();
        Proxy.buff = new BuffProxy();
        Proxy.email = new EmailProxy();
        Proxy.suit = new SuitProxy();
        Proxy.gashapon = new GashaponProxy();
        Proxy.equip = new EquipProxy();
        Proxy.bag = new BagProxy();
        Proxy.daily = new DailyProxy();
        Proxy.transfer = new TransferProxy();
        Proxy.sign = new SignProxy();
        Proxy.adventure = new AdventureProxy();
        Proxy.chat = new ChatProxy();
        Proxy.quest = new QuestProxy();
        Proxy.drop = new DropProxy();
        Proxy.copy = new CopyProxy();
        Proxy.vip = new VipProxy();
        Proxy.rank = new RankProxy();
        Proxy.firstcharge = new FirstChargeProxy();
        Proxy.copytower = new CopyTowerProxy();
        Proxy.boss = new BossProxy();
        Proxy.pet = new PetProxy();
        Proxy.shop = new ShopProxy();
        Proxy.script = new ScriptProxy();
        Proxy.fashion = new FashionProxy();
        Proxy.wing = new WingProxy();
        Proxy.badge = new BadgeProxy();
        Proxy.totems = new TotemsProxy();
        Proxy.jewel = new JewelProxy();
        Proxy.rune = new RuneProxy();
        Proxy.purgatory = new PurgatoryProxy();
        Proxy.family = new FamilyProxy();
    }
    Proxy.init = init;
})(Proxy || (Proxy = {}));
//# sourceMappingURL=Proxy.js.map