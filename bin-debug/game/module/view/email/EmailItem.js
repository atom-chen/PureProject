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
var EmailItem = (function (_super) {
    __extends(EmailItem, _super);
    function EmailItem() {
        var _this = _super.call(this) || this;
        _this.touchChildren = false;
        return _this;
    }
    //用于子类继承
    EmailItem.prototype.init = function () {
        this.addTouchEvent(this, this.onTouch);
        //App.MessageCenter.addListener(MsgConst.EMAIL_UPDATE, this.refresh, this);
    };
    EmailItem.prototype.onTouch = function () {
        var pro = new ViewProp();
        pro.exData1 = this.data.emailId;
        App.ViewManager.open(ViewConst.EMAIL_DETAIL, pro);
    };
    EmailItem.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        this.refresh();
    };
    EmailItem.prototype.refresh = function () {
        var data = this.data;
        this.titleTx.text = data.title;
        this.timeTx.text = App.DateUtils.getFormatBySecond(data.emailTime, DateUtils.TIME_FORMAT_15);
        if (data.attachmentLength > 0) {
            this.getFlag.visible = data.emailState == EmailInfo.STATE_READ_PRIZE;
            this.fujianFlag.visible = !this.getFlag.visible;
        }
        else {
            this.getFlag.visible = false;
            this.fujianFlag.visible = false;
        }
        this.stateImg.source = "email_json.email_" + (data.emailState == EmailInfo.STATE_NOREAD ? "close" : "open") + "_png";
    };
    return EmailItem;
}(BaseCustComponent));
__reflect(EmailItem.prototype, "EmailItem");
//# sourceMappingURL=EmailItem.js.map