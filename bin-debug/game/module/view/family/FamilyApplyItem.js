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
var FamilyApplyItem = (function (_super) {
    __extends(FamilyApplyItem, _super);
    function FamilyApplyItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FamilyApplyItem.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.addEvent(egret.TextEvent.LINK, this.labName, this.onLink);
        this.addTouchEvent(this.btnAgree, this.onBtnAgreeClick);
        this.addTouchEvent(this.btnSubject, this.onBtnSubjectClick);
    };
    FamilyApplyItem.prototype.onBtnSubjectClick = function () {
        var data = this.data;
        Proxy.family.familyApplyResponse(false, data.aid);
    };
    FamilyApplyItem.prototype.onBtnAgreeClick = function () {
        var data = this.data;
        Proxy.family.familyApplyResponse(true, data.aid);
    };
    FamilyApplyItem.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        var data = this.data;
        this.icon.source = GlobalFun.getRoleIcon(data.job, data.sex);
        this.mLvl.text = data.lv.toString();
        this.labName.textFlow = TextFlowUtils.generateTextFlow(StringUtils.substitute(Language.lang.roleNameLinke, data.aid, data.name));
        this.labLv.textFlow = TextFlowUtils.generateTextFlow(StringUtils.substitute(Language.lang.familyMemLv, data.lv));
        this.labScore.textFlow = TextFlowUtils.generateTextFlow(StringUtils.substitute(Language.lang.familyMemScore, data.score));
    };
    FamilyApplyItem.prototype.onLink = function (e) {
        var text = e.text;
        TextFlowUtils.hrefType(text);
    };
    return FamilyApplyItem;
}(BaseCustComponent));
__reflect(FamilyApplyItem.prototype, "FamilyApplyItem");
//# sourceMappingURL=FamilyApplyItem.js.map