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
 * @Description:自定义控件
 * @Author: guolinsen
 * @Date: 2019-08-15 15:16:16
 * @LastEditTime: 2019-09-19 15:00:33
 */
var BaseCustComponent = (function (_super) {
    __extends(BaseCustComponent, _super);
    function BaseCustComponent() {
        var _this = _super.call(this) || this;
        _this.className = "@逻辑类名";
        _this.event = [];
        return _this;
    }
    BaseCustComponent.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
    };
    BaseCustComponent.prototype.init = function () {
    };
    /* 添加listView子项点击事件回调 */
    BaseCustComponent.prototype.addItemClick = function (target, func) {
        this.addEvent(eui.ItemTapEvent.ITEM_TAP, target, func);
    };
    /**控件添加一个点击事件 */
    BaseCustComponent.prototype.addTouchEvent = function (obj, func) {
        this.addEvent(egret.TouchEvent.TOUCH_TAP, obj, func);
    };
    /**控件添加一个事件 */
    BaseCustComponent.prototype.addEvent = function (ev, obj, func) {
        if (!obj) {
            return;
            //throw new Error(obj + "不存在绑定对象");
        }
        obj.addEventListener(ev, func, this);
        this.event.push([ev, func, obj]);
    };
    /**移除所有事件 */
    BaseCustComponent.prototype.removeAllEvent = function () {
        for (var _i = 0, _a = this.event; _i < _a.length; _i++) {
            var ev = _a[_i];
            ev[2].removeEventListener(ev[0], ev[1], this);
        }
        this.event = [];
        App.MessageCenter.removeAll(this);
        App.TimerManager.removeAll(this);
    };
    BaseCustComponent.prototype.dispose = function () {
        this.removeAllEvent();
        this.disposeChildren(this);
    };
    /*刷新list数据*/
    BaseCustComponent.prototype.setListData = function (list, data) {
        var dp = list.dataProvider;
        dp ? dp.source = data : list.dataProvider = new eui.ArrayCollection(data);
    };
    BaseCustComponent.prototype.disposeChildren = function (dis) {
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
            // App.RedPoint.remove(child.hashCode);
            this.disposeChildren(child);
        }
    };
    return BaseCustComponent;
}(eui.ItemRenderer));
__reflect(BaseCustComponent.prototype, "BaseCustComponent");
//# sourceMappingURL=BaseCustComponent.js.map