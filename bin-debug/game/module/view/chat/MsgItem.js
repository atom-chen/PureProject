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
 * @Description: 聊天条目
 * @Author: xiejunwei
 * @Date: 2019-09-30 17:32:23
 */
var MsgItem = (function (_super) {
    __extends(MsgItem, _super);
    function MsgItem() {
        return _super.call(this) || this;
    }
    MsgItem.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        // this.addEvent(egret.TextEvent.LINK, this.t0, this.onLink);
    };
    MsgItem.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (!this.data.message)
            return;
        // this.removeEventListener(egret.TextEvent.LINK, this.onLink, this.t0,true);
        // this.addEvent(egret.TextEvent.LINK, this.t0, this.onLink);
        this.t0.removeEventListener(egret.TextEvent.LINK, this.onLink, this);
        this.t0.addEventListener(egret.TextEvent.LINK, this.onLink, this);
        this.skinName = this.data.playerId == GameCache.hero.mainPro.pro(PropId.AP_ACTOR_ID) ? "MsgItem2Skin" : "MsgItemSkin";
        this.roleName.text = this.data.playerName;
        this.icon.source = GlobalFun.getRoleIcon(this.data.job, this.data.sexual); //RES_DIR_ROLE_ICON + "role_" + this.data.job + this.data.sexual + ".png";
        this.lvl.text = this.data.lvl;
        var vipLvl = !this.data.viplvl ? 0 : this.data.viplvl;
        this.vip.source = "chat_json.chat_vip_" + vipLvl + "_png";
        this.t0.textFlow = TextFlowUtils.generateTextFlow(this.data.message);
        App.FrameHandler.add(this.printEmoji, this, true);
    };
    MsgItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.t0.removeEventListener(egret.TextEvent.LINK, this.onLink, this);
    };
    MsgItem.prototype.printEmoji = function () {
        TextFlowUtils.generateEmoji(this.t0, this.g, true);
    };
    MsgItem.prototype.onLink = function (e) {
        var text = e.text;
        TextFlowUtils.hrefType(text);
    };
    return MsgItem;
}(BaseCustComponent));
__reflect(MsgItem.prototype, "MsgItem");
//# sourceMappingURL=MsgItem.js.map