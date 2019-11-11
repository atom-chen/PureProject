/*
 * @Description: 时装副本页面
 * @Author: xiejunwei
 * @Date: 2019-10-25 18:46:46
 */
class FashionCopyPage extends BaseSpriteView {
    public constructor($parent: egret.DisplayObjectContainer = null) {
        super($parent);
        this.skinName = "FashionCopyPageSkin";
    }

    public bg: eui.Image;
    public tabBtn: eui.TabBar;
    public twSlide: TweenSlidePart;
    public plusBtn: eui.Button;
    public remainText: eui.Label;
    public enterBtn: eui.Button;
    public itemList: eui.List;
    public ig: eui.Group;
    public sc: eui.Scroller;

    private awardList: ItemListCommual;

    public init(): void {
        super.init();

        this.itemList.itemRenderer = FashionCopyItem;
    }

    public open(param: ViewProp): void {
        super.open();
        this.message(MsgConst.COPY_COUNT, this.initEnterCount);

        // this.addEvent(egret.Event.CHANGE, this.sc, this.changeAlpha);
        // this.addEvent(eui.ItemTapEvent.ITEM_TAP, this.itemList, this.itemClick);
        this.addTouchEvent(this.tabBtn, this.initList);
        this.addTouchEvent(this.plusBtn, this.buyEnter);
        this.addTouchEvent(this.enterBtn, this.enterFunc);
        this.initEnterCount();
        App.TimerManager.addDelay(50, 50, 1, this.initList, this);
    }

    public close(param: ViewProp): void {
        if (this.awardList) {
            this.awardList.dispose();
        }
        super.close();
    }

    private initList(): void {
        let tar = this.tabBtn.selectedIndex;
        let conf = GameConfig.fashionCopy;
        let arr = [];
        for (let i in conf) {
            if (conf[i].copyType == (tar + 1)) {
                arr.push(conf[i]);
            }
        }
        arr.push(null);
        arr.unshift(null);
        this.bg.source = RES_DIR_BG + "fashionCopy_" + tar + ".png";
        this.twSlide.initData(FashionCopyItem, arr, this.initAwardList, this, "FashionCopyItemSkin");
        // this.setListData(this.itemList, arr);
        // App.TimerManager.addDelay(50, 50, 1, () => {
        //     if (!this.sc.viewport) return;
        //     this.sc.viewport.scrollH = (3 * 200 + 10 - this.sc.width) >> 1;
        //     this.idx = 0;
        //     this.changeAlpha();
        // }, this);

    }


    // private lastPoint = 0;
    // private idx = 0;
    // private curItem: FashionCopyItem;
    // private lastItem: FashionCopyItem;
    // private delta = 0.02;
    // private changeAlpha(): void {
    //     let mid = 58; // item.width * num + (num-1)*5 - this.sc.width
    //     let delta = 205 //item.width + space
    //     let idx;
    //     // let cur = idx * 205 + 58;
    //     let dir = this.sc.viewport.scrollH - this.lastPoint > 0 ? 1 : -1;
    //     idx = Math.floor((this.sc.viewport.scrollH + 58) / 205);
    //     idx = idx <= 0 ? 1 : idx + 1;
    //     this.lastPoint = this.sc.viewport.scrollH;
    //     if (this.idx == idx) {
    //         if (this.curItem) {
    //             this.curItem.shapeMask.alpha = this.curItem.shapeMask.alpha <= 0 ? 0 : this.curItem.shapeMask.alpha -= this.delta;
    //             this.curItem.sG.scaleX = this.curItem.sG.scaleY = this.curItem.sG.scaleY >= 1 ? 1 : this.curItem.sG.scaleY += (this.delta / 10);
    //         }
    //         if (this.lastItem) {
    //             this.lastItem.shapeMask.alpha = this.lastItem.shapeMask.alpha >= 1 ? 1 : this.lastItem.shapeMask.alpha += this.delta;
    //             this.lastItem.sG.scaleX = this.lastItem.sG.scaleY = this.lastItem.sG.scaleY <= 0.9 ? 0.9 : this.lastItem.sG.scaleY -= (this.delta / 10);
    //         }
    //     } else {
    //         this.curItem = (this.itemList.getElementAt(idx) as FashionCopyItem);
    //         this.lastItem = (this.itemList.getElementAt(idx - dir) as FashionCopyItem);
    //         this.initAwardList();
    //         this.idx = idx;
    //     };
    // }

    // private tw: egret.Tween;
    // private itemClick(e: eui.ItemTapEvent): void {
    //     this.tw = egret.Tween.get(this.sc.viewport, { onChange: this.changeAlpha, onChangeObj: this });
    //     this.sc.viewport.scrollH;
    //     this.itemList.touchEnabled = false;
    //     let tar = e.itemIndex - 1;
    //     this.idx = e.itemIndex;
    //     if (tar < 0) return;
    //     let cur = tar * 205 + 58;
    //     this.delta = 0.1
    //     this.tw.to({ scrollH: cur }, 500).call(() => {
    //         this.itemList.touchEnabled = true;
    //         this.delta = 0.02
    //     }, this);
    // }

    private initAwardList(): void {
        // if (this.curItem && curItem && curItem.awardshow) {
        //     let arr = [];
        //     for (let i = 0; i < curItem.awardshow.length; i++) {
        //         let item = curItem.awardshow[i];
        //         let obj = {
        //             tag: this.tabBtn.selectedIndex == 1,
        //             id: item[0],
        //             count: item[1]
        //         }
        //         arr.push(obj);
        //     }
        //     if (!this.awardList) {
        //         this.awardList = ObjectPool.get(ItemListCommual);
        //     }
        //     this.awardList.setData(arr, this.ig, FashionAwardItem, "ItembaseSkin");
        // }
        let data = this.twSlide.curItemData;
        if (!data) return;
        let arr = [];
        for (let i = 0; i < data.awardshow.length; i++) {
            let item = data.awardshow[i];
            let obj = {
                tag: this.tabBtn.selectedIndex == 1,
                id: item[0],
                count: item[1]
            }
            arr.push(obj);
        }
        if (!this.awardList) {
            this.awardList = ObjectPool.get(ItemListCommual);
        }
        this.awardList.setData(arr, this.ig, FashionAwardItem, "ItembaseSkin");
    }

    private initEnterCount(): void {
        let data = GameCache.copy.copyBuyData[GameConfig.globalConfig.fashionCopyId];
        let remain = data ? data.enterCount : 0;
        let vipLvl = GameCache.vip.realValue();
        let base = GameConfig.vip[vipLvl].fashionCopyNum;
        this.remainText.textFlow = TextFlowUtils.generateTextFlow(StringUtils.substitute(Language.lang.remain, remain + "/" + base));
    }

    private enterFunc(): void {
        let curItem = this.twSlide.seleItem;
        let curData = this.twSlide.curItemData;
        if (!curItem) return;
        if (!curItem.acti) {
            let hint = StringUtils.substitute(Language.lang.fashioncopy_1, curData.level);
            GlobalFun.SysMsg(hint);
            return;
        };
        let data = GameCache.copy.copyBuyData[GameConfig.globalConfig.fashionCopyId];
        let remain = data ? data.enterCount : 0;
        if (curData.vipLimit) {
            let roleVip = GameCache.vip.realValue();
            if (roleVip < curData.vipLimit) {
                // GlobalFun.gotoCharge()
                GlobalFun.SysMsg(StringUtils.substitute(Language.lang.vipBoss_0, curData.vipLimit))
                return;
            }
        }
        if (remain <= 0) {
            this.buyEnter();
            return;
        }
        Proxy.copy.sendEnterFB(curData.id);
        App.ViewManager.close(ViewConst.COPY);
    }

    private buyEnter(): void {
        GlobalFun.openEnterBuy("fashionCopy");
    }

}