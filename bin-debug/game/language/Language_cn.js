var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/*
 * @Description: 语言包，代码在游戏中呈现的文字都放在这里，除了图片
 * 文字里面含有变量的必须是这种格式
 * @Author: guolinsen
 * @Date: 2019-08-23 15:27:17
 */
var Language_cn = (function () {
    function Language_cn() {
    }
    Language_cn.jobName = ["通用", "勇士", "法师", "弓手"];
    /**主界面*/
    Language_cn.mainLvl = "<({1})等级> : <({2}){0}>";
    Language_cn.mainJob = "<({1})职业> : <({2}){0}>";
    Language_cn.mainPart = "<({1})部位> : <({2}){0}>";
    Language_cn.huode = "获得 {0}";
    Language_cn.coin = "金币";
    Language_cn.yb = "钻石";
    Language_cn.de = "{0}的{1}";
    /**创角错误码*/
    Language_cn.createRoleError = {
        "113": "选择服务器错误",
        "111": "职业参数错误",
        "110": "阵营参数错误",
        "109": "随机生成的名字已经分配完",
        "108": "性别与职业需求不符",
        "107": "角色不存在",
        "106": "客户端无匹配的路由数据的错误",
        "105": "客户端选择角色的常规错误",
        "104": "角色上一次保存数据出现异常",
        "103": "游戏逻辑服务器未启动",
        "102": "未发送查询包就开始创建角色",
        "100": "数据库插入角色信息出错",
        "1": "名称无效，名称中包含非法字符或超过6个字符",
        "2": "名称服务器数据库操作错误",
        "3": "名称服务器数据库调用错误",
        "4": "名称已被使用",
    };
    /**guolinsen*/
    Language_cn.adventrueMaxLv = "您已达到最高级";
    Language_cn.restTime = "剩余时间：{0}";
    Language_cn.signDay = "{0} 天";
    Language_cn.email_read_error1 = "背包已满，无法领取";
    Language_cn.email_read_error2 = "邮件不存在";
    Language_cn.email_read_error3 = "邮件无附件无法被领取";
    Language_cn.email_delete_error1 = "邮件有附件无法被删除";
    Language_cn.email_delete_error2 = "邮件不存在";
    Language_cn.email_title = "主题：{0}";
    Language_cn.sysOpen = "{0}开启";
    Language_cn.sysOpenError1 = "角色<(c0xFF0000){0}>级";
    Language_cn.sysOpenError2 = "VIP{0}";
    Language_cn.socket1 = "您的账号在其他设备上登录";
    Language_cn.socket2 = "已断开连接，是否重新连接？";
    Language_cn.socket3 = "正在重新连接...";
    Language_cn.socket4 = "无法连接服务器，请稍后重试";
    /**guolinsen*/
    /**liangzhaowei */
    Language_cn.suit1 = "装备等级不足";
    Language_cn.lcn1 = "已完成";
    Language_cn.lcn2 = "{0}级解锁";
    Language_cn.lcn3 = "第{0}层";
    Language_cn.lcn4 = "剩余次数：{0}";
    Language_cn.lcn5 = "迷雾之塔{0}层";
    Language_cn.lcn6 = "未上榜";
    Language_cn.lcn7 = "VIP{0}特权";
    Language_cn.lcn8 = "VIP{0}专享礼包";
    Language_cn.lcn9 = "免费VIP礼包";
    Language_cn.lcn10 = "(当前有效期:{0})";
    Language_cn.lcn11 = "当前有效期:永久";
    Language_cn.lcn12 = "{0}元";
    Language_cn.lcn13 = "复活倒计时:{0}";
    Language_cn.lcn14 = "无须复活";
    Language_cn.lcn15 = "请先激活宠物";
    Language_cn.lcn16 = "{0}星解锁";
    Language_cn.lcn17 = "已达限购次数";
    Language_cn.lcn18 = "完成{0}的任务";
    Language_cn.lcn19 = "开服{0}天";
    Language_cn.lcn20 = "等级: 1";
    Language_cn.lcn21 = "增加经验{0}";
    Language_cn.lcn22 = "今天可用<(c0x2aff00){0}次";
    Language_cn.lcn23 = "无可用次数";
    Language_cn.lcn24 = "剩余: {0}个";
    /**liangzhaowei */
    /**道具tips */
    Language_cn.getway = "获取途径";
    Language_cn.usLv = "{0}级";
    // static zdltitle = "战斗力";
    Language_cn.wearError = "您还未拥有该职业的角色";
    /**战力增加 */
    Language_cn.zdlPlus = "战斗力+ {0}";
    /**部位 */
    Language_cn.part = ["主武器", "副武器", "手套", "项链", "戒指", "饰品", "鞋子", "帽子", "衣服", "披风"];
    /**时装部位 */
    Language_cn.fashionPart = { 3: "衣服", 23: "主手", 25: "翅膀", 26: "发型", 27: "帽子", 28: "表情", 29: "眼镜", 30: "裤子", 31: "副手", 32: "背部" };
    /**阶描述 */
    Language_cn.jie = "{0}阶";
    Language_cn.jie_j = "{0}j";
    /**警告提示 */
    Language_cn.strengthLvlMax = "不能超过人物等级";
    Language_cn.strengthPart = "身上部位尚有空缺";
    Language_cn.exitWorldBoss = "是否退出世界BOSS";
    Language_cn.reChargeHint = "钻石不足，是否前往充值";
    /**价格、消耗、需要 */
    Language_cn.price = "<(c0xff5a00)价格 :>";
    Language_cn.lvlCondition = "{0}级开启";
    Language_cn.notEnought = "所需{0}不足";
    Language_cn.vipLvlHint = "提升VIP等级增加{0}";
    Language_cn.vipLvlMax = "VIP等级已达最高";
    /**时间 */
    Language_cn.reviveTime = "{0}后复活";
    Language_cn.resetTime = "{0}后恢复一次";
    Language_cn.relistTime = "剩余时间 : {0}";
    /**次数剩余 */
    Language_cn.remain = "<(c0xffc600)剩余次数> : {0}";
    Language_cn.buyRemian = "每天能购买{0}次";
    /**junwei */
    /**时间 */
    Language_cn.autoTime = "{0}s 后自动领取";
    Language_cn.autoExit = "{0}s 后自动退出";
    /**精炼部位未有装备 */
    Language_cn.refineHint = "该部位尚无装备";
    Language_cn.refineLvlMax = "精炼等级已达上限";
    /**消耗 */
    Language_cn.consume = "消耗:";
    /**世界BOSS名称 */
    Language_cn.wbName = "Lv:{0} {1}";
    /**名称搭配等级 */
    Language_cn.nameLvl = "{0} Lv.{1}";
    /**翅膀 */
    /**激活条件 */
    Language_cn.wingActiCondition = "激活条件 : ";
    Language_cn.conditionText = "幻羽{0}阶自动激活";
    Language_cn.unActive = "{0}<(c0x0xff0000)（未激活）>";
    Language_cn.wing_0 = "提升VIP等级可获得更多金币培养次数";
    /**技能效果 */
    Language_cn.wingSkillEff = "技能效果 : ";
    /**开启 */
    Language_cn.openTxt = "{0}阶开启";
    /**数字单位 */
    Language_cn.numLevels = ["{0}万", "{0}亿"];
    /**副本剩余挑战次数 */
    Language_cn.copyEnterCount = "今日挑战 : <(c0xffc600){0}次>";
    Language_cn.copySweepCount = "今日扫荡 : <(c0xffc600){0}次>";
    /**副本开启条件 */
    Language_cn.copyEnterCondition = "<(c0xff0000)角色{0}级可挑战>";
    /**副本奖励描述 */
    Language_cn.copyAward_0 = "固定奖励 : <(c0x00a2ff){0}*{1}>";
    Language_cn.copyAward_1 = "特权用户必增加<(c0x00ff0c){0}收益>";
    /**副本离开提示 */
    Language_cn.copyExit = "<(s18)(c0x3e1700)是否离开副本>\n<(s18)(c0x792301)（直接离开副本不会扣除奖励次数）>";
    Language_cn.copyExit_1 = "<(s18)(c0x3e1700)是否离开副本>";
    Language_cn.copyExit_2 = "<(s18)(c0x3e1700)是否离开VIPBOSS>";
    /**时装副本 */
    Language_cn.fashioncopy_0 = "通过<(c" + ColorUtil.C_GREEN + ")上一难度>开启";
    Language_cn.fashioncopy_1 = "等级{0}级及通过上一难度开启";
    Language_cn.fashioncopy_2 = "等级达到<(c" + ColorUtil.C_GREEN + "){0}级>";
    /**扫荡次数 */
    Language_cn.copyText_0 = "扫荡次数";
    /**徽章升级 */
    /**解锁条件 */
    Language_cn.badgeCondi = "关卡第{0}关";
    Language_cn.badgeMaxLvl = "徽章等级已达最高级";
    Language_cn.badgeNotEnough = "条件未满足";
    Language_cn.badge_0 = ["关卡第{0}关 未完成", "关卡第{0}关 已完成"];
    /**图腾 */
    /**共鸣技能名称 */
    Language_cn.resonanSkillName = "{0} Lv.{1}";
    /**离线奖励 */
    /**离线奖励面板信息 */
    Language_cn.offLineText = ["金币", "经验", "装备", "离线获得", "<(c0xfff600)VIP{0}>获得"];
    /**背包满信息 */
    Language_cn.offLineBag = ["背包已满", "已自动熔炼{0}件装备"];
    /**竞技场 */
    Language_cn.jingji_t1 = "我的战力 : <(c0xffffff){0}>";
    Language_cn.jingji_t2 = "我的积分 : <(c0x0cff00){0}>";
    Language_cn.jingji_t3 = "第{0}名";
    Language_cn.jingji_t4 = "未上榜";
    Language_cn.jingji_t5 = "挑战次数不足";
    Language_cn.jingji_t6 = "每日<(c0x019601)00:00>发送奖励";
    Language_cn.jingji_t7 = "积分:<(c0xffffff){0}>";
    Language_cn.jingji_t8 = "10+";
    /**鼓舞 */
    Language_cn.inspire_0 = "（{0}/{1}）";
    Language_cn.inspire_1 = "{0}/次";
    Language_cn.inspire_2 = "当前增加伤害 : <(c0x019601){0}%>";
    /**经验副本 */
    Language_cn.expIcome = "当前经验收益 : <(c0x00ff0c){0}>";
    Language_cn.expVipPlus = "VIP{0}用户经验 <(c0x00ff0c){0}>";
    /**宝石 */
    Language_cn.jewel_0 = "爬塔{0}层开启";
    Language_cn.jewel_1 = "可获得 : ";
    /**符碑 */
    Language_cn.rune_0 = "{0}j{1}s";
    Language_cn.rune_1 = "符碑{0}阶自动激活";
    /**vipboss */
    Language_cn.vipBoss_0 = "VIP{0}开启";
    Language_cn.vipBoss_1 = "{0}级以及 VIP{1}开启";
    // static vipBoss_2 = "VIP等级不足"；
    /**聊天 */
    Language_cn.chat_0 = "#{0}";
    Language_cn.chat_1 = "请输入聊天内容";
    /**服务器选择 */
    Language_cn.server_0 = "最近登录";
    Language_cn.server_1 = "{0}~{1}";
    Language_cn.server_2 = "当前服";
    /**显示优惠 */
    Language_cn.xsyh_0 = "价格:";
    Language_cn.xsyh_1 = "VIP{0}可购";
    /**版本 */
    Language_cn.version = "版本号 : {0}";
    /**junwei */
    /**yusheng */
    /**BOSS归属 */
    Language_cn.gsName = "归属 : {0}";
    /** BOSS血条名称 */
    Language_cn.bossHpName = "<(c0xffc500)Lv.{0}> <(c0xffffff){1}>";
    /** 日常任务获得活跃度 */
    Language_cn.dailyPointStr = "活跃度+{0}";
    /** 强化属性 */
    Language_cn.strengProTtl = "强化属性";
    /** 精炼属性 */
    Language_cn.refineProTtl = "精炼属性";
    /** 道具类型 */
    Language_cn.itemType = "<({0})类型> : <({1})道具>";
    /** 道具数量 */
    Language_cn.itemNum = "<({1})数量> : <({2}){0}>";
    /** 炼狱装备材料数量 */
    Language_cn.purgatoryItemNum = "<({2}){0}/{1}>";
    /** 炼狱共鸣标题 */
    Language_cn.purgatoryPropTitle = "<(c0xff5a00){0}（{1}阶）>";
    /** 炼狱共鸣属性 */
    Language_cn.purgatoryProp = "<(c0xffffff){0} : ><({2}){1}>";
    /** 炼狱装备分解数 */
    Language_cn.purgatoryDecomeNum = "X{0}";
    /** 炼狱boss刷新时间 */
    Language_cn.pgtBossRefreshTime = "（{0}恢复一次）次数：";
    /**  炼狱boss挑战次数 */
    Language_cn.pgtBossChallenge = "{0}/{1}";
    /** 炼狱boss消耗 */
    Language_cn.pgtBossCost = "X{0}<({1})（{2}）>";
    /** 炼狱boss等级 */
    Language_cn.pgtBossLv = "{0}级";
    /** 离开炼狱副本 */
    Language_cn.pgtBossExit = "确认从该场景退出吗?\n挑战次数和门票不返还";
    /** boss复活时间 */
    Language_cn.pgtBossCd = "{0}\n后复活";
    /** boss未解锁 */
    Language_cn.pgtBossLock = "需先通关上一难度";
    /** 角色等级不足 */
    Language_cn.roleLevelLack = "角色等级不足";
    /** 活动目录时间 */
    Language_cn.activityCatalogueTime = "活动时间：{0}";
    /** 申请家族条件 */
    Language_cn.familyApplyCondition = "任务战斗力{0}以上";
    /** 家族名称 */
    Language_cn.familyTitle = "{0}  LV.{1}";
    /** 族长名 */
    Language_cn.familyLeaderName = "<(c0xffc600)会长 : >{0}";
    /** 成员数 */
    Language_cn.familyMemNum = "<(c0xffc600)会员 : >{0}/{1}";
    /** 家族资金 */
    Language_cn.familyFund = "<(c0xffc600)资金 : >{0}/{1}";
    /** 家族评分 */
    Language_cn.familyScore = "<(c0xffc600)评分 : >{0}";
    /** 家族成员名称 */
    Language_cn.familyMemName = "{0}  LV.{1}";
    /** 家族成员战力 */
    Language_cn.familyMemScore = "<(c0xffc600)战力: >{0}";
    /** 家族成员贡献 */
    Language_cn.familyMemDevote = "<(c0xffc600)贡献: >{0}";
    /** 家族成员在线 */
    Language_cn.familyMemOnline = "<(c0x00ff0c)在线>";
    /** 家族成员离线 */
    Language_cn.familyMemOffline = "<(c0xeeb28e){0}>";
    /** 家族名称 */
    Language_cn.familyName = "{0}  LV.{1}";
    /** 无条件限制 */
    Language_cn.familyNoLimit = "<(c0x34ffe9)无限制条件>";
    /** 无条件限制 */
    Language_cn.familyLimitScore = "<(c0x00ff0c)战力{0}以上>";
    /** 家族申请限制条件 */
    Language_cn.familyLimit = "<(c0xffc600)条件 ： >{0}";
    /** 家族人数 */
    Language_cn.familyNum = "<(c0xffc600)人数 ： >{0}/{1}";
    /** 家族条件 */
    Language_cn.familyCreateLimit = "VIP{0}可创建公会";
    /** 家族消耗 */
    Language_cn.familyCreateCost = "<(c0xFF0000)X{0}>";
    /** 家族申请设置自动 */
    Language_cn.familyApplyAuto = "满足条件自动加入";
    /** 家族退出 */
    Language_cn.familyQuitMsg = "退出家族成功";
    /** 家族加入 */
    Language_cn.familyEnterMsg = "加入家族成功";
    /** 家族权限不足 */
    Language_cn.familyNoPermit = "权限不足";
    /** 家族成员等级 */
    Language_cn.familyMemLv = "<(c0xffc600)等级: >{0}";
    /** 家族解散描述1 */
    Language_cn.familyDismissDesc = "解散家族后自动遣散所有家族成员，遣散家族后自动保留公会技能等级，但是家族贡献，仓库积分将会清空";
    /** 家族解散描述2 */
    Language_cn.familyDismissDesc2 = "是否确定解散家族？";
    /** 玩家名超链接 */
    Language_cn.roleNameLinke = "<(u)(c0x00FF0C)(erole:{0}){1}>";
    /** VIP等级不足 */
    Language_cn.familyCreateVIPLack = "请先提升VIP等级";
    /** VIP等级不足 */
    Language_cn.familyNoticeLimit = "{0}/{1}";
    return Language_cn;
}());
__reflect(Language_cn.prototype, "Language_cn");
//# sourceMappingURL=Language_cn.js.map