var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var StdArenarobot = (function () {
    function StdArenarobot() {
        /** 角色属性1 */
        this.att1 = [];
        /** 角色技能2 */
        this.skill1 = [];
        /** 角色属性2 */
        this.att2 = [];
        /** 角色技能2 */
        this.skill2 = [];
        /** 角色属性3 */
        this.att3 = [];
        /** 角色技能3 */
        this.skill3 = [];
    }
    return StdArenarobot;
}());
__reflect(StdArenarobot.prototype, "StdArenarobot");
//# sourceMappingURL=StdArenarobot.js.map