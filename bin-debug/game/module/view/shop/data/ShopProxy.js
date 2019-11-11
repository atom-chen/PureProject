/*
 * @Description: 商店协议
 * @Author: liangzhaowei
 * @Date: 2019-09-23 16:17:12
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
var ShopProxy = (function (_super) {
    __extends(ShopProxy, _super);
    function ShopProxy() {
        var _this = _super.call(this, PacketTypes.SHOP) || this;
        _this.regNetMsg(1, _this.doInit); //商城信息
        _this.regNetMsg(2, _this.doBuyTime); //商城购买返回信息
        _this.regNetMsg(3, _this.doShopScore); //商城积分
        return _this;
    }
    ShopProxy.prototype.doInit = function (pBytes) {
        var type = pBytes.readByte();
        var count = pBytes.readUnsignedShort();
        var shopObj = {};
        for (var i = 0; i < count; i++) {
            shopObj[pBytes.readByte()] = pBytes.readUnsignedShort();
        }
        GameCache.shop.initData(type, shopObj);
        App.MessageCenter.dispatch(MsgConst.SHOP_INFO + type);
    };
    ShopProxy.prototype.doBuyTime = function (pBytes) {
        var type = pBytes.readByte();
        var id = pBytes.readByte();
        var time = pBytes.readShort();
        if (GameCache.shop.shopData[type]) {
            GameCache.shop.shopData[type][id] = time;
        }
        App.MessageCenter.dispatch(MsgConst.SHOP_INFO + type);
    };
    ShopProxy.prototype.doShopScore = function (pBytes) {
    };
    /**商城购买*/
    ShopProxy.prototype.sendShopBuy = function (type, id, count) {
        var bytes = this.getBytes(1);
        bytes.writeByte(type);
        bytes.writeByte(id);
        bytes.writeUnsignedShort(count);
        this.sendToServer(bytes);
    };
    return ShopProxy;
}(BaseProxy));
__reflect(ShopProxy.prototype, "ShopProxy");
//# sourceMappingURL=ShopProxy.js.map