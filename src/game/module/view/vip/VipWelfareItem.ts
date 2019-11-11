/*
 * @Description: vip卡片item
 * @Author: liangzhaowei
 * @Date: 2019-08-27 16:21:52
 * @LastEditTime: 2019-09-03 20:17:17
 */

class VipWelfareItem extends BaseCustComponent {
    public constructor() {
        super();
    }

    public lbDes: eui.Label;
    public imgNew: eui.Image;


    protected childrenCreated(): void {
        super.childrenCreated();
    }

    protected dataChanged(): void {
        super.dataChanged();
        if (this.data.dec) {
            if (this.data.dec) {
                this.lbDes.textFlow = TextFlowUtils.generateTextFlow(this.data.dec);
            }
            if (this.imgNew) {
                this.imgNew.visible = this.data.bNew;
            }
        }
    }


}