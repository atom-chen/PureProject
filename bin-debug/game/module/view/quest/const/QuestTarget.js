var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
//tolua_begin
// 任务目标类型
var TaskTargetType;
(function (TaskTargetType) {
    // 不记录的
    TaskTargetType[TaskTargetType["enTask_Talk"] = 0] = "enTask_Talk";
    TaskTargetType[TaskTargetType["enTask_KillMonster"] = 1] = "enTask_KillMonster";
    TaskTargetType[TaskTargetType["enTask_ClientTask"] = 2] = "enTask_ClientTask";
    TaskTargetType[TaskTargetType["enTask_EnterScene"] = 3] = "enTask_EnterScene";
    TaskTargetType[TaskTargetType["enTask_RecycleEquip"] = 4] = "enTask_RecycleEquip";
    TaskTargetType[TaskTargetType["enTask_RuneUpgrade"] = 5] = "enTask_RuneUpgrade";
    TaskTargetType[TaskTargetType["enTask_WingUpgrade"] = 6] = "enTask_WingUpgrade";
    TaskTargetType[TaskTargetType["enTask_DiamondUpgrade"] = 7] = "enTask_DiamondUpgrade";
    TaskTargetType[TaskTargetType["enTask_PetUpgrade"] = 8] = "enTask_PetUpgrade";
    TaskTargetType[TaskTargetType["enTask_TotemUpgrade"] = 9] = "enTask_TotemUpgrade";
    TaskTargetType[TaskTargetType["enTask_SkillUpgrade"] = 10] = "enTask_SkillUpgrade";
    TaskTargetType[TaskTargetType["enTask_Suit"] = 11] = "enTask_Suit";
    TaskTargetType[TaskTargetType["enTask_Strong"] = 12] = "enTask_Strong";
    TaskTargetType[TaskTargetType["enTask_Refine"] = 13] = "enTask_Refine";
    TaskTargetType[TaskTargetType["enTask_Arena"] = 14] = "enTask_Arena";
    TaskTargetType[TaskTargetType["enTask_Fashion"] = 15] = "enTask_Fashion";
    TaskTargetType[TaskTargetType["enTask_NoCntMax"] = 50] = "enTask_NoCntMax";
    TaskTargetType[TaskTargetType["enTask_ChkToLvl"] = 51] = "enTask_ChkToLvl";
    TaskTargetType[TaskTargetType["enTask_StrongToLvl"] = 52] = "enTask_StrongToLvl";
    TaskTargetType[TaskTargetType["enTask_RuneToLvl"] = 53] = "enTask_RuneToLvl";
    TaskTargetType[TaskTargetType["enTask_WingToLvl"] = 54] = "enTask_WingToLvl";
    TaskTargetType[TaskTargetType["enTask_RefineToLvl"] = 55] = "enTask_RefineToLvl";
    TaskTargetType[TaskTargetType["enTask_DiamondToLvl"] = 56] = "enTask_DiamondToLvl";
    TaskTargetType[TaskTargetType["enTask_PetToLvl"] = 57] = "enTask_PetToLvl";
    TaskTargetType[TaskTargetType["enTask_TotemToLvl"] = 58] = "enTask_TotemToLvl";
    TaskTargetType[TaskTargetType["enTask_BadgeToLvl"] = 59] = "enTask_BadgeToLvl";
    TaskTargetType[TaskTargetType["enTask_SkillToLvl"] = 60] = "enTask_SkillToLvl";
    TaskTargetType[TaskTargetType["enTask_PetStageToLvl"] = 61] = "enTask_PetStageToLvl";
    TaskTargetType[TaskTargetType["enTask_TowerToLvl"] = 62] = "enTask_TowerToLvl";
    TaskTargetType[TaskTargetType["enTask_AddValMax"] = 100] = "enTask_AddValMax";
    TaskTargetType[TaskTargetType["enTask_KillBoss"] = 100] = "enTask_KillBoss";
    TaskTargetType[TaskTargetType["enTask_JoinInArean"] = 101] = "enTask_JoinInArean";
    TaskTargetType[TaskTargetType["enTask_FinishFuben"] = 102] = "enTask_FinishFuben";
    TaskTargetType[TaskTargetType["enTask_ActiveTotem"] = 103] = "enTask_ActiveTotem";
    TaskTargetType[TaskTargetType["enTask_WearFashion"] = 104] = "enTask_WearFashion";
    TaskTargetType[TaskTargetType["enTask_AddHero"] = 105] = "enTask_AddHero";
    TaskTargetType[TaskTargetType["enTask_DiamondLevelUp"] = 106] = "enTask_DiamondLevelUp";
    TaskTargetType[TaskTargetType["enTask_PetLevelUp"] = 107] = "enTask_PetLevelUp";
    TaskTargetType[TaskTargetType["enTask_Max"] = 108] = "enTask_Max";
})(TaskTargetType || (TaskTargetType = {}));
;
var QuestTarget = (function () {
    function QuestTarget() {
    }
    return QuestTarget;
}());
__reflect(QuestTarget.prototype, "QuestTarget");
//# sourceMappingURL=QuestTarget.js.map