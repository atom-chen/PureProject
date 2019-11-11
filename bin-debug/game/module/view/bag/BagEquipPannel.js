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
var BagEquipPannel = (function (_super) {
    __extends(BagEquipPannel, _super);
    function BagEquipPannel($parent) {
        if ($parent === void 0) { $parent = null; }
        var _this = _super.call(this, $parent) || this;
        _this.skinName = "BagEquipPannelSkin";
        return _this;
    }
    BagEquipPannel.prototype.init = function () {
        _super.prototype.init.call(this);
        this.itemList.itemRenderer = ItemBase;
    };
    BagEquipPannel.red = function () {
        return GameCache.bag.checkRecycle();
    };
    BagEquipPannel.changeMsg = function () {
        return [MsgConst.BAG_ITEM_NUM];
    };
    BagEquipPannel.prototype.refreshRed = function () {
        this.redShow();
    };
    BagEquipPannel.prototype.open = function (param) {
        if (param === void 0) { param = null; }
        this.message(MsgConst.BAG_ITEM_NUM, this.reFreshBag);
        this.message(MsgConst.PROPERTY + PropId.AP_BAG_GRID_COUNT, this.initBag);
        this.initBag();
        this.addTouchEvent(this.mBtn, function () {
            App.ViewManager.open(ViewConst.MELT);
        });
        this.addTouchEvent(this.extendBtn, this.openExpand);
    };
    BagEquipPannel.prototype.reFreshBag = function () {
        if (!App.TimerManager.isExists(this.initBag, this))
            App.TimerManager.addDelay(200, 200, 1, this.initBag, this);
    };
    BagEquipPannel.prototype.initBag = function () {
        var itemArr = GameCache.bag.getBagByType(BagType.BAG_TYPE_EQUIP);
        // let bagGridNum = GameCache.hero.mainPro.pro(PropId.AP_BAG_GRID_COUNT);
        var bagGridNum = GameCache.bag.bagGridNum[BagType.BAG_TYPE_EQUIP];
        this.setListData(this.itemList, itemArr);
        this.nTxt.text = itemArr.length + "/" + bagGridNum;
    };
    BagEquipPannel.prototype.openExpand = function () {
        App.ViewManager.open(ViewConst.BAGEXPAND);
    };
    BagEquipPannel.prototype.redShow = function () {
        App.ViewManager.showRedPoint(this.mBtn, GameCache.bag.checkRecycle());
    };
    return BagEquipPannel;
}(BaseSpriteView));
__reflect(BagEquipPannel.prototype, "BagEquipPannel");
//# sourceMappingURL=BagEquipPannel.js.map