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
 * @Description: 时装副本页面
 * @Author: xiejunwei
 * @Date: 2019-10-25 18:46:46
 */
var FashionCopyPage = (function (_super) {
    __extends(FashionCopyPage, _super);
    function FashionCopyPage($parent) {
        if ($parent === void 0) { $parent = null; }
        var _this = _super.call(this, $parent) || this;
        _this.skinName = "FashionCopyPageSkin";
        return _this;
    }
    FashionCopyPage.prototype.init = function () {
        _super.prototype.init.call(this);
        this.itemList.itemRenderer = FashionCopyItem;
    };
    FashionCopyPage.prototype.open = function (param) {
        _super.prototype.open.call(this);
        this.message(MsgConst.COPY_COUNT, this.initEnterCount);
        // this.addEvent(egret.Event.CHANGE, this.sc, this.changeAlpha);
        // this.addEvent(eui.ItemTapEvent.ITEM_TAP, this.itemList, this.itemClick);
        this.addTouchEvent(this.tabBtn, this.initList);
        this.addTouchEvent(this.plusBtn, this.buyEnter);
        this.addTouchEvent(this.enterBtn, this.enterFunc);
        this.initEnterCount();
        App.TimerManager.addDelay(50, 50, 1, this.initList, this);
    };
    FashionCopyPage.prototype.close = function (param) {
        if (this.awardList) {
            this.awardList.dispose();
        }
        _super.prototype.close.call(this);
    };
    FashionCopyPage.prototype.initList = function () {
        var tar = this.tabBtn.selectedIndex;
        var conf = GameConfig.fashionCopy;
        var arr = [];
        for (var i in conf) {
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
    };
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
    FashionCopyPage.prototype.initAwardList = function () {
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
        var data = this.twSlide.curItemData;
        if (!data)
            return;
        var arr = [];
        for (var i = 0; i < data.awardshow.length; i++) {
            var item = data.awardshow[i];
            var obj = {
                tag: this.tabBtn.selectedIndex == 1,
                id: item[0],
                count: item[1]
            };
            arr.push(obj);
        }
        if (!this.awardList) {
            this.awardList = ObjectPool.get(ItemListCommual);
        }
        this.awardList.setData(arr, this.ig, FashionAwardItem, "ItembaseSkin");
    };
    FashionCopyPage.prototype.initEnterCount = function () {
        var data = GameCache.copy.copyBuyData[GameConfig.globalConfig.fashionCopyId];
        var remain = data ? data.enterCount : 0;
        var vipLvl = GameCache.vip.realValue();
        var base = GameConfig.vip[vipLvl].fashionCopyNum;
        this.remainText.textFlow = TextFlowUtils.generateTextFlow(StringUtils.substitute(Language.lang.remain, remain + "/" + base));
    };
    FashionCopyPage.prototype.enterFunc = function () {
        var curItem = this.twSlide.seleItem;
        var curData = this.twSlide.curItemData;
        if (!curItem)
            return;
        if (!curItem.acti) {
            var hint = StringUtils.substitute(Language.lang.fashioncopy_1, curData.level);
            GlobalFun.SysMsg(hint);
            return;
        }
        ;
        var data = GameCache.copy.copyBuyData[GameConfig.globalConfig.fashionCopyId];
        var remain = data ? data.enterCount : 0;
        if (curData.vipLimit) {
            var roleVip = GameCache.vip.realValue();
            if (roleVip < curData.vipLimit) {
                // GlobalFun.gotoCharge()
                GlobalFun.SysMsg(StringUtils.substitute(Language.lang.vipBoss_0, curData.vipLimit));
                return;
            }
        }
        if (remain <= 0) {
            this.buyEnter();
            return;
        }
        Proxy.copy.sendEnterFB(curData.id);
        App.ViewManager.close(ViewConst.COPY);
    };
    FashionCopyPage.prototype.buyEnter = function () {
        GlobalFun.openEnterBuy("fashionCopy");
    };
    return FashionCopyPage;
}(BaseSpriteView));
__reflect(FashionCopyPage.prototype, "FashionCopyPage");
//# sourceMappingURL=FashionCopyPage.js.map