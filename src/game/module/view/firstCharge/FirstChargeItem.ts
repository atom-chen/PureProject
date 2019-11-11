/*
 * @Description: 首冲item内容
 * @Author: liangzhaowei
 * @Date: 2019-09-02 17:36:25
 * @LastEditTime: 2019-10-10 19:20:12
 */

class FirstChargeItem extends BaseCustComponent {
    public constructor() {
        super();
        this.skinName = "FirstChargeItemSkin";
    }


    public lb1: eui.Label;
    public lb2: eui.Label;
    public item: eui.Image;
    public imgEx: eui.Image;



    protected childrenCreated(): void {
        super.childrenCreated();
        this.addTouchEvent(this, this.onClick);
    }

    protected dataChanged(): void {
        super.dataChanged();
        if (this.data.money) {
            let cfg: StdChognzhi = this.data;
            if (!cfg) {
                return;
            }
            if (cfg.money) {
                this.lb1.text =StringUtils.substitute(Language.lang.lcn12, cfg.money)+ "=";
            }
            else {
                this.lb1.text = "";
            }

            if (cfg.fourfoldDimond && cfg.dimond) {
                this.lb2.text = (cfg.fourfoldDimond.count + cfg.dimond.count) + "";
                this.item.source = GlobalFun.getItemSourceById(cfg.fourfoldDimond.id);
            }
            else {
                this.item.source = null;
                this.lb2.text = "";
            }

            if (cfg.icon) {
                this.imgEx.source = cfg.icon;
            }
            else {
                this.imgEx.source = null;
            }
        }
    }

    public onClick() {
        let cfg: StdChognzhi = this.data;
        if (cfg.fourfoldDimond && cfg.dimond) {
            let chargeStr = "@AddMoney 3 ";
            chargeStr = chargeStr + (cfg.money);
            Proxy.chat.sendChatMessage(1, chargeStr, false);
        }
    }



}