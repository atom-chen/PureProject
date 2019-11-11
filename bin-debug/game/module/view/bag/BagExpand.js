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
 * create by junwei on 07/08/2019
 * 背包拓展页面
 */
var BagExpand = (function (_super) {
    __extends(BagExpand, _super);
    function BagExpand() {
        var _this = _super.call(this, LayerManager.UI_Tips) || this;
        _this.skinName = "BagExtendSkin";
        return _this;
    }
    BagExpand.prototype.init = function () {
        _super.prototype.init.call(this);
        this.numSele.skinName = "NumSelectSkin";
        this.numSele.currentState = "s2";
        var handler = Handler.create(this, this.initPrice, [], false);
        this.numSele._handler = handler;
    };
    BagExpand.prototype.open = function (param) {
        this.addTouchEvent(this.btn, this.expandFunc);
        this.initData();
        this.initPrice();
    };
    BagExpand.prototype.close = function (param) {
        _super.prototype.close.call(this);
    };
    BagExpand.prototype.initData = function () {
        var bagNum = GameCache.hero.mainPro.pro(PropId.AP_BAG_GRID_COUNT);
        var max = GameConfig.bagStuff.maxEquip.value - (bagNum - GameConfig.bagStuff.maxItem.value);
        this.numSele.initData(max, 1, 1);
    };
    BagExpand.prototype.initPrice = function () {
        var num = GameConfig.bagStuff.openCounsums.value.count * this.numSele.num;
        this.cost.setData(GlobalVar.GOLD, num);
    };
    BagExpand.prototype.expandFunc = function () {
        if (this.cost.isExpend) {
            Proxy.bag.sendExpandGrid(BagType.BAG_TYPE_EQUIP, this.numSele.num);
        }
    };
    return BagExpand;
}(BaseEuiWindow));
__reflect(BagExpand.prototype, "BagExpand");
//# sourceMappingURL=BagExpand.js.map