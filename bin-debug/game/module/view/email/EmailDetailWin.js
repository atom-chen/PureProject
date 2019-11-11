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
 * @Description: 单个邮件详情
 * @Author: guolinsen
 * @Date: 2019-09-18 13:52:18
 */
var EmailDetailWin = (function (_super) {
    __extends(EmailDetailWin, _super);
    function EmailDetailWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "EmailDetailWinSkin";
        return _this;
    }
    EmailDetailWin.prototype.init = function () {
        _super.prototype.init.call(this);
        this.setWinTitle("email");
    };
    EmailDetailWin.prototype.open = function (param) {
        _super.prototype.open.call(this, param);
        this.id = param.exData1;
        this.addTouchEvent(this.deleteBtn, this.onDelete);
        this.addTouchEvent(this.getBtn, this.onGet);
        this.message(MsgConst.EMAIL_UPDATE, this.update);
        this.message(MsgConst.EMAIL_REFRESH, this.update);
        this.update();
    };
    EmailDetailWin.prototype.dispose = function () {
        this.itemList.dispose();
        _super.prototype.dispose.call(this);
    };
    EmailDetailWin.prototype.update = function () {
        var info = GameCache.email.dic[this.id];
        if (!info) {
            this.closeView();
            return;
        }
        if (!info.content) {
            Proxy.email.sendGetContent(this.id);
        }
        else {
            this.contentTx.textFlow = TextFlowUtils.generateTextFlow(info.content);
        }
        this.titleTx.text = StringUtils.substitute(Language.lang.email_title, info.title);
        this.setAward(info.itemArray);
        this.getFlag.visible = false;
        var canGet = false;
        if (info.attachmentLength) {
            this.getFlag.visible = info.emailState == EmailInfo.STATE_READ_PRIZE;
            canGet = !this.getFlag.visible;
        }
        this.getBtn.filters = canGet ? null : FilterUtils.DefaultGrayFilters;
    };
    EmailDetailWin.prototype.setAward = function (list) {
        //list = [list[0], list[0], list[0], list[0], list[0]]
        if (list && list.length > 0) {
            if (!this.itemList) {
                this.itemList = ObjectPool.get(ItemList);
            }
            this.itemList.setData(list, this.iG);
            this.iG.visible = true;
        }
        else {
            this.iG.visible = false;
        }
    };
    EmailDetailWin.prototype.onDelete = function () {
        Proxy.email.sendDelete(this.id);
    };
    EmailDetailWin.prototype.onGet = function () {
        Proxy.email.sendPrize(this.id);
    };
    return EmailDetailWin;
}(BaseEuiWindow));
__reflect(EmailDetailWin.prototype, "EmailDetailWin");
//# sourceMappingURL=EmailDetailWin.js.map