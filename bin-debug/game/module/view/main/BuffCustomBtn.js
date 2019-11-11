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
 * @Description: 按钮，用作于副本的自定义使用道具或者购买BUFF
 * @Author: xiejunwei
 * @Date: 2019-09-04 17:06:01
 * @LastEditTime: 2019-09-11 20:55:54
 */
var BuffCustomBtn = (function (_super) {
    __extends(BuffCustomBtn, _super);
    function BuffCustomBtn() {
        var _this = _super.call(this) || this;
        _this._enabled = true;
        _this.skinName = "CustomBtnSkin";
        return _this;
    }
    BuffCustomBtn.prototype.childrenCreated = function () {
        var _this = this;
        _super.prototype.childrenCreated.call(this);
        this.addEvent(egret.TouchEvent.TOUCH_BEGIN, this, function () {
            _this.iconDisplay.scaleX = _this.iconDisplay.scaleY = 0.9;
        });
        this.addEvent(egret.TouchEvent.TOUCH_END, this, function () {
            _this.iconDisplay.scaleX = _this.iconDisplay.scaleY = 1;
        });
        this.addTouchEvent(this, this.action);
    };
    BuffCustomBtn.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        this.initData();
    };
    BuffCustomBtn.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    BuffCustomBtn.prototype.initData = function () {
        var id = this.data;
        var conf = GameConfig.customBtn[id];
        if (!conf)
            return;
        this.iconDisplay.source = RES_DIR_BTN + conf.icon + ".png";
    };
    Object.defineProperty(BuffCustomBtn.prototype, "enabled", {
        set: function (val) {
            this._enabled = val;
        },
        enumerable: true,
        configurable: true
    });
    BuffCustomBtn.prototype.action = function () {
        var id = this.data;
        var conf = GameConfig.customBtn[id];
        if (!conf)
            return;
        switch (conf.configure.type) {
            case "win":
                /** 如果是复活界面 */
                if (conf.configure.value == "REVIVE") {
                    if (GameCache.revive.reveiveList.length == 0) {
                        GlobalFun.SysMsg(Language.lang.lcn14);
                        return;
                    }
                }
                App.ViewManager.open(conf.configure.value);
                break;
            case "item":
                break;
            case "buff":
                // App.ViewManager.open()
                break;
        }
    };
    return BuffCustomBtn;
}(BaseCustComponent));
__reflect(BuffCustomBtn.prototype, "BuffCustomBtn");
//# sourceMappingURL=BuffCustomBtn.js.map