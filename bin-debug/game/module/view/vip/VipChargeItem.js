/*
 * @Description: vip卡片item
 * @Author: liangzhaowei
 * @Date: 2019-08-27 16:21:52
 * @LastEditTime: 2019-10-10 19:21:07
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
var VipChargeItem = (function (_super) {
    __extends(VipChargeItem, _super);
    function VipChargeItem() {
        var _this = _super.call(this) || this;
        _this.skinName = "VipChargeItemSkin";
        return _this;
    }
    VipChargeItem.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.addTouchEvent(this, this.onClick);
    };
    VipChargeItem.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (this.data.money) {
            var cfg = this.data;
            this.lbNum0.text = cfg.desc;
            this.lb1.text = cfg.giftDesc ? cfg.giftDesc : "";
            this.lb2.visible = cfg.giftDesc ? true : false;
            this.lb3.text = StringUtils.substitute(Language.lang.lcn12, cfg.money);
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
            var doubblePrice = false;
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
    };
    VipChargeItem.prototype.onClick = function () {
        var cfg = this.data;
        if (cfg.money) {
            var chargeStr = "@AddMoney 3 ";
            chargeStr = chargeStr + cfg.money;
            Proxy.chat.sendChatMessage(1, chargeStr, false);
        }
    };
    return VipChargeItem;
}(BaseCustComponent));
__reflect(VipChargeItem.prototype, "VipChargeItem");
//# sourceMappingURL=VipChargeItem.js.map