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
var SkillInfoSort = (function (_super) {
    __extends(SkillInfoSort, _super);
    function SkillInfoSort() {
        var _this = _super.call(this) || this;
        _this.skinName = "SkillInfoSkin";
        return _this;
    }
    SkillInfoSort.prototype.init = function () {
        this.currentState = "sort";
    };
    SkillInfoSort.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.touchChildren = false;
    };
    SkillInfoSort.prototype.dataChanged = function () {
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
            var iconStr = "public_json.public_lock_1_png";
            this.gLv.visible = false;
            var skillBar = GameConfig.skillBar[this.itemIndex + 1];
            if (skillBar) {
                if (GlobalFun.getRoleLv() >= skillBar.level) {
                    this.lbName.text = skillBar.name;
                    iconStr = "public_json.public_add_1_png";
                }
                else {
                    this.lbName.text = StringUtils.substitute(Language.lang.lcn2, skillBar.level);
                }
            }
            else {
                this.lbName.text = "";
            }
            this.icon.source = iconStr;
        }
    };
    return SkillInfoSort;
}(BaseCustComponent));
__reflect(SkillInfoSort.prototype, "SkillInfoSort");
//# sourceMappingURL=SkillInfoSort.js.map