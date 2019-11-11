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
 * 获得新物品提示
 */
var NewItem = (function (_super) {
    __extends(NewItem, _super);
    function NewItem() {
        var _this = _super.call(this, LayerManager.UI_Message) || this;
        _this.begin = true;
        _this.skinName = "NewItemSkin";
        _this.right = 10;
        _this.bottom = 200;
        return _this;
    }
    NewItem.prototype.initUI = function () {
    };
    NewItem.prototype.open = function (param) {
        _super.prototype.open.call(this);
        // this.message(MsgConst.BAG_ITEM_NUM, this.initData);
        this.message(MsgConst.EQUIP_INFO, this.initData);
        this.addTouchEvent(this.cBtn, this.closeFunc);
        this.addTouchEvent(this.btn, this.useFunc);
        this.initData();
    };
    NewItem.prototype.close = function (param) {
        _super.prototype.close.call(this);
        this.begin = true;
    };
    NewItem.prototype.initData = function () {
        var item = GameCache.bag.newItenHintArr[0] || null;
        if (!item) {
            this.closeView();
            return;
        }
        this.item.data = item;
        this.itemName.text = item.stdItem.name;
        if (!this.begin) {
            this.checkList(item);
        }
        this.begin = false;
    };
    NewItem.prototype.useFunc = function () {
        var item = this.item.data;
        // let bagtype = GameCache.bag.getItemBagType(item.stdItem);
        var bagtype = item.bagType;
        switch (bagtype) {
            case BagType.BAG_TYPE_EQUIP:
                var job = ItemUtils.getEquipJob(item.stdItem);
                var roleId = GameCache.hero.getServerIdByJob(job);
                // Proxy.equip.sendWearEquip(item.series, 2, roleId);
                Proxy.equip.sendQuickEquip(roleId, [item]);
                break;
            default:
                break;
        }
        // this.closeFunc();
    };
    NewItem.prototype.closeFunc = function () {
        GameCache.bag.newItenHintArr.shift();
        this.initData();
    };
    NewItem.prototype.btnIconChange = function (item) {
        if (item.bagType == BagType.BAG_TYPE_EQUIP) {
            this.btn.icon = "newtips_json.newtips_btn_1_png";
        }
        else {
            this.btn.icon = "newtips_json.newtips_btn_2_png";
        }
    };
    NewItem.prototype.checkList = function (item) {
        if (!ItemUtils.itemSuggestUse(item)) {
            this.closeFunc();
        }
    };
    return NewItem;
}(BaseEuiWindow));
__reflect(NewItem.prototype, "NewItem");
//# sourceMappingURL=NewItem.js.map