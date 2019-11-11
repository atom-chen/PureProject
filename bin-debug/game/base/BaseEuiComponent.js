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
var DisplayObjectContainer = egret.DisplayObjectContainer;
/**
 * View基类，继承自eui.Component，使用ViewManager管理
 */
var BaseEuiComponent = (function (_super) {
    __extends(BaseEuiComponent, _super);
    /**
     * 构造函数
     * @param $controller 所属模块
     * @param $parent 父级
     */
    function BaseEuiComponent($parent) {
        if ($parent === void 0) { $parent = null; }
        var _this = _super.call(this) || this;
        _this.event = [];
        _this.flushList = [];
        _this._myParent = $parent;
        _this.isInit = false;
        _this.touchEnabled = false;
        return _this;
    }
    BaseEuiComponent.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
        this.isInit = true;
    };
    //用于子类继承
    BaseEuiComponent.prototype.init = function () {
    };
    /**
    * 面板开启执行函数，用于子类继承
    * 面板如果还没init的时候，会等到面板init完再回调
    * @param param 参数
    */
    BaseEuiComponent.prototype.open = function (param) {
        if (param === void 0) { param = null; }
    };
    /**
     * 面板关闭执行函数，用于子类继承
     * @param param 参数
     */
    BaseEuiComponent.prototype.close = function (param) {
        if (param === void 0) { param = null; }
        this.removeAllEvent();
    };
    Object.defineProperty(BaseEuiComponent.prototype, "myParent", {
        /**
         * 获取我的父级
         * @returns {egret.DisplayObjectContainer}
         */
        get: function () {
            return this._myParent;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 面板是否显示
     * @return
     *
     */
    BaseEuiComponent.prototype.isShow = function () {
        return this.stage != null;
    };
    /**
     * 添加到父级
     */
    BaseEuiComponent.prototype.addToParent = function () {
        this._myParent && this._myParent.addChild(this);
    };
    /**
     * 从父级移除
     */
    BaseEuiComponent.prototype.removeFromParent = function () {
        this.removeAllEvent();
        //this._myParent && this._myParent.removeChild(this);
        App.DisplayUtils.removeFromParent(this);
        App.DisplayUtils.removeFromParent(this["$modalTipsRect"]);
    };
    BaseEuiComponent.prototype.dispose = function () {
        this.destroy();
    };
    /**
     * 销毁
     */
    BaseEuiComponent.prototype.destroy = function () {
        this.removeFromParent();
        this._myParent = null;
        this.disposeChildren(this);
        this.removeAllEvent();
    };
    BaseEuiComponent.prototype.disposeChildren = function (dis) {
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
            if (child["clickEff"]) {
                App.DisplayUtils.removeClickEff(child);
            }
            if (child["stop"]) {
                child["stop"]();
            }
            if (child["dispose"]) {
                child["dispose"]();
            }
            if (child instanceof eui.List) {
                child.dataProvider = null;
            }
            this.disposeChildren(child);
        }
    };
    /**
     * 设置是否隐藏
     * @param value
     */
    BaseEuiComponent.prototype.setVisible = function (value) {
        this.visible = value;
    };
    /*刷新list数据*/
    /** bReplace */
    BaseEuiComponent.prototype.setListData = function (list, data, bReplace) {
        if (bReplace === void 0) { bReplace = false; }
        var dp = list.dataProvider;
        if (!dp) {
            list.dataProvider = new eui.ArrayCollection(data);
        }
        else {
            if (dp.length != data.length) {
                dp.source = data;
            }
            else {
                /**由于数据源被引用,因此需要复制新的数据,防止数据源被修改 */
                if (bReplace) {
                    dp.replaceAll(CommonUtils.copyDataHandler(data));
                }
                else {
                    dp.source = data;
                }
            }
        }
        //dp ? dp.source = data : list.dataProvider = new eui.ArrayCollection(data);
        //dp ? dp.replaceAll(data) : list.dataProvider = new eui.ArrayCollection(data);
    };
    /****************************下面是界面自带侦听事件，窗口关闭自动移除 ************************/
    /* 添加listView子项点击事件回调 */
    BaseEuiComponent.prototype.addItemClick = function (target, func) {
        this.addEvent(eui.ItemTapEvent.ITEM_TAP, target, func);
    };
    /**控件添加一个点击事件 */
    BaseEuiComponent.prototype.addTouchEvent = function (obj, func) {
        this.addEvent(egret.TouchEvent.TOUCH_TAP, obj, func);
    };
    /**控件移除一个点击事件 */
    BaseEuiComponent.prototype.removeTouchEvent = function (obj, func) {
        obj.removeEventListener(egret.TouchEvent.TOUCH_TAP, func, this);
    };
    /**控件添加一个事件 */
    BaseEuiComponent.prototype.addEvent = function (ev, obj, func) {
        obj.addEventListener(ev, func, this);
        this.event.push([ev, func, obj]);
    };
    /**移除所有侦听事件 */
    BaseEuiComponent.prototype.removeAllEvent = function () {
        for (var _i = 0, _a = this.event; _i < _a.length; _i++) {
            var ev = _a[_i];
            ev[2].removeEventListener(ev[0], ev[1], this);
        }
        this.event = [];
        this.removeMessage();
        App.TimerManager.removeAll(this);
        this.removeFlushFun();
    };
    /**界面自带MessageCenter侦听，界面关闭时自动全部移除侦听 */
    BaseEuiComponent.prototype.message = function (type, call) {
        App.MessageCenter.addListener(type, call, this);
    };
    BaseEuiComponent.prototype.removeMessage = function () {
        App.MessageCenter.removeAll(this);
    };
    /**
     * 分帧执行的函数，关闭界面的时候如果还没有执行会移除该函数
     * @fun 函数对象
     * @checkHas 是否覆盖上次
    */
    BaseEuiComponent.prototype.flushFun = function (fun, checkHas) {
        var param = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            param[_i - 2] = arguments[_i];
        }
        if (checkHas) {
            var i = 0;
            var len = this.flushList.length;
            for (; i < len; i++) {
                if (this.flushList[i]["fun"] == fun) {
                    this.flushList.splice(i, 1);
                    break;
                }
            }
        }
        this.flushList.push({ fun: fun, param: param });
        if (!App.TimerManager.isExists(this.onFlush, this)) {
            App.TimerManager.addFrame(2, this.onFlush, this);
        }
    };
    BaseEuiComponent.prototype.onFlush = function () {
        var fObj = this.flushList.shift();
        if (fObj) {
            fObj.fun.apply(this, fObj.param);
        }
    };
    BaseEuiComponent.prototype.removeFlushFun = function () {
        this.flushList.length = 0;
    };
    return BaseEuiComponent;
}(eui.Component));
__reflect(BaseEuiComponent.prototype, "BaseEuiComponent");
//# sourceMappingURL=BaseEuiComponent.js.map