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
 * @Description: 技能升级内容
 * @Author: liangzhaowei
 * @Date: 2019-08-21 19:44:11
 * @LastEditTime: 2019-11-04 15:30:18
 */
var SkillUpView = (function (_super) {
    __extends(SkillUpView, _super);
    function SkillUpView($parent) {
        if ($parent === void 0) { $parent = null; }
        var _this = _super.call(this, $parent) || this;
        _this.nSlRole = 0; //当前选择角色
        _this.nSlSkill = 0; //当前选择技能
        _this.skinName = "SkillUpViewSkin";
        return _this;
    }
    /**模块红点函数 不需要计算的写在前面 */
    SkillUpView.red = function () {
        if (!GameCache.skill) {
            return false;
        }
        for (var index in GameCache.hero.list) {
            var roleData = GameCache.hero.list[index];
            if (GameCache.skill.skillUpRed(roleData.id)) {
                return true;
            }
        }
        return false;
    };
    /** roleId 为角色id*/
    SkillUpView.prototype.roleRed = function (roleId) {
        if (GameCache.skill.skillUpRed(roleId)) {
            return true;
        }
        return false;
    };
    /**需要刷新是红点消息列表 */
    SkillUpView.changeMsg = function () {
        return [MsgConst.SKILL_INFO, MsgConst.PROPERTY + PropId.AP_COIN, MsgConst.PROPERTY + PropId.AP_LEVEL];
    };
    /**界面内循环刷新红点函数 */
    SkillUpView.prototype.refreshRed = function () {
        _super.prototype.refreshRed.call(this);
        if (!GameCache.skill) {
            return;
        }
        App.ViewManager.showRedPoint(this.btnL, GameCache.skill.skillUpRed(this.roleSelect.roleId));
    };
    //初始化
    SkillUpView.prototype.init = function () {
        this.list.itemRenderer = SkillInfo;
        this.roleSelect.setHandler(this, this.roleClick);
    };
    SkillUpView.prototype.open = function (param) {
        if (param === void 0) { param = null; }
        /**更新装备内容 */
        this.message(MsgConst.SKILL_INFO, this.upRoleSkill);
        // this.message(MsgConst.EQUIP_ATTR_CHANGE, this.updateModelEquip);
        this.addTouchEvent(this.btnL, this.onClick);
        this.addTouchEvent(this.btnR, this.onClick);
        this.upRoleSkill();
        this.addItemClick(this.list, this.itemClick);
    };
    SkillUpView.prototype.itemClick = function (e) {
        if (e.itemIndex != this.nSlSkill) {
            this.nSlSkill = e.itemIndex;
            this.upRoleSkill();
        }
    };
    SkillUpView.prototype.onClick = function (e) {
        switch (e.currentTarget) {
            case this.btnL:
                Proxy.skill.setSkillAllUp(this.roleSelect.serverId);
                break;
            case this.btnR:
                Proxy.skill.sendUpSkillLv(this.roleSelect.serverId, this.slSkill.nSkillId);
                break;
        }
    };
    /**角色选择回调 */
    SkillUpView.prototype.roleClick = function (param) {
        this.nSlRole = param;
        this.upRoleSkill();
    };
    /**更新角色技能 */
    SkillUpView.prototype.upRoleSkill = function () {
        var listSkill = GameCache.skill.getSkillByActorId(GameCache.hero.transIdFromeServer(this.nSlRole));
        var tList = [];
        var allSkill = GameCache.skill.roleSkilList[this.roleSelect.job];
        for (var i in allSkill) {
            var std = allSkill[i];
            // if (std && (std.skillsort == 0 || std.skillsort == 3)) {
            if (std && (std.skillsort != 1)) {
                continue;
            }
            var obj = { sl: 1, skill: null, cfg: null, st: 0 };
            obj.sl = this.nSlSkill;
            obj.skill = listSkill[std.id];
            obj.cfg = std;
            //记录当前所选技能
            if (parseInt(i) == (this.nSlSkill) && obj.skill) {
                this.slSkill = obj.skill;
                var skillCfg = std;
                if (skillCfg) {
                    this.skillName.text = skillCfg.name;
                    var valueList = [];
                    for (var index in std.valuedec) {
                        valueList.push(std.valuedec[index] * this.slSkill.nLevel);
                    }
                    this.skillDsc.text = StringUtils.substitute(std.desc, valueList);
                    if (skillCfg.need && skillCfg.need[0]) {
                        this.expend.setData(skillCfg.need[0].id, (this.slSkill.nLevel + 1) * skillCfg.need[0].count);
                    }
                    this.imgNum.value = this.slSkill.nLevel;
                }
            }
            tList.push(obj);
        }
        tList.sort(this.sort);
        this.setListData(this.list, tList);
    };
    SkillUpView.prototype.sort = function (a, b) {
        return a.cfg.id - b.cfg.id;
    };
    return SkillUpView;
}(BaseSpriteView));
__reflect(SkillUpView.prototype, "SkillUpView");
//# sourceMappingURL=SkillUpView.js.map