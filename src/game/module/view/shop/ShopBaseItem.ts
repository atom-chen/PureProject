/*
 * @Description: 商店基础item
 * @Author: liangzhaowei
 * @Date: 2019-09-23 15:56:20
 */


class ShopBaseItem extends BaseCustComponent {
    public constructor() {
        super();
        this.skinName = "ShopBaseItemSkin";
    }



    public imgItem0: eui.Image;
    public lbNum0: eui.Label;
    public imgItem1: eui.Image;
    public lbNum1: eui.Label;
    public gLimit: eui.Group;
    public lbLimit: eui.Label;
    public eBtn: eui.Button;
    public icon: ItemBase;
    public imgSale: eui.Image;
    public lbNe: eui.Label;



    protected childrenCreated(): void {
        super.childrenCreated();
        this.addTouchEvent(this.eBtn, this.onClick)
    }

    protected dataChanged(): void {
        super.dataChanged();
        if (this.data.id) {
            let cfg: StdShop = this.data;


            /**限购提示 */
            this.gLimit.visible = cfg.restrictions ? true : false;
            let desc = cfg.des ? cfg.des : "";
            let buyTime = 0;
            if (GameCache.shop.shopData[cfg.type] && GameCache.shop.shopData[cfg.type][cfg.id]) {
                buyTime = GameCache.shop.shopData[cfg.type][cfg.id];
            }
            // this.lbLimit.text = desc + buyTime + "/" + cfg.restrictions;
            this.lbLimit.text = desc + (cfg.restrictions - buyTime);

            /**打折图片 */
            if (cfg.png) {
                this.imgSale.source = cfg.png;
            }
            else {
                this.imgSale.source = null;
            }

            /**原价 价格 */
            if (cfg.originalprice) {
                this.lbNum0.text = cfg.originalprice + "";
            }


            /** 价格 */
            if (cfg.price) {
                this.imgItem0.source = GlobalFun.getItemSourceById(cfg.price.id);
                this.imgItem1.source = GlobalFun.getItemSourceById(cfg.price.id);
                this.lbNum1.text = cfg.price.count + "";
            }

            /**商品 */
            if (cfg.item) {
                this.icon.data = cfg.item;
                this.icon.initData();
                this.lbNe.text = GameConfig.item[cfg.item.id] ? GameConfig.item[cfg.item.id].name : "";
            }

        }
    }


    public onClick() {
        let cfg: StdShop = this.data;

        if (!cfg) {
            return;
        }

        let buyTime = 0;
        if (GameCache.shop.shopData[cfg.type] && GameCache.shop.shopData[cfg.type][cfg.id]) {
            buyTime = GameCache.shop.shopData[cfg.type][cfg.id];
        }
        /**限购 */
        let bLimit = false;
        if (cfg.restrictions > 0 && buyTime >= cfg.restrictions) {
            bLimit = true;
            GlobalFun.SysMsg(Language.lang.lcn17);
        }
        else {
            if (cfg.price) {
                /**足够购买 */
                if (GameCache.bag.itemCount(cfg.price.id) >= cfg.price.count) {
                    Proxy.shop.sendShopBuy(cfg.type, cfg.id, 1)
                }
                else {
                    //预留充值跳转
                    GlobalFun.gotoCharge();
                }
            }
        }


    }




}