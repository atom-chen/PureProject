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
/**
 * create by junwei on 06/25/2019
 * 技能条目
 */
var SkillItem = (function (_super) {
    __extends(SkillItem, _super);
    function SkillItem() {
        return _super.call(this) || this;
    }
    SkillItem.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        // this.addTouchEvent(this.eBtn, this.editFunc);
    };
    SkillItem.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (this.data.id) {
            this.sName.text = this.data.name;
            this.des.textFlow = TextFlowUtils.generateTextFlow(this.data.desc);
        }
    };
    SkillItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    SkillItem.prototype.editFunc = function () {
        // DeBugMgr.skillEffEdit(this.data.id,this.data.sId1,this.data.sId2);
    };
    return SkillItem;
}(BaseCustComponent));
__reflect(SkillItem.prototype, "SkillItem");
//# sourceMappingURL=SkillItem.js.map