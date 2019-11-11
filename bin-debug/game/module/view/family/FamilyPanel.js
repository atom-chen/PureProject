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
 * @Description: 公会面板 s0:未加入公会 s1:已加入公会
 * @Author: moyusheng
 * @Date: 2019-10-28 16:12:38
 */
var FamilyPanel = (function (_super) {
    __extends(FamilyPanel, _super);
    function FamilyPanel($parent) {
        if ($parent === void 0) { $parent = null; }
        return _super.call(this, $parent) || this;
        // this.skinName = "FamilyPanelSkin"
    }
    FamilyPanel.prototype.open = function (param) {
        // this.viewContent.visible = false;
        // super.open(param);
        // this.viewContent.removeChildren();
        // this.currentState = "s0";
        // // 状态 判断，当前是否已经加入公会
        // ///
        // if (this.currentState === "s1") {
        // 	this.getView(this.tabBtn.selectedIndex);
        // } else {
        // 	this.familyListPanel || (this.familyListPanel = new FamilyListPanel());
        // 	this.familyListPanel.open(null);
        // 	this.viewContent.addChild(this.familyListPanel);
        // }
        // this.viewContent.visible = true;
        _super.prototype.open.call(this, param);
    };
    return FamilyPanel;
}(CommunalPagePannel));
__reflect(FamilyPanel.prototype, "FamilyPanel");
//# sourceMappingURL=FamilyPanel.js.map