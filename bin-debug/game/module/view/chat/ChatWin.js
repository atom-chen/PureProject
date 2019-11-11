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
 * @Description: 聊天窗口
 * @Author: xiejunwei
 * @Date: 2019-09-30 10:40:16
 */
var ChatWin = (function (_super) {
    __extends(ChatWin, _super);
    function ChatWin() {
        var _this = _super.call(this, LayerManager.UI_Main) || this;
        _this.toggle = false;
        _this.skinName = "ChatWinSkin";
        return _this;
    }
    ChatWin.prototype.init = function () {
        _super.prototype.init.call(this);
        // this.horizontalCenter = 1;
        // this.bottom = 82;
        this.left = this.right = this.top = this.bottom = 0;
        this.chatLab.itemRenderer = MsgItem;
        this.inputText.maxChars = GameConfig.globalConfig.enterLimit;
    };
    ChatWin.prototype.open = function (param) {
        _super.prototype.open.call(this);
        this.addTouchEvent(this.emojiBtn, this.openEmoji);
        this.addTouchEvent(this.tabBtn, this.initChatMsg);
        this.addTouchEvent(this.sendBtn, this.sendText);
        this.addTouchEvent(this.closeGroup, this.closeView);
        this.message(MsgConst.CHAT_INFO, this.addChatMsg);
        this.message(MsgConst.CHAT_SHOWOFF, this.checkShowOffList);
        this.message(MsgConst.SYS_INFO_MESSAGE, this.addSysChatMsg);
        this.inputText.prompt = Language.lang.chat_1;
        if (param && param.exData1 && param.exData1["showOff"])
            this.checkShowOffList(param.exData1["showOff"]);
        this.tabBtn.selectedIndex = param ? param.exData2 : 1;
        this.initChatMsg();
    };
    ChatWin.prototype.close = function (param) {
        _super.prototype.close.call(this);
        GameCache.chat.showOffList = [];
        this.inputText.text = "";
    };
    ChatWin.prototype.changeState = function () {
        this.currentState = this.tabBtn.selectedIndex == 0 ? "sys" : "nor";
        this.chatLab.itemRenderer = this.tabBtn.selectedIndex == 0 ? ChatSysItem : MsgItem;
    };
    ChatWin.prototype.checkShowOffList = function (str) {
        this.inputText.text += str;
    };
    ChatWin.prototype.openEmoji = function () {
        // if (!this.emojiPart) {
        //     this.emojiPart = ObjectPool.get(EmojiPart);
        //     this.emojiPart.data = { func: this.emojiClick, thisc: this };
        //     this.emojiPart.x = 122;
        //     this.emojiPart.y = 168;
        //     this.addChild(this.emojiPart);
        // } else {
        //     this.emojiPart.visible = !this.emojiPart.visible;
        // }
        if (App.ViewManager.isShow(ViewConst.EMOJI)) {
            App.ViewManager.close(ViewConst.EMOJI);
        }
        else {
            var view = new ViewProp();
            view.exData1 = {};
            view.exData1['func'] = this.emojiClick;
            view.exData1['thisc'] = this;
            App.ViewManager.open(ViewConst.EMOJI, view);
        }
    };
    ChatWin.prototype.emojiClick = function (arg) {
        var img = StringUtils.substitute(Language.lang.chat_0, arg);
        this.inputText.text += "[" + img + "]";
    };
    ChatWin.prototype.sendText = function () {
        if (ChatMgr.chechIsGMMsg(this.inputText.text)) {
            return;
        }
        var sendT = GameCache.chat.createServerText(this.inputText.text);
        var tar = this.tabBtn.selectedIndex;
        if (tar == ChatType.SYSTEM)
            return;
        Proxy.chat.sendChatMessage(tar, sendT);
        this.inputText.text = null;
    };
    ChatWin.prototype.initChatMsg = function () {
        this.changeState();
        var tar = this.tabBtn.selectedIndex;
        var chatArr;
        if (tar == 0) {
            chatArr = GameCache.chat.sysInfo.concat();
        }
        else {
            chatArr = GameCache.chat.chatData[tar] ? GameCache.chat.chatData[tar].concat() : [];
        }
        this.toggle = true;
        this.setListData(this.chatLab, chatArr);
        this.chatLab.validateNow();
        this.autoScroll(true);
    };
    ChatWin.prototype.addChatMsg = function (msg) {
        if (msg.channelId != this.tabBtn.selectedIndex)
            return;
        this.toggle = true;
        this.chatLab.dataProvider['addItem'](msg);
        this.chatLab.validateNow();
        this.autoScroll();
    };
    ChatWin.prototype.addSysChatMsg = function (msg) {
        if (ChatType.SYSTEM != this.tabBtn.selectedIndex)
            return;
        this.toggle = true;
        this.chatLab.dataProvider['addItem'](msg);
        this.chatLab.validateNow();
        this.autoScroll();
    };
    ChatWin.prototype.autoScroll = function (force) {
        if (force === void 0) { force = false; }
        var contains = this.sc.viewport;
        var delta = contains.contentHeight - contains.height;
        delta = delta < 0 ? 0 : delta + 6;
        if (force || (delta - contains.scrollV < 130 && delta > 0)) {
            contains.scrollV = delta;
        }
    };
    return ChatWin;
}(BaseEuiWindow));
__reflect(ChatWin.prototype, "ChatWin");
//# sourceMappingURL=ChatWin.js.map