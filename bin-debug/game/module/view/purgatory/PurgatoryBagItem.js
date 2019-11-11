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
 * @Description: 炼狱背包item
 * @Author: moyusheng
 * @Date: 2019-10-18 13:44:09
 */
var PurgatoryBagItem = (function (_super) {
    __extends(PurgatoryBagItem, _super);
    function PurgatoryBagItem() {
        return _super.call(this) || this;
    }
    PurgatoryBagItem.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.addTouchEvent(this.btnDe, this.onBtnDeClick);
    };
    /** 分解 */
    PurgatoryBagItem.prototype.onBtnDeClick = function () {
        Proxy.bag.sendEquipRecycleBagItem(BagType.BAG_TYPE_PURGATORY, [this.data]);
    };
    PurgatoryBagItem.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        this.initData();
    };
    PurgatoryBagItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    PurgatoryBagItem.prototype.initData = function () {
        var equip = this.data;
        if (!equip) {
            return;
        }
        this.item.data = equip.stdItem;
        this.eqName.text = equip.stdItem.name;
        var cfg = GameConfig.purgatoryResolve[equip.stdItem.id];
        var _a = cfg.re_item[0], type = _a.type, id = _a.id, count = _a.count;
        var itemCfg = GameConfig.item[id];
        this.icon.source = "" + RES_DIR_IMAGES_ITEM + itemCfg.icon + ".png";
        this.num.text = StringUtils.substitute(Language.lang.purgatoryDecomeNum, count);
    };
    return PurgatoryBagItem;
}(BaseCustComponent));
__reflect(PurgatoryBagItem.prototype, "PurgatoryBagItem");
//# sourceMappingURL=PurgatoryBagItem.js.map