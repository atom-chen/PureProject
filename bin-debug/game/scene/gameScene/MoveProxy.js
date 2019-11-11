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
 * 移动子系统
*/
var MoveProxy = (function (_super) {
    __extends(MoveProxy, _super);
    function MoveProxy() {
        return _super.call(this, PacketTypes.MOVE) || this;
    }
    /**通知后端当前坐标*/
    MoveProxy.prototype.sendMoveto = function (x, y, id) {
        var bytes = this.getBytes(1);
        bytes.writeUnsignedInt(id);
        bytes.writeUnsignedShort(x);
        bytes.writeUnsignedShort(y);
        bytes.writeUnsignedInt(0); //服务器时间
        bytes.writeUnsignedShort(GameCache.map.mapId);
        this.sendToServer(bytes);
        //traceDebug("上发坐标", x, y);
    };
    return MoveProxy;
}(BaseProxy));
__reflect(MoveProxy.prototype, "MoveProxy");
//# sourceMappingURL=MoveProxy.js.map