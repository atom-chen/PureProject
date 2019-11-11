var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var FamilyConst = (function () {
    function FamilyConst() {
    }
    /** 成员 */
    FamilyConst.FAMILY_POS_MEMBER = 0;
    /** 长老 */
    FamilyConst.FAMILY_POS_ELDER = 1;
    /** 族长 */
    FamilyConst.FAMILY_POS_LEADER = 2;
    /** 成员管理 */
    FamilyConst.STATE_MEM = "mem";
    /** 职位管理 */
    FamilyConst.STATE_POS = "pos";
    /** 公会频道发言 */
    FamilyConst.PERMIT_0 = 0;
    /** 升降职 */
    FamilyConst.PERMIT_1 = 1;
    /** 踢人*/
    FamilyConst.PERMIT_2 = 2;
    /** 解散 */
    FamilyConst.PERMIT_3 = 3;
    /** 修改公告 */
    FamilyConst.PERMIT_4 = 4;
    /** 审批 */
    FamilyConst.PERMIT_5 = 5;
    return FamilyConst;
}());
__reflect(FamilyConst.prototype, "FamilyConst");
//# sourceMappingURL=FamilyConst.js.map