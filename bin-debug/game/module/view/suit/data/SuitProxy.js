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
 * effect: 套装协议
 * author :lzw
 * data :2019.7.25
 */
var SuitProxy = (function (_super) {
    __extends(SuitProxy, _super);
    function SuitProxy() {
        var _this = _super.call(this, PacketTypes.EQUIP) || this;
        _this.regNetMsg(26, _this.doSuitResolve); //套装分解结果
        _this.regNetMsg(27, _this.doSuitChange); //套装兑换结果
        _this.regNetMsg(28, _this.doSuitInfo); //玩家套装等级
        _this.regNetMsg(29, _this.doSuitInfoOnce); //玩家套装等级(单次下发)
        return _this;
    }
    SuitProxy.prototype.doSuitResolve = function (pBytes) {
        var res = pBytes.readBoolean();
        if (res) {
            App.MessageCenter.dispatch(MsgConst.SUIT_RESOLVE);
        }
        else {
            var errorId = pBytes.readInt();
            if (errorId && GameConfig.errotips[errorId]) {
                GlobalFun.SysMsg(GameConfig.errotips[errorId].dec);
            }
        }
    };
    SuitProxy.prototype.doSuitChange = function (pBytes) {
        var res = pBytes.readBoolean();
        if (res) {
            App.MessageCenter.dispatch(MsgConst.SUIT_CHANGE);
        }
        else {
            var errorId = pBytes.readInt();
            if (errorId && GameConfig.errotips[errorId]) {
                GlobalFun.SysMsg(GameConfig.errotips[errorId].dec);
            }
        }
    };
    SuitProxy.prototype.doSuitInfo = function (pBytes) {
        var id = GameCache.hero.transIdFromeServer(pBytes.readUnsignedInt()); //角色id
        var fight = pBytes.readInt(); //战力
        var count = pBytes.readInt(); //套装等级列表
        var lvList = [];
        for (var i = 0; i < count; i++) {
            lvList.push(pBytes.readInt());
        }
        GameCache.suit.initStList(id, fight, lvList);
        App.MessageCenter.dispatch(MsgConst.SUIT_INFO);
    };
    SuitProxy.prototype.doSuitInfoOnce = function (pBytes) {
        var id = GameCache.hero.transIdFromeServer(pBytes.readUnsignedInt()); //角色id
        var fight = pBytes.readInt(); //战力
        var lv = pBytes.readInt(); //等级
        GameCache.suit.upStList(id, fight, lv);
        App.MessageCenter.dispatch(MsgConst.SUIT_INFO);
    };
    /**套装分解*/
    SuitProxy.prototype.sendSuitResolve = function (id, itemId, itemNum) {
        var bytes = this.getBytes(28);
        bytes.writeUnsignedInt(id);
        bytes.writeInt(itemId);
        bytes.writeInt(itemNum);
        this.sendToServer(bytes);
    };
    /**套装兑换*/
    SuitProxy.prototype.sendSuitChange = function (id, itemId, itemNum) {
        var bytes = this.getBytes(29);
        bytes.writeUnsignedInt(id);
        bytes.writeInt(itemId);
        bytes.writeInt(itemNum);
        this.sendToServer(bytes);
    };
    /**套装等级获取*/
    SuitProxy.prototype.sendSuitGetLv = function (id, lv) {
        var bytes = this.getBytes(30);
        bytes.writeUnsignedInt(id);
        bytes.writeInt(lv);
        this.sendToServer(bytes);
    };
    /**套装一键分解*/
    SuitProxy.prototype.sendSuitAllResolve = function (id, itemList) {
        var bytes = this.getBytes(31);
        bytes.writeUnsignedInt(id);
        bytes.writeUnsignedInt(itemList.length);
        for (var i = 0; i < itemList.length; i++) {
            bytes.writeInt(itemList[i].id);
        }
        this.sendToServer(bytes);
    };
    return SuitProxy;
}(BaseProxy));
__reflect(SuitProxy.prototype, "SuitProxy");
//# sourceMappingURL=SuitProxy.js.map