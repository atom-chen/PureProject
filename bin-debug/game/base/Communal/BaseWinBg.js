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
var BaseWinBg = (function (_super) {
    __extends(BaseWinBg, _super);
    /////////////////////////////////////////////////////////////////////////////
    function BaseWinBg() {
        var _this = _super.call(this) || this;
        _this.skinName = "BaseWinBgSkin";
        return _this;
    }
    BaseWinBg.prototype.setNameImg = function (str) {
        if (str) {
            this.winTitle.source = RES_DIR_WIN_TITTLE + str + ".png";
        }
    };
    BaseWinBg.prototype.setNameImgHold = function (str) {
        if (str) {
            this.winTitle.source = str;
        }
    };
    /**设置帮助按钮 */
    BaseWinBg.prototype.setHelpBtn = function (id) {
        if (this.syBtn && this.winTitle) {
            /**winTitle宽度还没读到,需要延时显示 */
            if (this.winTitle.width == 0 && id) {
                this.recordId = id;
                this.syBtn.visible = false;
                App.TimerManager.addFrame(10, this.delayShow, this, 1);
                return;
            }
            if (id) {
                this.syBtn.visible = true;
                this.syBtn.x = this.winTitle.x + this.winTitle.width + 10;
                this.syBtn.name = id + "";
            }
            else {
                this.syBtn.visible = false;
            }
        }
    };
    BaseWinBg.prototype.delayShow = function () {
        if (this.recordId) {
            this.setHelpBtn(this.recordId);
            this.recordId = 0;
        }
    };
    BaseWinBg.prototype.remove = function () {
    };
    BaseWinBg.prototype.dispose = function () {
        this.disposeChildren(this);
    };
    BaseWinBg.prototype.disposeChildren = function (dis) {
        if (!dis.numChildren) {
            return;
        }
        var len = dis.numChildren;
        var child;
        while (len) {
            len--;
            child = dis.removeChildAt(0);
            if (child instanceof eui.Image && child.texture) {
                child.source = null;
            }
            if (child["stop"]) {
                child["stop"]();
            }
            if (child["dispose"]) {
                child["dispose"]();
            }
            this.disposeChildren(child);
        }
    };
    return BaseWinBg;
}(eui.Component));
__reflect(BaseWinBg.prototype, "BaseWinBg", ["eui.UIComponent", "egret.DisplayObject"]);
// window["BaseWinBg"] = BaseWinBg; 
//# sourceMappingURL=BaseWinBg.js.map