/**状态定义*/
class ThingState {
	static STAND: number = 0x00000001;//静止状态
	static MOVE: number = 0x00000002;//行走跳跃状态
	static RIDE: number = 0x00000004;//骑马状态
	static ZANZEN: number = 0x00000008;//打坐状态
	static STALL: number = 0x00000010;//摆摊状态
	static SING: number = 0x00000020;//吟唱状态
	static BATTLE: number = 0x00000040;//战斗状态
	static DEATH: number = 0x00000080;//死亡状态
	static MOVE_FORBID: number = 0x00000100;//禁止移动状态,buff设置的
	static DIZZY: number = 0x00000200;//晕眩状态
	static AUTO_BATTLE: number = 0x00000400;//挂机状态
	static RETURN_BURN: number = 0x00000800;//回归状态(用于怪物)
	static DISABLE_SKILLCD: number = 0x00001000;//禁用技能CD（开发调试用）
	static CHALLENGE: number = 0x00002000;//擂台状态
	static TRAFFIC: number = 0x00004000;//是否在交通工具上
	static COUPLE_ZANZEN: number = 0x00008000;//是否双修
	static BODY_CHANGE: number = 0x00010000;//变身状态
	static SWIMMING: number = 0x00020000;//游泳状态
	static KISS_SWIMMING: number = 0x00040000;//接吻状态
	static FAST_BATTLE: number = 0x00080000;//爬塔副本的扫荡中
	static KISS_LAND: number = 0x00100000;//陆地的接吻
	static Corps_Battle: number = 0x00200000;//拥有球的状态（战队竞技活动需要用到）
	static CARRIER: number = 0x00400000;//载具状态
	static PASSENGGER: number = 0x00800000;//乘客状态
	static DongFang: number = 0x01000000;//洞房状态
	static Own_Pet: number = 0x02000000;//拥有宠物状态 
	static HERO_FIT: number = 0x04000000;//英雄附体状态
	static GM: number = 0x08000000;//GM状态
	static WingTail: number = 0x10000000;//翅膀残影状态
	static MuYu: number = 0x20000000;//沐浴状态
	static Chariot: number = 0x40000000;//战车状态
	//		static   MAX_COUNT		 :number = 0x80000000;//状态的数量
}