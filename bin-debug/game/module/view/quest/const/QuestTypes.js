var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var QuestTypes = (function () {
    function QuestTypes() {
    }
    //任务的大分类
    QuestTypes.CLASS_DOING = 1; //当前
    QuestTypes.CLASS_AVAILABLE = 2; //可接
    QuestTypes.MAIN = 0; //主线任务
    QuestTypes.BRANCH = 1; //支线任务    //支线任务要放在最后面
    QuestTypes.CARBON = 2; //副本任务
    QuestTypes.DAILY = 3; //日常任务
    QuestTypes.GUILD = 4; //帮派任务
    QuestTypes.CHANLLENGE = 5; //挑战任务
    QuestTypes.ADVENTURE = 6; //奇遇任务
    QuestTypes.ACTIVITY = 7; //活动推介
    QuestTypes.CAMP = 8; //阵营任务
    QuestTypes.EQUIP = 9; //装备提升任务
    QuestTypes.EXP = 10; //经验任务
    QuestTypes.GOLD = 11; //金币任务
    QuestTypes.REFRESHQUEST = 12; //天书任务
    QuestTypes.CHECKPOINTS = 13; //财富闯关任务
    QuestTypes.TREASURE_PIC = 14; //宝图任务 //add by likeky
    QuestTypes.FB_CAILIAO = 100; //材料副本导航
    QuestTypes.FB_EXP = 101; //经验副本导航
    // static QUEST_TYPE_LIST:Array = 
    // 										[
    // 											MAIN,												
    // 											CARBON,
    // 											DAILY,
    // 											GUILD,
    // 											CHANLLENGE,
    // 											ADVENTURE,
    // 											ACTIVITY,
    // 											CAMP,
    // 											EQUIP,
    // 											EXP,
    // 											GOLD,
    // 											BRANCH,
    // 											REFRESHQUEST,
    // 											CHECKPOINTS,
    // 											TREASURE_PIC,
    // 											FB_CAILIAO,
    // 											FB_EXP
    // 										];
    QuestTypes.SHOWAWARDS = 1; //任务显示奖励
    return QuestTypes;
}());
__reflect(QuestTypes.prototype, "QuestTypes");
//# sourceMappingURL=QuestTypes.js.map