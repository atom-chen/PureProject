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
var FamilyMemberPanel = (function (_super) {
    __extends(FamilyMemberPanel, _super);
    function FamilyMemberPanel($parent) {
        if ($parent === void 0) { $parent = null; }
        var _this = _super.call(this, $parent) || this;
        _this.skinName = "FamilyMemberPanelSkin";
        return _this;
    }
    FamilyMemberPanel.prototype.open = function (param) {
        _super.prototype.open.call(this, param);
        this.message(MsgConst.FAMILY_MEM_UPDATE, this.updateView);
        Proxy.family.familyMemInfoReq();
        this.curState = this.currentState = FamilyConst.STATE_MEM;
        this.addTouchEvent(this.btnSetting, this.onBtnSettingClick);
        this.addTouchEvent(this.btnCheck, this.onBtnApplyClick);
        this.addTouchEvent(this.btnPosition, this.onBtnPosClick);
        this.addTouchEvent(this.btnMem, this.onBtnMemClick);
        this.list.itemRenderer = FamilyMemItem;
    };
    FamilyMemberPanel.prototype.updateView = function () {
        var listData = [];
        for (var i in GameCache.family.mList) {
            var mInfo = GameCache.family.mList[i];
            listData.push({ state: this.currentState, mInfo: mInfo });
        }
        this.setListData(this.list, listData);
    };
    FamilyMemberPanel.prototype.onBtnSettingClick = function () {
        var permit = GameConfig.familyCfg.privilege[GameCache.family.fInfo.position];
        if (permit.indexOf(FamilyConst.PERMIT_5) == -1) {
            GlobalFun.SysMsg(Language.lang.familyNoPermit);
            return;
        }
        App.ViewManager.open(ViewConst.FAMILY_SETTING);
    };
    FamilyMemberPanel.prototype.onBtnApplyClick = function () {
        var param = new ViewProp();
        param.winTitle = "family_title_apply";
        App.ViewManager.open(ViewConst.FAMILY_APPLY);
    };
    FamilyMemberPanel.prototype.onBtnPosClick = function () {
        if (this.curState === FamilyConst.STATE_POS) {
            return;
        }
        this.curState = this.currentState = FamilyConst.STATE_POS;
        this.updateView();
    };
    FamilyMemberPanel.prototype.onBtnMemClick = function () {
        if (this.curState === FamilyConst.STATE_MEM) {
            return;
        }
        this.curState = this.currentState = FamilyConst.STATE_MEM;
        this.updateView();
    };
    return FamilyMemberPanel;
}(BaseSpriteView));
__reflect(FamilyMemberPanel.prototype, "FamilyMemberPanel");
//# sourceMappingURL=FamilyMemberPanel.js.map