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
 * @Description: 翅膀协议
 * @Author: xiejunwei
 * @Date: 2019-08-14 18:02:28
 * @LastEditTime: 2019-09-27 15:57:51
 */
var WingProxy = (function (_super) {
    __extends(WingProxy, _super);
    function WingProxy() {
        var _this = _super.call(this, PacketTypes.WING) || this;
        _this.regNetMsg(1, _this.doWingInfo); //翅膀信息
        return _this;
    }
    WingProxy.prototype.doWingInfo = function (bytes) {
        var roleid = GameCache.hero.transIdFromeServer(bytes.readUnsignedInt());
        var lvl = bytes.readUnsignedShort();
        var exp = bytes.readUnsignedInt();
        var count = bytes.readByte(); //剩余金币培养次数
        GameCache.wing.initWingData(roleid, lvl, exp, count);
    };
    /**
     * 请求翅膀消息
     */
    WingProxy.prototype.sendWingInfo = function (role) {
        var roleId = GameCache.hero.getServerIdByIndex(role);
        var bytes = this.getBytes(1);
        bytes.writeByte(roleId);
        this.sendToServer(bytes);
    };
    /**
     * 翅膀升级
     * @param type为升级类型，1为使用道具，0为使用金币 ,2为一键升星
     */
    WingProxy.prototype.sendWingUpgrade = function (role, type) {
        var bytes = this.getBytes(2);
        var roleId = GameCache.hero.getServerIdByIndex(role);
        bytes.writeInt(roleId);
        bytes.writeByte(type);
        this.sendToServer(bytes);
    };
    return WingProxy;
}(BaseProxy));
__reflect(WingProxy.prototype, "WingProxy");
//# sourceMappingURL=WingProxy.js.map