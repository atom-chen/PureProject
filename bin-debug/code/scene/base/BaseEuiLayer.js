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
var BaseEuiLayer = (function (_super) {
    __extends(BaseEuiLayer, _super);
    function BaseEuiLayer(param) {
        var _this = _super.call(this) || this;
        _this.numShow = 0;
        _this.originalAlpha = 0;
        _this.param = param;
        _this.percentWidth = 100;
        _this.percentHeight = 100;
        _this.touchEnabled = false;
        _this.visible = false;
        if (param) {
            _this.modal(param.modal, param.alpha);
        }
        _this.numShow = _this.numChildren;
        return _this;
    }
    Object.defineProperty(BaseEuiLayer.prototype, "focusStage", {
        // RESIZE_STAGE
        set: function (flag) {
            if (flag) {
                App.MessageCenter.addListener(MsgConst.RESIZE_STAGE, this.resizeStage, this);
                this.resizeStage();
            }
            else {
                App.MessageCenter.removeListener(MsgConst.RESIZE_STAGE, this);
            }
        },
        enumerable: true,
        configurable: true
    });
    BaseEuiLayer.prototype.resizeStage = function () {
        if (this.modalRect) {
            this.modalRect.graphics.clear();
            this.modalRect.graphics.beginFill(0x000000, 1);
            this.modalRect.graphics.drawRect(0, 0, App.StageUtils.getWidth(), App.StageUtils.getHeight());
            this.modalRect.cacheAsBitmap = true;
        }
    };
    BaseEuiLayer.prototype.modal = function (bo, alpha) {
        if (bo) {
            this.modalRect = new egret.Shape();
            this.modalRect.alpha = alpha == null ? 0.8 : alpha;
            this.originalAlpha = this.modalRect.alpha;
            _super.prototype.addChildAt.call(this, this.modalRect, 0);
            this.focusStage = true;
        }
    };
    /**外部重新设置需要的背景透明度 */
    BaseEuiLayer.prototype.setRectAlpha = function (alpha) {
        if (this.modalRect) {
            this.modalRect.alpha = alpha;
        }
    };
    /**重置原本的透明度 */
    BaseEuiLayer.prototype.resetAlpha = function () {
        if (this.modalRect) {
            this.modalRect.alpha = this.originalAlpha;
        }
    };
    Object.defineProperty(BaseEuiLayer.prototype, "visible", {
        get: function () {
            return this.$visible;
        },
        set: function (vis) {
            if (this.modalRect && this.param && this.param.modalClick) {
                if (this.visible == false && vis == true) {
                    this.modalRect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.removeAll, this);
                }
                else if (this.visible == true && vis == false) {
                    this.modalRect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.removeAll, this);
                }
            }
            this.$setVisible(vis);
        },
        enumerable: true,
        configurable: true
    });
    BaseEuiLayer.prototype.addChild = function (child) {
        this.visible = true;
        return _super.prototype.addChild.call(this, child);
    };
    BaseEuiLayer.prototype.addChildAt = function (child, index) {
        index += this.numShow;
        this.visible = true;
        return _super.prototype.addChildAt.call(this, child, index);
    };
    BaseEuiLayer.prototype.removeChild = function (child) {
        var result = _super.prototype.removeChild.call(this, child);
        if (this.numChildren - this.numShow <= 0) {
            this.visible = false;
        }
        return result;
    };
    BaseEuiLayer.prototype.removeChildAt = function (index) {
        var result = _super.prototype.removeChildAt.call(this, index);
        if (this.numChildren - this.numShow <= 0) {
            this.visible = false;
        }
        return result;
    };
    BaseEuiLayer.prototype.removeModalTop = function () {
        var len = this.numChildren - this.numShow;
        var view;
        if (len) {
            view = this.removeChildAt(this.numChildren - 1);
            view["closeView"] && view.closeView();
            len--;
        }
    };
    BaseEuiLayer.prototype.removeAll = function () {
        var len = this.numChildren - this.numShow;
        var view;
        while (len) {
            view = this.removeChildAt(this.numShow);
            view["closeView"] && view.closeView();
            len--;
        }
    };
    BaseEuiLayer.prototype.removeChildren = function () {
        this.removeAll();
    };
    return BaseEuiLayer;
}(eui.Group));
__reflect(BaseEuiLayer.prototype, "BaseEuiLayer");
//# sourceMappingURL=BaseEuiLayer.js.map