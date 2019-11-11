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
 * @Description: 时装信息
 * @Author: xiejunwei
 * @Date: 2019-08-05 10:39:10
 * @LastEditTime: 2019-10-14 15:40:24
 */
var FashionProxy = (function (_super) {
    __extends(FashionProxy, _super);
    function FashionProxy() {
        var _this = _super.call(this, PacketTypes.FASHION) || this;
        _this.regNetMsg(1, _this.doFashionBag);
        _this.regNetMsg(2, _this.doAddFashion);
        _this.regNetMsg(3, _this.doDelete);
        _this.regNetMsg(5, _this.doFashionList);
        return _this;
        // this.regNetMsg(4, this.doFashionAchive);
    }
    FashionProxy.prototype.doFashionBag = function (bytes) {
        var roleId = GameCache.hero.transIdFromeServer(bytes.readUnsignedInt());
        var type = bytes.readInt();
        var len = bytes.readInt();
        var idArr = [];
        for (var i = 0; i < len; i++) {
            var id = bytes.readInt();
            var time = bytes.readUnsignedInt();
            time && (time = (GlobalFun.formatMiniDateTime(time) / 1000));
            if (time > 0) {
                if (!GameCache.fashion.timeLimitItem[roleId])
                    GameCache.fashion.timeLimitItem[roleId] = {};
                GameCache.fashion.timeLimitItem[roleId][id] = time;
            }
            idArr.push(id);
        }
        if (!GameCache.fashion.fashionBag[roleId])
            GameCache.fashion.fashionBag[roleId] = {};
        GameCache.fashion.fashionBag[roleId][type] = idArr;
    };
    FashionProxy.prototype.doAddFashion = function (bytes) {
        var roleId = GameCache.hero.transIdFromeServer(bytes.readUnsignedInt());
        var type = bytes.readInt();
        var id = bytes.readInt();
        var count = bytes.readInt();
        var time = (GlobalFun.formatMiniDateTime(bytes.readUnsignedInt()) / 1000);
        if (time > 0) {
            if (!GameCache.fashion.timeLimitItem[roleId])
                GameCache.fashion.timeLimitItem[roleId] = {};
            GameCache.fashion.timeLimitItem[roleId][id] = time;
        }
        GameCache.fashion.addFashionItem(roleId, type, id);
    };
    FashionProxy.prototype.doDelete = function (bytes) {
        var roleId = GameCache.hero.transIdFromeServer(bytes.readUnsignedInt());
        var type = bytes.readInt();
        var id = bytes.readInt();
        GameCache.fashion.deleteFashionItem(roleId, type, id);
        App.MessageCenter.dispatch(MsgConst.FASHION_DELETE);
    };
    FashionProxy.prototype.doFashionList = function (bytes) {
        var roleId = GameCache.hero.transIdFromeServer(bytes.readInt());
        var len = bytes.readByte();
        GameCache.fashion.cleanRoleFashion(roleId);
        for (var i = 0; i < len; i++) {
            var id = bytes.readInt();
            GameCache.fashion.initRoleFashion(id, roleId);
        }
        App.MessageCenter.dispatch(MsgConst.FASHION_INFO);
    };
    /**
     * 购买时装
     * @param  itemid时装ID ，num数量
     */
    FashionProxy.prototype.sendFashionBuy = function (role, itemId, num) {
        if (num === void 0) { num = 1; }
        var bytes = this.getBytes(1);
        var roleId = GameCache.hero.getServerIdByIndex(role);
        bytes.writeInt(roleId);
        bytes.writeInt(itemId);
        bytes.writeInt(num);
        this.sendToServer(bytes);
    };
    /**
     * 装备时装
     * @param job itemid时装ID
     */
    FashionProxy.prototype.sendFashionEquip = function (role, itemId) {
        var bytes = this.getBytes(2);
        var roleId = GameCache.hero.getServerIdByIndex(role);
        bytes.writeInt(roleId);
        bytes.writeInt(itemId);
        this.sendToServer(bytes);
    };
    /**
     * 卸下时装
     * @param job partId部位ID
     */
    FashionProxy.prototype.sendTakeOff = function (role, partId) {
        var bytes = this.getBytes(3);
        var roleId = GameCache.hero.getServerIdByIndex(role);
        bytes.writeInt(roleId);
        bytes.writeInt(partId);
        this.sendToServer(bytes);
    };
    /**
     * 一键购买
     * @param job itemArr
     */
    FashionProxy.prototype.sendOneBuy = function (role, itemArr) {
        if (itemArr === void 0) { itemArr = []; }
        var bytes = this.getBytes(4);
        var roleId = GameCache.hero.getServerIdByIndex(role);
        bytes.writeInt(roleId);
        bytes.writeInt(itemArr.length);
        for (var i = 0; i < itemArr.length; i++) {
            bytes.writeInt(itemArr[i].id);
        }
        this.sendToServer(bytes);
    };
    /**
     * 一键穿戴
     */
    FashionProxy.prototype.sendOneWear = function (role, itemArr) {
        if (itemArr === void 0) { itemArr = []; }
        var bytes = this.getBytes(6);
        var roleId = GameCache.hero.getServerIdByIndex(role);
        bytes.writeInt(roleId);
        bytes.writeInt(itemArr.length);
        for (var i = 0; i < itemArr.length; i++) {
            bytes.writeInt(itemArr[i].id);
        }
        this.sendToServer(bytes);
    };
    /**
     * 一键卸下
     */
    FashionProxy.prototype.sendOneTakeOff = function (role) {
        var bytes = this.getBytes(5);
        var roleId = GameCache.hero.getServerIdByIndex(role);
        bytes.writeInt(roleId);
        this.sendToServer(bytes);
    };
    return FashionProxy;
}(BaseProxy));
__reflect(FashionProxy.prototype, "FashionProxy");
//# sourceMappingURL=FashionProxy.js.map