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
 * @Description: 宝石背包
 * @Author: xiejunwei
 * @Date: 2019-09-11 14:42:21
 */
var JewelBag = (function (_super) {
    __extends(JewelBag, _super);
    function JewelBag($parent) {
        if ($parent === void 0) { $parent = null; }
        var _this = _super.call(this, $parent) || this;
        _this.skinName = "JewelBagSkin";
        return _this;
    }
    JewelBag.prototype.init = function () {
        _super.prototype.init.call(this);
        this.itemList.itemRenderer = JewelBagItem;
    };
    JewelBag.prototype.open = function (param) {
        _super.prototype.open.call(this);
        this.message(MsgConst.JEWEL_BAG, this.initBagList);
        this.addTouchEvent(this.iG, this.onGroupTouche);
        this.addTouchEvent(this.cg, this.checkBoxFunc);
        this.addTouchEvent(this.btn_0, this.btnFunc);
        this.addTouchEvent(this.itemList, this.stuffPrint);
        this.cost.label = Language.lang.jewel_1;
        this.initBagList();
    };
    JewelBag.prototype.close = function (param) {
        _super.prototype.close.call(this);
        this.setListData(this.itemList, []);
        this.check_2.selected = this.check_3.selected = this.check_4.selected = this.check_5.selected = false;
    };
    JewelBag.prototype.initBagList = function () {
        var bag = GameCache.jewel.jewelBag;
        var itemObj = {};
        var itemArr = [];
        for (var type in bag) {
            for (var color in bag[type]) {
                if (!itemObj[color])
                    itemObj[color] = [];
                itemObj[color] = itemObj[color].concat(bag[type][color]);
            }
        }
        for (var i in itemObj) {
            itemArr = itemArr.concat(itemObj[i]);
        }
        for (var i = 0; i < itemArr.length; i++) {
            itemArr[i] = {
                id: itemArr[i],
            };
        }
        itemArr = itemArr.reverse();
        this.setListData(this.itemList, itemArr);
        this.cost.visible = false;
    };
    JewelBag.prototype.onGroupTouche = function (e) {
        var tar = e.target.name;
        this["check_" + tar].selected = !this["check_" + tar].selected;
        this.checkBoxFunc(parseInt(tar));
    };
    JewelBag.prototype.checkBoxFunc = function (e) {
        var seleColor;
        if (typeof (e) == "number") {
            seleColor = e;
        }
        else if (e instanceof egret.TouchEvent) {
            seleColor = parseInt(e.target.name);
        }
        var source = this.itemList.dataProvider.source;
        for (var i = 0; i < source.length; i++) {
            var item = this.itemList.getElementAt(i) || this.itemList.getVirtualElementAt(i);
            var color = item._itemData.showQuality;
            if (color != seleColor)
                continue;
            source[i]["checkSele"] = this["check_" + seleColor].selected;
        }
        this.itemList.dataProvider.replaceAll(source);
        // for (let i = 0; i < this.itemList.numElements; i++) {
        //     let item = (this.itemList.getElementAt(i) as JewelBagItem) || (this.itemList.getVirtualElementAt(i) as JewelBagItem);
        //     let color = item._itemData.showQuality;
        //     if (color != seleColor) continue;
        //     item.checkBox.selected = (this[`check_${seleColor}`] as eui.CheckBox).selected;
        // }
        this.stuffPrint();
    };
    JewelBag.prototype.btnFunc = function () {
        var arr = [];
        for (var i = 0; i < this.itemList.numElements; i++) {
            var item = this.itemList.getElementAt(i) || this.itemList.getVirtualElementAt(i);
            if (item.checkBox.selected) {
                arr.push(item._itemData.id);
            }
        }
        Proxy.jewel.sendDecomposition(arr);
    };
    JewelBag.prototype.stuffPrint = function () {
        var stuff;
        for (var i = 0; i < this.itemList.numElements; i++) {
            var item = this.itemList.getElementAt(i) || this.itemList.getVirtualElementAt(i);
            if (item.checkBox.selected) {
                var gem = GameConfig.jewel[item._itemData.id];
                if (!stuff) {
                    stuff = [gem.resolve[0].id, gem.resolve[0].count];
                }
                else {
                    stuff[1] += gem.resolve[0].count;
                }
            }
        }
        if (stuff) {
            this.cost.visible = true;
            this.cost.setData(stuff[0], stuff[1]);
        }
        else {
            this.cost.visible = false;
        }
    };
    return JewelBag;
}(BaseSpriteView));
__reflect(JewelBag.prototype, "JewelBag");
//# sourceMappingURL=JewelBag.js.map