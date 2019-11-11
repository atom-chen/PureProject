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
var FamilyListItem = (function (_super) {
    __extends(FamilyListItem, _super);
    function FamilyListItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FamilyListItem.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.addTouchEvent(this.btnApply, this.onBtnApplyClick);
    };
    FamilyListItem.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        this.btnApply.visible = !GameCache.family.isInFamily;
        var data = this.data;
        this.fName.text = StringUtils.substitute(Language.lang.familyName, data.fName, data.fLv);
        var limitScore = GameConfig.familyCfg.condition[data.limitId];
        var limitStr = limitScore > 0 ? StringUtils.substitute(Language.lang.familyLimitScore, limitScore) : Language.lang.familyNoLimit;
        this.limit.textFlow = TextFlowUtils.generateTextFlow(StringUtils.substitute(Language.lang.familyLimit, limitStr));
        this.memNum.textFlow = TextFlowUtils.generateTextFlow(StringUtils.substitute(Language.lang.familyNum, data.memNum, data.memMax));
        this.score.textFlow = TextFlowUtils.generateTextFlow(StringUtils.substitute(Language.lang.familyScore, data.fScore));
    };
    FamilyListItem.prototype.onBtnApplyClick = function () {
        Proxy.family.familyApplyReq(this.data.fId);
        App.ViewManager.close(ViewConst.FAMILY_LIST);
    };
    return FamilyListItem;
}(BaseCustComponent));
__reflect(FamilyListItem.prototype, "FamilyListItem");
//# sourceMappingURL=FamilyListItem.js.map