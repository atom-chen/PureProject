var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 */
var LayerManager = (function () {
    function LayerManager() {
    }
    // /**常用视图层 */
    // public static Effect_Main: BaseEuiLayer;
    LayerManager.init = function () {
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
    };
    LayerManager.prototype.onStageResize = function () {
        // if (this.gameScene) {
        //     this.gameScene.onStageResize();
        // }
        // if (this.mainPage) {
        //     this.mainPage.onStageResize();
        // }
        // GlobalView.getIns().onStageResize();
        // App.ModuleManager.getIns().updateMaskSize();
    };
    return LayerManager;
}());
__reflect(LayerManager.prototype, "LayerManager");
//# sourceMappingURL=LayerManager.js.map