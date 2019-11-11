/*
 * @Description: 转职预览窗口
 * @Author: liangzhaowei
 * @Date: 2019-10-29 17:26:55
 */
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
var SkillTips = (function (_super) {
    __extends(SkillTips, _super);
    function SkillTips() {
        var _this = _super.call(this, LayerManager.UI_Tips) || this;
        _this.skinName = "SkillTipsSkin";
        return _this;
    }
    SkillTips.prototype.init = function () {
        _super.prototype.init.call(this);
    };
    SkillTips.prototype.open = function (param) {
        _super.prototype.open.call(this);
        if (param && param.exData1) {
            var skill = GameConfig.skill[param.exData1];
            if (skill) {
                this.itemName.text = skill.name;
                this.lv.text = Language.lang.lcn20;
                this.icon.source = RES_DIR_SKILL + skill.icon + ".png";
                /**描述 */
                var valueList = [];
                for (var index in skill.valuedec) {
                    valueList.push(skill.valuedec[index] * 1);
                }
                this.desc.text = StringUtils.substitute(skill.desc, valueList);
            }
        }
    };
    return SkillTips;
}(BaseEuiWindow));
__reflect(SkillTips.prototype, "SkillTips");
//# sourceMappingURL=SkillTips.js.map