/*
 * @Description:
 * @Author: liangzhaowei
 * @Date: 2019-09-23 15:52:37
 */
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
var ShopBasePannel = (function (_super) {
    __extends(ShopBasePannel, _super);
    function ShopBasePannel($parent) {
        if ($parent === void 0) { $parent = null; }
        var _this = _super.call(this, $parent) || this;
        _this.skinName = "ShopBasePannelSkin";
        return _this;
    }
    ShopBasePannel.red = function () {
        return false;
    };
    /**需要刷新是红点消息列表 */
    ShopBasePannel.changeMsg = function () {
        return [];
    };
    ShopBasePannel.prototype.init = function () {
        this.listLb.itemRenderer = ShopBaseItem;
        this.cfgShop = GameConfig.shop[ShopType.gold];
    };
    ShopBasePannel.prototype.open = function (param) {
        if (param === void 0) { param = null; }
        if (this.cfgShop[1] && this.cfgShop[1].type) {
            this.message(MsgConst.SHOP_INFO + this.cfgShop[1].type, this.upCn);
        }
        this.upCn();
    };
    /**更新内容 */
    ShopBasePannel.prototype.upCn = function () {
        var list = [];
        for (var index in this.cfgShop) {
            list.push(this.cfgShop[index]);
        }
        this.setListData(this.listLb, list);
    };
    return ShopBasePannel;
}(CommunalPagePannel));
__reflect(ShopBasePannel.prototype, "ShopBasePannel");
//# sourceMappingURL=ShopBasePannel.js.map