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
 * @Description: 系统信息条目
 * @Author: xiejunwei
 * @Date: 2019-10-09 21:25:33
 */
var ChatSysItem = (function (_super) {
    __extends(ChatSysItem, _super);
    function ChatSysItem() {
        var _this = _super.call(this) || this;
        _this.skinName = "ChatSysItemSkin";
        return _this;
    }
    ChatSysItem.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.addEvent(egret.TextEvent.LINK, this.chatLab, this.onLink);
    };
    ChatSysItem.prototype.onLink = function (e) {
        var text = e.text;
        TextFlowUtils.hrefType(text);
    };
    ChatSysItem.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        //GameCache.chat.getSysMessage(this.chatLab);
        var message = this.data;
        this.chatLab.textFlow = TextFlowUtils.generateTextFlow(message);
        TextFlowUtils.generateEmoji(this.chatLab, this.g, true);
    };
    ChatSysItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return ChatSysItem;
}(BaseCustComponent));
__reflect(ChatSysItem.prototype, "ChatSysItem");
//# sourceMappingURL=ChatSysItem.js.map