/**
 * 任务奖励类型
 */
class QuestAwType {
    public static QA_ITEM: number = 0;//物品
    public static QA_EXP: number = 2;//角色经验值
    public static QA_GUILD_CONTRIBUTION: number = 3;//帮派贡献值
    public static QA_BIND_MONEY: number = 5;//绑定银两
    public static QA_MONEY: number = 6;//银两
    public static QA_GIFT: number = 7;//礼券
    public static QA_TITLE: number = 8;//称谓
    public static QA_ACHIEVE_POnumber: number = 11;//成就点
    public static QA_YB: number = 15;//元宝
    public static QA_Add_Exp: number = 20;//按经验配置表加经验 id:奖励库ID count:普通加成率 quality:vip加成率 加成率使用以1000为基数的整形 即n/1000
    public static QA_HONOR: number = 21;  //荣誉奖励
    public static QA_CIRCLE: number = 22;   //转生的灵魄

    public static QA_Guild_Coin: number = 27;//行会资金
    public static QA_numberimacy: number = 28;	//师徒亲密度
    public static QA_HeroExp: number = 30;	//英雄经验
    public static QA_MagicPower: number = 34;	//灵力
    public static QA_Service_Coin: number = 35;///战勋

    public static QA_Soul: number = 41;//兽魂
    public static QA_King: number = 42;//王者之气
    public static QA_CardSoul: number = 43;//卡魂
    public static QA_CardDes: number = 44;//卡牌命运

    public static QA_Medal: number = 45;//勋章
    public static QA_Official: number = 47;   //功勋
    public static QA_HERO_CIRCLE: number = 49;   //英雄转生值

    public static QA_MELTING_SCORE: number = 53;   //熔炼积分

    public static QA_USER_DEFINED: number = 127;//自定义奖励

}