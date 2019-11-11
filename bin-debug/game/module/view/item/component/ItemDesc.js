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
/**
 * create by junwei on 07/03/2019
 * 物品描述模块
 */
var ItemDesc = (function (_super) {
    __extends(ItemDesc, _super);
    function ItemDesc() {
        var _this = _super.call(this) || this;
        _this.skinName = "ItemDescSkin";
        return _this;
    }
    ItemDesc.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    ItemDesc.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (typeof (this.data) != "string")
            return;
        this.desc.textFlow = TextFlowUtils.generateTextFlow(this.data);
    };
    ItemDesc.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return ItemDesc;
}(BaseCustComponent));
__reflect(ItemDesc.prototype, "ItemDesc");
//# sourceMappingURL=ItemDesc.js.map