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
 * @Description: 修改奖励物品条目
 * @Author: xiejunwei
 * @Date: 2019-10-11 15:34:21
 */
var AwardItem = (function (_super) {
    __extends(AwardItem, _super);
    function AwardItem() {
        return _super.call(this) || this;
    }
    AwardItem.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    AwardItem.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        this.itemName.textFlow = TextFlowUtils.generateTextFlow("<(c" + ColorUtil.C_COFFEE + ")" + this.itemName.text + ">");
    };
    AwardItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AwardItem;
}(ItemBase));
__reflect(AwardItem.prototype, "AwardItem");
//# sourceMappingURL=AwardItem.js.map