var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**状态定义*/
var ThingState = (function () {
    function ThingState() {
    }
    ThingState.STAND = 0x00000001; //静止状态
    ThingState.MOVE = 0x00000002; //行走跳跃状态
    ThingState.RIDE = 0x00000004; //骑马状态
    ThingState.ZANZEN = 0x00000008; //打坐状态
    ThingState.STALL = 0x00000010; //摆摊状态
    ThingState.SING = 0x00000020; //吟唱状态
    ThingState.BATTLE = 0x00000040; //战斗状态
    ThingState.DEATH = 0x00000080; //死亡状态
    ThingState.MOVE_FORBID = 0x00000100; //禁止移动状态,buff设置的
    ThingState.DIZZY = 0x00000200; //晕眩状态
    ThingState.AUTO_BATTLE = 0x00000400; //挂机状态
    ThingState.RETURN_BURN = 0x00000800; //回归状态(用于怪物)
    ThingState.DISABLE_SKILLCD = 0x00001000; //禁用技能CD（开发调试用）
    ThingState.CHALLENGE = 0x00002000; //擂台状态
    ThingState.TRAFFIC = 0x00004000; //是否在交通工具上
    ThingState.COUPLE_ZANZEN = 0x00008000; //是否双修
    ThingState.BODY_CHANGE = 0x00010000; //变身状态
    ThingState.SWIMMING = 0x00020000; //游泳状态
    ThingState.KISS_SWIMMING = 0x00040000; //接吻状态
    ThingState.FAST_BATTLE = 0x00080000; //爬塔副本的扫荡中
    ThingState.KISS_LAND = 0x00100000; //陆地的接吻
    ThingState.Corps_Battle = 0x00200000; //拥有球的状态（战队竞技活动需要用到）
    ThingState.CARRIER = 0x00400000; //载具状态
    ThingState.PASSENGGER = 0x00800000; //乘客状态
    ThingState.DongFang = 0x01000000; //洞房状态
    ThingState.Own_Pet = 0x02000000; //拥有宠物状态 
    ThingState.HERO_FIT = 0x04000000; //英雄附体状态
    ThingState.GM = 0x08000000; //GM状态
    ThingState.WingTail = 0x10000000; //翅膀残影状态
    ThingState.MuYu = 0x20000000; //沐浴状态
    ThingState.Chariot = 0x40000000; //战车状态
    return ThingState;
}());
__reflect(ThingState.prototype, "ThingState");
//# sourceMappingURL=ThingState.js.map