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
var FamilyApplyPanel = (function (_super) {
    __extends(FamilyApplyPanel, _super);
    function FamilyApplyPanel($parent) {
        if ($parent === void 0) { $parent = null; }
        var _this = _super.call(this, $parent) || this;
        _this.skinName = "FamilyApplyPanelSkin";
        return _this;
    }
    FamilyApplyPanel.prototype.init = function () {
        _super.prototype.init.call(this);
        this.bg.setNameImg("family_title_apply");
    };
    FamilyApplyPanel.prototype.open = function (param) {
        _super.prototype.open.call(this, param);
        this.message(MsgConst.FAMILY_APPLY_UPDATE, this.updateView);
        Proxy.family.applyListReq();
        this.list.itemRenderer = FamilyApplyItem;
    };
    FamilyApplyPanel.prototype.updateView = function () {
        this.setListData(this.list, GameCache.family.applyList || []);
    };
    return FamilyApplyPanel;
}(BaseEuiWindow));
__reflect(FamilyApplyPanel.prototype, "FamilyApplyPanel");
//# sourceMappingURL=FamilyApplyPanel.js.map