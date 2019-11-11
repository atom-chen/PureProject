/*
 * @Description: 
 * @Author: liangzhaowei
 * @Date: 2019-08-28 10:42:31
 */



enum ViewConst {
	/**创角*/
	CREATE_ROLE = 1,
	/**创角-英雄*/
	CREATE_HERO,

	/**角色界面 */
	ROLE,
	/**背包 */
	BAG,
	/**宠物 */
	PET,
	/**副本 */
	COPY,
	/**商店 */
	SHOP,
	/**vip */
	VIP,
	/**日常 */
	DAILY,
	/**转职 */
	TRANSFER,
	/**转职预览 */
	TRANSFERSHOW,
	/**转职道具使用 */
	TRANSFERUSE,
	/**冒险 */
	ADVENTURE,
	/**首冲 */
	FIRSTCHARGE,
	/**额外奖励提示框 */
	REWARDEX,
	/**充值 */
	CHARGE,
	/**其它角色窗口 */
	OTHERROLE,
	/**技能 */
	SKILL,
	/**扭蛋 */
	GASHAPON,
	/**扭蛋奖励界面 */
	GASHAPONRW,
	/**扭蛋仓库 */
	GASHAPONBAG,
	/**调试界面1 */
	EDITWIN,
	/**闯关 */
	CHUANGGUAN,
	/**强化 */
	STRENGTH,
	/**BOSS */
	BOSS,
	/**竞技场 */
	JINGJI,
	/**签到*/
	SIGN,
	/**邮件*/
	EMAIL,
	/**开服活动 */
	KFHD,
	/** 家族 */
	FAMILY,



	//以上窗口只能同时存在一个
	CLOSEALLWIN = 10000,



	//以上是普通窗口，打开会覆盖全屏，关掉场景和MainUI
	/**游戏世界*/
	GAME_WORLD = 20000,
	/**主界面*/
	MAIN_UI = 20001,
	/**任务面板*/
	MAIN_QUEST = 20002,
	/**覆盖层的主界面*/
	MAIN_UI_COCER,
	/**战力变化*/
	FIGHT_CHANGE,
	/**欢迎界面*/
	WELCOME,
	/**DEBUG窗口 */
	DEBUG,
	/**DEBUG龙骨窗口 */
	DEBUGDRAGON,
	/**BUFF*/
	BUFF,
	/**NPC对话*/
	NPCTALK,
	/**人物属性*/
	ROLEPROTIPS,
	/**物品提示 */
	ITEMTIPS,
	/**技能提示 */
	SKILLTIPS,
	/**Vip特权提示 */
	VIPTIPS,
	/**新物品提示 */
	NEWITEM,
	/**装备回收、熔炼 */
	MELT,
	/**套装详情 */
	SUITPROPERTY,
	/**套装分解 */
	SUITRESOLVE,
	/**宠物图鉴 */
	PETSHOWALL,
	/**单个宠物全属性展示 */
	PETSIGLEINFOVIEW,
	/**宠物全属性 */
	PETTIPS,
	/**迷雾之塔奖励显示 */
	COPYTOWERRW,
	/**排行榜样式A */
	RANKMODELWINA,
	/**幸运抽奖 */
	LUCKYDAIL,
	/**日常奖展示励框 */
	DAILYSHOWTIP,
	/**奖励获得 */
	AWARDTIPS,
	/**过场动画*/
	MAPLOADING,
	/**玩法说明 */
	INSTRUCTION,
	/**强化大师 */
	STRENGTHMASTER,
	/**购买物品 */
	SHOPTIPS,
	/**通用提示 */
	SYSTIPS,
	/**邮件详情*/
	EMAIL_DETAIL,
	/**复活提示 */
	REVIVE,
	/**世界BOSS复活提示 */
	WBREVIVE,
	/**世界boss次数购买 */
	WBBUY,
	/**背包拓展提示 */
	BAGEXPAND,
	/**时装搭配 */
	COORDINATE,
	/**时装购买 */
	FASHIONBUY,
	/**翅膀技能 */
	WINGSKILL,
	/**失败面板 */
	FAIL,
	/** 总属性提示 */
	TOTALPROP,
	/**共鸣 */
	RESONANCE,
	/**离线奖励 */
	OFFLINEAW,
	/**鼓舞BUFF购买 */
	BUYBUFF,
	/**竞技场排行榜 */
	JINGJIRANK,
	/**通用LIST面板 */
	ITEMLISTTIPS,
	/**替换宝石提示 */
	JEWELREPLACE,
	/**世界BOSS信息 */
	WBINFO,
	/**排行榜 */
	RANK,
	/**材料副本信息 */
	COPYMATERIALSINFO,
	/**竞技场信息 */
	JINGJIINFO,
	/**经验副本信息 */
	COPYEXPINFO,
	/**符碑技能窗口 */
	RUNESKILL,
	/**系统开启提示 */
	SYSOPENHINT,
	/**聊天窗口 */
	CHAT,
	/**表情窗口 */
	EMOJI,
	/** 炼狱共鸣属性 */
	PURGATORY_RESONATE_PROP,
	/**通用排行榜 */
	RANKB,
	/**限时礼包 */
	XSLB,
	/**炼狱背包 */
	PURGATORY_BAG,
	/**活动目录 */
	ACTIVITY_CATALOGUE,
	/**时装副本信息 */
	FASHIONCOPYINFO,
	/** 炼狱装备升级 */
	PURGATORY_UPGRADE,
	/** 家族设置 */
	FAMILY_SETTING,
	/** 家族创建 */
	FAMILY_CREATE,
	/** 家族列表 */
	FAMILY_LIST,
	/** 家族解散 */
	FAMILY_DISMISS,
	/** 家族申请列表 */
	FAMILY_APPLY,
	/** 家族公告 */
	FAMILY_NOTICE,
}