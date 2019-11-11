/*
 * @Description: 通用类型list
 * @Author: xiejunwei
 * @Date: 2019-10-28 11:34:22
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
var ItemListCommual = (function (_super) {
    __extends(ItemListCommual, _super);
    function ItemListCommual() {
        var _this = _super.call(this) || this;
        _this.itemArr = [];
        return _this;
    }
    ItemListCommual.prototype.setData = function (arr, group, itemReneder, itemSkin) {
        if (arr === void 0) { arr = []; }
        if (!arr.length)
            return;
        var count = 0;
        var i = 0;
        var len = arr.length;
        for (; i < len; i++) {
            var item = void 0;
            var data = arr[i];
            if (this.itemArr[count]) {
                item = this.itemArr[count];
            }
            else {
                item = ObjectPool.get(itemReneder);
                this.itemArr.push(item);
                item && group.addChild(item);
            }
            itemSkin && (item.skinName = itemSkin);
            item.data = data;
            count++;
        }
        //多余条目回收
        var mark = count;
        while (count < this.itemArr.length) {
            this.itemArr[count].reSet();
            App.DisplayUtils.removeFromParent(this.itemArr[count]);
            ObjectPool.push(this.itemArr[count]);
            count++;
        }
        if (mark < this.itemArr.length)
            this.itemArr = this.itemArr.slice(0, mark);
    };
    ItemListCommual.prototype.dispose = function () {
        if (this.itemArr) {
            for (var _i = 0, _a = this.itemArr; _i < _a.length; _i++) {
                var i = _a[_i];
                ObjectPool.push(i);
                App.DisplayUtils.removeFromParent(i);
            }
        }
        this.itemArr = [];
    };
    return ItemListCommual;
}(BaseClass));
__reflect(ItemListCommual.prototype, "ItemListCommual");
//# sourceMappingURL=ItemListCommual.js.map