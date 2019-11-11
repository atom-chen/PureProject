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
 * @Description: 宝石协议
 * @Author: xiejunwei
 * @Date: 2019-09-10 17:19:19
 * @LastEditTime: 2019-09-11 21:41:01
 */
var JewelProxy = (function (_super) {
    __extends(JewelProxy, _super);
    function JewelProxy() {
        var _this = _super.call(this, PacketTypes.JEWEL) || this;
        _this.regNetMsg(1, _this.doInitJewelBag); //初始化宝石背包
        _this.regNetMsg(2, _this.doRoleJewelList); //初始化人物宝石列表
        _this.regNetMsg(3, _this.doAddJewel); //宝石背包添加
        _this.regNetMsg(4, _this.doDeleteJewel); //宝石背包删除
        _this.regNetMsg(5, _this.doJewelOption); //宝石数据操作
        return _this;
    }
    JewelProxy.prototype.doInitJewelBag = function (bytes) {
        var len = bytes.readUnsignedShort();
        for (var i = 0; i < len; i++) {
            var id = bytes.readInt();
            GameCache.jewel.initJewelBag(id);
        }
        App.MessageCenter.dispatch(MsgConst.JEWEL_BAG);
    };
    JewelProxy.prototype.doRoleJewelList = function (bytes) {
        var roleId = GameCache.hero.transIdFromeServer(bytes.readInt());
        var len = bytes.readByte();
        var arr = {};
        for (var i = 0; i < len; i++) {
            var obj = {};
            obj["part"] = bytes.readByte();
            obj["id"] = bytes.readInt();
            obj["lvl"] = bytes.readUnsignedShort();
            arr[obj["part"]] = obj;
        }
        GameCache.jewel.roleJewelList[roleId] = arr;
        App.MessageCenter.dispatch(MsgConst.JEWEL_LIST);
    };
    JewelProxy.prototype.doAddJewel = function (bytes) {
        var id = bytes.readInt();
        GameCache.jewel.initJewelBag(id);
        var item = GameConfig.item[id];
        var mes = ItemUtils.getItemNamewithColor(item) + " x1";
        GlobalFun.SysMsg(StringUtils.substitute(Language.lang.huode, mes), SysMessageType.CHAT_PANEL_RIGHT);
        App.MessageCenter.dispatch(MsgConst.JEWEL_BAG);
    };
    JewelProxy.prototype.doDeleteJewel = function (bytes) {
        var id = bytes.readInt();
        GameCache.jewel.deleteJewel(id);
        App.MessageCenter.dispatch(MsgConst.JEWEL_BAG);
    };
    JewelProxy.prototype.doJewelOption = function (bytes) {
        var roleId = GameCache.hero.transIdFromeServer(bytes.readInt());
        var part = bytes.readByte();
        var id = bytes.readInt();
        var lvl = bytes.readUnsignedShort();
        var obj = {
            part: part,
            id: id,
            lvl: lvl
        };
        var arr = GameCache.jewel.roleJewelList[roleId];
        if (!arr) {
            arr = GameCache.jewel.roleJewelList[roleId] = {};
        }
        arr[part] = obj;
        App.MessageCenter.dispatch(MsgConst.JEWEL_LIST);
    };
    ///////////////////////////////////////////////////////////////
    /**
     * 镶嵌宝石
     * @param role角色下标，part部位，宝石ID
     */
    JewelProxy.prototype.sendSetJewel = function (role, part, id) {
        var roleId = GameCache.hero.getServerIdByIndex(role);
        var bytes = this.getBytes(1);
        bytes.writeInt(roleId);
        bytes.writeByte(part);
        bytes.writeInt(id);
        this.sendToServer(bytes);
    };
    /**
     * 脱下宝石
     * @param role角色下标，part部位
     */
    JewelProxy.prototype.sendOffJewel = function (role, part) {
        var roleId = GameCache.hero.getServerIdByIndex(role);
        var bytes = this.getBytes(2);
        bytes.writeInt(roleId);
        bytes.writeByte(part);
        this.sendToServer(bytes);
    };
    /**
     * 升级宝石
     * @param role角色下标，part部位
     */
    JewelProxy.prototype.sendUpGrade = function (role, part) {
        var roleId = GameCache.hero.getServerIdByIndex(role);
        var bytes = this.getBytes(3);
        bytes.writeInt(roleId);
        bytes.writeByte(part);
        this.sendToServer(bytes);
    };
    /**
     * 分解宝石
     * @param arr 宝石ID数组
     */
    JewelProxy.prototype.sendDecomposition = function (arr) {
        if (!arr)
            return;
        var len = arr.length;
        var bytes = this.getBytes(4);
        bytes.writeUnsignedShort(len);
        for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
            var i = arr_1[_i];
            bytes.writeInt(i);
        }
        this.sendToServer(bytes);
    };
    /**
     * 替换宝石
     * @param role角色下标，part部位，宝石ID
     */
    JewelProxy.prototype.sendReplace = function (role, part, id) {
        var roleId = GameCache.hero.getServerIdByIndex(role);
        var bytes = this.getBytes(5);
        bytes.writeInt(roleId);
        bytes.writeByte(part);
        bytes.writeInt(id);
        this.sendToServer(bytes);
    };
    return JewelProxy;
}(BaseProxy));
__reflect(JewelProxy.prototype, "JewelProxy");
//# sourceMappingURL=JewelProxy.js.map