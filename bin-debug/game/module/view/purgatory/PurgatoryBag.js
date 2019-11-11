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
 * 属性模块
 */
var PurgatoryBag = (function (_super) {
    __extends(PurgatoryBag, _super);
    function PurgatoryBag() {
        var _this = _super.call(this) || this;
        _this.skinName = "PurgatoryBagSkin";
        return _this;
    }
    PurgatoryBag.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.list.itemRenderer = PurgatoryBagItem;
    };
    PurgatoryBag.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.equips = null;
    };
    PurgatoryBag.prototype.open = function (param) {
        _super.prototype.open.call(this, param);
        this.message(MsgConst.BAG_RECYCLE, this.initData);
        this.addTouchEvent(this.btnDe, this.onBtnDeClick);
        this.initData();
    };
    PurgatoryBag.prototype.initData = function () {
        this.equips = GameCache.bag.getBagByType(BagType.BAG_TYPE_PURGATORY);
        this.setListData(this.list, this.equips);
    };
    PurgatoryBag.prototype.onBtnDeClick = function () {
        Proxy.bag.sendEquipRecycleBagItem(BagType.BAG_TYPE_PURGATORY, this.equips);
    };
    PurgatoryBag.prototype.close = function () {
        _super.prototype.close.call(this);
        this.dispose();
    };
    return PurgatoryBag;
}(BaseEuiWindow));
__reflect(PurgatoryBag.prototype, "PurgatoryBag");
//# sourceMappingURL=PurgatoryBag.js.map