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
 * @Description: 滑动框
 * @Author: xiejunwei
 * @Date: 2019-08-05 20:27:41
 * @LastEditTime: 2019-08-06 14:00:08
 */
var LiveScroll = (function (_super) {
    __extends(LiveScroll, _super);
    function LiveScroll() {
        var _this = _super.call(this) || this;
        _this.oncea = true;
        return _this;
    }
    LiveScroll.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        var lb = this.g.layout;
        this.gap = lb["gap"];
        this.addEvent(egret.TouchEvent.TOUCH_BEGIN, this, this.onBegin);
        this.addEvent(egret.TouchEvent.TOUCH_MOVE, this, this.onMove);
    };
    LiveScroll.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
    };
    LiveScroll.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    LiveScroll.prototype.initSC = function (conf, begin, itemRender, itemRenderSkin) {
        this.type = itemRender;
        var firstItem = ObjectPool.get(itemRender);
        if (itemRenderSkin) {
            firstItem.skinName = itemRenderSkin;
            this.itemSkin = itemRenderSkin;
        }
        this.g.addChild(firstItem);
        var numChild = Math.ceil(this.sc.height / firstItem.height);
        var dataArr = [];
        var confArr = [];
        for (var i in conf) {
            confArr.push(conf[i]);
        }
        for (var i = 0; i < numChild; i++) {
            var confItem = conf["" + (begin + i)] || confArr[begin + i];
            if (!confItem)
                break;
            if (i == 0) {
                firstItem.data = confItem;
            }
            else {
                var item = ObjectPool.get(itemRender);
                if (itemRenderSkin)
                    item.skinName = itemRenderSkin;
                item.data = confItem;
                this.g.addChild(item);
            }
            dataArr.push(confItem);
        }
    };
    LiveScroll.prototype.onBegin = function (e) {
        this.scY = this.sc.viewport.scrollV;
        this.firstItem = this.g.getElementAt(0);
    };
    LiveScroll.prototype.onMove = function () {
        if (this.firstItem && this.oncea) {
            if (this.sc.viewport.scrollV - this.scY <= -3) {
                var item = ObjectPool.get(this.type);
                item.skinName = this.itemSkin;
                this.g.addChildAt(item, 0);
                this.oncea = false;
            }
        }
    };
    return LiveScroll;
}(BaseCustComponent));
__reflect(LiveScroll.prototype, "LiveScroll");
//# sourceMappingURL=LiveScroll.js.map