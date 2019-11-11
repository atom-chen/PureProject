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
 * @Description: 符碑协议
 * @Author: xiejunwei
 * @Date: 2019-09-18 19:40:41
 */
var RuneProxy = (function (_super) {
    __extends(RuneProxy, _super);
    function RuneProxy() {
        var _this = _super.call(this, PacketTypes.RUNE) || this;
        _this.regNetMsg(2, _this.doInitRuneData); //初始化所有符碑信息
        _this.regNetMsg(1, _this.doInitSingleRune); //初始化单个符碑信息
        return _this;
    }
    RuneProxy.prototype.doInitRuneData = function (bytes) {
        var len = bytes.readInt();
        for (var i = 0; i < len; i++) {
            var idx = bytes.readByte();
            var lvl = bytes.readUnsignedShort();
            var star = bytes.readByte();
            var exp = bytes.readInt();
            GameCache.rune.initRuneData(idx - 1, lvl, star, exp);
        }
        App.MessageCenter.dispatch(MsgConst.RUNE_INFO);
    };
    RuneProxy.prototype.doInitSingleRune = function (bytes) {
        var idx = bytes.readByte();
        var lvl = bytes.readUnsignedShort();
        var star = bytes.readByte();
        var exp = bytes.readInt();
        GameCache.rune.initRuneData(idx - 1, lvl, star, exp);
        App.MessageCenter.dispatch(MsgConst.RUNE_INFO);
    };
    //////////////////////////////////////////////////////
    /**
     * 请求升级符碑
     * @param roleIdx角色下标,itemNum升级需要物品数量，itemId升级需要物品ID
     */
    RuneProxy.prototype.sendRuneLvlUp = function (roleIdx, itemNum, itemId) {
        var bytes = this.getBytes(1);
        var serId = GameCache.hero.getServerIdByIndex(roleIdx);
        bytes.writeInt(serId);
        bytes.writeUnsignedShort(roleIdx + 1);
        bytes.writeUnsignedShort(itemNum);
        bytes.writeInt(itemId);
        this.sendToServer(bytes);
    };
    return RuneProxy;
}(BaseProxy));
__reflect(RuneProxy.prototype, "RuneProxy");
//# sourceMappingURL=RuneProxy.js.map