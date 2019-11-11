/**
 * 背包窗口
 */
class BagWin extends CommunalPageWin {
    public constructor() {
        super();
    }

    public init(): void {
        super.init();
        // let classArr = [BagEquipPannel,BagItemPannel];
        // let listData = [];
        // for (let i = 1; i <= classArr.length; i++) {
        //     let obj = {}
        //     obj['icon'] = "bag_json.bag_index_" + i + "_png";
        //     obj['icon2'] = "bag_json.bag_index_" + i + "_a_png";
        //     listData.push(obj);
        // }
        // this.setViewData(listData, classArr);
    }

    public open(): void {
        super.open();
    }

    // public constructor() {
    //     super(LayerManager.UI_Win);
    //     this.skinName = "BagWinSkin";
    // }

    // public itemList: eui.List;
    // public closeBtn: eui.Image;

    // protected initUI(): void {

    // }

    // public open(param:ViewProp=null): void {
    //     this.itemList.itemRenderer = ItemBase;
    //     this.addEvent(egret.TouchEvent.TOUCH_TAP, this.closeBtn, this.closeView);

    //     // this.message(MsgConst.BAG_INFO, this.initBag);
    //     this.message(MsgConst.BAG_ITEM_NUM, this.initBag);
    //     this.initBag();
    // }

    // public close(param:ViewProp=null): void {
    // }

    // private initBag(): void {
    //     let itemArr = GameCache.bag.bagItems;
    //     this.setListData(this.itemList, itemArr);
    // }
}