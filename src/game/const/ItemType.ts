/** 定义物品类型的枚举类型 **/   
	enum ItemType
	{
		itUndefinedType			= 0,	//未定义类型的物品
		itWeapon				= 1,	//武器
		itDress					= 2,	//衣服
		itHelmet				= 3,	//头盔
		itNecklace				= 4,	//项链
		itDecoration			= 5,    //勋章
		itBracelet				= 6,	//手镯
		itRing					= 7,	//戒指
		itGirdle				= 8,	//腰带
		itShoes					= 9,	//鞋子
		itEquipDiamond			= 10,   //宝石
		itSpecialRing		    = 11,   //特戒(复活戒指)
		itSwing					= 12,	//翅膀
		itExtraWeapon			= 13,	//幻武（与武器并存）
		itExtraDress			= 14,	//玄甲（与衣服并存）
		itShield				= 15,	//护甲
		itProectRune			= 16,	//护符
		itSoulPearl				= 17,	//魂珠
		itDizzyRing				= 18,   //特戒(麻痹戒指和护体戒指)
		itFashionDress			= 19,	//时装
		itWeaponExtend			= 20,	//武器扩展 幻武
		itSuperWeapon			= 21,	//武器（神装）
		itSuperDress			= 22,	//衣服（神装）
		itSuperHelmet			= 23,	//头盔（神装）
		itSuperNecklace			= 24,	//项链（神装）
		itSuperBracelet			= 25,	//手镯（神装）
		itSuperRing				= 26,	//戒指（神装）
		itSuperGirdle			= 27,	//腰带（神装）
		itSuperShoes			= 28,	//鞋子（神装）
		itEquipMax,						//最大的装备ID

		itRideEquipArmor		= 60,	//坐骑护甲
		itRideEquipRein			= 61,	//坐骑缰绳
		itRideEquipSaddle		= 62,	//坐骑马鞍
		itRideEquipShoe			= 63,	//坐骑蹄铁
		itRideEquipMax,					//坐骑装备最大值

		itQuestItem				= 101,	//任务物品
		itFunctionItem			= 102,	//功能物品，可以双击执行功能脚本的
		itMedicaments			= 103,	//普通药品(是否拾取由玩家指定)
		itFastMedicaments		= 104,	//速回药品
		itItemDiamond			= 105,  //宝石
		itMedicaments2			= 106,	//普通药品(必定拾取)
		itExpBox				= 113,  //经验魔盒，吸收杀怪经验
		itMine					= 114,  //矿物，和普通物品比它的耐久表示纯度和最大纯度
		itForce					= 115,	//体力道具
		itCircleSoul            = 116,  //英魂道具
		itDailyUse              = 117,  //每日使用限制(如:英魂道具) 同类道具您今天已使用%d / %d次
		itSellBox               = 118,  //售卖类箱子道具
		itSkillBook             = 119,  //需要货币的技能书
		itAutoUse               = 120,  //自动使用物品
		itJieBiaoBox           	= 121,//劫镖盒子 
		itItemTypeCount,			//物品类型的数量，最大值，类型值不一定是连续的

		itNormal 				= 200, // 普通道具
	};
