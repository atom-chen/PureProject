/*
 * @Description: vip卡片item
 * @Author: liangzhaowei
 * @Date: 2019-08-27 16:21:52
 * @LastEditTime: 2019-10-10 19:21:07
 */

class VipChargeItem extends BaseCustComponent {
    public constructor() {
        super();
        this.skinName = "VipChargeItemSkin";
    }


    public imgItem0: eui.Image;
    public lbNum0: eui.Label;
    public gPrice: eui.Group;
    public imgItem1: eui.Image;
    public imgIcon: eui.Button;
    public lbNum1: eui.Label;
    public imgVip: eui.Image;
    public lb3: eui.Label;
    public lb2: eui.Label;
    public lb1: eui.Label;



    protected childrenCreated(): void {
        super.childrenCreated();
        this.addTouchEvent(this, this.onClick)
    }

    protected dataChanged(): void {
        super.dataChanged();
        if (this.data.money) {

            let cfg: StdChognzhi = this.data;
            this.lbNum0.text = cfg.desc;
            this.lb1.text = cfg.giftDesc ? cfg.giftDesc : "";
            this.lb2.visible = cfg.giftDesc ? true : false;
            this.lb3.text = StringUtils.substitute(Language.lang.lcn12, cfg.money)
            if (cfg.doubleDimond) {
                this.imgItem1.source = GlobalFun.getItemSourceById(cfg.doubleDimond.id);
                this.lbNum1.text = cfg.doubleDimond.count;
            }

            if (cfg.diamondIcon) {
                this.imgIcon.icon = cfg.diamondIcon;
            }
            else {
                this.imgIcon.icon = null;
            }

            let doubblePrice = false;
            if (cfg.doubleDimond) {
                if (GameCache.firstcharge.secondChargeSt && GameCache.firstcharge.secondChargeSt[cfg.money] == 1) {
                    doubblePrice = false;
                }
                else {
                    doubblePrice = true;
                }
            }
            this.gPrice.visible = doubblePrice;

        }
    }


    public onClick() {
        let cfg: StdChognzhi = this.data;
        if (cfg.money) {
            let chargeStr = "@AddMoney 3 ";
            chargeStr = chargeStr + cfg.money;
            Proxy.chat.sendChatMessage(1, chargeStr, false);
        }
    }




}