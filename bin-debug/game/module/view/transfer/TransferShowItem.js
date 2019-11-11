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
var TransferShowItem = (function (_super) {
    __extends(TransferShowItem, _super);
    function TransferShowItem() {
        var _this = _super.call(this) || this;
        _this.skinName = "TransferShowItemSkin";
        return _this;
    }
    TransferShowItem.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    TransferShowItem.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (this.data.des) {
            this.lbDesc.textFlow = TextFlowUtils.generateTextFlow(this.data.des);
            this.imgAccount.source = "transfer_json.transfer_name_" + (this.data.job - 1) + this.itemIndex + "_png";
        }
    };
    return TransferShowItem;
}(BaseCustComponent));
__reflect(TransferShowItem.prototype, "TransferShowItem");
//# sourceMappingURL=TransferShowItem.js.map