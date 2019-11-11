var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ThingKind = (function () {
    function ThingKind() {
    }
    ThingKind.initIndex = function () {
        this.IndexDic = (_a = {},
            _a[this.Hero] = 100,
            _a[this.Human] = 90,
            _a[this.Monster] = 50,
            _a[this.Npc] = 10,
            _a);
        var _a;
    };
    ThingKind.getIndexByKind = function (kind) {
        if (this.IndexDic[kind])
            return this.IndexDic[kind];
        return 80;
    };
    /**
     * 是hi人类 啊
     * @param race
     * @return
     *
     */
    ThingKind.isHuman = function (race) {
        return race == ThingKind.Human || race == ThingKind.HeroPet;
    };
    /**
     * 是否宠物
     * @param race
     * @return
     *
     */
    ThingKind.isPet = function (race) {
        return race == ThingKind.Pet;
    };
    /**
    * 是否怪物
    * @param race
    * @return
    *
    */
    ThingKind.isMonster = function (race) {
        return race == ThingKind.Monster || race == ThingKind.Collectable || race == ThingKind.DisplayMonster ||
            race == ThingKind.MonsterHorse || race == ThingKind.MonsterOneDir;
    };
    /**
     * 是否英雄
     * @param race
     * @return
     *
     */
    ThingKind.isHero = function (race) {
        return race == ThingKind.Hero;
    };
    /**
    * 是否建筑怪
    * @param race
    * @return
    *
    */
    ThingKind.isBuildMonster = function (race) {
        return race == ThingKind.BuildMonster;
    };
    /**
     * 是hi人形怪物 啊
     * @param race
     * @return
     *
     */
    ThingKind.isMonsterHuman = function (race) {
        return race == ThingKind.MonsterHuman;
    };
    //判断是否NPC
    ThingKind.isNPC = function (Race) {
        return Race == ThingKind.Npc || Race == ThingKind.MovingNPC;
    };
    //判断是否是不可进行攻击操作的对象（采集怪、图腾或踩踏怪）
    ThingKind.isNoneAttackObject = function (Race) {
        return (Race == ThingKind.Collectable);
    };
    //判断是否是采集对象 
    ThingKind.isCollectObject = function (Race) {
        return (Race == ThingKind.Collectable);
    };
    ThingKind.isTransfer = function (Race) {
        return (Race == ThingKind.Transfer);
    };
    ThingKind.isHumanModel = function (race) {
        return race == ThingKind.Human || race == ThingKind.Hero || race == ThingKind.HeroPet;
    };
    //动物
    ThingKind.Hero = -1; //玩家自己的角色
    ThingKind.Human = 0; //人类玩家
    ThingKind.Monster = 1; //怪物，具有战斗功能
    ThingKind.Npc = 2; //NPC,继承于Monster，有会话功能,战斗功能
    //功能
    ThingKind.MovingNPC = 3; //寻路的怪，继承于NPC,比如卫兵，具有会话,战斗功能,寻路功能
    ThingKind.Pet = 4; //宠物
    //生物中的非动物
    //		 Totem:number = 5;//图腾
    ThingKind.Mine = 6; //矿物，采集对象
    ThingKind.Defender = 7; //防御设施,采集对象
    ThingKind.Plant = 8; //植物,采集对象
    //非生物，包括传送门，建筑，技能效果等
    ThingKind.Transfer = 9; //传送门
    ThingKind.Building = 10; //建筑
    ThingKind.Effects = 11; //特效，后面的伤害性的一些特效
    //采集怪
    ThingKind.Collectable = 12; //采集怪
    //
    ThingKind.DisplayMonster = 13; //显示怪，如：炸药包
    ThingKind.HeroPet = 14; //英雄
    ThingKind.Totem = 15; //图腾
    //人形怪物
    ThingKind.MonsterHuman = 16; //用人物相关的模型
    //马车 拉镖的
    ThingKind.MonsterHorse = 17;
    //只有一个方向,不会移动的怪物
    ThingKind.MonsterOneDir = 18;
    //真正的宠物,不能被选中,不显示血条
    ThingKind.PetFollow = 19;
    //建筑怪,点击后下发怪物handler
    ThingKind.BuildMonster = 20;
    //构建前端句柄用
    ThingKind.ClientRecog = 25;
    ThingKind.Novice = 999;
    //这里也定义下怪物的职位MP   MonsterPositions
    ThingKind.MP_PT = 1; //普通
    ThingKind.MP_JY = 2; //精英
    ThingKind.MP_TM = 3; //头目
    ThingKind.MP_SL = 4; //首领
    ThingKind.MP_SW = 5; //守卫
    return ThingKind;
}());
__reflect(ThingKind.prototype, "ThingKind");
//# sourceMappingURL=ThingKind.js.map