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
 * @Description: 邮件UI
 * @Author: guolinsen
 * @Date: 2019-09-16 19:09:48
 */
var EmailWin = (function (_super) {
    __extends(EmailWin, _super);
    function EmailWin() {
        return _super.call(this) || this;
    }
    EmailWin.red = function () {
        var cache = GameCache.email;
        var list = cache.list;
        if (list) {
            var i = 0;
            var a = list.length;
            for (; i < a; i++) {
                var email = list[i];
                if (email.emailState == EmailInfo.STATE_NOREAD) {
                    return true;
                }
                if (email.attachmentLength && email.emailState != EmailInfo.STATE_READ_PRIZE) {
                    return true;
                }
            }
        }
        return false;
    };
    /**需要刷新是红点消息列表 */
    EmailWin.changeMsg = function () {
        return [MsgConst.EMAIL_REFRESH, MsgConst.EMAIL_UPDATE];
    };
    EmailWin.prototype.init = function () {
        _super.prototype.init.call(this);
        this.setWinTitle("email");
        var classArr = [EmailPanel];
        var listData = [];
        for (var i = 0; i < classArr.length; i++) {
            var obj = {};
            obj['icon'] = "apEmail_json.apEmail_u_" + i + "_png";
            obj['icon2'] = "apEmail_json.apEmail_" + i + "_png";
            listData.push(obj);
        }
        this.setViewData(listData, classArr);
    };
    return EmailWin;
}(CommunalPageWin));
__reflect(EmailWin.prototype, "EmailWin");
//# sourceMappingURL=EmailWin.js.map