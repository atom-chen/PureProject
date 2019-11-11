/*
 * @Description: 转职职业展览item
 * @Author: liangzhaowei
 * @Date: 2019-10-29 17:26:55
 */


class TransferShowItem extends BaseCustComponent {
    public constructor() {
        super();
        this.skinName = "TransferShowItemSkin";
    }

    public prop: BaseCustComponent;
    public imgAccount: eui.Image;
    public lbDesc: eui.Label;



    protected childrenCreated(): void {
        super.childrenCreated();
    }

    protected dataChanged(): void {
        super.dataChanged();
        if (this.data.des) {
            this.lbDesc.textFlow = TextFlowUtils.generateTextFlow(this.data.des);
            this.imgAccount.source = `transfer_json.transfer_name_${this.data.job-1}${this.itemIndex}_png`
        }
    }


}