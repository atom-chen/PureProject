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
 * @Description: 公会成员面板
 * @Author: moyusheng
 * @Date: 2019-10-28 20:17:06
 */
var FamilyApplyConfigPanel = (function (_super) {
    __extends(FamilyApplyConfigPanel, _super);
    function FamilyApplyConfigPanel($parent) {
        if ($parent === void 0) { $parent = null; }
        var _this = _super.call(this, $parent) || this;
        _this.STATE_UP = "up";
        _this.STATE_DOWN = "down";
        _this.skinName = "FamilyApplyConfigPanelSkin";
        return _this;
    }
    FamilyApplyConfigPanel.prototype.init = function () {
        _super.prototype.init.call(this);
        this.bg.setNameImg("family_title_setting");
        this.labCheck.text = Language.lang.familyApplyAuto;
    };
    FamilyApplyConfigPanel.prototype.open = function (param) {
        _super.prototype.open.call(this, param);
        this.currentState = this.STATE_UP;
        this.addTouchEvent(this.imgDrop, this.onDropImgClick);
        this.addTouchEvent(this.dropList, this.onListClick);
        this.addTouchEvent(this.btnSure, this.onBtnSureClick);
        this.dropList.itemRenderer = FamilyDropItem;
        this.updateView();
    };
    FamilyApplyConfigPanel.prototype.updateView = function () {
        var cfg = GameConfig.familyCfg;
        var con = cfg.condition;
        var limitId = GameCache.family.limitId;
        this.chkAuto.selected = GameCache.family.isAuto;
        this.labSelected.text = StringUtils.substitute(Language.lang.familyApplyCondition, con[limitId || 0]);
        var arr = [];
        for (var i = 0; i < con.length; i++) {
            var c = con[i];
            arr.push({ id: i, sc: c });
        }
        this.setListData(this.dropList, arr);
    };
    FamilyApplyConfigPanel.prototype.onDropImgClick = function (e) {
        if (this.currentState === this.STATE_UP) {
            this.currentState = this.STATE_DOWN;
        }
        else {
            this.currentState = this.STATE_UP;
        }
    };
    FamilyApplyConfigPanel.prototype.onListClick = function (e) {
        var data = e.currentTarget;
        var cfg = GameConfig.familyCfg;
        var con = cfg.condition;
        GameCache.family.limitId = data.selectedItem.id;
        this.labSelected.text = StringUtils.substitute(Language.lang.familyApplyCondition, con[data.selectedItem.id]);
        this.currentState = this.STATE_UP;
    };
    FamilyApplyConfigPanel.prototype.onBtnSureClick = function () {
        Proxy.family.setLimit(this.chkAuto.selected ? 1 : 0, GameCache.family.limitId);
        App.ViewManager.close(this.viewKey);
    };
    return FamilyApplyConfigPanel;
}(BaseEuiWindow));
__reflect(FamilyApplyConfigPanel.prototype, "FamilyApplyConfigPanel");
//# sourceMappingURL=FamilyApplyConfigPanel.js.map