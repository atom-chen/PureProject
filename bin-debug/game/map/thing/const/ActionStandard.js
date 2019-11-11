var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/*
 * @Description: In User Settings Edit
 * @Author: guolinsen
 * @Date: 2019-06-04 11:05:04
 * @LastEditTime: 2019-08-20 19:48:24
 */
/**
 * 与服务器约定动作值定义
 * @author Administrator
 *
 */
var ActionStandard = (function () {
    function ActionStandard() {
    }
    ActionStandard.getSpine = function (act) {
        if (act == ActionStandard.SA_IDLE)
            return ActionSpine.IDLE;
        if (act == ActionStandard.SA_RUN)
            return ActionSpine.RUN;
        if (act == ActionStandard.SA_JUMP)
            return ActionSpine.JUMP;
        if (act == ActionStandard.SA_DIE)
            return ActionSpine.DIE;
        if (act == ActionStandard.SA_NORMHIT)
            return ActionSpine.NORMHIT;
        if (act == ActionStandard.SA_STRUCK)
            return ActionSpine.STRUCK;
        // if (act == ActionStandard.SA_JUMP_START)
        //     return ActionSpine.JUMPSTART;
        return "skill" + (act - 100);
    };
    /**
     * 动作值定义
     */
    ActionStandard.SA_IDLE = 0; //站立
    ActionStandard.SA_WALK = 1; //走
    ActionStandard.SA_RUN = 2; //跑
    ActionStandard.SA_DIE = 3; //死亡倒下
    ActionStandard.SA_JUMP_START = 4; //准备跳跃
    ActionStandard.SA_JUMP = 5; //跳跃
    ActionStandard.SA_STRUCK = 6; //	被攻击
    /**100以上的都属于攻击动作*/
    ActionStandard.SA_NORMHIT = 100; //普通攻击
    ActionStandard.SA_HIT1 = 101; //技能攻击1
    ActionStandard.SA_HIT2 = 102; //技能攻击2
    return ActionStandard;
}());
__reflect(ActionStandard.prototype, "ActionStandard");
/**
 * spain动作值定义
 */
var ActionSpine = (function () {
    function ActionSpine() {
    }
    ActionSpine.IDLE = "stand"; //待机
    ActionSpine.NORMHIT = "fight"; //普攻
    ActionSpine.DIE = "dead"; //死亡
    ActionSpine.RUN = "walk"; //移动
    ActionSpine.JUMP = "jump"; //跳跃中
    ActionSpine.STRUCK = "hit"; //受击
    ActionSpine.RIDE = "ride"; //坐骑
    ActionSpine.SKILL1 = "skill1"; //技能1
    ActionSpine.SKILL2 = "skill2"; //技能2
    return ActionSpine;
}());
__reflect(ActionSpine.prototype, "ActionSpine");
//# sourceMappingURL=ActionStandard.js.map