/*
 * @Description: 全局参数
 * @Author: guolinsen
 * @Date: 2019-08-26 10:02:31
 */
class GlobalVar {

	static version: string = "201911011547";

	/**游戏设计尺寸*/
	static GAME_WIDTH = 640;
	static GAME_HEIGHT = 1136;
	/**pc上的*/
	static GAME_PC_HEIGHT = 1064;

	/**一次跳跃距离*/
	static JUMP_X: number = 3;
	static JUMP_Y: number = 3;

	static DEFAULT_MOVE_SPEED: number = 120;
	static testSkill: boolean = false;

	/**本游戏中使用的MiniDateTime时间的起始日期相对于flash时间(1970-01-01)的时差（毫秒）*/
	static MiniDateTimeBase: number = 1262275200000;
	/**切换场景自动打开窗口 */
	static autoOpenGroup: any[] = [];

	/**挂机场景ID*/
	static GUAJI_SCENE: number = 9;
	/**主城场景ID */
	static ZHUCHENG_SCENE: number = 6;
	/**闯关BOSS场景ID */
	static PASSBOSS_SCENE: number = 10;
	/**自动熔炼 */
	static AUTO_RECYCLE: boolean = false;
	/**自动熔炼触发条件 */
	static AUTO_RECYCLE_TRIGER: number = 0.8;
	/**金币ID */
	static COIN: number = 1;
	/**钻石、元宝 */
	static GOLD: number = 14;
	/**世界boss复活花费 */
	static Recount: number = 5
	/**怪物ai默认技能*/
	static MONSTER_DEFAULTSKILL: number[][] = [[1, 1]];
	/**可拥有角色数量*/
	static ROLE_MAX: number = 3;
	/**表情大小 */
	static EMOJI_SIZE: number = 25;
	/**表情类型 */
	static EMOJI_TYPE: string[] = ["emoji_json.emoji_{0}_png", "zjm_json.zjm_channel_{0}_png"];
	/**聊天频道颜色 */
	static CHAT_COLOR = [0xffffff, 0xffc600, 0x00ff0c, 0xff00fc];
	/**开启所有功能*/
	static OPEN_ALL_WIN: boolean = false;
}

//核心：闯关
//装备：品质-强化-增加火力
//翅膀: 外观-副属火力 道具升级
//宠物：预留
//技能：属性增强 道具升级
//金币：装备强化
//钻石：日常消费
//抽奖：
//挂机：
//竞技
//战斗属性：血量，攻击，防御，移动速度 + 暴击
//
//
