/*
 * @Description:  实体属性索引表
 * @Author: guolinsen
 * @Date: 2019-08-15 15:16:16
 * @LastEditTime: 2019-10-24 16:15:59
 */
enum PropId {
    AP_ACTOR_ID = 0,//  unsigned int 玩家的actorid或者怪物ID
    AP_X,//  int 位置x
    AP_Y,//  int 位置y
    AP_BODY_ID,//  int 模型ID
    AP_FACE_ID,//  unsigned int 头像ID
    AP_DIR,//  int 实体的朝向
    AP_LEVEL,//  unsigned int 等级
    AP_HP,//  unsigned int 当前血
    AP_STATE,//  unsigned int 实体当前的状态
    AP_BODY_COLOR,//  uint 身体的颜色
    AP_MAX_HP,// unsigned int 最大血(生命)
    AP_ATTACK,//  int nPhysicalAttackMin 攻击
    AP_DEFENCE,//  int nMagicDefenceMax 防御
    AP_CRIT,								//暴击
    AP_UNCRIT,							//抗暴
    AP_CRIT_HURT,						//暴伤
    AP_DAMAGE_INC,						//伤害增加
    AP_DAMAGE_DEC,						//伤害减少
    AP_DAMAGE_EXT,						//伤害附加
    AP_HITVALUE,							//命中
    AP_DOGVALUE,							//闪避
    AP_MOVE_SPEED,					//移动1格需要的时间，单位ms
    AP_ATTACK_SPEED,						//攻击速度

    //玩家的属性
    AP_WEAPON,//  int  nWeaponAppearance 武器的外观
    AP_MOUNT,//  int  nMountAppearce 坐骑的外观
    AP_SWING,//  int  nSwingAppearce 翅膀的外观
    AP_HAIR,
    AP_HAT,
    AP_EYE,
    AP_GLASSES,
    AP_PANTS,
    AP_ASSIST,
    AP_BACK,
    AP_SEX,									//性别
    AP_JOB,							//职业 1战士 2法师 3射手
    AP_BATTLE_POWER,						//玩家的战力

    AP_PK_MOD,								//玩家的PK模式
    AP_EXP,								//经验 这个多1个字节,uint64的
    AP_PK_VALUE = AP_EXP + 2,			//玩家的pk值(杀戮值)
    AP_BAG_GRID_COUNT,						//背包的格子数量
    AP_BIND_COIN,							//绑定金钱
    AP_COIN,								//非绑定金钱 (现用金钱)
    AP_BIND_YUANBAO,						//绑定元宝
    AP_YUANBAO,								//非绑定元宝 (现用元宝)
    AP_GUILD_ID,							//帮派的ID
    AP_TEAM_ID,								//队伍的ID

    AP_SOCIALMASK,							//社会关系的mask，是一些bit位合用的
    AP_GUILDEXP,							//玩家个人当前的贡献度
    AP_MOUNT_EXP,							//坐骑的经验
    AP_MAX_EXP,								//玩家的最大经验，64位的
    AP_ACIEVEPOINT = AP_MAX_EXP + 2,  //玩家的成就点
    AP_VIP_TEMPROARY,						// 临时的vip等级
    AP_ACTIVITY,							//玩家的活跃度
    AP_DRAW_YB_COUNT,						//提取元宝数目
    //AP_CIRCLE_TITLE_LEVEL,					//转生阶
    //AP_CIRCLE_TITLE_STAR,					//转生星

    AP_DEPORT_GRID_COUNT,					//< 仓库的格子数目
    AP_CHECKINS,							//记录累计奖励状态
    AP_RIDE_LEVEL,							//当前坐骑的等级
    AP_RIDE_BATTLE,							//坐骑的战力
    AP_CURNEWTITLE,							//当前头衔	
    AP_SIGNIN,		//每日签到标识 高两个字节（表示签到的次数） | 低两个字节（表示领奖的索引）
    AP_DEPOT_YB,							//仓库元宝
    AP_DEPOT_COIN,							//仓库金币

    AP_VIP_GRADE,							//vip等级
    AP_VIP_POINT,							//vip积分
    AP_BAG_TIME,							//背包中在线时间
    AP_AUTH_SCORE,							//寻宝积分 pActorData->nAuthScore 
    AP_BE_KILLED_COUNT,						//被杀总次数
    AP_KILL_MONSTER_COUNT,					//杀怪总数 
    AP_TOTAL_ONLINE_MIN,					//总在线时间，单位：分钟

    AP_CHKPOINT_LV,                         //玩家闯关系统等级
    AP_CHKPOINT_AWARD_LV,                   //闯关系统特殊奖励
    AP_ACTIVITY_AWARD_FLAG,                   //活动奖励标记
    AP_RISK_LVL,                       //冒险等级

    //=========不存DB=========
    AP_MOUNT_TYPE,							//坐骑类型
    AP_ZY,									//阵营类型
    AP_GM_LEVEL,							//gm等级
    AP_RIDEONID,							//当前坐骑
    AP_RIDE_STATE,							//坐骑状态
    AP_DEFAULT_RIDE,						//默认坐骑
    AP_TEAMFUBEN_OUTPUT,                    //团队副本输出伤害
    AP_TEAMFUBEN_TEAMID,                    //团队副本(团队ID)
    AP_TEAMFUBEN_FBID,                      //团队副本(副本ID)
    AP_REDPOINT_FLAG,									//游戏系统气泡提示标志,预留64位
    AP_CJG_BOX_OPEN_TICK = AP_REDPOINT_FLAG + 2,//藏经阁宝箱开启tick
    AP_GM_TITLE,							//游戏内部GM头衔id
    AP_BADGE_LVL,                           //徽章等级

    numProperties //属性的个数
}
