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
var FamilyNoticePanel = (function (_super) {
    __extends(FamilyNoticePanel, _super);
    function FamilyNoticePanel($parent) {
        if ($parent === void 0) { $parent = null; }
        var _this = _super.call(this, $parent) || this;
        _this.skinName = "FamilyNoticeSkin";
        return _this;
    }
    FamilyNoticePanel.prototype.init = function () {
        _super.prototype.init.call(this);
        this.bg.setNameImg("family_title_notece");
    };
    FamilyNoticePanel.prototype.open = function (param) {
        _super.prototype.open.call(this, param);
        this.message(MsgConst.FAMILY_INFO_UPDATE, this.updateView);
        this.addTouchEvent(this.btnSure, this.onBtnSureClick);
        this.addEvent(egret.TextEvent.CHANGE, this.notice, this.onTextChanging);
        this.updateView();
    };
    FamilyNoticePanel.prototype.updateView = function () {
        this.notice.text = GameCache.family.fInfo.notice;
        this.count.text = StringUtils.substitute(Language.lang.familyNoticeLimit, this.notice.text.length, 60);
    };
    FamilyNoticePanel.prototype.onBtnSureClick = function () {
        Proxy.family.sendFamilyNotice(this.notice.text);
        App.ViewManager.close(this.viewKey);
    };
    FamilyNoticePanel.prototype.onTextChanging = function (e) {
        this.count.text = StringUtils.substitute(Language.lang.familyNoticeLimit, this.notice.text.length, 60);
    };
    return FamilyNoticePanel;
}(BaseEuiWindow));
__reflect(FamilyNoticePanel.prototype, "FamilyNoticePanel");
//# sourceMappingURL=FamilyNoticePanel.js.map