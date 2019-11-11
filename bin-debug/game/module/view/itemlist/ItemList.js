/**
 * create by junwei on 06/25/2019
 * 物品列表
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
var ItemList = (function (_super) {
    __extends(ItemList, _super);
    function ItemList() {
        var _this = _super.call(this) || this;
        _this.itemArr = [];
        return _this;
    }
    ItemList.prototype.setData = function (obj, group) {
        if (obj === void 0) { obj = []; }
        if (obj.length == 0)
            return;
        var count = 0;
        var i = 0;
        var len = obj.length;
        for (; i < len; i++) {
            var item = void 0;
            var award = obj[i];
            if (award["job"] && award["job"] != GameCache.hero.mainPro.job) {
                continue;
            }
            if (this.itemArr[count]) {
                item = this.itemArr[count];
            }
            else {
                item = ObjectPool.get(ItemBase);
                this.itemArr.push(item);
                item && group.addChild(item);
            }
            item.skinName = "ItembaseSkin";
            item.data = obj[i];
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
    ItemList.prototype.dispose = function () {
        if (this.itemArr) {
            for (var _i = 0, _a = this.itemArr; _i < _a.length; _i++) {
                var i = _a[_i];
                i.reSet();
                ObjectPool.push(i);
                App.DisplayUtils.removeFromParent(i);
            }
        }
        this.itemArr = [];
    };
    return ItemList;
}(BaseClass));
__reflect(ItemList.prototype, "ItemList");
//# sourceMappingURL=ItemList.js.map