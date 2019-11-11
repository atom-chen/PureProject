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
 * @Description: 宝石背包物品条目
 * @Author: xiejunwei
 * @Date: 2019-09-11 14:16:43
 */
var JewelBagItem = (function (_super) {
    __extends(JewelBagItem, _super);
    function JewelBagItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    JewelBagItem.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.checkBox.touchEnabled = false;
        // this.addTouchEvent(this.ico,this.checkBoxTouche);
    };
    JewelBagItem.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        // this.enabled = false;
        this.checkBox.selected = this.data.checkSele;
        this.setHandler(this, this.checkBoxTouche);
    };
    JewelBagItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.checkBox.selected = false;
    };
    JewelBagItem.prototype.checkBoxTouche = function () {
        this.checkBox.selected = !this.checkBox.selected;
    };
    return JewelBagItem;
}(ItemBase));
__reflect(JewelBagItem.prototype, "JewelBagItem");
//# sourceMappingURL=JewelBagItem.js.map