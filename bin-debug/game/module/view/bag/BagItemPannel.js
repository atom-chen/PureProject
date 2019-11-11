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
 * create by junwei on 06/27/2019
 */
var BagItemPannel = (function (_super) {
    __extends(BagItemPannel, _super);
    function BagItemPannel($parent) {
        if ($parent === void 0) { $parent = null; }
        var _this = _super.call(this, $parent) || this;
        _this.skinName = "BagItemPannelSkin";
        return _this;
    }
    BagItemPannel.prototype.init = function () {
        _super.prototype.init.call(this);
        this.itemList.itemRenderer = ItemBase;
    };
    BagItemPannel.prototype.open = function (param) {
        if (param === void 0) { param = null; }
        this.message(MsgConst.BAG_ITEM_NUM, this.reFreshBag);
        this.initBag();
    };
    BagItemPannel.prototype.reFreshBag = function () {
        if (!App.TimerManager.isExists(this.initBag, this))
            App.TimerManager.addDelay(200, 200, 1, this.initBag, this);
    };
    BagItemPannel.prototype.initBag = function () {
        var itemArr = GameCache.bag.getBagByType(BagType.BAG_TYPE_OTHER);
        this.setListData(this.itemList, itemArr);
    };
    return BagItemPannel;
}(BaseSpriteView));
__reflect(BagItemPannel.prototype, "BagItemPannel");
//# sourceMappingURL=BagItemPannel.js.map