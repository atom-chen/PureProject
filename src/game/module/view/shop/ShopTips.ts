/*
 * @Description: 购物提示框
 * @Author: xiejunwei
 * @Date: 2019-07-31 19:52:59
 * @LastEditTime: 2019-08-01 17:03:39
 */
class ShopTips extends BaseEuiWindow {
    public constructor() {
        super(LayerManager.UI_Tips);
        this.skinName = "ShopTipsSkin";
    }

    public item: ItemBase;
    public cost: ItemExpend;
    public desc: eui.Label;
    public numSele: NumSelect;
    public itemName: eui.Label;
    public bBtn: eui.Button;


    public init(): void {
        super.init();
    }

    public open(param: ViewProp): void {
        super.open();
    }

}
