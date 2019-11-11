var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var StdMount = (function () {
    function StdMount() {
        /** 基础属性加成 */
        this.basicatt = [];
        /** 激活消耗 */
        this.activationNeed = [];
        /** 升级加成 */
        this.gradeatt = [];
        /** 升星消耗数量 */
        this.advancedcount = [];
        /** 升星对应星级系数 */
        this.advancedFactor = [];
        /** 升星对应模型 */
        this.advancedMod = [];
        /** 技能数量 */
        this.skillnum = [];
        /** 待机说话 */
        this.adle_talk = [];
        /** 品质对应星级最大值 */
        this.typeToStar = [];
    }
    return StdMount;
}());
__reflect(StdMount.prototype, "StdMount");
//# sourceMappingURL=StdMount.js.map