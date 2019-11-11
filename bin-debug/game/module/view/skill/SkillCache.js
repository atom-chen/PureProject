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
 * @Description: 技能数据
 * @Author: guolinsen
 * @Date: 2019-08-21 19:44:11
 * @LastEditTime: 2019-10-24 22:09:05
 */
var SkillCache = (function (_super) {
    __extends(SkillCache, _super);
    function SkillCache() {
        var _this = _super.call(this) || this;
        /**技能列表 */
        _this.learnSkill = {};
        /**技能顺序 */
        _this.sortSkill = {};
        /**挂机技能*/
        _this.hookSkill = {};
        /**默认的技能结构*/
        _this.allDefaultUserSkill = {};
        return _this;
    }
    SkillCache.prototype.clear = function () {
        this.learnSkill = {};
        this.sortSkill = {};
        this.hookSkill = {};
    };
    SkillCache.prototype.addSKill = function (id, skillList) {
        this.roleSkillCfg();
        this.learnSkill[id] = skillList;
    };
    SkillCache.prototype.initSortSKill = function (actorId, skillSort) {
        var learn = this.learnSkill[actorId];
        if (!learn)
            return;
        this.sortSkill[actorId] = skillSort;
        var arr = this.hookSkill[actorId] = [];
        var hasSkill = false;
        for (var key in skillSort) {
            var id = skillSort[key];
            if (id && learn[id]) {
                arr.push(learn[id]);
                hasSkill = true;
            }
        }
        (!hasSkill) && this.setDefaulHookSkill(actorId);
    };
    SkillCache.prototype.setDefaulHookSkill = function (id) {
        var sortSkill = this.sortSkill[id];
        for (var key in sortSkill) {
            if (sortSkill[key])
                return;
        }
        var arr = this.hookSkill[id];
        (!arr) && (arr = this.hookSkill[id] = []);
        var learn = this.learnSkill[id];
        if (!learn)
            return;
        if (arr.length == 0) {
            for (var i in learn) {
                arr.push(learn[i]);
            }
        }
    };
    SkillCache.prototype.getSkillByActorId = function (id) {
        return this.learnSkill[id];
    };
    /**技能顺序列表 */
    SkillCache.prototype.getFightSkilList = function (id) {
        return this.hookSkill[id];
    };
    /**更新技能等级 */
    SkillCache.prototype.updataSkill = function (actorId, skillId, lv) {
        var skillList = this.learnSkill[actorId];
        if (!skillList) {
            skillList = this.learnSkill[actorId] = {};
        }
        for (var index in skillList) {
            var skill_1 = skillList[index];
            if (skill_1.nSkillId == skillId) {
                skill_1.nLevel = lv;
                return;
            }
        }
        var skill = new UserSkill();
        skill.nSkillId = skillId;
        skill.nLevel = lv;
        skill.dwResumeTick = 0;
        skill.exp = 0;
        skillList[skill.nSkillId] = skill;
        this.setDefaulHookSkill(actorId);
    };
    /**人物技能列表 */
    SkillCache.prototype.roleSkillCfg = function () {
        if (this.roleSkilList)
            return;
        var obj = this.roleSkilList = {};
        for (var index in GameConfig.skill) {
            var data = GameConfig.skill[index];
            var job = data.vocation;
            if (job) {
                var arr = obj[job];
                (!arr) && (arr = obj[job] = []);
                arr.push(data);
            }
        }
    };
    /**通过id构造一个UserSkill*/
    SkillCache.prototype.getDefaultUserSkill = function (id) {
        var skill = this.allDefaultUserSkill[id];
        if (!skill) {
            skill = UserSkill.create(id, 1);
            this.allDefaultUserSkill[id] = skill;
        }
        return skill;
    };
    /**技能升级红点 */
    SkillCache.prototype.skillUpRed = function (roleId) {
        if (!roleId) {
            return false;
        }
        var skillList = this.getSkillByActorId(roleId);
        for (var index in skillList) {
            var skill = skillList[index];
            var skillCfg = GameConfig.skill[skill.nSkillId];
            if (skill.nLevel < GlobalFun.getRoleLv()) {
                if (skillCfg.need) {
                    var actNeed = CommonUtils.copyDataHandler(skillCfg.need);
                    for (var item in actNeed) {
                        var obj = actNeed[item];
                        var nCt = obj.count + 0;
                        if (obj.count) {
                            obj.count = (skill.nLevel + 1) * nCt + 0;
                        }
                    }
                    if (GlobalFun.getBagEnounghUseCondition(actNeed)) {
                        return true;
                    }
                }
            }
        }
        return false;
    };
    /**技能配置红点 */
    SkillCache.prototype.skillDeployRed = function (roleId) {
        if (!roleId) {
            return false;
        }
        var skillIdList = this.sortSkill[roleId];
        for (var index in skillIdList) {
            var skillBar = GameConfig.skillBar[index];
            if (skillBar) {
                if (GlobalFun.getRoleLv() >= skillBar.level) {
                    if (skillIdList[index] == 0) {
                        return true;
                    }
                }
            }
        }
        return false;
    };
    return SkillCache;
}(BaseCache));
__reflect(SkillCache.prototype, "SkillCache");
//# sourceMappingURL=SkillCache.js.map