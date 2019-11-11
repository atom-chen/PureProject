/**
 * create by junwei on 07/03/2019
 * 属性模块
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
var PropPart = (function (_super) {
    __extends(PropPart, _super);
    function PropPart() {
        var _this = _super.call(this) || this;
        _this._zdl = 0;
        _this.itemArr = [];
        _this.skinName = "PropPartSkin";
        return _this;
    }
    PropPart.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    PropPart.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (this.data == null) {
            //清空数据
            // this.clean();
            this.recycle();
        }
        else {
            //插入数据
            // this.setData();
        }
    };
    PropPart.prototype.dispose = function () {
        this.recycle();
        _super.prototype.dispose.call(this);
    };
    /**
     * @param oldValue 旧属性 newValue 新属性 job职业过滤 color1为属性文字颜色 color2旧值颜色 color3新值颜色 , str为长度2的字符串数组，用作分割符
     */
    PropPart.prototype.setData = function (oldValue, newValue, job, color1, color2, color3, str, skinName) {
        if (job === void 0) { job = 0; }
        if (color1 === void 0) { color1 = 0xffd369; }
        if (color2 === void 0) { color2 = 0xffffff; }
        if (color3 === void 0) { color3 = 0x019601; }
        if (str === void 0) { str = ["", "+"]; }
        if (skinName === void 0) { skinName = "PropItemSkin"; }
        var data = oldValue;
        var plus = newValue;
        var count = 0;
        var totalData = this.comparerProp(data, plus, color1, color2, color3, str);
        //let len = Object.keys(totalData).length;
        for (var i in totalData) {
            var item = void 0;
            //if (this.jobFilter(job, totalData[i].type)) continue;
            if (this.itemArr[count]) {
                item = this.itemArr[count];
            }
            else {
                item = ObjectPool.get(PropItem);
                this.itemArr.push(item);
                this.pG.addChild(item);
            }
            item.skinName = skinName;
            item.data = totalData[i];
            count++;
        }
        //多余条目回收
        var mark = count;
        while (count < this.itemArr.length) {
            App.DisplayUtils.removeFromParent(this.itemArr[count]);
            ObjectPool.push(this.itemArr[count]);
            count++;
        }
        if (mark < this.itemArr.length)
            this.itemArr = this.itemArr.slice(0, mark);
        this._zdl = ItemUtils.getZdlByProp(oldValue);
    };
    //属性对比，并且合成
    PropPart.prototype.comparerProp = function (oData, nData, color1, color2, color3, str) {
        if (color1 === void 0) { color1 = 0xffffff; }
        if (color2 === void 0) { color2 = 0xffffff; }
        if (color3 === void 0) { color3 = 0x019601; }
        var obj = {};
        for (var i in oData) {
            var item = {};
            var type = oData[i].type + "";
            item["type"] = oData[i].type;
            item["oldValue"] = oData[i].value;
            item["color"] = [color1, color2, color3];
            item["str"] = str;
            obj[type] = item;
        }
        for (var i in nData) {
            var type = nData[i].type + "";
            if (!obj[type]) {
                var item = {};
                item["type"] = nData[i].type;
                item["oldValue"] = 0;
                item["color"] = [color1, color2, color3];
                item["str"] = str;
                obj[type] = item;
            }
            obj[type]["newValue"] = nData[i].value;
        }
        return obj;
    };
    //过滤非该职业显示
    // private jobFilter(job, type): boolean {
    //     if (job == JobType.zhanshi || job == JobType.gongshou) {
    //         if (type == AttrBufId.MagicAttackMaxAdd) {
    //             return true;
    //         }
    //     } else if (job == JobType.fashi) {
    //         if (type == AttrBufId.PhysicalAttackMaxAdd) {
    //             return true;
    //         }
    //     }
    //     return false;
    // }
    // private clean(): void {
    //     if (this.itemArr) {
    //         for (let i of this.itemArr) {
    //             App.DisplayUtils.removeFromParent(i);
    //             ObjectPool.push(i);
    //             i = null;
    //         }
    //     }
    //     this.itemArr = [];
    // }
    PropPart.prototype.recycle = function () {
        if (this.itemArr) {
            for (var _i = 0, _a = this.itemArr; _i < _a.length; _i++) {
                var i = _a[_i];
                App.DisplayUtils.removeFromParent(i);
                ObjectPool.push(i);
                i = null;
            }
        }
        this.itemArr = [];
        this._zdl = 0;
    };
    /**设置属性排列方式
     * @param type:排列类型,hor为水平排列，ver为垂直排列;gap:为间隔;
     */
    PropPart.prototype.setSortType = function (type, gap, tile) {
        var layout;
        if (type == "ver") {
            layout = new eui.VerticalLayout();
            if (gap)
                layout.gap = gap;
        }
        else if (type == "hor") {
            layout = new eui.HorizontalLayout();
            if (gap)
                layout.gap = gap;
        }
        this.pG.layout = layout;
    };
    /**
     * 设置间隔
     */
    PropPart.prototype.setGap = function (val) {
        if (this.pG.layout) {
            this.pG.layout['gap'] = val;
        }
    };
    Object.defineProperty(PropPart.prototype, "zdl", {
        /**获取中属性战力值 */
        get: function () {
            return this._zdl;
        },
        enumerable: true,
        configurable: true
    });
    return PropPart;
}(BaseCustComponent));
__reflect(PropPart.prototype, "PropPart");
//# sourceMappingURL=PropPart.js.map