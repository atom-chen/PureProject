class StdGlobalconfig { 
    /** 字段名 */
    id: number;
    /** 怪物掉落物品的刷新时间/ms */
    monsterItemRefreshTime: number;
    /** 最大邮件数量  */
    nMailMaxCount: number;
    /** 复活一个角色花费 */
    Rescount: number;
    /** 复活冷却时间 */
    ResTime: number;
    /** 最大离线收益时间 */
    offlineAddMaxHour: number;
    /** 金币鼓舞次数 */
    coinInspireCount: number;
    /** 金币鼓舞消耗 */
    coinInspireConsume: number;
    /** 钻石鼓舞次数 */
    goldInspireCount: number;
    /** 钻石鼓舞消耗 */
    goldInspireConsume: number;
    /** 鼓舞单次buff */
    buffid: any[] = [];
    /** 每日签到最大签到次数 */
    signNeed: number;
    /** 累计签到次数 */
    CumulativeSignNeed: number;
    /** 最小暴击率 */
    CRIT_MIN: number;
    /** 最大暴击率 */
    CRIT_MAX: number;
    /** 防御系数 */
    DEF: number;
    /** 暴击倍率 */
    CRIT_RATE: number;
    /** 伤害浮动 上下 */
    DMG_FLOAT: number;
    /** 世界BOSS购买次数单价 */
    worldBossCons: number;
    /** 世界BOSS基础次数 */
    worldBossNum: number;
    /** 排行榜显示个数 */
    nRankingListMaxSize: number;
    /** 聊天输入字符限制 */
    enterLimit: number;
    /** 个人BOSS一件扫荡等级限制 */
    personalBossLimit: number;
    /** 炼狱-挑战次数 */
    PurgatoryChallenge: number;
    /** 炼狱-挑战次数恢复时间 */
    PurgatoryRecovery: number;
    /** 炼狱购买消耗 */
    PurgatoryCons: number;
    /** 时装副本基础购买单价 */
    fashionCopyBuyPrice: number;
    /** 时装副本ID */
    fashionCopyId: number;
    /** 翅膀BOSS免费次数 */
    wingBOSSFreeTime: number;
    /** 翅膀BOSS钻石消耗 */
    wingBOSSCons: any;
    /** 翅膀BOSS道具消耗 */
    wingBOSSItem: any;
    /** 宠物BOSS免费次数 */
    petBOSSFreeTime: number;
    /** 宠物BOSS钻石消耗 */
    petBOSSCons: any;
    /** 宠物BOSS道具消耗 */
    petBOSSItem: any;
    /** 坐骑BOSS免费次数 */
    mountBOSSFreeTime: number;
    /** 坐骑BOSS钻石消耗 */
    mountBOSSCons: any;
    /** 坐骑BOSS道具消耗 */
    mountBOSSItem: any;
}