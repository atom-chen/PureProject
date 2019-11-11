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
var FamilyInfoPanel = (function (_super) {
    __extends(FamilyInfoPanel, _super);
    function FamilyInfoPanel($parent) {
        if ($parent === void 0) { $parent = null; }
        var _this = _super.call(this, $parent) || this;
        _this.skinName = "FamilyInfoPanelSkin";
        return _this;
    }
    FamilyInfoPanel.prototype.init = function () {
        _super.prototype.init.call(this);
        this.icon.source = "family_json.family_icon_png";
    };
    FamilyInfoPanel.prototype.open = function (param) {
        _super.prototype.open.call(this, param);
        this.message(MsgConst.FAMILY_INFO_UPDATE, this.updateView);
        this.addTouchEvent(this.noteceBan, this.onNoticeClick);
        this.addTouchEvent(this.optionList, this.onListClick);
        this.optionList.itemRenderer = FamilyOption;
        this.updateView();
    };
    FamilyInfoPanel.prototype.updateView = function () {
        var fInfo = GameCache.family.fInfo;
        if (!fInfo) {
            App.ViewManager.close(ViewConst.FAMILY);
            return;
        }
        this.title.text = StringUtils.substitute(Language.lang.familyTitle, fInfo.fName, fInfo.fLv);
        this.leaderName.textFlow = TextFlowUtils.generateTextFlow(StringUtils.substitute(Language.lang.familyLeaderName, fInfo.lName));
        var lvCfg = GameConfig.familyLv[fInfo.fLv];
        this.memNum.textFlow = TextFlowUtils.generateTextFlow(StringUtils.substitute(Language.lang.familyMemNum, fInfo.memNum, lvCfg.memCountLimit));
        this.money.textFlow = TextFlowUtils.generateTextFlow(StringUtils.substitute(Language.lang.familyFund, fInfo.fund, lvCfg.upLvConsume));
        this.score.textFlow = TextFlowUtils.generateTextFlow(StringUtils.substitute(Language.lang.familyScore, fInfo.fScore));
        this.notice.text = fInfo.notice;
        var familySys = [];
        for (var k in GameConfig.familySys) {
            var sys = GameConfig.familySys[k];
            if (sys.open <= fInfo.position) {
                familySys.push(sys);
            }
        }
        this.setListData(this.optionList, familySys);
    };
    FamilyInfoPanel.prototype.onListClick = function (e) {
        var data = e.currentTarget.selectedItem;
        if (GameCache.family.fInfo && GameCache.family.fInfo.position >= data.open) {
            TextFlowUtils.hrefType(data.jump);
        }
    };
    FamilyInfoPanel.prototype.onNoticeClick = function () {
        App.ViewManager.open(ViewConst.FAMILY_NOTICE);
    };
    return FamilyInfoPanel;
}(BaseSpriteView));
__reflect(FamilyInfoPanel.prototype, "FamilyInfoPanel");
//# sourceMappingURL=FamilyInfoPanel.js.map