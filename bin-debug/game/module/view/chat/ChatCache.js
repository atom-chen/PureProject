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
 * @Description: 聊天数据
 * @Author: xiejunwei
 * @Date: 2019-09-30 14:28:58
 */
var ChatCache = (function (_super) {
    __extends(ChatCache, _super);
    function ChatCache() {
        var _this = _super.call(this) || this;
        _this.chatData = {};
        _this.previewChat = [];
        _this.sysInfo = [];
        _this.showOffList = []; //炫耀道具组
        return _this;
    }
    ChatCache.prototype.clear = function () {
        this.showOffList = [];
        this.chatData = {};
        this.previewChat = [];
        this.sysInfo = [];
    };
    ChatCache.prototype.createItemLink = function (id) {
        var std = GameConfig.item[id];
        if (std) {
            var color = ItemUtils.getItemColor(std.showQuality);
            var b = "<(u)(c" + color + ")(eitem:" + std.id + "_" + std.type + ")" + std.name + ">";
            return b;
        }
        return "";
    };
    ChatCache.prototype.createRoleLink = function (roleId, roleName, sex) {
        if (sex === void 0) { sex = 1; }
        var color = ColorUtil.C_GREEN;
        var b = "<(u)(c" + color + ")(erole:" + roleId + ")" + roleName + ">";
        return b;
    };
    ChatCache.prototype.createCustomLink = function (mof, text, color) {
        if (color === void 0) { color = ColorUtil.GREEN; }
        return "<(u)(c" + color + ")(e" + mof + ")" + text + ">";
    };
    ChatCache.prototype.createServerText = function (str) {
        // let strArr: string[] = str.match(/ *\[[^)]*\] */g) || [];
        var strArr = str.match(/\[(.+?)\]/g) || [];
        var sendT = str;
        var eqNameArr = [];
        for (var i = 0; i < strArr.length; i++) {
            var a = strArr[i].replace(/[\[\]]/g, "");
            switch (a[0]) {
                case "#":
                    var value = parseInt(a.slice(1));
                    var b = "<(s" + GlobalVar.EMOJI_SIZE + ")(p0_" + value + ")　>";
                    sendT = sendT.replace(strArr[i], b);
                    break;
                default:
                    for (var _i = 0, _a = this.showOffList; _i < _a.length; _i++) {
                        var j = _a[_i];
                        if (j.name == a) {
                            var color = ItemUtils.getItemColor(j.showQuality);
                            var b_1 = "<(u)(c" + color + ")(eitem:" + j.id + "_" + j.type + ")" + j.name + ">";
                            sendT = sendT.replace(strArr[i], b_1);
                        }
                    }
                    break;
            }
        }
        return sendT;
    };
    ChatCache.prototype.showOffItem = function (item) {
        this.showOffList.push(item);
        var itemName = "[" + item.name + "]";
        var view = new ViewProp();
        view.exData1 = {};
        view.exData1["showOff"] = itemName;
        if (App.ViewManager.isShow(ViewConst.CHAT)) {
            App.MessageCenter.dispatch(MsgConst.CHAT_SHOWOFF, itemName);
        }
        else {
            App.ViewManager.open(ViewConst.CHAT, view);
        }
    };
    ChatCache.prototype.initChatData = function (channelId, playerName, playerId, sexual, job, lvl, viplvl, message) {
        var obj = {
            channelId: channelId,
            playerName: playerName,
            playerId: playerId,
            sexual: sexual,
            job: job,
            lvl: lvl,
            viplvl: viplvl,
            message: message
        };
        if (!this.chatData[channelId])
            this.chatData[channelId] = [];
        this.chatData[channelId].push(obj);
        if (channelId != ChatType.SYSTEM) {
            if (this.previewChat.length < 3) {
                this.previewChat.push(obj);
            }
            else {
                this.previewChat.shift();
                this.previewChat.push(obj);
            }
            App.MessageCenter.dispatch(MsgConst.CHAT_INFO, obj);
        }
    };
    ChatCache.prototype.getPrevireChat = function (label) {
        var msg = "";
        var len = this.previewChat.length;
        for (var i = 0; i < len; i++) {
            var curMsg = this.initChatMsg(this.previewChat[i]);
            if (i < len - 1) {
                msg += (curMsg + "\n");
            }
            else {
                msg += (curMsg);
            }
        }
        // msg = msg.replace(/\　/g, "");
        label.textFlow = TextFlowUtils.generateTextFlow(msg);
        label.textHeight;
        // let maxHeight = label.parent.height;
        // let check = label['linesArr'].reverse();
        // let textFlow = [];
        // for (let i of check) {
        //     if (i.height > maxHeight) break;
        //     maxHeight -= i.height;
        //     for (let j = 0; j < i.elements.length; j++) {
        //         let obj = {
        //             style: i.elements[j].style,
        //             text: i.elements[j].text
        //         }
        //         textFlow.push(obj);
        //     }
        // }
        // textFlow= textFlow.reverse();
        // label.textFlow = textFlow;
        if (label['linesArr'].length > 2)
            label.y = label.parent.height - label.height >= 0 ? 1 : label.parent.height - label.height - 1;
        TextFlowUtils.generateEmoji(label, label.parent, true);
    };
    ChatCache.prototype.initChatMsg = function (obj) {
        var channelImg = "<(s" + 16 + ")(p1_" + obj.channelId + "_18_35)\u00B7  \u00B7 \u00B7 \u00B7 >";
        var name = "<(c" + GlobalVar.CHAT_COLOR[obj.channelId] + ")" + obj.playerName + " : >";
        return channelImg + name + obj.message;
    };
    ChatCache.prototype.getSysMessage = function (label) {
        var message = GameCache.chat.sysInfo[GameCache.chat.sysInfo.length - 1];
        label.textFlow = TextFlowUtils.generateTextFlow(message);
        TextFlowUtils.generateEmoji(label, label.parent, true);
    };
    /**增加一条系统信息*/
    ChatCache.prototype.addSysMsg = function (text, channel) {
        if (channel === void 0) { channel = ChatType.SYSTEM; }
        if (this.sysInfo.length > 20) {
            this.sysInfo.shift();
        }
        var channelImg = "<(s" + 16 + ")(p1_" + channel + "_18_35)\u00B7  \u00B7 \u00B7 \u00B7 >";
        var message = channelImg + text;
        this.sysInfo.push(message);
        App.MessageCenter.dispatch(MsgConst.SYS_INFO_MESSAGE, message);
    };
    return ChatCache;
}(BaseCache));
__reflect(ChatCache.prototype, "ChatCache");
//# sourceMappingURL=ChatCache.js.map