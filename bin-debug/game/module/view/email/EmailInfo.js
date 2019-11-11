var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/*
 * @Description: 单个邮件数据
 * @Author: guolinsen
 * @Date: 2019-09-16 19:15:48
 */
var EmailInfo = (function () {
    function EmailInfo(bytes) {
        if (bytes === void 0) { bytes = null; }
        /**物品集合*/
        this.itemArray = [];
        if (bytes) {
            this.emailId = bytes.readDouble();
            this.emailState = bytes.readUnsignedByte();
            this.emailTime = GlobalFun.formatMiniDateTime(bytes.readUnsignedInt()) / 1000;
            this.endTime = bytes.readUnsignedInt();
            this.attachmentLength = bytes.readUnsignedByte();
            //this.sendRole = bytes.readCustomBytes();
            this.title = bytes.readCustomBytes();
        }
    }
    EmailInfo.prototype.updateInfo = function (bytes) {
        this.emailState = bytes.readByte();
        this.content = bytes.readCustomBytes();
        this.attachmentLength = bytes.readUnsignedByte();
        if (this.attachmentLength != 0) {
            for (var i = 0; i < this.attachmentLength; i++) {
                var emailItem = new EmailAttachmentItem();
                emailItem.type = bytes.readByte();
                emailItem.id = bytes.readUnsignedShort();
                emailItem.bind = bytes.readByte();
                emailItem.count = bytes.readUnsignedInt();
                emailItem.strong = bytes.readByte();
                emailItem.quality = bytes.readByte();
                this.itemArray.push(emailItem);
            }
        }
    };
    EmailInfo.STATE_NOREAD = 0; //未读
    EmailInfo.STATE_READ = 1; //已读
    EmailInfo.STATE_READ_PRIZE = 2; //已读已领取
    return EmailInfo;
}());
__reflect(EmailInfo.prototype, "EmailInfo");
var EmailAttachmentItem = (function () {
    function EmailAttachmentItem() {
    }
    return EmailAttachmentItem;
}());
__reflect(EmailAttachmentItem.prototype, "EmailAttachmentItem");
//# sourceMappingURL=EmailInfo.js.map