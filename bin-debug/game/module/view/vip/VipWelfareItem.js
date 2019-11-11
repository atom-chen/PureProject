/*
 * @Description: vip卡片item
 * @Author: liangzhaowei
 * @Date: 2019-08-27 16:21:52
 * @LastEditTime: 2019-09-03 20:17:17
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
var VipWelfareItem = (function (_super) {
    __extends(VipWelfareItem, _super);
    function VipWelfareItem() {
        return _super.call(this) || this;
    }
    VipWelfareItem.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    VipWelfareItem.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (this.data.dec) {
            if (this.data.dec) {
                this.lbDes.textFlow = TextFlowUtils.generateTextFlow(this.data.dec);
            }
            if (this.imgNew) {
                this.imgNew.visible = this.data.bNew;
            }
        }
    };
    return VipWelfareItem;
}(BaseCustComponent));
__reflect(VipWelfareItem.prototype, "VipWelfareItem");
//# sourceMappingURL=VipWelfareItem.js.map