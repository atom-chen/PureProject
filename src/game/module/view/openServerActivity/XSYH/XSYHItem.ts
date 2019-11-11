/*
 * @Description: 限时优惠条目
 * @Author: xiejunwei
 * @Date: 2019-10-14 10:04:43
 */
class XSYHItem extends BaseCustComponent {
    public constructor() {
        super();
    }

    public imgItem1: eui.Image;
    public imgItem0: eui.Image;
    public icon0: ItemBase;
    public buyBtn: eui.Button;
    public l1: eui.Label;
    public lbNum0: eui.Label;
    public l0: eui.Label;
    public lbNum1: eui.Label;
    public limit: eui.Label;
    public iName: eui.Label;
    public imgSale: eui.Image;
    public bImg: eui.Image;
    public soldOut: eui.Image;

    protected childrenCreated(): void {
        super.childrenCreated();
        this.addTouchEvent(this.buyBtn, this.onBuyFunc);
    }

    protected dataChanged(): void {
        super.dataChanged();
        if (!this.data.id) return;
        this.l0.text = this.l1.text = Language.lang.xsyh_0;
        this.initdata();
    }

    public dispose(): void {
        super.dispose();
    }

    private initdata(): void {
        this.icon0.data = this.data.item;
        this.lbNum1.text = this.data.originalprice;
        this.lbNum0.text = this.data.price[1];
        this.limit.text = StringUtils.substitute(Language.lang.xsyh_1, this.data.vip);
        this.imgSale.source = this.data.discount == 10 ? "xsyh_json.xsyh_tag_png" : "shop_json.shop_sale_" + this.data.discount + "_png";
        this.iName.text = this.icon0._itemData.name;
        this.initState();
    }

    private initState(): void {
        if (!this.data.state) {
            this.limit.visible = false;
            this.bImg.visible = false;
            this.buyBtn.visible = false;
            this.soldOut.visible = true;
        } else {
            let roleVip = GameCache.vip.realValue();
            if (this.data.vip > roleVip) {
                this.limit.visible = true;
                this.bImg.visible = true;
                this.buyBtn.visible = false;
                this.soldOut.visible = false;
            } else {
                this.limit.visible = false;
                this.bImg.visible = false;
                this.buyBtn.visible = true;
                this.soldOut.visible = false;
            }
        }
    }

    private onBuyFunc(): void {
        let num = 0;
        if (!this.data.state) return;
        if (this.data.price[0] == GlobalVar.GOLD) {
            num = GameCache.hero.mainPro.pro(PropId.AP_YUANBAO);
        }
        if (num < this.data.price[1]) {
            GlobalFun.gotoCharge();
            return;
        }
        Proxy.script.sendXSYHBuy(this.data.id);
    }

}