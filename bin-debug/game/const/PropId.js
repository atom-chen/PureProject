/*
 * @Description:  实体属性索引表
 * @Author: guolinsen
 * @Date: 2019-08-15 15:16:16
 * @LastEditTime: 2019-10-24 16:15:59
 */
var PropId;
(function (PropId) {
    PropId[PropId["AP_ACTOR_ID"] = 0] = "AP_ACTOR_ID";
    PropId[PropId["AP_X"] = 1] = "AP_X";
    PropId[PropId["AP_Y"] = 2] = "AP_Y";
    PropId[PropId["AP_BODY_ID"] = 3] = "AP_BODY_ID";
    PropId[PropId["AP_FACE_ID"] = 4] = "AP_FACE_ID";
    PropId[PropId["AP_DIR"] = 5] = "AP_DIR";
    PropId[PropId["AP_LEVEL"] = 6] = "AP_LEVEL";
    PropId[PropId["AP_HP"] = 7] = "AP_HP";
    PropId[PropId["AP_STATE"] = 8] = "AP_STATE";
    PropId[PropId["AP_BODY_COLOR"] = 9] = "AP_BODY_COLOR";
    PropId[PropId["AP_MAX_HP"] = 10] = "AP_MAX_HP";
    PropId[PropId["AP_ATTACK"] = 11] = "AP_ATTACK";
    PropId[PropId["AP_DEFENCE"] = 12] = "AP_DEFENCE";
    PropId[PropId["AP_CRIT"] = 13] = "AP_CRIT";
    PropId[PropId["AP_UNCRIT"] = 14] = "AP_UNCRIT";
    PropId[PropId["AP_CRIT_HURT"] = 15] = "AP_CRIT_HURT";
    PropId[PropId["AP_DAMAGE_INC"] = 16] = "AP_DAMAGE_INC";
    PropId[PropId["AP_DAMAGE_DEC"] = 17] = "AP_DAMAGE_DEC";
    PropId[PropId["AP_DAMAGE_EXT"] = 18] = "AP_DAMAGE_EXT";
    PropId[PropId["AP_HITVALUE"] = 19] = "AP_HITVALUE";
    PropId[PropId["AP_DOGVALUE"] = 20] = "AP_DOGVALUE";
    PropId[PropId["AP_MOVE_SPEED"] = 21] = "AP_MOVE_SPEED";
    PropId[PropId["AP_ATTACK_SPEED"] = 22] = "AP_ATTACK_SPEED";
    //玩家的属性
    PropId[PropId["AP_WEAPON"] = 23] = "AP_WEAPON";
    PropId[PropId["AP_MOUNT"] = 24] = "AP_MOUNT";
    PropId[PropId["AP_SWING"] = 25] = "AP_SWING";
    PropId[PropId["AP_HAIR"] = 26] = "AP_HAIR";
    PropId[PropId["AP_HAT"] = 27] = "AP_HAT";
    PropId[PropId["AP_EYE"] = 28] = "AP_EYE";
    PropId[PropId["AP_GLASSES"] = 29] = "AP_GLASSES";
    PropId[PropId["AP_PANTS"] = 30] = "AP_PANTS";
    PropId[PropId["AP_ASSIST"] = 31] = "AP_ASSIST";
    PropId[PropId["AP_BACK"] = 32] = "AP_BACK";
    PropId[PropId["AP_SEX"] = 33] = "AP_SEX";
    PropId[PropId["AP_JOB"] = 34] = "AP_JOB";
    PropId[PropId["AP_BATTLE_POWER"] = 35] = "AP_BATTLE_POWER";
    PropId[PropId["AP_PK_MOD"] = 36] = "AP_PK_MOD";
    PropId[PropId["AP_EXP"] = 37] = "AP_EXP";
    PropId[PropId["AP_PK_VALUE"] = 39] = "AP_PK_VALUE";
    PropId[PropId["AP_BAG_GRID_COUNT"] = 40] = "AP_BAG_GRID_COUNT";
    PropId[PropId["AP_BIND_COIN"] = 41] = "AP_BIND_COIN";
    PropId[PropId["AP_COIN"] = 42] = "AP_COIN";
    PropId[PropId["AP_BIND_YUANBAO"] = 43] = "AP_BIND_YUANBAO";
    PropId[PropId["AP_YUANBAO"] = 44] = "AP_YUANBAO";
    PropId[PropId["AP_GUILD_ID"] = 45] = "AP_GUILD_ID";
    PropId[PropId["AP_TEAM_ID"] = 46] = "AP_TEAM_ID";
    PropId[PropId["AP_SOCIALMASK"] = 47] = "AP_SOCIALMASK";
    PropId[PropId["AP_GUILDEXP"] = 48] = "AP_GUILDEXP";
    PropId[PropId["AP_MOUNT_EXP"] = 49] = "AP_MOUNT_EXP";
    PropId[PropId["AP_MAX_EXP"] = 50] = "AP_MAX_EXP";
    PropId[PropId["AP_ACIEVEPOINT"] = 52] = "AP_ACIEVEPOINT";
    PropId[PropId["AP_VIP_TEMPROARY"] = 53] = "AP_VIP_TEMPROARY";
    PropId[PropId["AP_ACTIVITY"] = 54] = "AP_ACTIVITY";
    PropId[PropId["AP_DRAW_YB_COUNT"] = 55] = "AP_DRAW_YB_COUNT";
    //AP_CIRCLE_TITLE_LEVEL,					//转生阶
    //AP_CIRCLE_TITLE_STAR,					//转生星
    PropId[PropId["AP_DEPORT_GRID_COUNT"] = 56] = "AP_DEPORT_GRID_COUNT";
    PropId[PropId["AP_CHECKINS"] = 57] = "AP_CHECKINS";
    PropId[PropId["AP_RIDE_LEVEL"] = 58] = "AP_RIDE_LEVEL";
    PropId[PropId["AP_RIDE_BATTLE"] = 59] = "AP_RIDE_BATTLE";
    PropId[PropId["AP_CURNEWTITLE"] = 60] = "AP_CURNEWTITLE";
    PropId[PropId["AP_SIGNIN"] = 61] = "AP_SIGNIN";
    PropId[PropId["AP_DEPOT_YB"] = 62] = "AP_DEPOT_YB";
    PropId[PropId["AP_DEPOT_COIN"] = 63] = "AP_DEPOT_COIN";
    PropId[PropId["AP_VIP_GRADE"] = 64] = "AP_VIP_GRADE";
    PropId[PropId["AP_VIP_POINT"] = 65] = "AP_VIP_POINT";
    PropId[PropId["AP_BAG_TIME"] = 66] = "AP_BAG_TIME";
    PropId[PropId["AP_AUTH_SCORE"] = 67] = "AP_AUTH_SCORE";
    PropId[PropId["AP_BE_KILLED_COUNT"] = 68] = "AP_BE_KILLED_COUNT";
    PropId[PropId["AP_KILL_MONSTER_COUNT"] = 69] = "AP_KILL_MONSTER_COUNT";
    PropId[PropId["AP_TOTAL_ONLINE_MIN"] = 70] = "AP_TOTAL_ONLINE_MIN";
    PropId[PropId["AP_CHKPOINT_LV"] = 71] = "AP_CHKPOINT_LV";
    PropId[PropId["AP_CHKPOINT_AWARD_LV"] = 72] = "AP_CHKPOINT_AWARD_LV";
    PropId[PropId["AP_ACTIVITY_AWARD_FLAG"] = 73] = "AP_ACTIVITY_AWARD_FLAG";
    PropId[PropId["AP_RISK_LVL"] = 74] = "AP_RISK_LVL";
    //=========不存DB=========
    PropId[PropId["AP_MOUNT_TYPE"] = 75] = "AP_MOUNT_TYPE";
    PropId[PropId["AP_ZY"] = 76] = "AP_ZY";
    PropId[PropId["AP_GM_LEVEL"] = 77] = "AP_GM_LEVEL";
    PropId[PropId["AP_RIDEONID"] = 78] = "AP_RIDEONID";
    PropId[PropId["AP_RIDE_STATE"] = 79] = "AP_RIDE_STATE";
    PropId[PropId["AP_DEFAULT_RIDE"] = 80] = "AP_DEFAULT_RIDE";
    PropId[PropId["AP_TEAMFUBEN_OUTPUT"] = 81] = "AP_TEAMFUBEN_OUTPUT";
    PropId[PropId["AP_TEAMFUBEN_TEAMID"] = 82] = "AP_TEAMFUBEN_TEAMID";
    PropId[PropId["AP_TEAMFUBEN_FBID"] = 83] = "AP_TEAMFUBEN_FBID";
    PropId[PropId["AP_REDPOINT_FLAG"] = 84] = "AP_REDPOINT_FLAG";
    PropId[PropId["AP_CJG_BOX_OPEN_TICK"] = 86] = "AP_CJG_BOX_OPEN_TICK";
    PropId[PropId["AP_GM_TITLE"] = 87] = "AP_GM_TITLE";
    PropId[PropId["AP_BADGE_LVL"] = 88] = "AP_BADGE_LVL";
    PropId[PropId["numProperties"] = 89] = "numProperties"; //属性的个数
})(PropId || (PropId = {}));
//# sourceMappingURL=PropId.js.map