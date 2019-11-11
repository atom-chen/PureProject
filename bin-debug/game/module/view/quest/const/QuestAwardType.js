var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 任务奖励类型
 */
var QuestAwType = (function () {
    function QuestAwType() {
    }
    QuestAwType.QA_ITEM = 0; //物品
    QuestAwType.QA_EXP = 2; //角色经验值
    QuestAwType.QA_GUILD_CONTRIBUTION = 3; //帮派贡献值
    QuestAwType.QA_BIND_MONEY = 5; //绑定银两
    QuestAwType.QA_MONEY = 6; //银两
    QuestAwType.QA_GIFT = 7; //礼券
    QuestAwType.QA_TITLE = 8; //称谓
    QuestAwType.QA_ACHIEVE_POnumber = 11; //成就点
    QuestAwType.QA_YB = 15; //元宝
    QuestAwType.QA_Add_Exp = 20; //按经验配置表加经验 id:奖励库ID count:普通加成率 quality:vip加成率 加成率使用以1000为基数的整形 即n/1000
    QuestAwType.QA_HONOR = 21; //荣誉奖励
    QuestAwType.QA_CIRCLE = 22; //转生的灵魄
    QuestAwType.QA_Guild_Coin = 27; //行会资金
    QuestAwType.QA_numberimacy = 28; //师徒亲密度
    QuestAwType.QA_HeroExp = 30; //英雄经验
    QuestAwType.QA_MagicPower = 34; //灵力
    QuestAwType.QA_Service_Coin = 35; ///战勋
    QuestAwType.QA_Soul = 41; //兽魂
    QuestAwType.QA_King = 42; //王者之气
    QuestAwType.QA_CardSoul = 43; //卡魂
    QuestAwType.QA_CardDes = 44; //卡牌命运
    QuestAwType.QA_Medal = 45; //勋章
    QuestAwType.QA_Official = 47; //功勋
    QuestAwType.QA_HERO_CIRCLE = 49; //英雄转生值
    QuestAwType.QA_MELTING_SCORE = 53; //熔炼积分
    QuestAwType.QA_USER_DEFINED = 127; //自定义奖励
    return QuestAwType;
}());
__reflect(QuestAwType.prototype, "QuestAwType");
//# sourceMappingURL=QuestAwardType.js.map