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
 * 聊天系统
 */
var ChatProxy = (function (_super) {
    __extends(ChatProxy, _super);
    function ChatProxy() {
        var _this = _super.call(this, PacketTypes.CHAT) || this;
        _this.regNetMsg(1, _this.doGetChatMessage);
        _this.regNetMsg(8, _this.doErrorMessage);
        _this.regNetMsg(2, _this.doSysInfo);
        _this.regNetMsg(9, _this.doSysNotice);
        return _this;
    }
    ChatProxy.prototype.doGetChatMessage = function (bytes) {
        var channelId = bytes.readByte();
        var playerName = bytes.readCustomBytes();
        var playerId = bytes.readUnsignedInt();
        var sexual = bytes.readByte();
        var job = bytes.readByte();
        var lvl = bytes.readInt();
        var vipLvl = bytes.readByte();
        var message = bytes.readCustomBytes();
        GameCache.chat.initChatData(channelId, playerName, playerId, sexual, job, lvl, vipLvl, message);
    };
    /**错误提示 */
    ChatProxy.prototype.doErrorMessage = function (bytes) {
        var errorId = bytes.readInt();
        if (errorId && GameConfig.errotips[errorId]) {
            GlobalFun.SysMsg(GameConfig.errotips[errorId].dec);
        }
    };
    ChatProxy.prototype.doSysInfo = function (bytes) {
        var msg = bytes.readCustomBytes();
        // GameCache.chat.addSysMsg(msg);
    };
    ChatProxy.prototype.doSysNotice = function (bytes) {
        var tipsId = bytes.readUnsignedShort();
        var type = bytes.readUnsignedShort();
        var con = GameConfig.brocast[tipsId];
        if (!con)
            return;
        //let type = con["type"];
        var des = con["desc"];
        var param = [];
        if (type == 0) {
        }
        else if (type == 1) {
            param.push(this.getNoticeRoleInfo(bytes));
        }
        else if (type == 2) {
            param.push(this.getNoticeRoleInfo(bytes));
            param.push(this.getNoticeBossInfo(bytes));
        }
        else if (type == 3) {
            param.push(this.getNoticeRoleInfo(bytes));
            param.push(this.getNoticeItemInfo(bytes));
        }
        else if (type == 4) {
            param.push(this.getNoticeRoleInfo(bytes));
            param.push(this.getNoticeBossInfo(bytes));
            param.push(this.getNoticeItemInfo(bytes));
        }
        else if (type == 5) {
            param.push(this.getNoticeBossInfo(bytes));
        }
        var msg = StringUtils.substitute(des, param);
        GlobalFun.SysMsg(msg, SysMessageType.SYSTEM_BARRAGE);
    };
    ChatProxy.prototype.getNoticeRoleInfo = function (bytes) {
        var actorId = bytes.readUnsignedInt();
        var sex = bytes.readUnsignedByte();
        var name = bytes.readCustomBytes();
        return GameCache.chat.createRoleLink(actorId, name, sex);
    };
    ChatProxy.prototype.getNoticeBossInfo = function (bytes) {
        var monsterId = bytes.readUnsignedShort();
        var std = GameConfig.monster[monsterId];
        return std ? std.name : "";
    };
    ChatProxy.prototype.getNoticeItemInfo = function (bytes) {
        var len = bytes.readUnsignedShort();
        var arr = [];
        while (len > 0) {
            arr.push(GameCache.chat.createItemLink(bytes.readUnsignedShort()));
            len--;
        }
        return arr.join(",");
    };
    ChatProxy.prototype.sendChatMessage = function (channelId, message, filter) {
        if (channelId === void 0) { channelId = 1; }
        if (message === void 0) { message = ""; }
        if (filter === void 0) { filter = true; }
        if (message == "")
            return;
        var bytes = this.getBytes(1);
        bytes.writeByte(channelId);
        bytes.writeString(message);
        this.sendToServer(bytes);
    };
    return ChatProxy;
}(BaseProxy));
__reflect(ChatProxy.prototype, "ChatProxy");
//# sourceMappingURL=ChatProxy.js.map