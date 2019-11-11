/*
 * @Description: 
 * @Author: liangzhaowei
 * @Date: 2019-09-23 15:52:37
 */


class ShopBasePannel extends CommunalPagePannel {
    public constructor($parent: egret.DisplayObjectContainer = null) {
        super($parent);
        this.skinName = "ShopBasePannelSkin"
    }

    public lbWelfareDay: eui.Label;
    public listLb: eui.List;
    public cfgShop;/**商店数据 */


    static red() {
        return false;
    }

    /**需要刷新是红点消息列表 */
    static changeMsg() {
        return [];
    }



    public init(): void {
        this.listLb.itemRenderer = ShopBaseItem;
        this.cfgShop = GameConfig.shop[ShopType.gold];
    }

    public open(param: ViewProp = null) {
        if (this.cfgShop[1] && this.cfgShop[1].type) {
            this.message(MsgConst.SHOP_INFO + this.cfgShop[1].type, this.upCn);
        }
        this.upCn();
    }

    /**更新内容 */
    public upCn() {
        let list = [];
        for (let index in this.cfgShop) {
            list.push(this.cfgShop[index]);
        }
        this.setListData(this.listLb, list);
    }


}
