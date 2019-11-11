/*
 * @Description: 通用list表面板
 * @Author: xiejunwei
 * @Date: 2019-09-09 14:00:28
 * @LastEditTime: 2019-09-09 14:24:44
 */
class ItemListTips extends BaseEuiWindow {
    public constructor() {
        super(LayerManager.UI_Tips);
        this.skinName = "ItemListTipsSkin"
    }

    public bg: BaseWinBg;
    public itemList: eui.List;

    public init(): void {
        super.init();
    }

    public open(param: ViewProp): void {
        super.open();
        this.itemList.itemRenderer
        if (param && param.firData) {
            let obj = {
                itemRenderer: param.firData["itemRenderer"],
                itemSkin: param.firData["itemSkin"],
                itemData: param.firData["itemData"]
            }
            this.initData(obj);
            if (param.firData["msg"]) {
                this.message(param.firData["msg"], this.initListData);
            }
        }
    }



    private initData(data: { itemRenderer, itemSkin, itemData }): void {
        this.itemList.itemRenderer = data.itemRenderer;
        this.itemList.itemRendererSkinName = data.itemSkin;
        this.initListData(data.itemData);
    }

    private initListData(dataArr): void {
        this.setListData(this.itemList, dataArr);
    }
}