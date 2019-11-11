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
 * 地图事物基类
*/
var BaseThing = (function (_super) {
    __extends(BaseThing, _super);
    function BaseThing() {
        var _this = _super.call(this) || this;
        _this.disappear = true; //是否消失
        _this.canTouch = true; //不能被点击选中
        _this.isView = false;
        _this.touchEnabled = false;
        _this.touchChildren = false;
        _this.cellXY = { x: 0, y: 0 };
        _this.title = new ThingTitle();
        _this.addChild(_this.title);
        return _this;
    }
    BaseThing.prototype.init = function (pro) {
        this.disappear = false;
        this.pro = pro;
        this.initPropertys(pro);
        this.setCellXY(pro.pro(PropId.AP_X), pro.pro(PropId.AP_Y), true);
        this.title.setName(this.pro.charName);
    };
    /**
     * 处理属性集变更
     * @param propSet
     *
     */
    BaseThing.prototype.initPropertys = function (propSet) {
        for (var id in propSet) {
            var type = parseInt(id);
            var value = propSet.pro(type);
            this.updateProperty(type, value);
        }
    };
    /**
     * 处理单个属性变更
     * @param propType
     * @param propValue
     *
     */
    BaseThing.prototype.updateProperty = function (propType, propValue) {
        this.pro.pro(propType, propValue);
        switch (propType) {
            case PropId.AP_ACTOR_ID:
                this.id = propValue;
                break;
        }
    };
    /**
     * 设定当前坐标位置
     * 会基于新的Y值在显示容器中重新排序
     * @param X
     * @param Y
     * @server 是否是后端设置的
     */
    BaseThing.prototype.setCellXY = function (X, Y, server) {
        if (server === void 0) { server = false; }
        this.cellXY.x = X;
        this.cellXY.y = Y;
        this.x = (GameCache.map.cellWidth * (X + 0.5)) >> 0;
        this.y = (GameCache.map.cellHeight * (Y + 0.5)) >> 0;
    };
    BaseThing.prototype.isTouch = function (mouseX, mouseY) {
        if (!this.canTouch)
            return false;
        if (this.disappear)
            return false;
        return (Math.abs(this.x - mouseX) < 40 && this.y - mouseY < 120 && this.y >= mouseY);
    };
    /**
     * 状态处理函数，子类如果需要周期或循环性的处理某些逻辑则应当覆盖此函数
     * @param CurrentTick 当前系统运行时间
     *
     */
    BaseThing.prototype.update = function (CurrentTick) {
    };
    BaseThing.prototype.checkInView = function (tx, ty, tw, th) {
        var w = this.getWidth();
        var h = this.getHeight();
        var x = this.x;
        var y = this.y;
        var flag = true;
        if (x + w <= tx) {
            flag = false;
        }
        else if (x >= tx + tw) {
            flag = false;
        }
        else if (y + h <= ty) {
            flag = false;
        }
        else if (y >= ty + th) {
            flag = false;
        }
        this.setOnView(flag);
    };
    BaseThing.prototype.getWidth = function () {
        return 40;
    };
    BaseThing.prototype.getHeight = function () {
        return 120;
    };
    BaseThing.prototype.setOnView = function (flag) {
        if (this.isView != flag) {
            this.isView = flag;
            if (flag) {
                App.ThingManager.playerLayer.addChild(this);
            }
            else {
                if (this.parent) {
                    this.parent.removeChild(this);
                }
            }
        }
    };
    Object.defineProperty(BaseThing.prototype, "isInView", {
        get: function () {
            return this.isView && this.stage != null;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 说话气泡
     * @param thisc 插入的对象
     */
    BaseThing.prototype.say = function (content, time) {
        if (time === void 0) { time = 5000; }
        this.getBubbles();
        this.bubbles.setData(content, time);
    };
    BaseThing.prototype.getBubbles = function () {
        if (!this.bubbles || this.bubbles.parent != this) {
            this.bubbles = ObjectPool.get(ThingBubbles);
            this.addChild(this.bubbles);
        }
        this.bubbles.y = -120;
        this.bubbles.x = 0;
    };
    BaseThing.prototype.removeBubbles = function () {
        if (this.bubbles) {
            if (this.bubbles.parent == this) {
                this.bubbles.dispose();
            }
            this.bubbles = null;
        }
    };
    /**回收**/
    BaseThing.prototype.dispose = function () {
        this.setOnView(false);
        this.removeBubbles();
        this.pro = null;
        ObjectPool.push(this);
    };
    return BaseThing;
}(egret.DisplayObjectContainer));
__reflect(BaseThing.prototype, "BaseThing", ["IThing"]);
//# sourceMappingURL=BaseThing.js.map