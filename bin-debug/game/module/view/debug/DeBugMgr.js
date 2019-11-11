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
/**
 * create by junwei on 06/26/2019
 * 调试管理
 */
var DeBugMgr = (function (_super) {
    __extends(DeBugMgr, _super);
    function DeBugMgr() {
        return _super.call(this) || this;
    }
    DeBugMgr.skillEffEdit = function () {
        if (true) {
            App.ViewManager.getView(ViewConst.MAIN_UI).visible = false;
            App.ViewManager.getView(ViewConst.MAIN_UI_COCER).visible = false;
            App.ViewManager.close(ViewConst.SKILL);
            App.ViewManager.open(ViewConst.EDITWIN);
        }
    };
    return DeBugMgr;
}(BaseClass));
__reflect(DeBugMgr.prototype, "DeBugMgr");
//# sourceMappingURL=DeBugMgr.js.map