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
 *
 * @author
 *
 */
var CreateRoleScene = (function (_super) {
    __extends(CreateRoleScene, _super);
    /**
     * 构造函数
     */
    function CreateRoleScene() {
        return _super.call(this) || this;
    }
    /**
     * 进入Scene调用
     */
    CreateRoleScene.prototype.onEnter = function () {
        _super.prototype.onEnter.call(this);
        this.addLayer(LayerManager.UI_Main);
        this.addLayer(LayerManager.UI_Win);
        this.addLayer(LayerManager.UI_Tips);
        App.ViewManager.open(ViewConst.CREATE_ROLE);
        if (window['showGame'])
            window['showGame']();
    };
    /**
     * 退出Scene调用
     */
    CreateRoleScene.prototype.onExit = function () {
        _super.prototype.onExit.call(this);
    };
    return CreateRoleScene;
}(BaseScene));
__reflect(CreateRoleScene.prototype, "CreateRoleScene");
//# sourceMappingURL=CreateRoleScene.js.map