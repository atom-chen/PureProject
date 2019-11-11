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
 * @Description: 签到协议
 * @Author: guolinsen
 * @Date: 2019-09-10 20:09:37
 * @LastEditTime: 2019-09-10 20:11:17
 */
var SignProxy = (function (_super) {
    __extends(SignProxy, _super);
    function SignProxy() {
        return _super.call(this, PacketTypes.GETGIFTOL) || this;
    }
    SignProxy.prototype.sendPrize = function (id) {
        var bytes = this.getBytes(3);
        bytes.writeUnsignedShort(id);
        this.sendToServer(bytes);
    };
    return SignProxy;
}(BaseProxy));
__reflect(SignProxy.prototype, "SignProxy");
//# sourceMappingURL=SignProxy.js.map