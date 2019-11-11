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
 * @Description: 邮件数据
 * @Author: guolinsen
 * @Date: 2019-09-16 19:09:19
 */
var EmailCache = (function (_super) {
    __extends(EmailCache, _super);
    function EmailCache() {
        var _this = _super.call(this) || this;
        _this.list = [];
        _this.dic = {};
        return _this;
    }
    EmailCache.prototype.clear = function () {
        this.list.length = 0;
        this.dic = {};
    };
    /**
   * 根据Email日期降序
   * @param src
   * @param tar
   * @return
   *
   */
    EmailCache.prototype.onEmailDate = function (src, tar) {
        var r1 = (src.emailState == EmailInfo.STATE_READ && !src.attachmentLength) || (src.emailState == EmailInfo.STATE_READ_PRIZE);
        var r2 = (tar.emailState == EmailInfo.STATE_READ && !tar.attachmentLength) || (tar.emailState == EmailInfo.STATE_READ_PRIZE);
        if (r1 && !r2) {
            return 1;
        }
        if (!r1 && r2) {
            return -1;
        }
        if (src.emailTime < tar.emailTime) {
            return 1;
        }
        else if (src.emailTime > tar.emailTime) {
            return -1;
        }
        return 0;
    };
    EmailCache.prototype.updateState = function (id, state) {
        if (this.dic[id]) {
            this.dic[id].emailState = state;
        }
        else {
            console.log("无法查询到邮件", id);
        }
    };
    EmailCache.prototype.deleteEmail = function (id) {
        if (this.dic[id]) {
            delete this.dic[id];
        }
        var i = 0;
        var a = this.list.length;
        for (; i < a; i++) {
            if (this.list[i].emailId == id) {
                this.list.splice(i, 1);
                break;
            }
        }
    };
    EmailCache.prototype.setEmailInfo = function (id, bytes) {
        if (this.dic[id]) {
            this.dic[id].updateInfo(bytes);
        }
        else {
            console.log("无法查询到邮件", id);
        }
    };
    return EmailCache;
}(BaseCache));
__reflect(EmailCache.prototype, "EmailCache");
//# sourceMappingURL=EmailCache.js.map