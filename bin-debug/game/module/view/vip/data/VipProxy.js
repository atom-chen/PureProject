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
 * @Description: vip
 * @Author: guolinsen
 * @Date: 2019-07-29 17:22:47
 * @LastEditTime: 2019-09-05 10:39:52
 */
var VipProxy = (function (_super) {
    __extends(VipProxy, _super);
    function VipProxy() {
        var _this = _super.call(this, PacketTypes.VIP) || this;
        _this.regNetMsg(1, _this.privilegeCardTime); //
        _this.regNetMsg(2, _this.vipWelfareData); //登录下发vip礼包数据(专属、每日)
        _this.regNetMsg(3, _this.vipWelfareExclusive); //返回专属礼包状态
        _this.regNetMsg(4, _this.vipWelfareDaily); //放回每日礼包状态
        _this.regNetMsg(5, _this.vipCardSt); //vip体验卡状态
        return _this;
    }
    /**下发vip特权卡时间 */
    VipProxy.prototype.privilegeCardTime = function (pBytes) {
        var time = pBytes.readInt();
        GameCache.vip.privilegeCardTime = time;
        App.MessageCenter.dispatch(MsgConst.VIP_CARD_TIME);
    };
    VipProxy.prototype.vipWelfareData = function (pBytes) {
        var welfareData = { dailyGet: 0, exclusiveList: [] };
        welfareData.dailyGet = pBytes.readByte();
        var count = pBytes.readByte();
        for (var i = 0; i < count; i++) {
            welfareData.exclusiveList.push(pBytes.readByte());
        }
        GameCache.vip.upWelfare(welfareData);
        App.MessageCenter.dispatch(MsgConst.VIP_WELFARE);
    };
    VipProxy.prototype.vipWelfareExclusive = function (pBytes) {
        var index = pBytes.readByte();
        var vipWelfare = GameCache.vip.vipWelfare;
        if (vipWelfare && vipWelfare.exclusiveList) {
            vipWelfare.exclusiveList[index - 1] = pBytes.readByte();
        }
        App.MessageCenter.dispatch(MsgConst.VIP_WELFARE);
    };
    VipProxy.prototype.vipWelfareDaily = function (pBytes) {
        GameCache.vip.vipWelfare.dailyGet = pBytes.readByte();
        App.MessageCenter.dispatch(MsgConst.VIP_WELFARE);
    };
    /** vip体验卡状态*/
    VipProxy.prototype.vipCardSt = function (pBytes) {
        var count = pBytes.readByte();
        for (var i = 0; i < count; i++) {
            GameCache.vip.vipCardSt[pBytes.readByte()] = pBytes.readByte();
        }
        App.MessageCenter.dispatch(MsgConst.VIP_CARD);
    };
    /**激活vip特权卡*/
    VipProxy.prototype.actCard = function (index) {
        var bytes = this.getBytes(1);
        bytes.writeByte(index);
        this.sendToServer(bytes);
    };
    /**领取专属礼包*/
    VipProxy.prototype.actExclusive = function (index) {
        var bytes = this.getBytes(2);
        bytes.writeByte(index);
        this.sendToServer(bytes);
    };
    /**领取每日礼包*/
    VipProxy.prototype.actDaily = function (index) {
        var bytes = this.getBytes(3);
        bytes.writeByte(index);
        this.sendToServer(bytes);
    };
    return VipProxy;
}(BaseProxy));
__reflect(VipProxy.prototype, "VipProxy");
//# sourceMappingURL=VipProxy.js.map