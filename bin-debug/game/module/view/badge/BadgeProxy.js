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
 * @Description: 徽章协议
 * @Author: xiejunwei
 * @Date: 2019-08-27 20:24:54
 * @LastEditTime: 2019-08-28 10:43:51
 */
var BadgeProxy = (function (_super) {
    __extends(BadgeProxy, _super);
    function BadgeProxy() {
        return _super.call(this, PacketTypes.BADGE) || this;
    }
    BadgeProxy.prototype.sendBadgeUpGrade = function () {
        var bytes = this.getBytes(2);
        this.sendToServer(bytes);
    };
    return BadgeProxy;
}(BaseProxy));
__reflect(BadgeProxy.prototype, "BadgeProxy");
//# sourceMappingURL=BadgeProxy.js.map