//tolua_begin
// 任务目标类型
enum TaskTargetType {
	// 不记录的
	enTask_Talk = 0,		//对话
	enTask_KillMonster,		//1 杀怪
	enTask_ClientTask,		//2 客户端任务
	enTask_EnterScene,      //3 进入场景x次
	enTask_RecycleEquip,    //4 熔炼装备x次
	enTask_RuneUpgrade,		//5 符碑升级x次
	enTask_WingUpgrade,		//6 翅膀升级x次
	enTask_DiamondUpgrade,  //7 宝石升级x次
	enTask_PetUpgrade,		//8 宠物升级x次
	enTask_TotemUpgrade,    //9 图腾升级x次
	enTask_SkillUpgrade,    //10 技能升级x次
	enTask_Suit,			//11 打造套装x件
	enTask_Strong,			//12 强化装备x次
	enTask_Refine,			//13 精炼装备x次
	enTask_Arena,           //14 竞技场挑战x次
	enTask_Fashion,			//15 购买时装x次

	enTask_NoCntMax = 50,

	enTask_ChkToLvl,		//51 关卡到x层
	enTask_StrongToLvl,     //52 强化到x级
	enTask_RuneToLvl,		//53 升级符碑到x级
	enTask_WingToLvl,		//54 升级翅膀到x级
	enTask_RefineToLvl,		//55 精炼到x级
	enTask_DiamondToLvl,	//56 升级宝石到x级
	enTask_PetToLvl,		//57 升级宠物到x级
	enTask_TotemToLvl,		//58 升级图腾到x级
	enTask_BadgeToLvl,		//59 升级徽章到x级
	enTask_SkillToLvl,		//60 升级技能到x级
	enTask_PetStageToLvl,	//61 宠物进阶到x级
	enTask_TowerToLvl,		//62 爬塔到x层     

	enTask_AddValMax = 100,  // 区分叠加 还是 记录达到的点
	
	enTask_KillBoss = enTask_AddValMax,   //100 击杀boss
	enTask_JoinInArean,	//101 参与竞技场
	enTask_FinishFuben,	//102 完成副本
	enTask_ActiveTotem, //103 激活图腾
	enTask_WearFashion,	//104 穿戴时装
	enTask_AddHero,		//105 招募角色
	enTask_DiamondLevelUp, //106 宝石升级
	enTask_PetLevelUp,	 //107 宠物升级
	enTask_Max,			 // 			
};
class QuestTarget {
	// static QT_MONSTER: number = 0;//杀怪类
	// static QT_COLLECTION: number = 1;//采集类
	// static QT_CONSUME: number = 2;//消耗类
	// static QT_DIALOG: number = 3;//对话类
	// static QT_DELIVER: number = 4;//送物类
	// //升级类,2个字节，第一个字节表示二级分类，第二个字节表示第一分类
	// static QT_ACTOR_LEVEL: number = 5;//角色的等级达标
	// static QT_GUILD_LEVEL: number = 6;//角色所在帮派等级
	// static QT_PET_STRNGTHEN: number = 7;//灵兽强化
	// static QT_CAMP_KILL: number = 8;//击杀%d个其他阵营玩家
	// static QT_INLAY_COUNT: number = 9;//身上其中一件装备镶嵌指定数量宝石(杀指定等级的怪)
	// static QT_EQUIP_JING: number = 10;//身上其中一件装备精锻等级（完成指定任务类型）
	// static QT_KILL: number = 11;//角色杀戮值
	// static QT_ZHANHUN: number = 12;//8）角色战魂值
	// static QT_GUILD_CONTRIBUTION: number = 13;//9）角色帮派贡献分
	// static QT_CAMP_CONTRIBUTION: number = 14;//10）角色阵营贡献
	// //领取指定的成就奖励
	// static QT_GET_ACHIEVEAWARDS: number = 15;	//1）领取指定的成就奖励
	// //经脉类
	// //static  QT_MERIDIANS_COUNT:int = 15;	//1）经脉的穴位数量为目标
	// static QT_MERIDIANS_ID: number = 16;//2）指定经脉的ID
	// //使用类
	// static QT_SCENE_POS: number = 17;	//1）在指定场景、场景坐标；
	// static QT_NPC_POS: number = 18;//2）指定NPC
	// //探索类
	// static QT_SEARCH_SCENE: number = 19;	//到达的场景ID，
	// static QT_SEARCH_NPC: number = 20;	//查找到NPC
	// //护卫类
	// static QT_PROTECT_NPC: number = 21;//1）护卫指定NPC至目标场景（目标NPC处）
	// static QT_TALK_AND_PROTECT_NPC: number = 22;//2）交谈完后该NPC就跟随着玩家，直到把该NPC送至目标场景
	// //工具使用类
	// static QT_TOOL_USE: number = 23;//1）使用工具采集一次指定物品
	// static QT_TOOL_MAKE: number = 24;//2）使用工具制作一次指定物品
	// //交互类
	// static QT_JOIN_GUILD: number = 25;//1）加入帮派情况
	// static QT_HAS_MASTER: number = 26;//2）是否有师傅
	// static QT_HAS_APPRENTICE: number = 27;//3）是否有徒弟
	// static QT_HAS_SWORN: number = 28;//4）是否有结拜
	// static QT_HAS_LOVER: number = 29;	//5）是否有伴侣
	// static QT_FRIENDS: number = 30;	//6）是否有好友（好友人数）
	// static QT_ITEM_USE: number = 31;//使用某个物品
	// //套装任务
	// static QT_SUIT: number = 33;//套装任务

	// static QT_EQUIP_STRENGTHEN: number = 37;//	//装备强化相关,id表示类型：1,宝石合成。2,装备强化。3,装备打一次孔。4,装备镶嵌。5,装备附星。6，灵兽资质强化。7，灵兽资质洗炼

	// //阵营环任务
	// static QT_CAMP_LOOP: number = 38;
	// //副本任务:id为副本的id，count要进入的次数
	// static QT_FUBEN_QUEST: number = 39;

	// static QT_FUBEN: number = 40;

	// static QT_TALENTITEM: number = 41;//消耗天赋丹
	// static QT_CONSUMEYUANBAO: number = 42;//消耗元宝
	// static QT_CONSUMEDRAW: number = 43;//累计提取元宝
	// static QT_WEAREQUIP_LEVEL: number = 44; //穿戴几件几级装备
	// static QT_WEAREQUIP_CIRCLE: number = 45; //穿戴几件几转装备
	// static QT_WEAREQUIP_RECYCLE: number = 46; //穿戴几件几级装备

	// //自定义
	// static QT_CUSTOM: number = 127;
	// static QT_NULL: number = 999;	//空条件，客户端不显示条件，实际上根据服务器的来

	public type: number;//值为0-127，127为自定义需求
	public id: number;//id为在此需求表中唯一的非0值（最大值为65000）
	public count: number;//count为需要完成的数量
	public scene: number;
	public x: number;
	public y: number;

	public constructor() {
	}
}