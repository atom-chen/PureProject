var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/*
 * @Description: 全局参数
 * @Author: guolinsen
 * @Date: 2019-08-26 10:02:31
 */
var GlobalVar = (function () {
    function GlobalVar() {
    }
    GlobalVar.version = "201911011547";
    /**游戏设计尺寸*/
    GlobalVar.GAME_WIDTH = 640;
    GlobalVar.GAME_HEIGHT = 1136;
    /**pc上的*/
    GlobalVar.GAME_PC_HEIGHT = 1064;
    /**一次跳跃距离*/
    GlobalVar.JUMP_X = 3;
    GlobalVar.JUMP_Y = 3;
    GlobalVar.DEFAULT_MOVE_SPEED = 120;
    GlobalVar.testSkill = false;
    /**本游戏中使用的MiniDateTime时间的起始日期相对于flash时间(1970-01-01)的时差（毫秒）*/
    GlobalVar.MiniDateTimeBase = 1262275200000;
    /**切换场景自动打开窗口 */
    GlobalVar.autoOpenGroup = [];
    /**挂机场景ID*/
    GlobalVar.GUAJI_SCENE = 9;
    /**主城场景ID */
    GlobalVar.ZHUCHENG_SCENE = 6;
    /**闯关BOSS场景ID */
    GlobalVar.PASSBOSS_SCENE = 10;
    /**自动熔炼 */
    GlobalVar.AUTO_RECYCLE = false;
    /**自动熔炼触发条件 */
    GlobalVar.AUTO_RECYCLE_TRIGER = 0.8;
    /**金币ID */
    GlobalVar.COIN = 1;
    /**钻石、元宝 */
    GlobalVar.GOLD = 14;
    /**世界boss复活花费 */
    GlobalVar.Recount = 5;
    /**怪物ai默认技能*/
    GlobalVar.MONSTER_DEFAULTSKILL = [[1, 1]];
    /**可拥有角色数量*/
    GlobalVar.ROLE_MAX = 3;
    /**表情大小 */
    GlobalVar.EMOJI_SIZE = 25;
    /**表情类型 */
    GlobalVar.EMOJI_TYPE = ["emoji_json.emoji_{0}_png", "zjm_json.zjm_channel_{0}_png"];
    /**聊天频道颜色 */
    GlobalVar.CHAT_COLOR = [0xffffff, 0xffc600, 0x00ff0c, 0xff00fc];
    /**开启所有功能*/
    GlobalVar.OPEN_ALL_WIN = false;
    return GlobalVar;
}());
__reflect(GlobalVar.prototype, "GlobalVar");
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
//# sourceMappingURL=GlobalVar.js.map