/*
 * @Description: 系统号 由服务端定义 Proxy中使用
 * @Author: guolinsen
 * @Date: 2019-08-15 15:16:16
 */
enum PacketTypes {
	Default = 0,				//默认的网络消息处理器，如果没有子系统分派，就分派到这里
	MOVE = 1,				//移动子系统的ID
	PROPERTY = 2,			//属性子系统的ID
	OBSERVER = 3,			//观察者子系统的ID
	BUFF = 4,				//Buff子系统的ID
	SKILL = 5,				//技能子系统的ID
	//QUEST = 6,				//任务子系统的ID
	EQUIP = 7,				//装备子系统的ID
	BAG = 8,				//背包子系统  的ID   
	CHAT = 9,				//聊天子系统的ID
	FAMILY = 10,			//帮会子系统的ID
	SUB = 11,				//系统子系统的ID
	SHOP = 12,         	//商城子系统的ID
	DEAL = 13,         	//交易子系统的ID
	EFFECT = 14,			//效果子系统的ID
	DROP = 15,				//掉落子系统ID
	TEAM = 16,				//队伍子系统ID
	PRACTICE = 17,			//操练(打坐)子系统ID
	ONHOOK = 18,           //挂机子系统
	COPY = 20,         		//副本子系统
	MAIL = 22,   			//处理系统邮件
	STORAGE = 23,         	//仓库子系统
	PK = 24,                //PK子系统
	DAILY = 25,			//好友子系统
	OTHER = 26,             //其他子系统(不能归类的都放这里)
	SELLBUY = 27,           //寄卖子系统
	ACHIEVE = 28,			//成就子系统
	ADVENTURE = 29,			//冒险系统
	SWORN = 31,				//结拜子系统
	CAMP = 32,				//阵营子系统
	//		 MOUNT = 33,				//坐骑（宝物）子系统
	PET = 34,				//宠物子系统
	TRAFFIC = 35,			//交通子系统
	GASHAPON = 36,		        //扭蛋
	QUEST = 37,           //新的任务系统
	SLG = 38,      			//战力竞技子系统
	MARKET = 39,    		//摆摊系统
	//		 HONOUR = 40,			//荣誉系统
	FRIEND = 41,			//好友子系统
	MOUNT = 42,				//坐骑（宝物）子系统
	JEWEL = 43,				//魂石子系统
	HERO = 44,				//英雄子系统
	Device = 45,			//载具系统
	Service = 46,			//跨服系统
	RICH = 47,				//大富翁系统
	TALISMAN = 48,          //法宝系统
	// CHECKPLUGIN = 49,       //检测外挂子系统
	BOSS = 49,					//BOSS
	CLOUDSTREASURE = 50,      //凌云宝阁
	TALENT = 51,//天赋秘籍子系统
	PURGATORY = 53,	// 炼狱装备

	YEAR_ACTIVITY = 52,
	Artifact = 53,
	GEM_CLEAR = 54,
	ARUNE = 55,
	CARD = 56,
	VIP = 57,  //vip
	King = 58,
	SpiriBeasts = 59,
	ARM = 60,
	CLOTHESPRESS = 61,
	NEIGONG = 62,//内功系统
	WING = 63, //神羽
	FURNACE = 64, //神炉
	NEW_EAMIL = 65,
	ROLE_TITLE = 66, //新称号
	VIP_NEW = 67, //新VIP
	Gift_NEW = 68, //新福利
	SPECIALRING = 69,	//特戒
	ShaCitySkill = 70,	//沙城技能
	GodEquip = 71,	//神装
	OFFICIAL = 72,   //官职
	LIANTI = 73,   //炼体
	BOSSBOOK = 74,  //boss图鉴
	HONOR = 75,  //荣誉战绩
	MONTHCARD = 76,  //月卡
	STRENGTHEN = 77,  //部位强化
	REFINE = 78,  //部位精炼
	FASHION = 79,	//符文
	BADGE = 80,   //徽章
	TOTEMS = 81,  //图腾
	RUNE = 82,		//符碑
	TRANSFER = 83,		//转职

	//脚本消息号定义
	ONHOOK_DATA = 129,		//挂机子系统的数据读取和保存
	DEPUTY = 130,		    //副职子系统ID
	INTERACTIVE = 131,		//交互子系统
	ARENA = 132,			//擂台子系统
	NPCDEAL = 133,          //NPC交易子系统
	SHORTCUT = 134,			//快捷键子系统
	STORAGE_EXTEND = 135,	//仓库扩展子系统
	EQUIP_FIX = 136,		//装备维修
	GETGIFTOL = 138,   		//领取在线奖励
	PULSE = 137,            //经脉子系统
	SCRIPT = 139,     			//脚本杂项子系统
	// SUIT = 140,    //套装系统
	MOUNT_SCRIPT = 141,		//坐骑（宝物）子系统
	CLIMBINGTOWER_COPY = 142,		//爬塔副本子系统
	NEARMOVING_COPY = 143,		//附近玩家副本子系统
	ACTIVE_SCRIPT = 145,		     //活动相关子系统		
	ARCHIVEROLES = 146,		     //角色封存		     
	CIRCLE = 147, //转生
	NEWBOSS = 148,
	MONEYTREE = 149, //摇钱树
	GUILDWAREHOUSE = 151,	//沙城仓库
	OFFER_QUEST = 152, //悬赏任务


	//登录子系统
	LOGIN = 255,
}
