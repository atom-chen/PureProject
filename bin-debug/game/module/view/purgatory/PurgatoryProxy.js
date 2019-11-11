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
 * @Description: 炼狱装备代理类
 * @Author: moyusheng
 * @Date: 2019-10-14 16:05:19
 */
var PurgatoryProxy = (function (_super) {
    __extends(PurgatoryProxy, _super);
    function PurgatoryProxy() {
        var _this = _super.call(this, PacketTypes.PURGATORY) || this;
        _this.regNetMsg(1, _this.doUpdateData);
        _this.regNetMsg(2, _this.doInitData);
        return _this;
    }
    /**
     * 初始化角色身上的炼狱装备
     * @param  {GameByteArray} bytes
     * @returns void
     */
    PurgatoryProxy.prototype.doInitData = function (bytes) {
        var roleId = GameCache.hero.transIdFromeServer(bytes.readUnsignedInt()); //角色id
        var len = bytes.readByte(); //装备个数
        var eqMap = {}; //装备列表
        for (var i = 0; i < len; i++) {
            var pos = bytes.readByte(); //装备的位置
            var lv = bytes.readShort(); // 等级
            eqMap[pos] = lv;
        }
        GameCache.purgatory.updatePurgatory(roleId, eqMap);
        App.MessageCenter.dispatch(MsgConst.EQUIP_PURGATORY);
    };
    /**
     * 部位数据更新
     * @param  {GameByteArray} bytes
     * @returns void
     */
    PurgatoryProxy.prototype.doUpdateData = function (bytes) {
        var roleId = GameCache.hero.transIdFromeServer(bytes.readUnsignedInt()); //角色id
        var pos = bytes.readByte(); //装备的位置
        var lv = bytes.readShort(); // 等级
        var map = {};
        map[pos] = lv;
        GameCache.purgatory.updatePurgatory(roleId, map);
        App.MessageCenter.dispatch(MsgConst.EQUIP_PURGATORY);
    };
    /**
     * 请求升级
     * @param  {number} roleIdx
     * @param  {number} part
     * @param  {number} lv
     * @param  {number} item1
     * @param  {number} item2
     * @returns void
     */
    PurgatoryProxy.prototype.upgradeReq = function (roleIdx, part, lv, item1, item2) {
        var bytes = this.getBytes(1);
        var id = GameCache.hero.getServerIdByIndex(roleIdx);
        bytes.writeInt(id);
        bytes.writeByte(part);
        bytes.writeShort(lv);
        bytes.writeInt(item1);
        bytes.writeInt(item2);
        this.sendToServer(bytes);
    };
    return PurgatoryProxy;
}(BaseProxy));
__reflect(PurgatoryProxy.prototype, "PurgatoryProxy");
//# sourceMappingURL=PurgatoryProxy.js.map