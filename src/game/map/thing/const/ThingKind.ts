class ThingKind {
    //动物
    static Hero: number = -1; //玩家自己的角色
    static Human: number = 0;//人类玩家
    static Monster: number = 1;//怪物，具有战斗功能
    static Npc: number = 2;//NPC,继承于Monster，有会话功能,战斗功能
    //功能
    static MovingNPC: number = 3;//寻路的怪，继承于NPC,比如卫兵，具有会话,战斗功能,寻路功能
    static Pet: number = 4;//宠物

    //生物中的非动物
    //		 Totem:number = 5;//图腾
    static Mine: number = 6;//矿物，采集对象
    static Defender: number = 7; //防御设施,采集对象
    static Plant: number = 8; //植物,采集对象
    //非生物，包括传送门，建筑，技能效果等
    static Transfer: number = 9;//传送门
    static Building: number = 10; //建筑
    static Effects: number = 11; //特效，后面的伤害性的一些特效
    //采集怪
    static Collectable: number = 12; //采集怪
    //
    static DisplayMonster: number = 13;//显示怪，如：炸药包

    static HeroPet: number = 14;//英雄
    static Totem: number = 15;//图腾

    //人形怪物
    static MonsterHuman: number = 16;  //用人物相关的模型

    //马车 拉镖的
    static MonsterHorse: number = 17;

    //只有一个方向,不会移动的怪物
    static MonsterOneDir: number = 18;

    //真正的宠物,不能被选中,不显示血条
    static PetFollow: number = 19;

    //建筑怪,点击后下发怪物handler
    static BuildMonster: number = 20;

    //构建前端句柄用
    static ClientRecog: number = 25;

    static Novice: number = 999;

    //这里也定义下怪物的职位MP   MonsterPositions
    static MP_PT: number = 1;  //普通
    static MP_JY: number = 2;  //精英
    static MP_TM: number = 3;  //头目
    static MP_SL: number = 4;  //首领
    static MP_SW: number = 5;  //守卫

    static IndexDic: any;
    public static initIndex() {
        this.IndexDic = {
            [this.Hero]: 100,
            [this.Human]: 90,
            [this.Monster]: 50,
            [this.Npc]: 10,
        };
    }
    public static getIndexByKind(kind: number): number {
        if (this.IndexDic[kind]) return this.IndexDic[kind];
        return 80;
    }
	/**
     * 是hi人类 啊
     * @param race
     * @return 
     * 
     */
    static isHuman(race: number): boolean {
        return race == ThingKind.Human || race == ThingKind.HeroPet;
    }

    /**
     * 是否宠物
     * @param race
     * @return 
     * 
     */
    static isPet(race: number): boolean {
        return race == ThingKind.Pet;
    }

    /**
    * 是否怪物
    * @param race
    * @return 
    * 
    */
    public static isMonster(race: number): boolean {
        return race == ThingKind.Monster || race == ThingKind.Collectable || race == ThingKind.DisplayMonster ||
            race == ThingKind.MonsterHorse || race == ThingKind.MonsterOneDir;
    }
    /**
     * 是否英雄
     * @param race
     * @return 
     * 
     */
    public static isHero(race: number): boolean {
        return race == ThingKind.Hero;
    }

    /**
    * 是否建筑怪 
    * @param race
    * @return 
    * 
    */
    public static isBuildMonster(race: number): boolean {
        return race == ThingKind.BuildMonster;
    }

    /**
     * 是hi人形怪物 啊
     * @param race
     * @return 
     * 
     */
    public static isMonsterHuman(race: number): boolean {
        return race == ThingKind.MonsterHuman;
    }

    //判断是否NPC
    public static isNPC(Race: number): boolean {
        return Race == ThingKind.Npc || Race == ThingKind.MovingNPC;
    }

    //判断是否是不可进行攻击操作的对象（采集怪、图腾或踩踏怪）
    public static isNoneAttackObject(Race: number): boolean {
        return (Race == ThingKind.Collectable);
    }

    //判断是否是采集对象 
    static isCollectObject(Race: number): boolean {
        return (Race == ThingKind.Collectable);
    }

    static isTransfer(Race: number): boolean {
        return (Race == ThingKind.Transfer)
    }

    static isHumanModel(race:number):boolean{
        return race == ThingKind.Human || race == ThingKind.Hero || race == ThingKind.HeroPet;
    }
}