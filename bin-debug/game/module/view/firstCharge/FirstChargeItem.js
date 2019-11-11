/*
 * @Description: 首冲item内容
 * @Author: liangzhaowei
 * @Date: 2019-09-02 17:36:25
 * @LastEditTime: 2019-10-10 19:20:12
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
var FirstChargeItem = (function (_super) {
    __extends(FirstChargeItem, _super);
    function FirstChargeItem() {
        var _this = _super.call(this) || this;
        _this.skinName = "FirstChargeItemSkin";
        return _this;
    }
    FirstChargeItem.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.addTouchEvent(this, this.onClick);
    };
    FirstChargeItem.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (this.data.money) {
            var cfg = this.data;
            if (!cfg) {
                return;
            }
            if (cfg.money) {
                this.lb1.text = StringUtils.substitute(Language.lang.lcn12, cfg.money) + "=";
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
    };
    FirstChargeItem.prototype.onClick = function () {
        var cfg = this.data;
        if (cfg.fourfoldDimond && cfg.dimond) {
            var chargeStr = "@AddMoney 3 ";
            chargeStr = chargeStr + (cfg.money);
            Proxy.chat.sendChatMessage(1, chargeStr, false);
        }
    };
    return FirstChargeItem;
}(BaseCustComponent));
__reflect(FirstChargeItem.prototype, "FirstChargeItem");
//# sourceMappingURL=FirstChargeItem.js.map