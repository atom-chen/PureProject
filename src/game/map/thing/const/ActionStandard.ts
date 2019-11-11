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
class ActionStandard {
    /**
     * 动作值定义
     */
    public static SA_IDLE: number = 0;//站立
    public static SA_WALK: number = 1;//走
    public static SA_RUN: number = 2;//跑
    public static SA_DIE: number = 3;//死亡倒下
    public static SA_JUMP_START: number = 4;//准备跳跃
    public static SA_JUMP: number = 5;//跳跃
    public static SA_STRUCK: number = 6;//	被攻击

    /**100以上的都属于攻击动作*/
    public static SA_NORMHIT: number = 100;//普通攻击
    public static SA_HIT1: number = 101;//技能攻击1
    public static SA_HIT2: number = 102;//技能攻击2

    static getSpine(act): string {
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
    }
}

/**
 * spain动作值定义 
 */
class ActionSpine {
    static IDLE = "stand";     //待机
    static NORMHIT = "fight";  //普攻
    static DIE = "dead";       //死亡
    static RUN = "walk";       //移动
    static JUMP = "jump";      //跳跃中
    static STRUCK = "hit";     //受击
    static RIDE = "ride";      //坐骑
    static SKILL1 = "skill1"; //技能1
    static SKILL2 = "skill2"; //技能2

}
