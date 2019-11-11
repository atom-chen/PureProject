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
 * Created by linsen on 2019/5/30.
 * 和服务端通信
*/
var BaseProxy = (function (_super) {
    __extends(BaseProxy, _super);
    function BaseProxy(sysId) {
        var _this = _super.call(this) || this;
        _this.sysId = sysId;
        return _this;
    }
    /**
     * 从对象池获取一个bytes对象
    */
    BaseProxy.prototype.getGameByteArray = function () {
        return GameByteArray.getBytes();
    };
    /**
     * 获取一个消息号bytes对象
    */
    BaseProxy.prototype.getBytes = function (msgid) {
        var bytes = this.getGameByteArray();
        bytes.writeCmd(this.sysId, msgid);
        return bytes;
    };
    /**
     * 只请求消息号，
    */
    BaseProxy.prototype.sendMsgId = function (msgid) {
        var bytes = this.getGameByteArray();
        bytes.writeCmd(this.sysId, msgid);
        this.sendToServer(bytes);
    };
    /**
     * 发送到服务器
     * @param bytes
     */
    BaseProxy.prototype.sendToServer = function (bytes) {
        App.Socket.sendToServer(bytes);
    };
    /**侦听收到服务器信息 */
    BaseProxy.prototype.regNetMsg = function (msgId, fun) {
        App.Socket.registerSTCFunc(this.sysId, msgId, fun, this);
    };
    return BaseProxy;
}(egret.HashObject));
__reflect(BaseProxy.prototype, "BaseProxy");
//# sourceMappingURL=BaseProxy.js.map