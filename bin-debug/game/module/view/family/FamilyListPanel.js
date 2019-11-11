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
/*
 * @Description: 公会列表面板
 * @Author: moyusheng
 * @Date: 2019-10-28 20:32:56
 */
var FamilyListPanel = (function (_super) {
    __extends(FamilyListPanel, _super);
    function FamilyListPanel($parent) {
        if ($parent === void 0) { $parent = null; }
        var _this = _super.call(this, $parent) || this;
        _this.skinName = "FamilyListPanelSkin";
        return _this;
    }
    FamilyListPanel.prototype.init = function () {
        _super.prototype.init.call(this);
        this.bg.setNameImg("family_title_other");
    };
    FamilyListPanel.prototype.open = function (param) {
        _super.prototype.open.call(this, param);
        this.message(MsgConst.FAMILY_LIST_UPDATE, this.updateView);
        Proxy.family.familyListReq();
        this.addTouchEvent(this.btnCreate, this.onBtnCreateClick);
        this.addTouchEvent(this.btnApply, this.onBtnApplyClick);
        this.list.itemRenderer = FamilyListItem;
        // this.updateView();
    };
    FamilyListPanel.prototype.updateView = function () {
        this.btnApply.visible = this.btnCreate.visible = !GameCache.family.isInFamily;
        var listData = GameCache.family.fList;
        if (!listData) {
            return;
        }
        this.setListData(this.list, listData);
    };
    FamilyListPanel.prototype.onBtnApplyClick = function () {
    };
    FamilyListPanel.prototype.onBtnCreateClick = function () {
        App.ViewManager.open(ViewConst.FAMILY_CREATE);
        App.ViewManager.close(this.viewKey);
    };
    return FamilyListPanel;
}(BaseEuiWindow));
__reflect(FamilyListPanel.prototype, "FamilyListPanel");
//# sourceMappingURL=FamilyListPanel.js.map