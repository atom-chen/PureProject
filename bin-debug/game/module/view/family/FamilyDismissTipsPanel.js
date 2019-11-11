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
var FamilyDismissTipsPanel = (function (_super) {
    __extends(FamilyDismissTipsPanel, _super);
    function FamilyDismissTipsPanel($parent) {
        if ($parent === void 0) { $parent = null; }
        var _this = _super.call(this, $parent) || this;
        _this.skinName = "FamilyDismissTipsSkin";
        return _this;
    }
    FamilyDismissTipsPanel.prototype.init = function () {
        _super.prototype.init.call(this);
        this.bg.setNameImg("family_title_dismiss");
    };
    FamilyDismissTipsPanel.prototype.open = function (param) {
        _super.prototype.open.call(this, param);
        this.addTouchEvent(this.btnSure, this.onBtnSureClick);
        this.updateView();
    };
    FamilyDismissTipsPanel.prototype.updateView = function () {
        this.desc.text = Language.lang.familyDismissDesc;
        this.desc2.text = Language.lang.familyDismissDesc2;
    };
    FamilyDismissTipsPanel.prototype.onBtnSureClick = function () {
        Proxy.family.dismissFamilyReq();
        App.ViewManager.close(this.viewKey);
    };
    return FamilyDismissTipsPanel;
}(BaseEuiWindow));
__reflect(FamilyDismissTipsPanel.prototype, "FamilyDismissTipsPanel");
//# sourceMappingURL=FamilyDismissTipsPanel.js.map