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
 * 掉落系统
*/
var DropProxy = (function (_super) {
    __extends(DropProxy, _super);
    function DropProxy() {
        var _this = _super.call(this, PacketTypes.DROP) || this;
        _this.regNetMsg(10, _this.doCreateDropPacket);
        _this.regNetMsg(11, _this.doDelPacket);
        return _this;
    }
    DropProxy.prototype.doCreateDropPacket = function (bytes) {
        var packetId = bytes.readUnsignedInt();
        var id = bytes.readUnsignedShort(); //物品id,0为金币  65535表示元宝
        var x = bytes.readUnsignedShort();
        var y = bytes.readUnsignedShort();
        var icon = bytes.readUnsignedShort();
        var needTip = bytes.readByte() == 1; //是否需要物品提示
        var dropActor = bytes.readInt(); //丢弃人的id
        var canPick = bytes.readByte() == 1;
        App.ThingManager.addDrop(packetId, id, x, y, false);
    };
    /**
     * 删除掉落物品包
     * @param recog
     *
     */
    DropProxy.prototype.doDelPacket = function (bytes) {
        var packetId = bytes.readUnsignedInt();
        App.ThingManager.removeDrop(packetId);
    };
    /**********************************************************************************/
    DropProxy.prototype.sendPickupDropItem = function (packetId) {
        var bytes = this.getBytes(9);
        bytes.writeInt(packetId);
        this.sendToServer(bytes);
    };
    return DropProxy;
}(BaseProxy));
__reflect(DropProxy.prototype, "DropProxy");
//# sourceMappingURL=DropProxy.js.map