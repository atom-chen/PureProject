/*
 * @Description: 红点控件
 * @Author: liangzhaowei
 * @Date: 2019-09-06 16:30:17
 * @LastEditTime: 2019-10-26 14:26:18
 */

class RedPointView extends BaseEuiComponent {

    /**
     * 构造函数
     * @param $controller 所属模块
     * @param $parent 父级
     */
    public constructor($parent: egret.DisplayObjectContainer = null) {
        super($parent);

        /**清空需要便利的消息列表 */
        App.MessageCenter.changeDic = {};
        App.TimerManager.add(1000, this.onCheckRed, this);
    }

    /**在循环中改变的消息列表 */
    public changeDic = {};


    /**用于检测界面红点 */
    public onCheckRed() {
        this.changeDic = App.MessageCenter.changeDic;
        let mainUiCover: MainUICover = App.ViewManager.getView(ViewConst.MAIN_UI_COCER) as MainUICover;
        let mainUI: MainUI = App.ViewManager.getView(ViewConst.MAIN_UI) as MainUI;
        this.checkMainBtnRed(mainUiCover);
        this.checkMainBtnRed(mainUI);

        let showWin = App.ViewManager.openedUI;
        for (let index in showWin) {
            App.ViewManager.getRedByWinName(ViewConst[showWin[index]], this.changeDic, false);
            /**刷新显示中的窗口红点 */
            let openView = App.ViewManager.getView(showWin[index]);
            if (openView) {
                if (openView["refreshRed"]) {
                    openView["refreshRed"]();
                }
            }
        }

        /**清空循环内消息列表 */
        App.MessageCenter.changeDic = {};
        App.RedPoint.redViewCycleResult = {};

    }

    /**检查主界面中的按钮红点 */
    public checkMainBtnRed(view: MainUICover | MainUI) {
        if (!view) {
            return
        }

        if (view || view.tRefreshIcon) {
            for (let index in view.tRefreshIcon) {
                let item = view.tRefreshIcon[index];
                if (item && item != "") {
                    App.ViewManager.showRedPoint(item, App.ViewManager.getRedByWinName(item.name, this.changeDic))
                }
            }
        }
    }


}
