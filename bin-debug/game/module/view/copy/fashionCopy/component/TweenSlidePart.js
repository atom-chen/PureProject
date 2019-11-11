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
 * @Description: 渐变、移动
 * @Author: xiejunwei
 * @Date: 2019-10-25 18:47:54
 */
var TweenSlidePart = (function (_super) {
    __extends(TweenSlidePart, _super);
    function TweenSlidePart() {
        var _this = _super.call(this) || this;
        _this.delta = 0.02;
        _this.scaleSize = 0.9;
        _this.listData = [];
        _this.curIdx = 0;
        _this.itemWidth = 200;
        _this.visiNum = 0; //返回可视item数量
        _this.reX = 0; //itemlist在显示范围居中偏移X
        _this.lastPoint = 0;
        _this.permit = false;
        return _this;
    }
    TweenSlidePart.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.addEvent(egret.Event.CHANGE, this.sc, this.changeAlpha);
        this.addEvent(eui.ItemTapEvent.ITEM_TAP, this.itemList, this.itemClick);
        this.addEvent(eui.UIEvent.CHANGE_START, this.sc, this.beginChange);
        this.addEvent(eui.UIEvent.CHANGE_END, this.sc, this.maganetAnimate);
        // this.addEvent(egret.TouchEvent.TOUCH_END, this.sc, this.maganetAnimate);
        // this.addEvent(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.sc, this.maganetAnimate);
        // this.sc.addEventListener(egret.TouchEvent.TOUCH_END, this.maganetAnimate, this);
        // this.sc.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.maganetAnimate, this);
        this.addTouchEvent(this.lBtn, this.onBtnTouche);
        this.addTouchEvent(this.rBtn, this.onBtnTouche);
    };
    TweenSlidePart.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
    };
    TweenSlidePart.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        // this.sc.removeEventListener(egret.TouchEvent.TOUCH_END, this.maganetAnimate, this);
        // this.sc.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.maganetAnimate, this)
    };
    TweenSlidePart.prototype.initData = function (itemRender, itemData, handler, thisc, itemSkin) {
        var _this = this;
        if (this.handler) {
            this.handler.dispose();
        }
        this.handler = Handler.create(thisc, handler, [], false);
        this.itemList.itemRenderer = itemRender;
        this.itemList.itemRendererSkinName = itemSkin;
        this.listData = itemData;
        this.setListData(this.itemList, this.listData);
        this.curIdx = 0;
        this.itemList.invalidateSize();
        //初始化选中范围
        // this.itemWidth = this.sc.viewport.width / this.itemList.numElements;
        this.visiNum = Math.floor(this.sc.width / this.itemWidth) + 1;
        this.reX = (this.visiNum * this.itemWidth - this.sc.width) >> 1;
        App.TimerManager.addDelay(50, 50, 1, function () {
            _this.sc.viewport.scrollH = _this.reX;
            _this.curIdx = 0;
            _this.changeAlpha(1);
        }, this);
    };
    TweenSlidePart.prototype.changeAlpha = function (inmediate) {
        var idx;
        var viewPort = this.sc.viewport;
        var dir = viewPort.scrollH - this.lastPoint > 0 ? 1 : -1;
        idx = Math.floor((viewPort.scrollH + this.reX) / this.itemWidth);
        idx = idx <= 0 ? 1 : idx + 1;
        this.lastPoint = viewPort.scrollH;
        if (this.curIdx == idx) {
            if (this.curItem) {
                this.curItem.shapeMask.alpha = this.curItem.shapeMask.alpha <= 0 ? 0 : this.curItem.shapeMask.alpha -= this.delta;
                this.curItem.sG.scaleX = this.curItem.sG.scaleY = this.curItem.sG.scaleY >= 1 ? 1 : this.curItem.sG.scaleY += (this.delta / 10);
            }
            if (this.lastItem) {
                this.lastItem.shapeMask.alpha = this.lastItem.shapeMask.alpha >= 1 ? 1 : this.lastItem.shapeMask.alpha += this.delta;
                this.lastItem.sG.scaleX = this.lastItem.sG.scaleY = this.lastItem.sG.scaleY <= this.scaleSize ? this.scaleSize : this.lastItem.sG.scaleY -= (this.delta / 10);
            }
        }
        else {
            this.curItem = this.itemList.getElementAt(idx);
            this.lastItem = this.itemList.getElementAt(idx - dir);
            this.curIdx = idx;
            if (inmediate === 1) {
                this.curItem.sG.scaleX = this.curItem.sG.scaleY = 1;
                this.curItem.shapeMask.alpha = 0;
            }
            this.btnVisible();
            this.runHandler();
        }
    };
    TweenSlidePart.prototype.itemClick = function (e) {
        this.tw = egret.Tween.get(this.sc.viewport, { onChange: this.changeAlpha, onChangeObj: this });
        this.sc.viewport.scrollH;
        var tar = e.itemIndex - 1;
        this.curIdx = e.itemIndex;
        if (tar < 0)
            return;
        var cur = tar * this.itemWidth + this.reX;
        this.tweenAnime(cur, 500);
    };
    // 按钮触发
    TweenSlidePart.prototype.onBtnTouche = function (e) {
        this.tw = egret.Tween.get(this.sc.viewport, { onChange: this.changeAlpha, onChangeObj: this });
        var tar = parseInt(e.target.name);
        this.curIdx += tar;
        var cur = (this.curIdx - 1) * this.itemWidth + this.reX;
        this.tweenAnime(cur, 500);
    };
    TweenSlidePart.prototype.beginChange = function () {
        this.permit = true;
    };
    TweenSlidePart.prototype.maganetAnimate = function () {
        if (!this.permit)
            return;
        var cur = (this.curIdx - 1) * this.itemWidth + this.reX;
        var dur = this.sc.viewport.scrollH > 0 ? Math.floor(cur / this.sc.viewport.scrollH * 500) : 100;
        dur = dur < 100 ? 100 : dur;
        dur = dur > 500 ? 100 : dur;
        this.tw = egret.Tween.get(this.sc.viewport, { onChange: this.changeAlpha, onChangeObj: this });
        this.permit = false;
        this.tweenAnime(cur, dur);
    };
    TweenSlidePart.prototype.tweenAnime = function (cur, time) {
        var _this = this;
        if (!this.tw)
            this.tw = egret.Tween.get(this.sc.viewport, { onChange: this.changeAlpha, onChangeObj: this });
        this.lBtn.touchEnabled = this.rBtn.touchEnabled = false;
        this.itemList.touchEnabled = false;
        this.itemList.touchChildren = false;
        this.delta = 0.1;
        this.tw.to({ scrollH: cur }, time).call(function () {
            _this.itemList.touchEnabled = true;
            _this.itemList.touchChildren = true;
            _this.lBtn.touchEnabled = _this.rBtn.touchEnabled = true;
            _this.delta = 0.02;
        }, this);
    };
    //动画执行完回调函数
    TweenSlidePart.prototype.runHandler = function () {
        if (this.handler) {
            this.handler.run();
        }
    };
    Object.defineProperty(TweenSlidePart.prototype, "curItemData", {
        get: function () {
            if (this.curItem)
                return this.curItem.data;
            return null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TweenSlidePart.prototype, "seleItem", {
        get: function () {
            return this.curItem;
        },
        enumerable: true,
        configurable: true
    });
    //按钮状态判断；
    TweenSlidePart.prototype.btnVisible = function () {
        if (this.curIdx == 1) {
            this.lBtn.visible = false;
            this.rBtn.visible = true;
        }
        else if (this.curIdx == (this.itemList.numElements - 2)) {
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
    /**替换某个下标数据 */
    TweenSlidePart.prototype.replaceItemData = function (idx, data) {
        this.listData[idx] = data;
        var a = this.itemList.dataProvider;
        a.replaceAll(this.listData);
    };
    return TweenSlidePart;
}(BaseCustComponent));
__reflect(TweenSlidePart.prototype, "TweenSlidePart");
//# sourceMappingURL=TweenSlidePart.js.map