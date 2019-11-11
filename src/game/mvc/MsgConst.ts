/*
 * @Description:事件类型
 * @Author: guolinsen
 * @Date: 2019-08-22 21:36:55
 */
class MsgConst {
    static RESIZE_STAGE: string = "RESIZE_STAGE";
    /**登录返回角色列表*/
    static GET_ROLELIST: string = "GET_ROLELIST";
    /**重新连接服务器*/
    static RECONNECTED: string = "RECONNECTED";
    /**创角失败错误码*/
    static CREATE_ROLE_ERROR: string = "CREATE_ROLE_ERROR";
    /**属性变更 + 属性id*/
    static PROPERTY: string = "PROPERTY";
    /**主角创建完成*/
    static LOGIN_INIT: string = "LOGIN_INIT";
    /**变化焦点角色*/
    static FOCUS_CHANGE: string = "FOCUS_CHANGE";
    /**创建其他thing*/
    static CREATE_THING: string = "CREATE_THING";
    /**进入场景*/
    static ENTER_SCENE: string = "ENTER_SCENE";
    /**场景元素更新*/
    static UPDATE_SCENE_MAPITEM: string = "UPDATE_SCENE_MAPITEM";
    /**假战斗中击杀一个实体*/
    static BATTLE_KILL: string = "BATTLE_KILL";
    /**人物死亡 */
    static HERO_DIE: string = "HERO_DIE";
    /**增加了新英雄*/
    static NEW_HERO: string = "NEW_HERO";

    /**buff**/
    static BUFF_UPDATE: string = "BUFF_UPDATE";

    /**冒险**/
    /**冒险等级更新*/
    static ADVENTURE_UPDATE_LV: string = "ADVENTURE_UPDATE_LV";
    /**冒险单个更新*/
    static ADVENTURE_UPDATE_SINGLE: string = "ADVENTURE_UPDATE_SINGLE";

    /***任务***/
    /**正在进行中的任务*/
    static QUEST_INIT_DOING: string = "QUEST_INIT_DOING";
    /**删除一个进行中的任务*/
    static QUEST_DELETE_DOING: string = "QUEST_DELETE_DOING";
    /**可接任务*/
    static QUEST_INIT_AVAILABLE: string = "QUEST_INIT_AVAILABLE";
    /**删除一个可接任务*/
    static QUEST_DELETE_AVAILABLE: string = "QUEST_DELETE_AVAILABLE";
    /**任务进度更新*/
    static QUEST_PROGRESS: string = "QUEST_PROGRESS";
    /**主线任务刷新*/
    static QUEST_REFRESH_MAIN: string = "QUEST_REFRESH_MAIN";

    /***邮件***/
    /**列表刷新*/
    static EMAIL_REFRESH: string = "EMAIL_REFRESH";
    /**单个更新*/
    static EMAIL_UPDATE: string = "EMAIL_UPDATE";

    /***装备***/
    /**装备信息 */
    static EQUIP_INFO: string = "EQUIP_INFO";
    /**装备属性变更 */
    static EQUIP_ATTR_CHANGE: string = "EQUIP_ATTR_CHANGE";
    /**装备强化 */
    static EQUIP_STRENGTH: string = "EQUIP_STRENGTH";
    /**装备精炼 */
    static EQUIP_REFINE: string = "EQUIP_REFINE";
    /** 炼狱装备 */
    static EQUIP_PURGATORY: string = "EQUIP_PURGATORY";

    /**技能 */
    static SKILL_INFO: string = "SKILL_INFO";
    /**技能排序 */
    static SKILL_SORT: string = "SKILL_SORT";


    /**套装 */
    static SUIT_INFO: string = "SUIT_INFO";
    /**套装分解 */
    static SUIT_RESOLVE: string = "SUIT_RESOLVE";
    /**套装兑换 */
    static SUIT_CHANGE: string = "SUIT_CHANGE";

    /**转职内容 */
    static TRANSFER_INFO: string = "TRANSFER_INFO";
    

    /**商城 */
    static SHOP_INFO: string = "SHOP_INFO";

    /**排行榜 */
    static RANK_INFO: string = "RANK_INFO";

    /**宠物 */
    static PET_INFO: string = "PET_INFO";
    /**激活宠物 */
    static PET_ACTIVATE: string = "PET_ACTIVATE";

    /**日常 */
    static DAILY: string = "DAILY";
    /**冒险 */
    static ADVENTURE: string = "ADVENTURE";

    /**vip 特权卡时间 */
    static VIP_CARD_TIME: string = "VIP_CARD_TIME";

    /**vip 特权卡时间 */
    static VIP_CARD: string = "VIP_CARD";

    /**vip 福利内容 */
    static VIP_WELFARE: string = "VIP_WELFARE";

    /**首冲 */
    static FIRST_CHARGE: string = "FIRST_CHARGE";

    /**副本 */
    static CPOY_TOWER: string = "CPOY_TOWER";
    static CPOY_TOWER_LUCK: string = "CPOY_TOWER_LUCK";
    static CPOY_TOWER_RANK: string = "CPOY_TOWER_RANK";
    static COPY_EVALUATION: string = "COPY_EVALUATION";
    static COPY_COUNT: string = "COPY_COUNT";
    static COPY_TIME: string = "COPY_TIME";
    static COPY_BUFF_COUNT: string = "COPY_BUFF_COUNT";
    static COPY_EXP_TIME: string = "COPY_EXP_TIME";
    static COPY_EXP_WAVE: string = "COPY_EXP_WAVE";
    static COPY_EXP_INCOME: string = "COPY_EXP_INCOME";

    /***背包***/
    /**背包物品信息 */
    static BAG_INFO: string = "BAG_INFO";
    /**物品数量变化 */
    static BAG_ITEM_NUM: string = "BAG_ITEM_NUM";
    /**背包格子拓展 */
    static BAG_EXPAND: string = "BAG_EXPAND";
    /**背包回收 */
    static BAG_RECYCLE: string = "BAG_RECYCLE";

    /**闯关*/

    /**BOSS信息 */
    static BOSS_INFO: string = "BOSS_INFO";
    /**世界BOSS进入次数 */
    static WORLDBOSS_COUNT: string = "WORLDBOSS_COUNT";
    /**boss排行 */
    static BOSS_RANK_INFO: string = "BOSS_RANK_INFO";
    /**BOSS个人排行 */
    static BOSS_MYRANK: string = "BOSS_MYRANK";

    /**时装 */
    static FASHION_INFO: string = "FASHION_INFO";
    /**时装试穿 */
    static FASHION_TRY: string = "FASHION_TRY";
    /**时装购买 */
    static FASHION_BUY: string = "FASHION_BUY";
    /**时装卸下 */
    static FASHION_TAKE_OFF: string = "FASHION_TAKE_OFF";
    /**获得时装 */
    static FASHION_GET: string = "FASHION_GET";
    /**删除时装 */
    static FASHION_DELETE: string = "FASHION_DELETE";

    /**服务器时间改变 */
    static SERVER_TIME_CHANGE: string = "SERVER_TIME_CHANGE";

    /**翅膀 */
    static WING_INFO: string = "WING_INFO";

    /**扭蛋 */
    static GASHAPON: string = "GASHAPON";
    /**扭蛋仓库 */
    static GASHAPON_BAG: string = "GASHAPON_BAG";
    /**扭蛋单抽结果 */
    static GASHAPON_ONE_GET: string = "GASHAPON_ONE_GET";
    /**扭蛋多抽结果 */
    static GASHAPON_TEN_GET: string = "GASHAPON_TEN_GET";

    /**图腾 */
    static TOTEMS_INFO: string = "TOTEMS_INFO";
    /**图腾共鸣 */
    static TOTEMS_RESONANCE: string = "TOTEMS_RESONANCE";

    /**竞技场个人数据 */
    static JINGJI_PERSONAL_DATA: string = "JINGJI_PERSONAL_DATA";
    /**竞技场目标列表 */
    static JINGJI_LIST: string = "JINGJI_LIST";
    /**竞技场目标详细数据 */
    static JINGJI_DETAIL: string = "JINGJI_DETAIL";
    /**竞技场排行榜数据 */
    static JINGJI_RANK: string = "JINGJI_RANK";

    /**宝石背包 */
    static JEWEL_BAG: string = "JEWEL_BAG";
    /**人物宝石 */
    static JEWEL_LIST: string = "JEWEL_LIST";

    /**符碑 */
    static RUNE_INFO: string = "RUNE_INFO";
    /**聊天 */
    static CHAT_INFO: string = "CHAT_INFO";
    /**系统消息 */
    static SYS_INFO_MESSAGE: string = "SYS_INFO_MESSAGE";
    /**物品炫耀 */
    static CHAT_SHOWOFF: string = "CHAT_SHOWOFF";

    /**限时优惠 */
    static XSYH_INFO: string = "XSYH_INFO";
    /**限时优惠购买成功 */
    static XSYH_BUY_SUCCESS: string = "XSYH_BUY_SUCCESS";

    /**闯关排行 */
    static PASS_RANK_INFO: string = "PASS_RANK_INFO";
    /** 炼狱boss信息更新 */
    static PURGATORY_BOSS_UPDATE: string = "PURGATORY_BOSS_UPDATE";
    /** 家族信息更新 */
    static FAMILY_INFO_UPDATE: string = "FAMILY_INFO_UPDATE";
    /** 家族列表信息更新 */
    static FAMILY_LIST_UPDATE: string = "FAMILY_LIST_UPDATE";
    /** 家族成员列表信息更新 */
    static FAMILY_MEM_UPDATE: string = "FAMILY_MEM_UPDATE";
    /** 家族申请列表信息更新 */
    static FAMILY_APPLY_UPDATE: string = "FAMILY_APPLY_UPDATE";

    /**时装副本信息 */
    static FASHION_COPY: string = "FASHION_COPY";
}