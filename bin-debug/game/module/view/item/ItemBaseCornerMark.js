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
 * 物品基本条目
 */
var ItemBaseCornerMark = (function (_super) {
    __extends(ItemBaseCornerMark, _super);
    function ItemBaseCornerMark() {
        return _super.call(this) || this;
    }
    /**重置 */
    ItemBaseCornerMark.prototype.reSet = function () {
        _super.prototype.reSet.call(this);
        this.cornerMark.source = null;
    };
    /**设置角标图片 */
    ItemBaseCornerMark.prototype.setMarkImg = function (str) {
        if (!this.cornerMark) {
            this.cornerMark = new eui.Image(str);
            this.cornerMark.right = 5;
            this.cornerMark.top = 5;
            this.addChild(this.cornerMark);
        }
        else {
            this.cornerMark.source = str;
        }
    };
    return ItemBaseCornerMark;
}(ItemBase));
__reflect(ItemBaseCornerMark.prototype, "ItemBaseCornerMark");
//# sourceMappingURL=ItemBaseCornerMark.js.map