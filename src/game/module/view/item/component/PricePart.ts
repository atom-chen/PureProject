/**
 * create by junwei on 07/29/2019
 * 价格模块
 */

class PricePart extends BaseCustComponent {
    public constructor() {
        super();
        this.skinName = "PricePartSkin"
    }

    public cost: ItemExpend;


    protected childrenCreated(): void {
        super.childrenCreated();
        this.cost.gainWay.visible = false;
        this.cost.lab.textFlow = TextFlowUtils.generateTextFlow(Language.lang.price);
    }

    protected dataChanged(): void {
        super.dataChanged();
    }

    public dispose(): void {
        super.dispose();
    }


}