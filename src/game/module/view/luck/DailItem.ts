/*
 * @Description: 抽奖item内容
 * @Author: liangzhaowei
 * @Date: 2019-08-01 17:38:18
 * @LastEditTime: 2019-08-20 16:45:02
 */

class DailItem extends BaseCustComponent {
    public constructor() {
        super();
        this.skinName = "DailItemSkin";
    }

    public recv: eui.Image;
    public gNum: eui.Group;
    public lbNum: eui.Label;
    public icon: eui.Image;



    protected childrenCreated(): void {
        super.childrenCreated();
    }

    protected dataChanged(): void {
        super.dataChanged();
        this.initData();
    }


    private initData(): void {
        if (this.data) {
            let data: UseCondition = this.data;
            this.icon.source = GlobalFun.getItemSourceById(data.id);
            this.lbNum.text = data.count + "";
        }
    }

    public set setState(state: boolean) {
        this.recv.visible = state;
        this.gNum.visible = !state;
    }

}
