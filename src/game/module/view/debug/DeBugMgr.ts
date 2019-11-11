/**
 * create by junwei on 06/26/2019
 * 调试管理
 */
class DeBugMgr extends BaseClass {
    public constructor() {
        super();
    }

    public static skillEffEdit(): void {
        if (DEBUG) {
            App.ViewManager.getView(ViewConst.MAIN_UI).visible = false;
            App.ViewManager.getView(ViewConst.MAIN_UI_COCER).visible = false;
            App.ViewManager.close(ViewConst.SKILL);
            App.ViewManager.open(ViewConst.EDITWIN);
        }
    }


    static dragonTest:any;
}