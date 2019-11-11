/*
 * @Description: 
 * @Author: liangzhaowei
 * @Date: 2019-10-08 15:51:48
 */

class DoubbleItemExpend extends BaseCustComponent {
    public constructor() {
        super();
        this.skinName = "DoubbleItemExpendSkin";
    }

    public item0: eui.Image;
    public num0: eui.Label;
    public item1: eui.Image;
    public num1: eui.Label;


    protected childrenCreated(): void {
        super.childrenCreated();
        this.currentState = "doubble"
    }


    public setData(data: any[]) {
        if (data && data[0]) {
            for (let i = 0; i < 2; i++) {
                if (data[i]) {
                    let item: UseCondition = data[i];
                    this["item" + i].source = GlobalFun.getItemSourceById(item.id);
                    this["num" + i].text = item.count + "";
                }
            }
        }
    }

    


}
