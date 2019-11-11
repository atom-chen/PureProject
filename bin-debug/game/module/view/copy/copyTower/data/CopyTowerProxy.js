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
 * @Description: 副本爬塔协议
 * @Author: guolinsen
 * @Date: 2019-07-29 17:22:47
 * @LastEditTime: 2019-08-21 11:46:06
 */
var CopyTowerProxy = (function (_super) {
    __extends(CopyTowerProxy, _super);
    function CopyTowerProxy() {
        var _this = _super.call(this, PacketTypes.COPY) || this;
        _this.regNetMsg(21, _this.doTower); //【爬塔】下发爬塔数据
        _this.regNetMsg(22, _this.doRwResult); //【爬塔】抽奖结果返回
        _this.regNetMsg(26, _this.doRank); //【爬塔】下发排行榜数据
        return _this;
    }
    CopyTowerProxy.prototype.doTower = function (pBytes) {
        GameCache.copytower.initData(pBytes);
        App.MessageCenter.dispatch(MsgConst.CPOY_TOWER);
    };
    CopyTowerProxy.prototype.doRwResult = function (pBytes) {
        App.MessageCenter.dispatch(MsgConst.CPOY_TOWER_LUCK, pBytes.readByte());
    };
    CopyTowerProxy.prototype.doRank = function (pBytes) {
        GameCache.copytower.rankData(pBytes);
        App.MessageCenter.dispatch(MsgConst.CPOY_TOWER_RANK);
    };
    /**【爬塔】请求幸运转盘抽奖*/
    CopyTowerProxy.prototype.getLuck = function () {
        this.sendMsgId(22);
    };
    /**【爬塔】请求领取转盘抽奖的奖励*/
    CopyTowerProxy.prototype.getLuckRw = function () {
        this.sendMsgId(23);
    };
    /**【爬塔】请求领取每日奖励*/
    CopyTowerProxy.prototype.getDailyRw = function () {
        this.sendMsgId(24);
    };
    /**【爬塔】请求挑战当前层的boss*/
    CopyTowerProxy.prototype.gotoCopy = function () {
        this.sendMsgId(25);
    };
    /**【爬塔】请求排行榜数据*/
    CopyTowerProxy.prototype.getRank = function (lenght) {
        var bytes = this.getBytes(26);
        bytes.writeByte(lenght);
        this.sendToServer(bytes);
    };
    return CopyTowerProxy;
}(BaseProxy));
__reflect(CopyTowerProxy.prototype, "CopyTowerProxy");
//# sourceMappingURL=CopyTowerProxy.js.map