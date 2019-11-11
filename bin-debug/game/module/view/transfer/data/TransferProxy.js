/*
 * @Description: 转职协议
 * @Author: liangzhaowei
 * @Date: 2019-10-28 17:37:37
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
var TransferProxy = (function (_super) {
    __extends(TransferProxy, _super);
    function TransferProxy() {
        var _this = _super.call(this, PacketTypes.TRANSFER) || this;
        _this.regNetMsg(1, _this.doInit); //下发转职数据
        _this.regNetMsg(2, _this.doRetrunRes); //返回转职结果
        _this.regNetMsg(3, _this.doRetrunExp); //返回使用转职经验道具结果
        return _this;
    }
    TransferProxy.prototype.doInit = function (pBytes) {
        var transferData = new TransferItem();
        transferData.init(pBytes);
        GameCache.transfer.initData(transferData);
        App.MessageCenter.dispatch(MsgConst.TRANSFER_INFO);
    };
    TransferProxy.prototype.doRetrunRes = function (pBytes) {
        var roid = GameCache.hero.transIdFromeServer(pBytes.readInt());
        var num = pBytes.readUnsignedShort();
        var lv = pBytes.readUnsignedShort();
        var exp = pBytes.readUnsignedInt();
        GameCache.transfer.upTrunLv(roid, num, lv, exp);
        App.MessageCenter.dispatch(MsgConst.TRANSFER_INFO);
    };
    TransferProxy.prototype.doRetrunExp = function (pBytes) {
        var roid = GameCache.hero.transIdFromeServer(pBytes.readInt());
        var exp = pBytes.readUnsignedInt();
        var itemIndex = pBytes.readByte();
        var time = pBytes.readByte();
        GameCache.transfer.upItemInfo(roid, exp, itemIndex, time);
        App.MessageCenter.dispatch(MsgConst.TRANSFER_INFO);
    };
    /**请求转职*/
    TransferProxy.prototype.sendSuitResolve = function (id) {
        var bytes = this.getBytes(1);
        bytes.writeInt(id);
        this.sendToServer(bytes);
    };
    /**使转职经验道具*/
    TransferProxy.prototype.sendSuitChange = function (id, itemId) {
        var bytes = this.getBytes(2);
        bytes.writeInt(id);
        bytes.writeByte(itemId);
        this.sendToServer(bytes);
    };
    return TransferProxy;
}(BaseProxy));
__reflect(TransferProxy.prototype, "TransferProxy");
//# sourceMappingURL=TransferProxy.js.map