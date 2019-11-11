/**
 * create by junwei on 06/27/2019
 */
class BagEquipPannel extends BaseSpriteView {
    public constructor($parent: egret.DisplayObjectContainer = null) {
        super($parent);
        this.skinName = "BagEquipPannelSkin";
    }

    public itemList: eui.List;
    public nTxt: eui.Label;
    public extendBtn: eui.Image;
    public mBtn: eui.Button;

    protected init(): void {
        super.init();
        this.itemList.itemRenderer = ItemBase;
    }

    static red() {
        return GameCache.bag.checkRecycle();
    }

    static changeMsg() {
        return [MsgConst.BAG_ITEM_NUM];
    }

    public refreshRed() {
        this.redShow();
    }

    public open(param: ViewProp = null) {
        this.message(MsgConst.BAG_ITEM_NUM, this.reFreshBag);
        this.message(MsgConst.PROPERTY + PropId.AP_BAG_GRID_COUNT, this.initBag);
        this.initBag();
        this.addTouchEvent(this.mBtn, () => {
            App.ViewManager.open(ViewConst.MELT)
        });
        this.addTouchEvent(this.extendBtn, this.openExpand);

    }

    private reFreshBag(): void {
        if (!App.TimerManager.isExists(this.initBag, this))
            App.TimerManager.addDelay(200, 200, 1, this.initBag, this);
    }

    private initBag(): void {
        let itemArr: UserItem[] = GameCache.bag.getBagByType(BagType.BAG_TYPE_EQUIP);
        // let bagGridNum = GameCache.hero.mainPro.pro(PropId.AP_BAG_GRID_COUNT);
        let bagGridNum = GameCache.bag.bagGridNum[BagType.BAG_TYPE_EQUIP];
        this.setListData(this.itemList, itemArr);
        this.nTxt.text = itemArr.length + "/" + bagGridNum;
    }

    private openExpand(): void {
        App.ViewManager.open(ViewConst.BAGEXPAND);
    }

    private redShow(): void {
        App.ViewManager.showRedPoint(this.mBtn, GameCache.bag.checkRecycle());
    }
}