var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/*
    author:lzw
    date:2019/7/16 12:10
    explain:技能pannel内容
*/
var RoleSkillPannel = (function (_super) {
    __extends(RoleSkillPannel, _super);
    function RoleSkillPannel($parent) {
        if ($parent === void 0) { $parent = null; }
        return _super.call(this, $parent) || this;
    }
    RoleSkillPannel.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    RoleSkillPannel.prototype.open = function (param) {
        if (param === void 0) { param = null; }
        _super.prototype.open.call(this, param);
    };
    RoleSkillPannel.prototype.init = function () {
        _super.prototype.init.call(this);
    };
    return RoleSkillPannel;
}(CommunalPagePannel));
__reflect(RoleSkillPannel.prototype, "RoleSkillPannel");
/**测试内容 */ 
//# sourceMappingURL=RoleSkillPannel.js.map