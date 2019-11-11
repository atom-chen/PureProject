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
 * @Description: 符碑技能提示
 * @Author: xiejunwei
 * @Date: 2019-09-17 10:08:48
 */
var RuneSkillTips = (function (_super) {
    __extends(RuneSkillTips, _super);
    function RuneSkillTips() {
        var _this = _super.call(this, LayerManager.UI_Tips) || this;
        _this.skinName = "WingSkillTipsSkin";
        return _this;
    }
    RuneSkillTips.prototype.init = function () {
        _super.prototype.init.call(this);
    };
    RuneSkillTips.prototype.open = function (param) {
        _super.prototype.open.call(this);
        this.t1.text = Language.lang.wingSkillEff;
        this.t0.text = Language.lang.wingActiCondition;
        this.initData(param.exData1, param.exData2, param.firData);
    };
    RuneSkillTips.prototype.initData = function (skillId, lvl, job) {
        var skillConf = GameConfig.runeSkill[skillId[1]][skillId[0]];
        if (!skillConf)
            return;
        if (lvl < skillConf.conds) {
            this.skillIcon.filters = FilterUtils.DefaultGrayFilters;
            this.skillName.textFlow = TextFlowUtils.generateTextFlow(StringUtils.substitute(Language.lang.unActive, skillConf.name[job - 1]));
        }
        else {
            this.skillIcon.filters = null;
            this.skillName.text = skillConf.name[job - 1];
        }
        this.skillIcon.source = "rune_json.rune_skill_ico_" + job + "_" + skillConf.img + "_png";
        this.condiTxt.text = StringUtils.substitute(Language.lang.rune_1, skillConf.conds);
        this.desc.text = skillConf.dec;
    };
    return RuneSkillTips;
}(BaseEuiWindow));
__reflect(RuneSkillTips.prototype, "RuneSkillTips");
//# sourceMappingURL=RuneSkillTips.js.map