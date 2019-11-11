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
 * @Description: 通用list表面板
 * @Author: xiejunwei
 * @Date: 2019-09-09 14:00:28
 * @LastEditTime: 2019-09-09 14:24:44
 */
var ItemListTips = (function (_super) {
    __extends(ItemListTips, _super);
    function ItemListTips() {
        var _this = _super.call(this, LayerManager.UI_Tips) || this;
        _this.skinName = "ItemListTipsSkin";
        return _this;
    }
    ItemListTips.prototype.init = function () {
        _super.prototype.init.call(this);
    };
    ItemListTips.prototype.open = function (param) {
        _super.prototype.open.call(this);
        this.itemList.itemRenderer;
        if (param && param.firData) {
            var obj = {
                itemRenderer: param.firData["itemRenderer"],
                itemSkin: param.firData["itemSkin"],
                itemData: param.firData["itemData"]
            };
            this.initData(obj);
            if (param.firData["msg"]) {
                this.message(param.firData["msg"], this.initListData);
            }
        }
    };
    ItemListTips.prototype.initData = function (data) {
        this.itemList.itemRenderer = data.itemRenderer;
        this.itemList.itemRendererSkinName = data.itemSkin;
        this.initListData(data.itemData);
    };
    ItemListTips.prototype.initListData = function (dataArr) {
        this.setListData(this.itemList, dataArr);
    };
    return ItemListTips;
}(BaseEuiWindow));
__reflect(ItemListTips.prototype, "ItemListTips");
//# sourceMappingURL=ItemListTips.js.map