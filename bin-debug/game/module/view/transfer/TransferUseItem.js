/*
 * @Description: 转职职业展览item
 * @Author: liangzhaowei
 * @Date: 2019-10-29 17:26:55
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
var TransferUseItem = (function (_super) {
    __extends(TransferUseItem, _super);
    function TransferUseItem() {
        var _this = _super.call(this) || this;
        /**不足条件时,跳转 */
        _this.bGotoCharge = true;
        _this.skinName = "TransferUseItemSkin";
        return _this;
    }
    TransferUseItem.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.addTouchEvent(this.eBtn, this.onClick);
    };
    TransferUseItem.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        this.bGotoCharge = true;
        if (this.data.item) {
            var cfg = this.data.item;
            if (cfg) {
                this.item.data = cfg.id;
                this.lbNe.text = StringUtils.substitute(Language.lang.lcn21, cfg.exp);
                if (cfg.consume && cfg.consume[0]) {
                    this.itemIcon.source = GlobalFun.getItemSourceById(cfg.consume[0].id);
                    this.lbLv.text = cfg.consume[0].count;
                    this.bGotoCharge = GlobalFun.getBagEnounghUseCondition(cfg.consume, null);
                }
                var trData = GameCache.transfer.syData[GameCache.hero.getRoleIdByIndex(this.data.slRoleId)];
                if (trData) {
                    var useTime = trData.itemUseIime[cfg.idex] || 0;
                    if (cfg.count > 0) {
                        this.lbUse.visible = true;
                        if (cfg.count - useTime > 0) {
                            this.lbUse.textFlow = TextFlowUtils.generateTextFlow(StringUtils.substitute(Language.lang.lcn22, cfg.count - useTime));
                        }
                        else {
                            this.lbUse.textFlow = TextFlowUtils.generateTextFlow(Language.lang.lcn23);
                        }
                    }
                    else {
                        this.lbUse.visible = false;
                    }
                }
                var count = GameCache.bag.itemCount(cfg.id);
                this.eBtn.icon = count > 0 ? "res/btn/use.png" : "res/btn/buyUse.png";
                if (count > 0) {
                    this.bGotoCharge = true;
                    this.lbLeft.text = StringUtils.substitute(Language.lang.lcn24, count);
                    this.lbLeft.visible = true;
                    this.gPrice.visible = false;
                }
                else {
                    this.lbLeft.visible = false;
                    this.gPrice.visible = true;
                }
                App.ViewManager.showRedPoint(this.eBtn, count > 0);
            }
        }
    };
    TransferUseItem.prototype.onClick = function () {
        if (this.data.item) {
            if (!this.bGotoCharge) {
                GlobalFun.gotoCharge();
                App.ViewManager.close(ViewConst.TRANSFERUSE);
            }
            else {
                Proxy.transfer.sendSuitChange(this.data.slRoleId, this.data.item.idex);
            }
        }
    };
    return TransferUseItem;
}(BaseCustComponent));
__reflect(TransferUseItem.prototype, "TransferUseItem");
//# sourceMappingURL=TransferUseItem.js.map