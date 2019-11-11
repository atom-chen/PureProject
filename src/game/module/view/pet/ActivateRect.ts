/*
 * @Description: 激活方式
 * @Author: liangzhaowei
 * @Date: 2019-08-01 17:37:47
 * @LastEditTime: 2019-08-07 10:59:44
 */
class ActivateRect extends BaseCustComponent {
    public constructor() {
        super();
        this.skinName = "ActivateRectSkin";
    }


    public icon: ItemBase;
    public lbNe: eui.Label;
    public lbHave: eui.Label;
    public btn: eui.Button;

    petData: StdPet;

    protected childrenCreated(): void {
        super.childrenCreated();
        this.addTouchEvent(this.btn, this.onClick)
    }

    public onClick() {
        if (this.petData) {
            Proxy.pet.actPet(this.petData.id);
        }
    }

    public setData(data: StdPet) {
        if (data && data.name) {
            if (data.activationNeed && data.activationNeed[0]) {
                this.icon.data = data.activationNeed[0].id;
                this.lbNe.textFlow = TextFlowUtils.generateTextFlow(ItemUtils.getItemNamewithColorById(data.activationNeed[0].id));
                this.lbHave.text = data.activationNeed[0].count + "/" + GameCache.bag.itemCount(data.activationNeed[0].id);
                this.petData = data;
            }
        }
    }

}
