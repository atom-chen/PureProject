/**
 * 
 */
class LayerManager {

    /**游戏场景 */
    public static Game_Main: BaseEuiLayer;
    /**主UI页面 */
    public static UI_Main: BaseEuiLayer;
    /**窗口层 */
    public static UI_Win: BaseEuiLayer;
    /**主UI2页面 */
    public static UI_Main2: BaseEuiLayer;

    /**提示框层，带有可点击模态 */
    public static UI_Tips: BaseEuiLayer;

    /**提示框层，带有不可点击模态 */
    public static UI_TipsNoClick: BaseEuiLayer;

    /**信息层 */
    public static UI_Message: BaseEuiLayer;

    /**引导层 */
    public static UI_Guide: BaseEuiLayer;


    // /**常用视图层 */
    // public static Effect_Main: BaseEuiLayer;

    public static init(): void {
        this.Game_Main = new BaseEuiLayer();
        this.Game_Main.name = "Game_Main";
        this.UI_Main = new BaseEuiLayer();
        this.UI_Main.name = "UI_Main";
        this.UI_Main2 = new BaseEuiLayer();
        this.UI_Main2.name = "UI_Main2";
        this.UI_Win = new UIWinLayer({ modal: true, alpha: 0.7 });
        this.UI_Win.name = "UI_Win";
        this.UI_Tips = new BaseEuiLayer({ modal: true, alpha: 0 });
        this.UI_Tips.name = "UI_Tips";
        this.UI_TipsNoClick = new BaseEuiLayer({ modal: true });
        this.UI_TipsNoClick.name = "UI_TipsNoClick";
        this.UI_Message = new BaseEuiLayer();
        this.UI_Message.name = "UI_Message";
        this.UI_Message.touchEnabled = false;
        this.UI_Guide = new BaseEuiLayer({ modal: true, alpha: 0 });
        this.UI_Guide.name = "UI_Guide";

    }
    public onStageResize(): void {
        // if (this.gameScene) {
        //     this.gameScene.onStageResize();
        // }
        // if (this.mainPage) {
        //     this.mainPage.onStageResize();
        // }
        // GlobalView.getIns().onStageResize();
        // App.ModuleManager.getIns().updateMaskSize();
    }

}