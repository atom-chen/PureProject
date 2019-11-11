/*
 * @Description: 红点控件
 * @Author: liangzhaowei
 * @Date: 2019-09-06 16:30:17
 * @LastEditTime: 2019-10-26 14:26:18
 */
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
var RedPointView = (function (_super) {
    __extends(RedPointView, _super);
    /**
     * 构造函数
     * @param $controller 所属模块
     * @param $parent 父级
     */
    function RedPointView($parent) {
        if ($parent === void 0) { $parent = null; }
        var _this = _super.call(this, $parent) || this;
        /**在循环中改变的消息列表 */
        _this.changeDic = {};
        /**清空需要便利的消息列表 */
        App.MessageCenter.changeDic = {};
        App.TimerManager.add(1000, _this.onCheckRed, _this);
        return _this;
    }
    /**用于检测界面红点 */
    RedPointView.prototype.onCheckRed = function () {
        this.changeDic = App.MessageCenter.changeDic;
        var mainUiCover = App.ViewManager.getView(ViewConst.MAIN_UI_COCER);
        var mainUI = App.ViewManager.getView(ViewConst.MAIN_UI);
        this.checkMainBtnRed(mainUiCover);
        this.checkMainBtnRed(mainUI);
        var showWin = App.ViewManager.openedUI;
        for (var index in showWin) {
            App.ViewManager.getRedByWinName(ViewConst[showWin[index]], this.changeDic, false);
            /**刷新显示中的窗口红点 */
            var openView = App.ViewManager.getView(showWin[index]);
            if (openView) {
                if (openView["refreshRed"]) {
                    openView["refreshRed"]();
                }
            }
        }
        /**清空循环内消息列表 */
        App.MessageCenter.changeDic = {};
        App.RedPoint.redViewCycleResult = {};
    };
    /**检查主界面中的按钮红点 */
    RedPointView.prototype.checkMainBtnRed = function (view) {
        if (!view) {
            return;
        }
        if (view || view.tRefreshIcon) {
            for (var index in view.tRefreshIcon) {
                var item = view.tRefreshIcon[index];
                if (item && item != "") {
                    App.ViewManager.showRedPoint(item, App.ViewManager.getRedByWinName(item.name, this.changeDic));
                }
            }
        }
    };
    return RedPointView;
}(BaseEuiComponent));
__reflect(RedPointView.prototype, "RedPointView");
//# sourceMappingURL=RedPointView.js.map