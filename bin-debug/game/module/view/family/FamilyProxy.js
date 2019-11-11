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
var FamilyProxy = (function (_super) {
    __extends(FamilyProxy, _super);
    function FamilyProxy() {
        var _this = _super.call(this, PacketTypes.FAMILY) || this;
        _this.regNetMsg(1, _this.updateFamilyInfo);
        _this.regNetMsg(2, _this.updateFamilyMemInfo);
        _this.regNetMsg(3, _this.updateFamilyList);
        _this.regNetMsg(6, _this.dismissFamilyRes);
        _this.regNetMsg(11, _this.updateApplyList);
        _this.regNetMsg(13, _this.kickMemberRes);
        _this.regNetMsg(18, _this.setLimitRes);
        _this.regNetMsg(20, _this.onFamilyInfoNew);
        _this.regNetMsg(21, _this.onFamilyListNew);
        _this.regNetMsg(22, _this.onFamilyApplyNew);
        _this.regNetMsg(23, _this.quitFamilyRes);
        return _this;
    }
    /**
     * 请求家族信息
     * @returns void
     */
    FamilyProxy.prototype.familyInfoReq = function () {
        this.sendMsgId(1);
    };
    /**
     * 更新家族信息
     * @param  {GameByteArray} bytes
     * @returns void
     */
    FamilyProxy.prototype.updateFamilyInfo = function (bytes) {
        // 1 无家族 0 有家族	
        var isInFamily = bytes.readUnsignedByte();
        GameCache.family.isInFamily = isInFamily === 0;
        if (isInFamily === 1) {
            GameCache.family.fInfo = null;
            return;
        }
        var fInfo = {};
        fInfo.position = bytes.readUnsignedByte();
        fInfo.fName = bytes.readCustomBytes();
        fInfo.fLv = bytes.readUnsignedByte();
        fInfo.lId = bytes.readInt();
        fInfo.lName = bytes.readCustomBytes();
        fInfo.notice = bytes.readCustomBytes();
        fInfo.memNum = bytes.readInt();
        fInfo.fund = bytes.readInt();
        fInfo.fScore = bytes.readInt();
        fInfo.devote = bytes.readInt();
        fInfo.devoteTotal = bytes.readInt();
        // 更新家族信息
        GameCache.family.fInfo = fInfo;
        GameCache.family.isAuto = bytes.readUnsignedByte() === 1;
        GameCache.family.limitId = bytes.readUnsignedByte();
        GameCache.hero.focusPlayer.title.setFamilyName(fInfo.fName);
        App.MessageCenter.dispatch(MsgConst.FAMILY_INFO_UPDATE);
    };
    /**
     * 请求家族成员信息列表
     * @returns void
     */
    FamilyProxy.prototype.familyMemInfoReq = function () {
        this.sendMsgId(2);
    };
    /**
     * 更新成员信息
     * @param  {GameByteArray} bytes
     * @returns void
     */
    FamilyProxy.prototype.updateFamilyMemInfo = function (bytes) {
        var len = bytes.readInt();
        var memList = [];
        for (var i = 0; i < len; i++) {
            var memInfo = {};
            memInfo.memId = bytes.readInt();
            memInfo.sex = bytes.readByte();
            memInfo.lv = bytes.readByte();
            memInfo.job = bytes.readByte();
            memInfo.position = bytes.readByte();
            memInfo.state = bytes.readByte();
            memInfo.lastLogin = GlobalFun.formatMiniDateTime(bytes.readInt());
            memInfo.memName = bytes.readCustomBytes();
            memInfo.score = bytes.readInt();
            memInfo.devote = bytes.readInt();
            memInfo.devoteTotal = bytes.readInt();
            memList.push(memInfo);
        }
        GameCache.family.mList = memList;
        App.MessageCenter.dispatch(MsgConst.FAMILY_MEM_UPDATE);
    };
    /**
     * 请求家族列表
     * @returns void
     */
    FamilyProxy.prototype.familyListReq = function () {
        this.sendMsgId(3);
    };
    /**
     * 更新家族列表
     * @param  {GameByteArray} bytes
     * @returns void
     */
    FamilyProxy.prototype.updateFamilyList = function (bytes) {
        var len = bytes.readUnsignedShort();
        var fList = [];
        for (var i = 0; i < len; i++) {
            var fInfo = {};
            fInfo.fId = bytes.readInt();
            fInfo.memNum = bytes.readInt();
            fInfo.memMax = bytes.readInt();
            fInfo.fName = bytes.readCustomBytes();
            fInfo.leadName = bytes.readCustomBytes();
            fInfo.fLv = bytes.readByte();
            fInfo.fScore = bytes.readInt();
            fInfo.limitId = bytes.readInt();
            fList.push(fInfo);
        }
        GameCache.family.fList = fList;
        App.MessageCenter.dispatch(MsgConst.FAMILY_LIST_UPDATE);
    };
    /**
     * 请求申请列表
     * @returns void
     */
    FamilyProxy.prototype.applyListReq = function () {
        this.sendMsgId(11);
    };
    /**
     * 更新申请列表
     * @param  {GameByteArray} bytes
     * @returns void
     */
    FamilyProxy.prototype.updateApplyList = function (bytes) {
        var len = bytes.readInt();
        var applyList = [];
        for (var i = 0; i < len; i++) {
            var apply = {};
            apply.aid = bytes.readInt();
            apply.sex = bytes.readByte();
            apply.job = bytes.readByte();
            apply.lv = bytes.readInt();
            apply.name = bytes.readCustomBytes();
            apply.score = bytes.readInt();
            applyList.push(apply);
        }
        GameCache.family.applyList = applyList;
        App.MessageCenter.dispatch(MsgConst.FAMILY_APPLY_UPDATE);
    };
    /**
     * 创建公会
     * @param  {string} name
     * @returns void
     */
    FamilyProxy.prototype.createFamilyReq = function (name) {
        var bytes = this.getBytes(5);
        bytes.writeString(name);
        this.sendToServer(bytes);
    };
    /**
     * 解散
     * @returns void
     */
    FamilyProxy.prototype.dismissFamilyReq = function () {
        this.sendMsgId(6);
    };
    /**
     * 解散返回
     * @param  {GameByteArray} bytes
     * @returns void
     */
    FamilyProxy.prototype.dismissFamilyRes = function (bytes) {
        GameCache.family.dismiss();
        this.familyInfoReq();
        App.ViewManager.close(ViewConst.FAMILY);
    };
    /**
     * 申请加入家族
     * @param  {number} fid
     * @returns void
     */
    FamilyProxy.prototype.familyApplyReq = function (fid) {
        var bytes = this.getBytes(10);
        bytes.writeInt(fid);
        this.sendToServer(bytes);
    };
    /**
     * 设置家族公告
     * @param  {string} note
     * @returns void
     */
    FamilyProxy.prototype.sendFamilyNotice = function (note) {
        var bytes = this.getBytes(17);
        bytes.writeString(note);
        this.sendToServer(bytes);
    };
    /**
     * 设置是否自动通过家族申请
     * @param  {number} isAuto 0：取消直接加入 1：设置直接加入
     * @returns void
     */
    FamilyProxy.prototype.setLimit = function (isAuto, limitId) {
        var bytes = this.getBytes(18);
        bytes.writeByte(isAuto);
        bytes.writeByte(limitId);
        this.sendToServer(bytes);
    };
    /**
     * 设置自动通过家族申请返回
     * @param  {GameByteArray} bytes
     * @returns void
     */
    FamilyProxy.prototype.setLimitRes = function (bytes) {
        GameCache.family.isAuto = bytes.readByte() === 1;
        GameCache.family.limitId = bytes.readUnsignedByte();
    };
    /**
     * 家族信息有新内容
     * @param  {GameByteArray} bytes
     * @returns void
     */
    FamilyProxy.prototype.onFamilyInfoNew = function (bytes) {
        this.familyInfoReq();
    };
    /**
     * 家族列表有新内容
     * @param  {GameByteArray} bytes
     * @returns void
     */
    FamilyProxy.prototype.onFamilyListNew = function (bytes) {
        this.familyListReq();
    };
    /**
     * 家族申请列表有新内容
     * @param  {GameByteArray} bytes
     * @returns void
     */
    FamilyProxy.prototype.onFamilyApplyNew = function (bytes) {
        this.applyListReq();
    };
    FamilyProxy.prototype.quitFamilyReq = function () {
        this.sendMsgId(16);
    };
    FamilyProxy.prototype.quitFamilyRes = function (bytes) {
        // 0加入家族 1退出家族
        var opt = bytes.readUnsignedByte();
        GameCache.family.isInFamily = opt === 0;
        if (opt === 1) {
            GlobalFun.SysMsg(Language.lang.familyQuitMsg);
            GameCache.family.fInfo = null;
            App.ViewManager.close(ViewConst.FAMILY);
        }
        if (opt === 0) {
            App.ViewManager.close(ViewConst.FAMILY_LIST);
            GlobalFun.SysMsg(Language.lang.familyEnterMsg);
        }
    };
    /**
     *
     * @param  {boolean} agree
     * @param  {number} aId
     * @returns void
     */
    FamilyProxy.prototype.familyApplyResponse = function (agree, aId) {
        var bytes = this.getBytes(12);
        bytes.writeInt(aId);
        bytes.writeByte(agree ? 1 : 0);
        this.sendToServer(bytes);
    };
    /**
     * 踢出
     * @param  {number} memId
     * @returns void
     */
    FamilyProxy.prototype.kickMember = function (memId) {
        var bytes = this.getBytes(13);
        bytes.writeInt(memId);
        this.sendToServer(bytes);
    };
    /**
     * @param  {GameByteArray} bytes
     * @returns void
     */
    FamilyProxy.prototype.kickMemberRes = function (bytes) {
        var state = bytes.readUnsignedByte();
        if (state === 1) {
            this.familyMemInfoReq();
        }
    };
    FamilyProxy.prototype.familyPromoteReq = function () {
    };
    FamilyProxy.prototype.familyDemote = function () {
    };
    return FamilyProxy;
}(BaseProxy));
__reflect(FamilyProxy.prototype, "FamilyProxy");
//# sourceMappingURL=FamilyProxy.js.map