/**
 * effect: 技能内容
 * author :lzw
 * data :2019.7.16
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
var SkillInfo = (function (_super) {
    __extends(SkillInfo, _super);
    function SkillInfo() {
        var _this = _super.call(this) || this;
        _this.skinName = "SkillInfoSkin";
        return _this;
    }
    SkillInfo.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.touchChildren = false;
        this.currentState = "info";
    };
    SkillInfo.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (this.data && this.data.skill) {
            var skill = this.data.skill;
            var skillCfg = GameConfig.skill[skill.nSkillId];
            this.select.visible = this.data.sl == this.itemIndex;
            if (skillCfg) {
                this.lbName.text = skillCfg.name;
                this.lv.text = skill.nLevel + "";
                this.icon.source = RES_DIR_SKILL + skillCfg.icon + ".png";
            }
            this.gLv.visible = true;
        }
        else {
            this.gLv.visible = false;
            if (this.data.cfg) {
                this.icon.source = RES_DIR_SKILL + this.data.cfg.icon + "_s.png";
                this.lbName.text = StringUtils.substitute(Language.lang.lcn2, this.data.cfg.uselevel);
            }
        }
    };
    return SkillInfo;
}(BaseCustComponent));
__reflect(SkillInfo.prototype, "SkillInfo");
//# sourceMappingURL=SkillInfo.js.map