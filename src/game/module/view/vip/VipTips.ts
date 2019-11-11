/*
 * @Description: vip特权展示提示
 * @Author: liangzhaowei
 * @Date: 2019-09-05 11:30:40
 * @LastEditTime: 2019-09-05 13:58:38
 */

class VipTips extends BaseEuiWindow {
    public constructor() {
        super(LayerManager.UI_Tips);
        this.skinName = "VipTipsSkin";
        this.closeDispose = false;
    }

    public list: eui.List;


    public open(param: ViewProp = null): void {
        this.list.itemRenderer = VipWelfareItem;

        if (param) {
            let cfg: StdVip = GameConfig.vip[param.exData1];
            let list = []
            if (cfg) {
                for (let index in cfg.des) {
                    let obj = { bNew: false, dec: "" };
                    obj.dec = cfg.des[index];
                    list.push(obj);
                }
                this.setListData(this.list, list);
            }
        }
    }


}