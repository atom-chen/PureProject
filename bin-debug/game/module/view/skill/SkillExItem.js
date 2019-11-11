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
var SkillExItem = (function (_super) {
    __extends(SkillExItem, _super);
    function SkillExItem() {
        var _this = _super.call(this) || this;
        _this.skinName = "SkillExItemSkin";
        return _this;
    }
    SkillExItem.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    SkillExItem.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (this.data && this.data.skill) {
            var skill = this.data.skill;
            var skillCfg = GameConfig.skill[skill.nSkillId];
            this.select.visible = this.data.sl == this.itemIndex;
            if (skillCfg) {
                this.imgNe.source = "res/images/skillLb/" + skillCfg.id + ".png";
                this.icon.source = RES_DIR_SKILL + skillCfg.icon + ".png";
            }
        }
    };
    return SkillExItem;
}(BaseCustComponent));
__reflect(SkillExItem.prototype, "SkillExItem");
//# sourceMappingURL=SkillExItem.js.map