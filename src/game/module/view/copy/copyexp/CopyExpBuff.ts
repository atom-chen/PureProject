/*
 * @Description: 经验副本经验BUFF使用、购买
 * @Author: xiejunwei
 * @Date: 2019-09-02 17:57:39
 * @LastEditTime: 2019-09-17 12:04:02
 */
class CopyExpBuff extends BaseEuiWindow {
    public constructor() {
        super(LayerManager.UI_Tips);
        this.skinName = "CopyExpBuffSkin";
    }

    public itemList: eui.List;

    public init(): void {
        super.init();
        this.itemList.itemRenderer = CopyExpBuffItem;
    }

    public open(param: ViewProp): void {
        super.open();

    }

    public close(param: ViewProp): void {
        super.close();
    }
}