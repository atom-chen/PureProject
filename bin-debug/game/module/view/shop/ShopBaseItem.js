/*
 * @Description: 商店基础item
 * @Author: liangzhaowei
 * @Date: 2019-09-23 15:56:20
 */
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
var ShopBaseItem = (function (_super) {
    __extends(ShopBaseItem, _super);
    function ShopBaseItem() {
        var _this = _super.call(this) || this;
        _this.skinName = "ShopBaseItemSkin";
        return _this;
    }
    ShopBaseItem.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.addTouchEvent(this.eBtn, this.onClick);
    };
    ShopBaseItem.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (this.data.id) {
            var cfg = this.data;
            /**限购提示 */
            this.gLimit.visible = cfg.restrictions ? true : false;
            var desc = cfg.des ? cfg.des : "";
            var buyTime = 0;
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
    };
    ShopBaseItem.prototype.onClick = function () {
        var cfg = this.data;
        if (!cfg) {
            return;
        }
        var buyTime = 0;
        if (GameCache.shop.shopData[cfg.type] && GameCache.shop.shopData[cfg.type][cfg.id]) {
            buyTime = GameCache.shop.shopData[cfg.type][cfg.id];
        }
        /**限购 */
        var bLimit = false;
        if (cfg.restrictions > 0 && buyTime >= cfg.restrictions) {
            bLimit = true;
            GlobalFun.SysMsg(Language.lang.lcn17);
        }
        else {
            if (cfg.price) {
                /**足够购买 */
                if (GameCache.bag.itemCount(cfg.price.id) >= cfg.price.count) {
                    Proxy.shop.sendShopBuy(cfg.type, cfg.id, 1);
                }
                else {
                    //预留充值跳转
                    GlobalFun.gotoCharge();
                }
            }
        }
    };
    return ShopBaseItem;
}(BaseCustComponent));
__reflect(ShopBaseItem.prototype, "ShopBaseItem");
//# sourceMappingURL=ShopBaseItem.js.map