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
 * @Description:冒险系统
 * @Author: guolinsen
 * @Date: 2019-08-26 17:40:15
 * @LastEditTime: 2019-08-27 20:33:45
 */
var AdventureProxy = (function (_super) {
    __extends(AdventureProxy, _super);
    function AdventureProxy() {
        var _this = _super.call(this, PacketTypes.ADVENTURE) || this;
        _this.regNetMsg(1, _this.doInit); //初始化数据
        _this.regNetMsg(2, _this.doSingleInfo); //刷新数据
        return _this;
    }
    AdventureProxy.prototype.doInit = function (pBytes) {
        var len = pBytes.readUnsignedShort();
        var cache = GameCache.adventure;
        for (var i = 0; i < len; i++) {
            var finish = pBytes.readByte();
            var prize = pBytes.readByte();
            var progress = pBytes.readShort();
            cache.updateSingle(i, finish ? true : false, prize ? true : false, progress);
        }
        cache.checkFinish();
        App.MessageCenter.dispatch(MsgConst.ADVENTURE_UPDATE_SINGLE);
    };
    AdventureProxy.prototype.doSingleInfo = function (pBytes) {
        var id = pBytes.readUnsignedShort();
        var finish = pBytes.readByte();
        var prize = pBytes.readByte();
        var progress = pBytes.readShort();
        var cache = GameCache.adventure;
        cache.updateSingle(id, finish ? true : false, prize ? true : false, progress, true);
        App.MessageCenter.dispatch(MsgConst.ADVENTURE_UPDATE_SINGLE);
    };
    AdventureProxy.prototype.sendPrize = function (id, param1, param2) {
        if (param1 === void 0) { param1 = 0; }
        if (param2 === void 0) { param2 = 0; }
        var bytes = this.getBytes(2);
        bytes.writeUnsignedShort(id);
        bytes.writeUnsignedInt(param1);
        bytes.writeUnsignedInt(param2);
        this.sendToServer(bytes);
    };
    return AdventureProxy;
}(BaseProxy));
__reflect(AdventureProxy.prototype, "AdventureProxy");
//# sourceMappingURL=AdventureProxy.js.map