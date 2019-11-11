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
 * @Description: 杂项脚本协议
 * @Author: xiejunwei
 * @Date: 2019-08-01 15:44:05
 * @LastEditTime: 2019-10-21 15:42:26
 */
var ScriptProxy = (function (_super) {
    __extends(ScriptProxy, _super);
    function ScriptProxy() {
        var _this = _super.call(this, PacketTypes.SCRIPT) || this;
        _this.regNetMsg(13, _this.doRankData);
        _this.regNetMsg(1, _this.doRevive);
        _this.regNetMsg(26, _this.doRankInfo);
        _this.regNetMsg(3, _this.doInitXSYh); //限时优惠信息
        _this.regNetMsg(2, _this.doXSYHBuyDone); //限时优惠购买成功
        _this.regNetMsg(4, _this.doInitXSLB); //限时礼包信息
        _this.regNetMsg(5, _this.doXSLBBuyDone); //限时礼包购买
        return _this;
        // this.regNetMsg(27, this.doRankSelf);
    }
    ScriptProxy.prototype.doRankData = function (bytes) {
    };
    /**复活消息 */
    ScriptProxy.prototype.doRevive = function (bytes) {
        var bOpen = bytes.readByte(); /**是否打开界面 */
        var time = bytes.readUnsignedInt(); /**复活时间 */
        var count = bytes.readByte();
        var roleList = [];
        for (var i = 0; i < count; i++) {
            var obj = { job: 0, sex: 0 };
            obj.job = bytes.readByte();
            obj.sex = bytes.readByte();
            roleList.push(obj);
        }
        /**记录复活数据 */
        GameCache.revive.leftTime = time;
        GameCache.revive.reveiveList = roleList;
        if (bOpen) {
            /**性别需要后期加进去的 */
            var viewData = new ViewProp();
            viewData.exData1 = roleList;
            viewData.exData2 = time;
            App.ViewManager.open(ViewConst.REVIVE, viewData);
        }
    };
    ScriptProxy.prototype.doRankInfo = function (bytes) {
        var bossid = bytes.readUnsignedShort();
        var len = bytes.readUnsignedShort();
        var arr = [];
        for (var i = 0; i < len; i++) {
            var rank = bytes.readUnsignedShort();
            var roleId = bytes.readUnsignedInt();
            var roleName = bytes.readCustomBytes();
            var value = bytes.readUnsignedInt();
            var obj = {
                bossid: bossid,
                rank: rank + 1,
                roleId: roleId,
                roleName: roleName,
                value: value
            };
            arr.push(obj);
        }
        var myRank = bytes.readShort() + 1;
        var myValue = bytes.readUnsignedInt();
        App.MessageCenter.dispatch(MsgConst.BOSS_RANK_INFO, [arr, myRank, myValue]);
    };
    ScriptProxy.prototype.doRankSelf = function (bytes) {
        var bossId = bytes.readUnsignedShort();
        var roleId = bytes.readUnsignedInt();
        var rank = bytes.readShort();
        var value = bytes.readUnsignedInt();
        var obj = {
            bossid: bossId,
            rank: rank + 1,
            roleId: roleId,
            value: value,
            roleName: GameCache.hero.mainPro.charName
        };
        App.MessageCenter.dispatch(MsgConst.BOSS_MYRANK, obj);
    };
    //限时优惠初始化
    ScriptProxy.prototype.doInitXSYh = function (bytes) {
        var day = bytes.readInt(); //开服天数
        var len = bytes.readUnsignedShort();
        var arr = {};
        for (var i = 0; i < len; i++) {
            var idx = bytes.readUnsignedShort();
            var count = bytes.readByte();
            arr[idx] = count;
        }
        GameCache.activity.xsyhData[day] = arr;
        GameCache.activity.serverOpen = day;
        App.MessageCenter.dispatch(MsgConst.XSYH_INFO);
    };
    //限时优惠购买信息
    ScriptProxy.prototype.doXSYHBuyDone = function (bytes) {
        var idx = bytes.readUnsignedShort();
        GameCache.activity.XSYHBough(idx);
        App.MessageCenter.dispatch(MsgConst.XSYH_BUY_SUCCESS, idx);
    };
    //限时礼包初始化
    ScriptProxy.prototype.doInitXSLB = function (bytes) {
        var day = bytes.readInt();
        var len = bytes.readUnsignedShort();
        var arr = {};
        for (var i = 0; i < len; i++) {
            var idx = bytes.readUnsignedShort();
            var count = bytes.readByte();
            arr[idx] = count;
        }
        GameCache.activity.xslbData[day] = arr;
        GameCache.activity.serverOpen = day;
        App.MessageCenter.dispatch(MsgConst.XSYH_INFO);
    };
    //限时礼包购买信息
    ScriptProxy.prototype.doXSLBBuyDone = function (bytes) {
        var idx = bytes.readUnsignedShort();
        GameCache.activity.XSLBBough(idx);
        App.MessageCenter.dispatch(MsgConst.XSYH_BUY_SUCCESS, idx);
    };
    /////////////////////////////////////////////////////////////////////////////////
    /**
     * 发送复活消息
     * @param type 1为原地复活，2为安全区复活
     */
    ScriptProxy.prototype.sendRevive = function (type) {
        var byte = this.getBytes(1);
        byte.writeByte(type);
        this.sendToServer(byte);
    };
    /**
     * 限时优惠购买
     * @param idx 索引
     */
    ScriptProxy.prototype.sendXSYHBuy = function (idx) {
        var byte = this.getBytes(2);
        byte.writeUnsignedShort(idx);
        this.sendToServer(byte);
    };
    /**
     * 限时礼包购买
     * @param idx 索引
     */
    ScriptProxy.prototype.sendXSLBBuy = function (idx) {
        var byte = this.getBytes(3);
        byte.writeUnsignedShort(idx);
        this.sendToServer(byte);
    };
    return ScriptProxy;
}(BaseProxy));
__reflect(ScriptProxy.prototype, "ScriptProxy");
//# sourceMappingURL=ScriptProxy.js.map