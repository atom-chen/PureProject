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
 * @Description: 翅膀技能提示
 * @Author: xiejunwei
 * @Date: 2019-08-19 16:32:08
 * @LastEditTime: 2019-08-19 21:01:59
 */
var WingSkillTips = (function (_super) {
    __extends(WingSkillTips, _super);
    function WingSkillTips() {
        var _this = _super.call(this) || this;
        _this.skinName = "WingSkillTipsSkin";
        return _this;
    }
    WingSkillTips.prototype.init = function () {
        _super.prototype.init.call(this);
        this.t0.text = Language.lang.wingActiCondition;
        this.t1.text = Language.lang.wingSkillEff;
    };
    WingSkillTips.prototype.open = function (param) {
        _super.prototype.open.call(this);
        this.initData(param.exData1, param.exData2);
    };
    WingSkillTips.prototype.close = function (param) {
    };
    WingSkillTips.prototype.initData = function (idx, lvl) {
        var conf = GameConfig.wingSkill[idx];
        this.condiTxt.text = StringUtils.substitute(Language.lang.conditionText, idx);
        this.skillIcon.source = "wing_json.wing_skill_" + conf.img + "_png";
        this.desc.text = conf.dec;
        var str = conf.id > lvl ? StringUtils.substitute(Language.lang.unActive, conf.name) : conf.name;
        this.skillName.textFlow = TextFlowUtils.generateTextFlow(str);
    };
    return WingSkillTips;
}(BaseEuiWindow));
__reflect(WingSkillTips.prototype, "WingSkillTips");
//# sourceMappingURL=WingSkillTips.js.map