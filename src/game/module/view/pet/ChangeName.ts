/*
 * @Description: 更改名字
 * @Author: liangzhaowei
 * @Date: 2019-08-01 17:37:54
 * @LastEditTime: 2019-08-02 11:02:37
 */
class ChangeName extends BaseCustComponent {
    public constructor() {
        super();
        this.skinName = "ChangeNameSkin";
    }

    public imgChange: eui.Image;
    public num: NumberMC;
    public lbNe: eui.Label;


    protected childrenCreated(): void {
        super.childrenCreated();
    }

    public setData(data) {
        if (data && data.name) {
            this.lbNe.text = data.name;
            this.num.value = 1;
        }
    }

}
