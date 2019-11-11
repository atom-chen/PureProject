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
 * @Description: 窗口的基类
 * @Author: guolinsen
 * @Date: 2019-08-02 14:56:37

 * @LastEditTime: 2019-10-28 16:26:11
 */
var BaseEuiWindow = (function (_super) {
    __extends(BaseEuiWindow, _super);
    function BaseEuiWindow($parent) {
        if ($parent === void 0) { $parent = null; }
        var _this = _super.call(this, $parent) || this;
        /**窗口Key值 */
        _this.viewKey = 0;
        _this.closeDispose = true; //移除界面标志
        _this.disposeTime = 0;
        /**是否点击空白处关闭界面(仅限于UI_Tips,UI_Win) */
        _this.bClickClose = true;
        if ($parent == null) {
            $parent = LayerManager.UI_Win;
            _this._myParent = $parent;
        }
        _this.isInit = false;
        return _this;
        // if (!DeviceUtils.IsMobile) {
        //     if (this.myParent == LayerManager.UI_Win || this.myParent == LayerManager.UI_TipsNoClick || this.myParent == LayerManager.UI_Tips) {
        //         this.scaleX = this.scaleY = 0.9;
        //     }
        // }
    }
    BaseEuiWindow.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this._initOpen && this.openView.apply(this, this.openParam);
    };
    /**延时关闭*/
    BaseEuiWindow.prototype.addDelayDestroy = function (t) {
        if (t === void 0) { t = 20000; }
        if (!this.closeDispose)
            return;
        if (this.disposeTime > 0)
            return;
        this.disposeTime = egret.setTimeout(this.destroy, this, t);
    };
    BaseEuiWindow.prototype.removeDelayDestroy = function () {
        if (this.disposeTime > 0) {
            egret.clearTimeout(this.disposeTime);
            this.disposeTime = 0;
        }
    };
    /**用于同一处理打开时的操作 */
    BaseEuiWindow.prototype.open = function (param) {
        if (param === void 0) { param = null; }
        if (this["$modalTipsRect"]) {
            this.addTouchEvent(this["$modalTipsRect"], this.closeView);
        }
        if (this["closeBtn"]) {
            this.addTouchEvent(this["closeBtn"], this.onCloseBtn);
        }
        if (this["bg"] && this["bg"]["closeBtn"]) {
            this.addTouchEvent(this["bg"]["closeBtn"], this.closeView);
        }
    };
    // RESIZE_STAGE
    BaseEuiWindow.prototype.focusToStage = function () {
        this.message(MsgConst.RESIZE_STAGE, this.resizeStage);
        this.resizeStage();
    };
    BaseEuiWindow.prototype.resizeStage = function () {
        this.height = App.StageUtils.getHeight();
        this.width = App.StageUtils.getWidth();
    };
    /**注意：只给view管理器使用 */
    BaseEuiWindow.prototype.openView = function (param) {
        if (param === void 0) { param = null; }
        if (this.isInit) {
            this._initOpen = false;
            this.open.call(this, param);
        }
        else {
            this._initOpen = true;
            this.openParam = param;
        }
    };
    /**关闭窗口 */
    BaseEuiWindow.prototype.closeView = function (isClick) {
        //有些窗口没有viewKey值，为了统一关闭入口，第一个参数强制加入this；
        App.ViewManager.close(this.viewKey);
    };
    /**关闭按钮回调 */
    BaseEuiWindow.prototype.onCloseBtn = function (btn) {
        if (App.ViewManager.backOpen) {
            App.ViewManager.open(App.ViewManager.backOpen.key, App.ViewManager.backOpen);
        }
        App.ViewManager.close(this.viewKey);
    };
    /**重置打开，一般是窗口已经打开，重置一次打开事件和逻辑处理
     * 注意：只给view管理器使用，防止界面读exml还没构建完成
     */
    BaseEuiWindow.prototype.resetOpen = function (param) {
        this.close.call(this, param);
        this.removeAllEvent.call(this);
        this.openView.call(this, param);
    };
    /**设置标题 */
    BaseEuiWindow.prototype.setWinTitle = function (str) {
        if (this["bg"]) {
            this["bg"].setNameImg(str);
        }
    };
    /**设置标题完整路径 */
    BaseEuiWindow.prototype.setWinTitleHold = function (str) {
        if (this["bg"]) {
            this["bg"].setNameImgHold(str);
        }
    };
    /**设置帮助按钮 */
    BaseEuiWindow.prototype.setWinHeleTitle = function (id) {
        if (id === void 0) { id = null; }
        if (this["bg"]) {
            this["bg"].setHelpBtn(id);
        }
    };
    /**
     * 添加到父级
     */
    BaseEuiWindow.prototype.addToParent = function () {
        if (this._myParent == LayerManager.UI_Tips || this._myParent == LayerManager.UI_Win) {
            // if (!this["$modalTipsLabel"]) {
            //     let label = new eui.Component();
            //     label.skinName = "ModalAddTipsSkin";
            //     label.bottom = -40;
            //     label.horizontalCenter = 0;
            //     label.width = 10;
            //     this.addChild(label);
            //     label.touchChildren = label.touchEnabled = false;
            //     this["$modalTipsLabel"] = label;
            // }
            if (this.bClickClose) {
                var re = this["$modalTipsRect"];
                if (!re) {
                    re = new eui.Rect();
                    re.fillColor = 0x232121;
                    re.alpha = 0;
                    re.width = App.StageUtils.getWidth() + 80;
                    re.height = App.StageUtils.getHeight() + 80;
                    re.horizontalCenter = 0;
                    re.verticalCenter = 0;
                    re.x = re.y = -40;
                    this["$modalTipsRect"] = re;
                }
                // re.source = RES.getRes("tywin_json.tywin_bg_alpha_png");
                this._myParent.addChild(re);
                this.addTouchEvent(re, this.closeView);
            }
        }
        _super.prototype.addToParent.call(this);
        this.removeDelayDestroy();
    };
    /**
       * 销毁
       */
    BaseEuiWindow.prototype.destroy = function () {
        if (this.viewKey) {
            var k = this.viewKey;
            this.viewKey = null;
            App.ViewManager.destroy(k);
            return;
        }
        this.removeDelayDestroy();
        _super.prototype.destroy.call(this);
    };
    return BaseEuiWindow;
}(BaseEuiComponent));
__reflect(BaseEuiWindow.prototype, "BaseEuiWindow");
//# sourceMappingURL=BaseEuiWindow.js.map