var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/*
 * @Description:技能的配置格式
 * @Author: guolinsen
 * @Date: 2019-06-12 10:47:44
 * @LastEditTime: 2019-11-04 19:32:43
 */
var StdSkill = (function () {
    function StdSkill() {
    }
    return StdSkill;
}());
__reflect(StdSkill.prototype, "StdSkill");
var StdSkillRange = (function () {
    function StdSkillRange() {
        this.xStart = 0; //相对于中心点x左边的相对坐标
        this.xEnd = 0; //相对于中心点x右边的相对坐标
        this.yStart = 0; //相对于中心点y上边的相对坐标
        this.yEnd = 0; //相对于中心点y下边的相对坐标
        /**范围的类型
           0:无范围，仅针对目标的单体技能(单体)
           1:线性旋转(单体)（弹道效果）
           2:线性范围(群体)
           3:范围(群体)
           4:以中心点与鼠标的位置的连线作为旋转轴旋转，比线性旋转更精确，用于法师的火球术
           5:以施法点为中心的范围
       */
        this.rangeType = 0;
        /** 范围中心类型
            0:目标
            1:施法者自己
            2:施法点（鼠标落点）
            3:施法者的瞬时坐标和方向
        */
        this.rangeCenter = 0;
    }
    return StdSkillRange;
}());
__reflect(StdSkillRange.prototype, "StdSkillRange");
/**
 * 特效配置
*/
var StdSkillEff = (function () {
    function StdSkillEff() {
    }
    return StdSkillEff;
}());
__reflect(StdSkillEff.prototype, "StdSkillEff");
//# sourceMappingURL=StdSkill.js.map