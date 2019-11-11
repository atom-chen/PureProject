/**
 * create by junwei on 06/27/2019
 */
class BagItemPannel extends BaseSpriteView {
    public constructor($parent: egret.DisplayObjectContainer = null) {
        super($parent);
        this.skinName = "BagItemPannelSkin";
    }

    public itemList: eui.List;

    protected init(): void {
        super.init();
        this.itemList.itemRenderer = ItemBase;
    }

    public open(param: ViewProp = null) {
        this.message(MsgConst.BAG_ITEM_NUM, this.reFreshBag);
        this.initBag();
    }

    private reFreshBag(): void {
        if (!App.TimerManager.isExists(this.initBag, this))
            App.TimerManager.addDelay(200, 200, 1, this.initBag, this);
    }

    private initBag(): void {
        let itemArr: UserItem[] = GameCache.bag.getBagByType(BagType.BAG_TYPE_OTHER);
        this.setListData(this.itemList, itemArr);
    }
}