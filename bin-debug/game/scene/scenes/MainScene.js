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
 * 游戏场景
 */
var MainScene = (function (_super) {
    __extends(MainScene, _super);
    /**
     * 构造函数
     */
    function MainScene() {
        return _super.call(this) || this;
    }
    /**
     * 进入Scene调用
     */
    MainScene.prototype.onEnter = function () {
        _super.prototype.onEnter.call(this);
        this.addLayerAt(LayerManager.Game_Main, 0);
        this.addLayer(LayerManager.UI_Main);
        this.addLayer(LayerManager.UI_Win);
        this.addLayer(LayerManager.UI_Main2);
        this.addLayer(LayerManager.UI_TipsNoClick);
        this.addLayer(LayerManager.UI_Tips);
        this.addLayer(LayerManager.UI_Message);
        this.addLayer(LayerManager.UI_Guide);
        App.ViewManager.open(ViewConst.GAME_WORLD);
        App.ViewManager.open(ViewConst.MAIN_UI);
        App.ViewManager.open(ViewConst.MAIN_UI_COCER);
        App.ViewManager.open(ViewConst.MAPLOADING);
    };
    /**
     * 退出Scene调用
     */
    MainScene.prototype.onExit = function () {
        _super.prototype.onExit.call(this);
    };
    return MainScene;
}(BaseScene));
__reflect(MainScene.prototype, "MainScene");
//# sourceMappingURL=MainScene.js.map