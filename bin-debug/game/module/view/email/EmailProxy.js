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
 * @Description: 邮件系统
 * @Author: guolinsen
 * @Date: 2019-09-16 19:08:30
 */
var EmailProxy = (function (_super) {
    __extends(EmailProxy, _super);
    function EmailProxy() {
        var _this = _super.call(this, PacketTypes.NEW_EAMIL) || this;
        _this.regNetMsg(1, _this.doInit);
        _this.regNetMsg(2, _this.doTakePrize);
        _this.regNetMsg(3, _this.doDelete);
        _this.regNetMsg(4, _this.doEmailInfo);
        _this.regNetMsg(5, _this.doNewEmail);
        return _this;
    }
    EmailProxy.prototype.doInit = function (bytes) {
        var cache = GameCache.email;
        var flag = bytes.readByte();
        var emailArray = flag ? cache.list : [];
        (!flag) && (cache.dic = {});
        var count = bytes.readUnsignedShort();
        var emailInfo;
        for (var i = 0; i < count; i++) {
            emailInfo = new EmailInfo(bytes);
            emailArray.push(emailInfo);
            cache.dic[emailInfo.emailId] = emailInfo;
        }
        cache.list = emailArray;
        App.MessageCenter.dispatch(MsgConst.EMAIL_REFRESH);
    };
    EmailProxy.prototype.doTakePrize = function (bytes) {
        var count = bytes.readUnsignedShort();
        for (var i = 0; i < count; i++) {
            var id = bytes.readDouble();
            // let state = bytes.readByte();//状态(0:成功 1:背包太满无法领取2:邮件不存在 3:邮件无附件无法被领取)
            // if (!state) {
            // 	GlobalFun.SysMsg(Language.lang["email_read_error" + state])
            // 	continue;
            // }
            GameCache.email.updateState(id, EmailInfo.STATE_READ_PRIZE);
        }
        App.MessageCenter.dispatch(MsgConst.EMAIL_UPDATE);
    };
    EmailProxy.prototype.doDelete = function (bytes) {
        var count = bytes.readUnsignedShort();
        for (var i = 0; i < count; i++) {
            var id = bytes.readDouble();
            // let state = bytes.readByte();//状态(0:成功 1:背包太满无法领取2:邮件不存在 3:邮件无附件无法被领取)
            // if (!state) {
            // 	GlobalFun.SysMsg(Language.lang["email_delete_error" + state])
            // 	continue;
            // }
            GameCache.email.deleteEmail(id);
        }
        App.MessageCenter.dispatch(MsgConst.EMAIL_REFRESH);
    };
    EmailProxy.prototype.doEmailInfo = function (bytes) {
        var id = bytes.readDouble();
        GameCache.email.setEmailInfo(id, bytes);
        App.MessageCenter.dispatch(MsgConst.EMAIL_UPDATE);
    };
    EmailProxy.prototype.doNewEmail = function (bytes) {
        var emailInfo = new EmailInfo(bytes);
        GameCache.email.list.push(emailInfo); //把新邮件添加到数组
        GameCache.email.dic[emailInfo.emailId] = emailInfo;
        App.MessageCenter.dispatch(MsgConst.EMAIL_REFRESH);
    };
    //邮件ID(为0则表示一键领取)
    EmailProxy.prototype.sendPrize = function (id) {
        if (id === void 0) { id = 0; }
        var bytes = this.getBytes(1);
        bytes.writeDouble(id);
        this.sendToServer(bytes);
    };
    //邮件ID(为0则表示一键删除)
    EmailProxy.prototype.sendDelete = function (id) {
        if (id === void 0) { id = 0; }
        var bytes = this.getBytes(2);
        bytes.writeDouble(id);
        this.sendToServer(bytes);
    };
    EmailProxy.prototype.sendGetContent = function (id) {
        var bytes = this.getBytes(3);
        bytes.writeDouble(id);
        this.sendToServer(bytes);
    };
    return EmailProxy;
}(BaseProxy));
__reflect(EmailProxy.prototype, "EmailProxy");
//# sourceMappingURL=EmailProxy.js.map