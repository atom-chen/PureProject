var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/*
 * @Description:事件类型
 * @Author: guolinsen
 * @Date: 2019-08-22 21:36:55
 */
var MsgConst = (function () {
    function MsgConst() {
    }
    MsgConst.RESIZE_STAGE = "RESIZE_STAGE";
    /**登录返回角色列表*/
    MsgConst.GET_ROLELIST = "GET_ROLELIST";
    /**重新连接服务器*/
    MsgConst.RECONNECTED = "RECONNECTED";
    /**创角失败错误码*/
    MsgConst.CREATE_ROLE_ERROR = "CREATE_ROLE_ERROR";
    /**属性变更 + 属性id*/
    MsgConst.PROPERTY = "PROPERTY";
    /**主角创建完成*/
    MsgConst.LOGIN_INIT = "LOGIN_INIT";
    /**变化焦点角色*/
    MsgConst.FOCUS_CHANGE = "FOCUS_CHANGE";
    /**创建其他thing*/
    MsgConst.CREATE_THING = "CREATE_THING";
    /**进入场景*/
    MsgConst.ENTER_SCENE = "ENTER_SCENE";
    /**场景元素更新*/
    MsgConst.UPDATE_SCENE_MAPITEM = "UPDATE_SCENE_MAPITEM";
    /**假战斗中击杀一个实体*/
    MsgConst.BATTLE_KILL = "BATTLE_KILL";
    /**人物死亡 */
    MsgConst.HERO_DIE = "HERO_DIE";
    /**增加了新英雄*/
    MsgConst.NEW_HERO = "NEW_HERO";
    /**buff**/
    MsgConst.BUFF_UPDATE = "BUFF_UPDATE";
    /**冒险**/
    /**冒险等级更新*/
    MsgConst.ADVENTURE_UPDATE_LV = "ADVENTURE_UPDATE_LV";
    /**冒险单个更新*/
    MsgConst.ADVENTURE_UPDATE_SINGLE = "ADVENTURE_UPDATE_SINGLE";
    /***任务***/
    /**正在进行中的任务*/
    MsgConst.QUEST_INIT_DOING = "QUEST_INIT_DOING";
    /**删除一个进行中的任务*/
    MsgConst.QUEST_DELETE_DOING = "QUEST_DELETE_DOING";
    /**可接任务*/
    MsgConst.QUEST_INIT_AVAILABLE = "QUEST_INIT_AVAILABLE";
    /**删除一个可接任务*/
    MsgConst.QUEST_DELETE_AVAILABLE = "QUEST_DELETE_AVAILABLE";
    /**任务进度更新*/
    MsgConst.QUEST_PROGRESS = "QUEST_PROGRESS";
    /**主线任务刷新*/
    MsgConst.QUEST_REFRESH_MAIN = "QUEST_REFRESH_MAIN";
    /***邮件***/
    /**列表刷新*/
    MsgConst.EMAIL_REFRESH = "EMAIL_REFRESH";
    /**单个更新*/
    MsgConst.EMAIL_UPDATE = "EMAIL_UPDATE";
    /***装备***/
    /**装备信息 */
    MsgConst.EQUIP_INFO = "EQUIP_INFO";
    /**装备属性变更 */
    MsgConst.EQUIP_ATTR_CHANGE = "EQUIP_ATTR_CHANGE";
    /**装备强化 */
    MsgConst.EQUIP_STRENGTH = "EQUIP_STRENGTH";
    /**装备精炼 */
    MsgConst.EQUIP_REFINE = "EQUIP_REFINE";
    /** 炼狱装备 */
    MsgConst.EQUIP_PURGATORY = "EQUIP_PURGATORY";
    /**技能 */
    MsgConst.SKILL_INFO = "SKILL_INFO";
    /**技能排序 */
    MsgConst.SKILL_SORT = "SKILL_SORT";
    /**套装 */
    MsgConst.SUIT_INFO = "SUIT_INFO";
    /**套装分解 */
    MsgConst.SUIT_RESOLVE = "SUIT_RESOLVE";
    /**套装兑换 */
    MsgConst.SUIT_CHANGE = "SUIT_CHANGE";
    /**转职内容 */
    MsgConst.TRANSFER_INFO = "TRANSFER_INFO";
    /**商城 */
    MsgConst.SHOP_INFO = "SHOP_INFO";
    /**排行榜 */
    MsgConst.RANK_INFO = "RANK_INFO";
    /**宠物 */
    MsgConst.PET_INFO = "PET_INFO";
    /**激活宠物 */
    MsgConst.PET_ACTIVATE = "PET_ACTIVATE";
    /**日常 */
    MsgConst.DAILY = "DAILY";
    /**冒险 */
    MsgConst.ADVENTURE = "ADVENTURE";
    /**vip 特权卡时间 */
    MsgConst.VIP_CARD_TIME = "VIP_CARD_TIME";
    /**vip 特权卡时间 */
    MsgConst.VIP_CARD = "VIP_CARD";
    /**vip 福利内容 */
    MsgConst.VIP_WELFARE = "VIP_WELFARE";
    /**首冲 */
    MsgConst.FIRST_CHARGE = "FIRST_CHARGE";
    /**副本 */
    MsgConst.CPOY_TOWER = "CPOY_TOWER";
    MsgConst.CPOY_TOWER_LUCK = "CPOY_TOWER_LUCK";
    MsgConst.CPOY_TOWER_RANK = "CPOY_TOWER_RANK";
    MsgConst.COPY_EVALUATION = "COPY_EVALUATION";
    MsgConst.COPY_COUNT = "COPY_COUNT";
    MsgConst.COPY_TIME = "COPY_TIME";
    MsgConst.COPY_BUFF_COUNT = "COPY_BUFF_COUNT";
    MsgConst.COPY_EXP_TIME = "COPY_EXP_TIME";
    MsgConst.COPY_EXP_WAVE = "COPY_EXP_WAVE";
    MsgConst.COPY_EXP_INCOME = "COPY_EXP_INCOME";
    /***背包***/
    /**背包物品信息 */
    MsgConst.BAG_INFO = "BAG_INFO";
    /**物品数量变化 */
    MsgConst.BAG_ITEM_NUM = "BAG_ITEM_NUM";
    /**背包格子拓展 */
    MsgConst.BAG_EXPAND = "BAG_EXPAND";
    /**背包回收 */
    MsgConst.BAG_RECYCLE = "BAG_RECYCLE";
    /**闯关*/
    /**BOSS信息 */
    MsgConst.BOSS_INFO = "BOSS_INFO";
    /**世界BOSS进入次数 */
    MsgConst.WORLDBOSS_COUNT = "WORLDBOSS_COUNT";
    /**boss排行 */
    MsgConst.BOSS_RANK_INFO = "BOSS_RANK_INFO";
    /**BOSS个人排行 */
    MsgConst.BOSS_MYRANK = "BOSS_MYRANK";
    /**时装 */
    MsgConst.FASHION_INFO = "FASHION_INFO";
    /**时装试穿 */
    MsgConst.FASHION_TRY = "FASHION_TRY";
    /**时装购买 */
    MsgConst.FASHION_BUY = "FASHION_BUY";
    /**时装卸下 */
    MsgConst.FASHION_TAKE_OFF = "FASHION_TAKE_OFF";
    /**获得时装 */
    MsgConst.FASHION_GET = "FASHION_GET";
    /**删除时装 */
    MsgConst.FASHION_DELETE = "FASHION_DELETE";
    /**服务器时间改变 */
    MsgConst.SERVER_TIME_CHANGE = "SERVER_TIME_CHANGE";
    /**翅膀 */
    MsgConst.WING_INFO = "WING_INFO";
    /**扭蛋 */
    MsgConst.GASHAPON = "GASHAPON";
    /**扭蛋仓库 */
    MsgConst.GASHAPON_BAG = "GASHAPON_BAG";
    /**扭蛋单抽结果 */
    MsgConst.GASHAPON_ONE_GET = "GASHAPON_ONE_GET";
    /**扭蛋多抽结果 */
    MsgConst.GASHAPON_TEN_GET = "GASHAPON_TEN_GET";
    /**图腾 */
    MsgConst.TOTEMS_INFO = "TOTEMS_INFO";
    /**图腾共鸣 */
    MsgConst.TOTEMS_RESONANCE = "TOTEMS_RESONANCE";
    /**竞技场个人数据 */
    MsgConst.JINGJI_PERSONAL_DATA = "JINGJI_PERSONAL_DATA";
    /**竞技场目标列表 */
    MsgConst.JINGJI_LIST = "JINGJI_LIST";
    /**竞技场目标详细数据 */
    MsgConst.JINGJI_DETAIL = "JINGJI_DETAIL";
    /**竞技场排行榜数据 */
    MsgConst.JINGJI_RANK = "JINGJI_RANK";
    /**宝石背包 */
    MsgConst.JEWEL_BAG = "JEWEL_BAG";
    /**人物宝石 */
    MsgConst.JEWEL_LIST = "JEWEL_LIST";
    /**符碑 */
    MsgConst.RUNE_INFO = "RUNE_INFO";
    /**聊天 */
    MsgConst.CHAT_INFO = "CHAT_INFO";
    /**系统消息 */
    MsgConst.SYS_INFO_MESSAGE = "SYS_INFO_MESSAGE";
    /**物品炫耀 */
    MsgConst.CHAT_SHOWOFF = "CHAT_SHOWOFF";
    /**限时优惠 */
    MsgConst.XSYH_INFO = "XSYH_INFO";
    /**限时优惠购买成功 */
    MsgConst.XSYH_BUY_SUCCESS = "XSYH_BUY_SUCCESS";
    /**闯关排行 */
    MsgConst.PASS_RANK_INFO = "PASS_RANK_INFO";
    /** 炼狱boss信息更新 */
    MsgConst.PURGATORY_BOSS_UPDATE = "PURGATORY_BOSS_UPDATE";
    /** 家族信息更新 */
    MsgConst.FAMILY_INFO_UPDATE = "FAMILY_INFO_UPDATE";
    /** 家族列表信息更新 */
    MsgConst.FAMILY_LIST_UPDATE = "FAMILY_LIST_UPDATE";
    /** 家族成员列表信息更新 */
    MsgConst.FAMILY_MEM_UPDATE = "FAMILY_MEM_UPDATE";
    /** 家族申请列表信息更新 */
    MsgConst.FAMILY_APPLY_UPDATE = "FAMILY_APPLY_UPDATE";
    /**时装副本信息 */
    MsgConst.FASHION_COPY = "FASHION_COPY";
    return MsgConst;
}());
__reflect(MsgConst.prototype, "MsgConst");
//# sourceMappingURL=MsgConst.js.map