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
 * create by junwei on 07/02/2019
 * 按钮模组
 */
var BtnPart = (function (_super) {
    __extends(BtnPart, _super);
    function BtnPart() {
        var _this = _super.call(this) || this;
        _this.itemType = BagType.BAG_TYPE_EQUIP;
        _this.unload = false;
        _this.skinName = "BtnPartSkin";
        return _this;
    }
    BtnPart.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.addTouchEvent(this.wBtn, this.btnClick);
        this.addTouchEvent(this.sBtn, this.sendShowOff);
        // this.addTouchEvent(this.uBtn, this.sendDropEquipByItemSeries);
    };
    BtnPart.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (!this.data || !this.data["stdItem"])
            return;
        this._itemData = this.data;
        this.initBtn();
    };
    BtnPart.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    BtnPart.prototype.initBtn = function () {
        var item = this.data["stdItem"];
        if (item.type < ItemType.itEquipMax) {
            this.itemType = BagType.BAG_TYPE_EQUIP;
        }
        else {
            this.itemType = BagType.BAG_TYPE_OTHER;
        }
        this.wBtn.icon = "itemtips_json.itemtips_use_png";
        if (this.itemType == BagType.BAG_TYPE_EQUIP) {
            var eqList = GameCache.equip.roleEquipList;
            this.unload = false;
            for (var i in eqList) {
                if (eqList[i][item.part]) {
                    var eqitem = eqList[i][item.part];
                    if (eqitem.series.isEquals(this._itemData.series)) {
                        this.wBtn.icon = "itemtips_json.itemtips_unload_png";
                        this.unload = true;
                    }
                    break;
                }
            }
        }
    };
    BtnPart.prototype.btnClick = function () {
        if (this.itemType == BagType.BAG_TYPE_EQUIP) {
            if (this.unload) {
                this.sendDropEquipByItemSeries();
            }
            else {
                this.sendWearEquip();
            }
        }
        else {
            //使用物品
            this.sendUseItem();
        }
    };
    BtnPart.prototype.sendWearEquip = function () {
        if (this._itemData.stdItem.type < ItemType.itEquipMax && this._itemData.stdItem.type != 0) {
            var job = ItemUtils.getEquipJob(this._itemData.stdItem);
            var roleId = GameCache.hero.getServerIdByJob(job);
            if (roleId == -1) {
                GlobalFun.SysMsg(Language.lang.wearError);
                return;
            }
            // Proxy.equip.sendWearEquip(this._itemData.series, 2, roleId);
            Proxy.equip.sendQuickEquip(roleId, [this._itemData]);
        }
        App.ViewManager.close(ViewConst.ITEMTIPS);
    };
    BtnPart.prototype.sendDropEquipByItemSeries = function () {
        if (this._itemData.stdItem.type < ItemType.itEquipMax && this._itemData.stdItem.type != 0) {
            var job = ItemUtils.getEquipJob(this._itemData.stdItem);
            var roleId = GameCache.hero.getServerIdByJob(job);
            // Proxy.equip.sendWearEquip(this._itemData.series, roleId);
            Proxy.equip.sendDropEquipByItemSeries(this._itemData.series, roleId);
        }
        App.ViewManager.close(ViewConst.ITEMTIPS);
    };
    BtnPart.prototype.sendUseItem = function () {
        Proxy.bag.sendItemUse(this._itemData, 1);
    };
    BtnPart.prototype.sendShowOff = function () {
        GameCache.chat.showOffItem(this._itemData.stdItem);
        App.ViewManager.close(ViewConst.ITEMTIPS);
    };
    return BtnPart;
}(BaseCustComponent));
__reflect(BtnPart.prototype, "BtnPart");
//# sourceMappingURL=BtnPart.js.map