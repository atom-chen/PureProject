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
var EmailPanel = (function (_super) {
    __extends(EmailPanel, _super);
    function EmailPanel() {
        var _this = _super.call(this) || this;
        _this.skinName = "EmailWinSkin";
        return _this;
    }
    EmailPanel.prototype.init = function () {
        _super.prototype.init.call(this);
        this.list.itemRenderer = EmailItem;
    };
    EmailPanel.prototype.open = function () {
        _super.prototype.open.call(this);
        this.addTouchEvent(this.deleteBtn, this.onDelete);
        this.addTouchEvent(this.getBtn, this.onGet);
        this.message(MsgConst.EMAIL_REFRESH, this.onRefresh);
        this.message(MsgConst.EMAIL_UPDATE, this.onRefresh);
        this.onRefresh();
    };
    EmailPanel.prototype.onRefresh = function () {
        var data = GameCache.email.list;
        this.setListData(this.list, data);
        data.sort(GameCache.email.onEmailDate);
        var dp = this.list.dataProvider;
        dp ? dp.replaceAll(data) : this.list.dataProvider = new eui.ArrayCollection(data);
        this.countTx.text = data.length + "/" + GameConfig.globalConfig.nMailMaxCount;
    };
    EmailPanel.prototype.onDelete = function () {
        Proxy.email.sendDelete(0);
    };
    EmailPanel.prototype.onGet = function () {
        Proxy.email.sendPrize(0);
    };
    return EmailPanel;
}(BaseSpriteView));
__reflect(EmailPanel.prototype, "EmailPanel");
//# sourceMappingURL=EmailPanel.js.map