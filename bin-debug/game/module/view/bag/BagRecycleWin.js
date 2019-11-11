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
 * 装备回收窗口
 */
var BagRecycleWin = (function (_super) {
    __extends(BagRecycleWin, _super);
    function BagRecycleWin() {
        var _this = _super.call(this, LayerManager.UI_Tips) || this;
        _this.itemArr = [];
        _this.recycleArr = [];
        _this.skinName = "BagRecycleWinSkin";
        return _this;
    }
    BagRecycleWin.prototype.init = function () {
    };
    BagRecycleWin.prototype.open = function (param) {
        _super.prototype.open.call(this);
        this.initData();
        this.addTouchEvent(this.mBtn, this.meltFunc);
        this.addTouchEvent(this.toggle, this.AutoSwich);
        this.message(MsgConst.BAG_RECYCLE, this.recycleBack);
        this.toggle.selected = !GlobalFun.getRemindSet(0, SettingType.AUTO_RECYCLE);
    };
    BagRecycleWin.prototype.close = function (param) {
        _super.prototype.close.call(this);
        this.itemArr = [];
    };
    BagRecycleWin.prototype.initData = function () {
        var count = 0;
        var bag = GameCache.bag.recycleArr;
        for (var i = 0; i < 16; i++) {
            var itemBlank = this["item_" + i];
            itemBlank.reSet();
        }
        for (var i in bag) {
            if (count <= 15) {
                this.itemArr.push(bag[i]);
                var itemBlank = this["item_" + count];
                itemBlank.data = bag[i];
            }
            else {
                break;
            }
            count++;
        }
    };
    BagRecycleWin.prototype.recycleBack = function () {
        this.initData();
        App.DisplayUtils.addEffectToObj(this, "ronglian_0_1", 1, 218, 260);
    };
    BagRecycleWin.prototype.meltFunc = function () {
        Proxy.bag.sendEquipRecycleBagItem(BagType.BAG_TYPE_EQUIP, this.itemArr);
        this.cleanItem();
    };
    BagRecycleWin.prototype.cleanItem = function () {
        for (var i = 0; i < 16; i++) {
            var itemBlank = this["item_" + i];
            itemBlank.reSet();
        }
        this.itemArr = [];
    };
    BagRecycleWin.prototype.AutoSwich = function () {
        // GlobalVar.AUTO_RECYCLE = this.toggle.selected;
        GlobalFun.setRemindSet(0, !this.toggle.selected, SettingType.AUTO_RECYCLE);
        GameCache.bag.autoRecycle();
    };
    return BagRecycleWin;
}(BaseEuiWindow));
__reflect(BagRecycleWin.prototype, "BagRecycleWin");
//# sourceMappingURL=BagRecycleWin.js.map