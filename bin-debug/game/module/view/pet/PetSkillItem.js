/*
 * @Description: 宠物技能内容
 * @Author: liangzhaowei
 * @Date: 2019-09-18 10:45:18
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
var PetSkillItem = (function (_super) {
    __extends(PetSkillItem, _super);
    function PetSkillItem() {
        var _this = _super.call(this) || this;
        _this.skinName = "PetSkillItemSkin";
        return _this;
    }
    PetSkillItem.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    PetSkillItem.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
    };
    PetSkillItem.prototype.setData = function (data, star) {
        if (!data) {
            return;
        }
        var datacf = GameConfig.petskill[data.skill];
        if (datacf) {
            /**已解锁 */
            if (star >= data.star) {
                this.lbNe.text = datacf.name;
                this.icon.source = RES_DIR_PET_SKILL + datacf.icon + ".png";
                this.lbNe.textColor = ColorUtil.C_YELLOW;
            }
            else {
                this.lbNe.text = StringUtils.substitute(Language.lang.lcn16, data.star);
                this.lbNe.textColor = 0xBCBCBC;
                this.icon.source = RES_DIR_PET_SKILL + datacf.icon + "_s.png";
            }
        }
    };
    return PetSkillItem;
}(BaseCustComponent));
__reflect(PetSkillItem.prototype, "PetSkillItem");
//# sourceMappingURL=PetSkillItem.js.map