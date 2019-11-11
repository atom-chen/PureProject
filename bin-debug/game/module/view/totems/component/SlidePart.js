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
 * @Description: 滑动控件
 * @Author: xiejunwei
 * @Date: 2019-08-26 15:04:45
 * @LastEditTime: 2019-10-29 16:32:50
 */
var SlidePart = (function (_super) {
    __extends(SlidePart, _super);
    function SlidePart() {
        var _this = _super.call(this) || this;
        _this._safeDelta = 50; //触发滑动动画的距离
        _this.beginPos = 0;
        _this.curIdx = 0; //当前显示的下标;
        _this.moving = false;
        _this.listData = [];
        _this.timera = 0;
        return _this;
    }
    SlidePart.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.addEvent(eui.UIEvent.CHANGE_START, this.sc, this.recodeFunc);
        this.addEvent(eui.UIEvent.CHANGE_END, this.sc, this.endFunc);
        this.addEvent(egret.Event.CHANGE, this.sc, this.pringMove);
        this.addTouchEvent(this.lBtn, this.onBtnTouche);
        this.addTouchEvent(this.rBtn, this.onBtnTouche);
    };
    SlidePart.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        egret.Tween.removeTweens(this.sc.viewport);
        this.tw = null;
    };
    SlidePart.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    SlidePart.prototype.pringMove = function () {
        if (!this.timera)
            this.timera = egret.getTimer();
        console.log("TIME SPAVE : " + (this.timera - egret.getTimer()));
        this.timera = egret.getTimer();
    };
    SlidePart.prototype.initData = function (itemRender, itemData, handler, thisc) {
        this.itemList.itemRenderer = itemRender;
        this.listData = itemData;
        this.setListData(this.itemList, this.listData);
        this.curIdx = 0;
        if (handler) {
            if (this.handler) {
                this.handler.dispose();
            }
            this.handler = Handler.create(thisc, handler, [], false);
        }
        this.beginPos = this.sc.viewport.scrollH;
        App.TimerManager.addDelay(50, 50, 1, this.btnVisible, this);
    };
    SlidePart.prototype.recodeFunc = function () {
        this.beginPos = this.sc.viewport.scrollH;
    };
    SlidePart.prototype.endFunc = function () {
        var delta = this.sc.viewport.scrollH - this.beginPos;
        //在安全距离内，回弹
        if (Math.abs(delta) < this._safeDelta && !this.moving) {
            this.moving = true;
            this.tw = egret.Tween.get(this.sc.viewport);
            this.sc.touchEnabled = false;
            this.sc.touchChildren = false;
            this.lBtn.touchEnabled = this.rBtn.touchEnabled = false;
            this.tw.to({ scrollH: this.beginPos }, 100).call(this.resetListener, this);
            ;
            return;
        }
        else {
            //滚动结束触发
            this.triggerFunc();
        }
    };
    SlidePart.prototype.triggerFunc = function () {
        var delta = this.sc.viewport.scrollH - this.beginPos;
        //在安全距离内，回弹
        if (Math.abs(delta) < this._safeDelta) {
            return;
        }
        var dir = delta / Math.abs(delta);
        if (dir < 0 && this.curIdx == 0)
            return;
        if (dir > 0 && this.curIdx == (this.itemList.numElements - 1))
            return;
        if (this.moving)
            return;
        this.moving = true;
        this.animateFunc(dir);
    };
    // 按钮触发
    SlidePart.prototype.onBtnTouche = function (e) {
        var tar = parseInt(e.target.name);
        this.recodeFunc();
        this.animateFunc(tar);
    };
    //运动动画，dir为方向，-1为左运动，1为右运动
    SlidePart.prototype.animateFunc = function (dir) {
        this.tw = egret.Tween.get(this.sc.viewport);
        //执行磁性吸附动画，禁止用户触摸,禁止按钮点击
        this.sc.touchEnabled = false;
        this.sc.touchChildren = false;
        this.lBtn.touchEnabled = this.rBtn.touchEnabled = false;
        var tarPos = 0;
        this.curIdx += dir;
        tarPos = this.curIdx * this.sc.width;
        this.tw.to({ scrollH: tarPos }, 200).call(this.resetListener, this);
    };
    SlidePart.prototype.resetListener = function () {
        this.lBtn.touchEnabled = this.rBtn.touchEnabled = true;
        this.sc.touchEnabled = true;
        this.sc.touchChildren = true;
        this.moving = false;
        this.tw = null;
        this.btnVisible();
        this.runHandler();
    };
    //动画执行完回调函数
    SlidePart.prototype.runHandler = function () {
        if (this.handler) {
            this.handler.run();
        }
    };
    //按钮状态判断；
    SlidePart.prototype.btnVisible = function () {
        if (this.curIdx == 0) {
            this.lBtn.visible = false;
            this.rBtn.visible = true;
        }
        else if (this.curIdx == (this.itemList.numElements - 1)) {
            this.lBtn.visible = true;
            this.rBtn.visible = false;
        }
        else if (this.itemList.numElements - 1 == 0) {
            this.rBtn.visible = this.lBtn.visible = false;
        }
        else {
            this.rBtn.visible = this.lBtn.visible = true;
        }
    };
    Object.defineProperty(SlidePart.prototype, "currentIndex", {
        get: function () {
            return this.curIdx;
        },
        enumerable: true,
        configurable: true
    });
    /**替换某个下标数据 */
    SlidePart.prototype.replaceItemData = function (idx, data) {
        this.listData[idx] = data;
        var a = this.itemList.dataProvider;
        a.replaceAll(this.listData);
    };
    return SlidePart;
}(BaseCustComponent));
__reflect(SlidePart.prototype, "SlidePart");
//# sourceMappingURL=SlidePart.js.map