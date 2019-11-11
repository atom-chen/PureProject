/*
 * @Description: 首冲协议内容
 * @Author: liangzhaowei
 * @Date: 2019-09-02 17:15:45
 * @LastEditTime: 2019-09-04 17:44:38
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
var FirstChargeProxy = (function (_super) {
    __extends(FirstChargeProxy, _super);
    function FirstChargeProxy() {
        var _this = _super.call(this, PacketTypes.OTHER) || this;
        _this.regNetMsg(81, _this.privilegeCardTime); //
        _this.regNetMsg(86, _this.seceondChargeState); //充值2倍状态
        _this.regNetMsg(87, _this.firstChargeState); //充值4倍状态
        return _this;
    }
    /**首冲/累充奖励 */
    FirstChargeProxy.prototype.privilegeCardTime = function (pBytes) {
        var type = pBytes.readByte();
        var count = pBytes.readByte();
        var list = [];
        for (var i = 0; i < count; i++) {
            list.push(pBytes.readByte());
        }
        GameCache.firstcharge.update(list, type);
        App.MessageCenter.dispatch(MsgConst.FIRST_CHARGE);
    };
    /**获取首冲累充奖励*/
    FirstChargeProxy.prototype.getRw = function (index, day) {
        var bytes = this.getBytes(47);
        bytes.writeByte(index);
        bytes.writeByte(day);
        this.sendToServer(bytes);
    };
    /**充值2倍状态 */
    FirstChargeProxy.prototype.seceondChargeState = function (pBytes) {
        var count = pBytes.readByte();
        GameCache.firstcharge.secondChargeSt = {};
        for (var i = 0; i < count; i++) {
            GameCache.firstcharge.secondChargeSt[pBytes.readUnsignedShort()] = (pBytes.readByte());
        }
        App.MessageCenter.dispatch(MsgConst.FIRST_CHARGE);
    };
    /**充值4倍状态 */
    FirstChargeProxy.prototype.firstChargeState = function (pBytes) {
        GameCache.firstcharge.firstChargeSt = pBytes.readByte();
        App.MessageCenter.dispatch(MsgConst.FIRST_CHARGE);
    };
    return FirstChargeProxy;
}(BaseProxy));
__reflect(FirstChargeProxy.prototype, "FirstChargeProxy");
//# sourceMappingURL=FirstChargeProxy.js.map