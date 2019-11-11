var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/*
 * @Description: 限时优惠条目
 * @Author: xiejunwei
 * @Date: 2019-10-14 10:04:43
 */
var XSYHItem = (function (_super) {
    __extends(XSYHItem, _super);
    function XSYHItem() {
        return _super.call(this) || this;
    }
    XSYHItem.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.addTouchEvent(this.buyBtn, this.onBuyFunc);
    };
    XSYHItem.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (!this.data.id)
            return;
        this.l0.text = this.l1.text = Language.lang.xsyh_0;
        this.initdata();
    };
    XSYHItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    XSYHItem.prototype.initdata = function () {
        this.icon0.data = this.data.item;
        this.lbNum1.text = this.data.originalprice;
        this.lbNum0.text = this.data.price[1];
        this.limit.text = StringUtils.substitute(Language.lang.xsyh_1, this.data.vip);
        this.imgSale.source = this.data.discount == 10 ? "xsyh_json.xsyh_tag_png" : "shop_json.shop_sale_" + this.data.discount + "_png";
        this.iName.text = this.icon0._itemData.name;
        this.initState();
    };
    XSYHItem.prototype.initState = function () {
        if (!this.data.state) {
            this.limit.visible = false;
            this.bImg.visible = false;
            this.buyBtn.visible = false;
            this.soldOut.visible = true;
        }
        else {
            var roleVip = GameCache.vip.realValue();
            if (this.data.vip > roleVip) {
                this.limit.visible = true;
                this.bImg.visible = true;
                this.buyBtn.visible = false;
                this.soldOut.visible = false;
            }
            else {
                this.limit.visible = false;
                this.bImg.visible = false;
                this.buyBtn.visible = true;
                this.soldOut.visible = false;
            }
        }
    };
    XSYHItem.prototype.onBuyFunc = function () {
        var num = 0;
        if (!this.data.state)
            return;
        if (this.data.price[0] == GlobalVar.GOLD) {
            num = GameCache.hero.mainPro.pro(PropId.AP_YUANBAO);
        }
        if (num < this.data.price[1]) {
            GlobalFun.gotoCharge();
            return;
        }
        Proxy.script.sendXSYHBuy(this.data.id);
    };
    return XSYHItem;
}(BaseCustComponent));
__reflect(XSYHItem.prototype, "XSYHItem");
//# sourceMappingURL=XSYHItem.js.map