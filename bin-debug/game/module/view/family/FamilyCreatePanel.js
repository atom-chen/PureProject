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
var FamilyCreatePanel = (function (_super) {
    __extends(FamilyCreatePanel, _super);
    function FamilyCreatePanel($parent) {
        if ($parent === void 0) { $parent = null; }
        var _this = _super.call(this, $parent) || this;
        _this.skinName = "FamilyCreatePanelSkin";
        return _this;
    }
    FamilyCreatePanel.prototype.open = function (param) {
        _super.prototype.open.call(this, param);
        this.addTouchEvent(this.btnSure, this.onBtnSureClick);
        this.updateView();
    };
    FamilyCreatePanel.prototype.init = function () {
        _super.prototype.init.call(this);
        this.bg.setNameImg("family_title_create");
        this.labCost.text = Language.lang.consume;
    };
    FamilyCreatePanel.prototype.updateView = function () {
        var cfg = GameConfig.familyCfg;
        this.labDesc.text = StringUtils.substitute(Language.lang.familyCreateLimit, cfg.createMinVipLevel);
        this.cost.item = GlobalVar.GOLD;
        this.cost.countTxt.textFlow = TextFlowUtils.generateTextFlow(StringUtils.substitute(Language.lang.familyCreateCost, cfg.needYbCount));
    };
    FamilyCreatePanel.prototype.onBtnSureClick = function () {
        var vip = GameCache.hero.mainPro.pro(PropId.AP_VIP_GRADE);
        if (vip < GameConfig.familyCfg.createMinVipLevel) {
            GlobalFun.SysMsg(Language.lang.familyCreateVIPLack);
            return;
        }
        Proxy.family.createFamilyReq(this.input.text);
        App.ViewManager.close(this.viewKey);
    };
    FamilyCreatePanel.prototype.close = function () {
        _super.prototype.close.call(this);
    };
    return FamilyCreatePanel;
}(BaseEuiWindow));
__reflect(FamilyCreatePanel.prototype, "FamilyCreatePanel");
//# sourceMappingURL=FamilyCreatePanel.js.map