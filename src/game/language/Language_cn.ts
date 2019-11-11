/*
 * @Description: 语言包，代码在游戏中呈现的文字都放在这里，除了图片
 * 文字里面含有变量的必须是这种格式
 * @Author: guolinsen
 * @Date: 2019-08-23 15:27:17
 */
class Language_cn {
	static jobName = ["通用", "勇士", "法师", "弓手"];

	/**主界面*/
	static mainLvl = "<({1})等级> : <({2}){0}>";
	static mainJob = "<({1})职业> : <({2}){0}>";
	static mainPart = "<({1})部位> : <({2}){0}>";
	static huode = "获得 {0}";
	static coin = "金币";
	static yb = "钻石";
	static de = "{0}的{1}";

	/**创角错误码*/
	static createRoleError = {
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

	static adventrueMaxLv = "您已达到最高级";
	static restTime = "剩余时间：{0}";
	static signDay = "{0} 天";

	static email_read_error1 = "背包已满，无法领取";
	static email_read_error2 = "邮件不存在";
	static email_read_error3 = "邮件无附件无法被领取";
	static email_delete_error1 = "邮件有附件无法被删除";
	static email_delete_error2 = "邮件不存在";
	static email_title = "主题：{0}";

	static sysOpen = "{0}开启";
	static sysOpenError1 = "角色<(c0xFF0000){0}>级";
	static sysOpenError2 = "VIP{0}";

	static socket1 = "您的账号在其他设备上登录";
	static socket2 = "已断开连接，是否重新连接？";
	static socket3 = "正在重新连接...";
	static socket4 = "无法连接服务器，请稍后重试";

	/**guolinsen*/


	/**liangzhaowei */
	static suit1 = "装备等级不足";
	static lcn1 = "已完成";
	static lcn2 = "{0}级解锁";
	static lcn3 = "第{0}层";
	static lcn4 = "剩余次数：{0}";
	static lcn5 = "迷雾之塔{0}层";
	static lcn6 = "未上榜";
	static lcn7 = "VIP{0}特权";
	static lcn8 = "VIP{0}专享礼包";
	static lcn9 = "免费VIP礼包";
	static lcn10 = "(当前有效期:{0})";
	static lcn11 = "当前有效期:永久";
	static lcn12 = "{0}元";
	static lcn13 = "复活倒计时:{0}";
	static lcn14 = "无须复活";
	static lcn15 = "请先激活宠物";
	static lcn16 = "{0}星解锁";
	static lcn17 = "已达限购次数";
	static lcn18 = "完成{0}的任务";
	static lcn19 = "开服{0}天";
	static lcn20 = "等级: 1";
	static lcn21 = "增加经验{0}";
	static lcn22 = "今天可用<(c0x2aff00){0}次";
	static lcn23 = "无可用次数";
	static lcn24 = "剩余: {0}个";




	/**liangzhaowei */


	/**道具tips */
	static getway = "获取途径";
	static usLv = "{0}级";
	// static zdltitle = "战斗力";
	static wearError = "您还未拥有该职业的角色";

	/**战力增加 */
	static zdlPlus = "战斗力+ {0}";

	/**部位 */
	static part = ["主武器", "副武器", "手套", "项链", "戒指", "饰品", "鞋子", "帽子", "衣服", "披风"];
	/**时装部位 */
	static fashionPart = { 3: "衣服", 23: "主手", 25: "翅膀", 26: "发型", 27: "帽子", 28: "表情", 29: "眼镜", 30: "裤子", 31: "副手", 32: "背部" };

	/**阶描述 */
	static jie = "{0}阶";
	static jie_j = "{0}j";

	/**警告提示 */
	static strengthLvlMax = "不能超过人物等级";
	static strengthPart = "身上部位尚有空缺";
	static exitWorldBoss = "是否退出世界BOSS";
	static reChargeHint = "钻石不足，是否前往充值";

	/**价格、消耗、需要 */
	static price = "<(c0xff5a00)价格 :>";
	static lvlCondition = "{0}级开启";
	static notEnought = "所需{0}不足";
	static vipLvlHint = "提升VIP等级增加{0}";
	static vipLvlMax = "VIP等级已达最高";

	/**时间 */
	static reviveTime = "{0}后复活";
	static resetTime = "{0}后恢复一次";
	static relistTime = "剩余时间 : {0}";

	/**次数剩余 */
	static remain = "<(c0xffc600)剩余次数> : {0}"
	static buyRemian = "每天能购买{0}次";

	/**junwei */
	/**时间 */
	static autoTime = "{0}s 后自动领取";
	static autoExit = "{0}s 后自动退出"

	/**精炼部位未有装备 */
	static refineHint = "该部位尚无装备";
	static refineLvlMax = "精炼等级已达上限";

	/**消耗 */
	static consume = "消耗:"

	/**世界BOSS名称 */
	static wbName = "Lv:{0} {1}";
	/**名称搭配等级 */
	static nameLvl = "{0} Lv.{1}";

	/**翅膀 */
	/**激活条件 */
	static wingActiCondition = "激活条件 : ";
	static conditionText = "幻羽{0}阶自动激活";
	static unActive = "{0}<(c0x0xff0000)（未激活）>"
	static wing_0 = "提升VIP等级可获得更多金币培养次数";
	/**技能效果 */
	static wingSkillEff = "技能效果 : ";
	/**开启 */
	static openTxt = "{0}阶开启";

	/**数字单位 */
	static numLevels = ["{0}万", "{0}亿"];

	/**副本剩余挑战次数 */
	static copyEnterCount = "今日挑战 : <(c0xffc600){0}次>";
	static copySweepCount = "今日扫荡 : <(c0xffc600){0}次>";
	/**副本开启条件 */
	static copyEnterCondition = "<(c0xff0000)角色{0}级可挑战>";
	/**副本奖励描述 */
	static copyAward_0 = "固定奖励 : <(c0x00a2ff){0}*{1}>";
	static copyAward_1 = "特权用户必增加<(c0x00ff0c){0}收益>";
	/**副本离开提示 */
	static copyExit = "<(s18)(c0x3e1700)是否离开副本>\n<(s18)(c0x792301)（直接离开副本不会扣除奖励次数）>";
	static copyExit_1 = "<(s18)(c0x3e1700)是否离开副本>";
	static copyExit_2 = "<(s18)(c0x3e1700)是否离开VIPBOSS>";
	/**时装副本 */
	static fashioncopy_0 = "通过<(c" + ColorUtil.C_GREEN + ")上一难度>开启";
	static fashioncopy_1 = "等级{0}级及通过上一难度开启";
	static fashioncopy_2 = "等级达到<(c" + ColorUtil.C_GREEN + "){0}级>"
	/**扫荡次数 */
	static copyText_0 = "扫荡次数";


	/**徽章升级 */
	/**解锁条件 */
	static badgeCondi = "关卡第{0}关";
	static badgeMaxLvl = "徽章等级已达最高级";
	static badgeNotEnough = "条件未满足";
	static badge_0 = ["关卡第{0}关 未完成", "关卡第{0}关 已完成"];

	/**图腾 */
	/**共鸣技能名称 */
	static resonanSkillName = "{0} Lv.{1}";

	/**离线奖励 */
	/**离线奖励面板信息 */
	static offLineText = ["金币", "经验", "装备", "离线获得", "<(c0xfff600)VIP{0}>获得"];
	/**背包满信息 */
	static offLineBag = ["背包已满", "已自动熔炼{0}件装备"];

	/**竞技场 */
	static jingji_t1 = "我的战力 : <(c0xffffff){0}>";
	static jingji_t2 = "我的积分 : <(c0x0cff00){0}>";
	static jingji_t3 = "第{0}名";
	static jingji_t4 = "未上榜";
	static jingji_t5 = "挑战次数不足";
	static jingji_t6 = "每日<(c0x019601)00:00>发送奖励";
	static jingji_t7 = "积分:<(c0xffffff){0}>";
	static jingji_t8 = "10+";

	/**鼓舞 */
	static inspire_0 = "（{0}/{1}）";
	static inspire_1 = "{0}/次";
	static inspire_2 = "当前增加伤害 : <(c0x019601){0}%>";

	/**经验副本 */
	static expIcome = "当前经验收益 : <(c0x00ff0c){0}>";
	static expVipPlus = "VIP{0}用户经验 <(c0x00ff0c){0}>";

	/**宝石 */
	static jewel_0 = "爬塔{0}层开启";
	static jewel_1 = "可获得 : ";

	/**符碑 */
	static rune_0 = "{0}j{1}s";
	static rune_1 = "符碑{0}阶自动激活";

	/**vipboss */
	static vipBoss_0 = "VIP{0}开启";
	static vipBoss_1 = "{0}级以及 VIP{1}开启"
	// static vipBoss_2 = "VIP等级不足"；

	/**聊天 */
	static chat_0 = "#{0}";
	static chat_1 = "请输入聊天内容";

	/**服务器选择 */
	static server_0 = "最近登录";
	static server_1 = "{0}~{1}";
	static server_2 = "当前服";

	/**显示优惠 */
	static xsyh_0 = "价格:";
	static xsyh_1 = "VIP{0}可购";

	/**版本 */
	static version = "版本号 : {0}";

	/**junwei */

	/**yusheng */

	/**BOSS归属 */
	static gsName = "归属 : {0}";
	/** BOSS血条名称 */
	static bossHpName = "<(c0xffc500)Lv.{0}> <(c0xffffff){1}>";

	/** 日常任务获得活跃度 */
	static dailyPointStr = "活跃度+{0}";
	/** 强化属性 */
	static strengProTtl = "强化属性"
	/** 精炼属性 */
	static refineProTtl = "精炼属性"

	/** 道具类型 */
	static itemType = "<({0})类型> : <({1})道具>";
	/** 道具数量 */
	static itemNum = "<({1})数量> : <({2}){0}>";
	/** 炼狱装备材料数量 */
	static purgatoryItemNum = "<({2}){0}/{1}>";
	/** 炼狱共鸣标题 */
	static purgatoryPropTitle = "<(c0xff5a00){0}（{1}阶）>";
	/** 炼狱共鸣属性 */
	static purgatoryProp = "<(c0xffffff){0} : ><({2}){1}>";
	/** 炼狱装备分解数 */
	static purgatoryDecomeNum = "X{0}";

	/** 炼狱boss刷新时间 */
	static pgtBossRefreshTime = "（{0}恢复一次）次数：";
	/**  炼狱boss挑战次数 */
	static pgtBossChallenge = "{0}/{1}";
	/** 炼狱boss消耗 */
	static pgtBossCost = "X{0}<({1})（{2}）>";
	/** 炼狱boss等级 */
	static pgtBossLv = "{0}级";
	/** 离开炼狱副本 */
	static pgtBossExit = "确认从该场景退出吗?\n挑战次数和门票不返还";
	/** boss复活时间 */
	static pgtBossCd = "{0}\n后复活";
	/** boss未解锁 */
	static pgtBossLock = "需先通关上一难度";
	/** 角色等级不足 */
	static roleLevelLack = "角色等级不足";
	/** 活动目录时间 */
	static activityCatalogueTime = "活动时间：{0}";

	/** 申请家族条件 */
	static familyApplyCondition = "任务战斗力{0}以上";
	/** 家族名称 */
	static familyTitle = "{0}  LV.{1}";
	/** 族长名 */
	static familyLeaderName = "<(c0xffc600)会长 : >{0}";
	/** 成员数 */
	static familyMemNum = "<(c0xffc600)会员 : >{0}/{1}";
	/** 家族资金 */
	static familyFund = "<(c0xffc600)资金 : >{0}/{1}";
	/** 家族评分 */
	static familyScore = "<(c0xffc600)评分 : >{0}";
	/** 家族成员名称 */
	static familyMemName = "{0}  LV.{1}";
	/** 家族成员战力 */
	static familyMemScore = "<(c0xffc600)战力: >{0}";
	/** 家族成员贡献 */
	static familyMemDevote = "<(c0xffc600)贡献: >{0}";
	/** 家族成员在线 */
	static familyMemOnline = "<(c0x00ff0c)在线>";
	/** 家族成员离线 */
	static familyMemOffline = "<(c0xeeb28e){0}>";
	/** 家族名称 */
	static familyName = "{0}  LV.{1}";
	/** 无条件限制 */
	static familyNoLimit = "<(c0x34ffe9)无限制条件>";
	/** 无条件限制 */
	static familyLimitScore = "<(c0x00ff0c)战力{0}以上>";
	/** 家族申请限制条件 */
	static familyLimit = "<(c0xffc600)条件 ： >{0}";
	/** 家族人数 */
	static familyNum = "<(c0xffc600)人数 ： >{0}/{1}";
	/** 家族条件 */
	static familyCreateLimit = "VIP{0}可创建公会";
	/** 家族消耗 */
	static familyCreateCost = "<(c0xFF0000)X{0}>";
	/** 家族申请设置自动 */
	static familyApplyAuto = "满足条件自动加入";
	/** 家族退出 */
	static familyQuitMsg = "退出家族成功";
	/** 家族加入 */
	static familyEnterMsg = "加入家族成功";
	/** 家族权限不足 */
	static familyNoPermit = "权限不足";
	/** 家族成员等级 */
	static familyMemLv = "<(c0xffc600)等级: >{0}";
	/** 家族解散描述1 */
	static familyDismissDesc = "解散家族后自动遣散所有家族成员，遣散家族后自动保留公会技能等级，但是家族贡献，仓库积分将会清空";
	/** 家族解散描述2 */
	static familyDismissDesc2 = "是否确定解散家族？";
	/** 玩家名超链接 */
	static roleNameLinke = "<(u)(c0x00FF0C)(erole:{0}){1}>";
	/** VIP等级不足 */
	static familyCreateVIPLack = "请先提升VIP等级";
	/** VIP等级不足 */
	static familyNoticeLimit = "{0}/{1}";
	/**yusheng */
}