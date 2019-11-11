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
 * @Description: BUFF
 * @Author: guolinsen
 * @Date: 2019-09-02 20:11:09
 * @LastEditTime: 2019-09-03 10:22:45
 */
var BuffProxy = (function (_super) {
    __extends(BuffProxy, _super);
    function BuffProxy() {
        var _this = _super.call(this, PacketTypes.BUFF) || this;
        _this.regNetMsg(1, _this.doAddBuff);
        _this.regNetMsg(2, _this.doDeleteBuff1);
        _this.regNetMsg(3, _this.doDeleteBuff2);
        _this.regNetMsg(4, _this.doUpdateBuff);
        return _this;
    }
    BuffProxy.prototype.doAddBuff = function (bytes) {
        var recog = bytes.readDouble();
        var id = bytes.readUnsignedShort();
        var type = bytes.readUnsignedByte();
        var group = bytes.readUnsignedByte();
        var restTime = bytes.readInt();
        var name = bytes.readCustomBytes();
        var value = bytes.readNumeric(bytes.readUnsignedByte());
        var interval = bytes.readUnsignedShort();
        var icon = bytes.readUnsignedByte();
        restTime = restTime <= 0 ? restTime : (restTime * 1000 + App.TimerManager.getSyncTime());
        GameCache.buff.addBuff(recog, id, type, group, restTime, name, value, interval, icon);
    };
    BuffProxy.prototype.doDeleteBuff1 = function (bytes) {
        var recog = bytes.readDouble();
        var type = bytes.readUnsignedByte();
        var group = bytes.readUnsignedByte();
        GameCache.buff.delteBuff1(recog, type, group);
    };
    BuffProxy.prototype.doDeleteBuff2 = function (bytes) {
        var recog = bytes.readDouble();
        var id = bytes.readUnsignedByte();
        GameCache.buff.delteBuff2(recog, id);
    };
    BuffProxy.prototype.doUpdateBuff = function (bytes) {
        var recog = bytes.readDouble();
        var id = bytes.readUnsignedByte();
        var value = bytes.readUnsignedInt();
    };
    return BuffProxy;
}(BaseProxy));
__reflect(BuffProxy.prototype, "BuffProxy");
//# sourceMappingURL=BuffProxy.js.map