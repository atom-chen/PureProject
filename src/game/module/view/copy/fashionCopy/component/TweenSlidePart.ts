/*
 * @Description: 渐变、移动
 * @Author: xiejunwei
 * @Date: 2019-10-25 18:47:54
 */
class TweenSlidePart extends BaseCustComponent {
    public constructor() {
        super();
    }

    public sc: eui.Scroller;
    public itemList: eui.List;
    public lBtn: eui.Button;
    public rBtn: eui.Button;

    public delta = 0.02;
    public scaleSize = 0.9;

    private listData: any[] = [];
    public curIdx: number = 0;
    public handler: Handler;          //滑动结束的回调
    public itemWidth = 200;
    private visiNum = 0;    //返回可视item数量
    private reX = 0;        //itemlist在显示范围居中偏移X

    private curItem;
    private lastItem;

    protected childrenCreated(): void {
        super.childrenCreated();
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
    }

    protected dataChanged(): void {
        super.dataChanged();
    }

    public dispose(): void {
        super.dispose();
        // this.sc.removeEventListener(egret.TouchEvent.TOUCH_END, this.maganetAnimate, this);
        // this.sc.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.maganetAnimate, this)
    }

    public initData(itemRender: any, itemData: any[], handler?, thisc?, itemSkin?): void {

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

        App.TimerManager.addDelay(50, 50, 1, () => {
            this.sc.viewport.scrollH = this.reX;
            this.curIdx = 0;
            this.changeAlpha(1);
        }, this)
    }

    private lastPoint = 0;
    private changeAlpha(inmediate?): void {
        let idx;
        let viewPort = this.sc.viewport;
        let dir = viewPort.scrollH - this.lastPoint > 0 ? 1 : -1;
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
        } else {
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
    }

    private tw: egret.Tween;
    private itemClick(e: eui.ItemTapEvent): void {
        this.tw = egret.Tween.get(this.sc.viewport, { onChange: this.changeAlpha, onChangeObj: this });
        this.sc.viewport.scrollH;
        let tar = e.itemIndex - 1;
        this.curIdx = e.itemIndex;
        if (tar < 0) return;
        let cur = tar * this.itemWidth + this.reX;
        this.tweenAnime(cur, 500);
    }

    // 按钮触发
    private onBtnTouche(e: egret.TouchEvent): void {
        this.tw = egret.Tween.get(this.sc.viewport, { onChange: this.changeAlpha, onChangeObj: this });
        let tar = parseInt(e.target.name);
        this.curIdx += tar;
        let cur = (this.curIdx - 1) * this.itemWidth + this.reX;
        this.tweenAnime(cur, 500);
    }

    private permit = false;
    private beginChange(): void {
        this.permit = true;
    }

    private maganetAnimate(): void {
        if (!this.permit) return;
        let cur = (this.curIdx - 1) * this.itemWidth + this.reX;
        let dur = this.sc.viewport.scrollH > 0 ? Math.floor(cur / this.sc.viewport.scrollH * 500) : 100;
        dur = dur < 100 ? 100 : dur;
        dur = dur > 500 ? 100 : dur;
        this.tw = egret.Tween.get(this.sc.viewport, { onChange: this.changeAlpha, onChangeObj: this });
        this.permit = false;
        this.tweenAnime(cur, dur);
    }

    private tweenAnime(cur, time): void {
        if (!this.tw) this.tw = egret.Tween.get(this.sc.viewport, { onChange: this.changeAlpha, onChangeObj: this });
        this.lBtn.touchEnabled = this.rBtn.touchEnabled = false;
        this.itemList.touchEnabled = false;
        this.itemList.touchChildren = false;
        this.delta = 0.1;
        this.tw.to({ scrollH: cur }, time).call(() => {
            this.itemList.touchEnabled = true;
            this.itemList.touchChildren = true;
            this.lBtn.touchEnabled = this.rBtn.touchEnabled = true;
            this.delta = 0.02;
        }, this);
    }

    //动画执行完回调函数
    private runHandler(): void {
        if (this.handler) {
            this.handler.run();
        }
    }

    public get curItemData() {
        if (this.curItem) return this.curItem.data;
        return null
    }

    public get seleItem() {
        return this.curItem;
    }

    //按钮状态判断；
    private btnVisible(): void {
        if (this.curIdx == 1) {
            this.lBtn.visible = false;
            this.rBtn.visible = true;
        } else if (this.curIdx == (this.itemList.numElements - 2)) {
            this.lBtn.visible = true;
            this.rBtn.visible = false;
        } else if (this.itemList.numElements - 1 == 0) {
            this.rBtn.visible = this.lBtn.visible = false;
        } else {
            this.rBtn.visible = this.lBtn.visible = true;
        }
    }

    /**替换某个下标数据 */
    public replaceItemData(idx, data): void {
        this.listData[idx] = data;
        let a = this.itemList.dataProvider;
        (a as eui.ArrayCollection).replaceAll(this.listData);
    }

}
