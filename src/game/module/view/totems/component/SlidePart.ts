/*
 * @Description: 滑动控件
 * @Author: xiejunwei
 * @Date: 2019-08-26 15:04:45
 * @LastEditTime: 2019-10-29 16:32:50
 */
class SlidePart extends BaseCustComponent {
    public constructor() {
        super();
    }

    public sc: eui.Scroller;
    public itemList: eui.List;
    public lBtn: eui.Button;
    public rBtn: eui.Button;

    public _safeDelta: number = 50;  //触发滑动动画的距离
    public handler: Handler;          //滑动结束的回调

    private beginPos: number = 0;
    private curIdx: number = 0;      //当前显示的下标;
    private moving: boolean = false;
    private listData: any[] = [];

    protected childrenCreated(): void {
        super.childrenCreated();
        this.addEvent(eui.UIEvent.CHANGE_START, this.sc, this.recodeFunc);
        this.addEvent(eui.UIEvent.CHANGE_END, this.sc, this.endFunc);
        this.addEvent(egret.Event.CHANGE, this.sc, this.pringMove);
        this.addTouchEvent(this.lBtn, this.onBtnTouche);
        this.addTouchEvent(this.rBtn, this.onBtnTouche);
    }

    protected dataChanged(): void {
        super.dataChanged();
        egret.Tween.removeTweens(this.sc.viewport);
        this.tw = null;
    }

    public dispose(): void {
        super.dispose();
    }

    private timera = 0;
    private pringMove(): void {
        if (!this.timera) this.timera = egret.getTimer();
        console.log("TIME SPAVE : " + (this.timera - egret.getTimer()));
        this.timera = egret.getTimer();
    }

    public initData(itemRender: any, itemData: any[], handler?, thisc?): void {
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
    }

    private tw: egret.Tween;
    private recodeFunc(): void {
        this.beginPos = this.sc.viewport.scrollH;
    }

    private endFunc(): void {
        let delta = this.sc.viewport.scrollH - this.beginPos;
        //在安全距离内，回弹
        if (Math.abs(delta) < this._safeDelta && !this.moving) {
            this.moving = true;
            this.tw = egret.Tween.get(this.sc.viewport);
            this.sc.touchEnabled = false;
            this.sc.touchChildren = false;
            this.lBtn.touchEnabled = this.rBtn.touchEnabled = false;
            this.tw.to({ scrollH: this.beginPos }, 100).call(this.resetListener, this);;
            return;
        } else {
            //滚动结束触发
            this.triggerFunc();
        }
    }

    private triggerFunc(): void {
        let delta = this.sc.viewport.scrollH - this.beginPos;
        //在安全距离内，回弹
        if (Math.abs(delta) < this._safeDelta) {
            return;
        }
        let dir = delta / Math.abs(delta);
        if (dir < 0 && this.curIdx == 0) return;
        if (dir > 0 && this.curIdx == (this.itemList.numElements - 1)) return;
        if (this.moving) return;
        this.moving = true;
        this.animateFunc(dir);
    }

    // 按钮触发
    private onBtnTouche(e: egret.TouchEvent): void {
        let tar = parseInt(e.target.name);
        this.recodeFunc();
        this.animateFunc(tar);
    }

    //运动动画，dir为方向，-1为左运动，1为右运动
    protected animateFunc(dir: number): void {
        this.tw = egret.Tween.get(this.sc.viewport);
        //执行磁性吸附动画，禁止用户触摸,禁止按钮点击
        this.sc.touchEnabled = false;
        this.sc.touchChildren = false;
        this.lBtn.touchEnabled = this.rBtn.touchEnabled = false;

        let tarPos = 0;
        this.curIdx += dir;
        tarPos = this.curIdx * this.sc.width;

        this.tw.to({ scrollH: tarPos }, 200).call(this.resetListener, this);
    }

    private resetListener(): void {
        this.lBtn.touchEnabled = this.rBtn.touchEnabled = true;
        this.sc.touchEnabled = true;
        this.sc.touchChildren = true;
        this.moving = false;
        this.tw = null;
        this.btnVisible();

        this.runHandler();
    }

    //动画执行完回调函数
    private runHandler(): void {
        if (this.handler) {
            this.handler.run();
        }
    }

    //按钮状态判断；
    private btnVisible(): void {
        if (this.curIdx == 0) {
            this.lBtn.visible = false;
            this.rBtn.visible = true;
        } else if (this.curIdx == (this.itemList.numElements - 1)) {
            this.lBtn.visible = true;
            this.rBtn.visible = false;
        } else if (this.itemList.numElements - 1 == 0) {
            this.rBtn.visible = this.lBtn.visible = false;
        } else {
            this.rBtn.visible = this.lBtn.visible = true;
        }
    }

    public get currentIndex() {
        return this.curIdx;
    }

    /**替换某个下标数据 */
    public replaceItemData(idx, data): void {
        this.listData[idx] = data;
        let a = this.itemList.dataProvider;
        (a as eui.ArrayCollection).replaceAll(this.listData);
    }
}