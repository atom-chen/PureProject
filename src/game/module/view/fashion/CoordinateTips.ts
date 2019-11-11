/*
 * @Description: 搭配窗口
 * @Author: xiejunwei
 * @Date: 2019-08-06 15:35:50
 * @LastEditTime: 2019-08-07 15:38:15
 */
class CoordinateTips extends BaseEuiWindow {
    public constructor() {
        super(LayerManager.UI_Tips);
        this.skinName = "CoordinateTipsSkin";
    }

    public itemList: eui.List;

    public init(): void {
        super.init();
        this.itemList.itemRenderer = CoordinateItem;
    }

    public open(param: ViewProp): void {
        super.open();
        this.initList(param.exData1);
    }



    private initList(job: number): void {
        let conf = GameConfig.fashionSuit;
        let arr = [];
        for (let i in conf) {
            if (conf[i].conds[0].value != 0 && conf[i].conds[0].value != job) continue;
            arr.push(conf[i]);
        }
        this.setListData(this.itemList, arr);
    }

    public refleshItem(): void {
        let idx = this.itemList.selectedIndex;
        let item = this.itemList.getElementAt(idx) as CoordinateItem;
        item.reflashItemList();
    }
}