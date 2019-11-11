/*
 * @Description: 排行榜协议内容
 * @Author: liangzhaowei
 * @Date: 2019-09-25 11:29:40
 */
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
var RankProxy = (function (_super) {
    __extends(RankProxy, _super);
    function RankProxy() {
        var _this = _super.call(this, PacketTypes.Default) || this;
        _this.regNetMsg(65, _this.doInit); //排行榜数据
        _this.regNetMsg(67, _this.doOtherPlayer); //其它玩家数据
        return _this;
    }
    RankProxy.prototype.doInit = function (pBytes) {
        var sigleRank = { type: 0, myRank: 0, myValue: 0, firstRoleList: [], rankList: [] };
        sigleRank.type = pBytes.readByte();
        sigleRank.myRank = pBytes.readInt();
        sigleRank.myValue = pBytes.readUnsignedInt();
        /**第一名角色列表 */
        var roleCount = pBytes.readByte();
        for (var i = 0; i < roleCount; i++) {
            var propSet = new PropertySet();
            propSet.kind = ThingKind.Human;
            var id = pBytes.readInt();
            var job = pBytes.readByte();
            var bodyId = pBytes.readUnsignedInt();
            propSet.pro(PropId.AP_JOB, job);
            propSet.pro(PropId.AP_BODY_ID, bodyId);
            propSet.pro(PropId.AP_SEX, pBytes.readByte());
            propSet.pro(PropId.AP_WEAPON, pBytes.readUnsignedInt());
            propSet.pro(PropId.AP_MOUNT, pBytes.readUnsignedInt());
            propSet.pro(PropId.AP_SWING, pBytes.readUnsignedInt());
            propSet.pro(PropId.AP_HAIR, pBytes.readUnsignedInt());
            propSet.pro(PropId.AP_HAT, pBytes.readUnsignedInt());
            propSet.pro(PropId.AP_EYE, pBytes.readUnsignedInt());
            propSet.pro(PropId.AP_GLASSES, pBytes.readUnsignedInt());
            propSet.pro(PropId.AP_PANTS, pBytes.readUnsignedInt());
            propSet.pro(PropId.AP_ASSIST, pBytes.readUnsignedInt());
            propSet.pro(PropId.AP_BACK, pBytes.readUnsignedInt());
            sigleRank.firstRoleList.push(propSet);
        }
        /**排行榜单个玩家数据集 */
        var rankCount = pBytes.readByte();
        for (var i = 0; i < rankCount; i++) {
            var rankData = new RankItemData();
            rankData.init(pBytes);
            /**加入排行榜类型 */
            rankData.rankType = sigleRank.type;
            sigleRank.rankList.push(rankData);
        }
        GameCache.rank.initData(sigleRank.type, sigleRank);
        App.MessageCenter.dispatch(MsgConst.RANK_INFO, sigleRank.type);
    };
    RankProxy.prototype.doOtherPlayer = function (pBytes) {
        var otherData = {};
        otherData.name = pBytes.readCustomBytes();
        otherData.lv = pBytes.readInt();
        otherData.title = pBytes.readInt(); //头衔
        otherData.vip = pBytes.readByte(); //
        otherData.badgeLv = pBytes.readByte(); //徽章
        otherData.unionNe = pBytes.readCustomBytes(); //行会职位
        otherData.unionJob = pBytes.readByte(); //行会职位
        otherData.roleList = [];
        /**玩家中的角色 */
        var roleCount = pBytes.readByte();
        for (var i = 0; i < roleCount; i++) {
            var roleData = {};
            roleData.id = pBytes.readInt();
            roleData.power = pBytes.readInt();
            roleData.job = pBytes.readByte();
            roleData.bodyId = pBytes.readUnsignedInt();
            roleData.sex = pBytes.readByte();
            /**模型数据 */
            var propSet = new PropertySet();
            propSet.kind = ThingKind.Human;
            // propSet.pro(PropId.AP_ACTOR_ID, id);
            propSet.pro(PropId.AP_JOB, roleData.job);
            propSet.pro(PropId.AP_BODY_ID, roleData.bodyId);
            propSet.pro(PropId.AP_SEX, roleData.sex);
            propSet.pro(PropId.AP_WEAPON, pBytes.readUnsignedInt());
            propSet.pro(PropId.AP_MOUNT, pBytes.readUnsignedInt());
            propSet.pro(PropId.AP_SWING, pBytes.readUnsignedInt());
            propSet.pro(PropId.AP_HAIR, pBytes.readUnsignedInt());
            propSet.pro(PropId.AP_HAT, pBytes.readUnsignedInt());
            propSet.pro(PropId.AP_EYE, pBytes.readUnsignedInt());
            propSet.pro(PropId.AP_GLASSES, pBytes.readUnsignedInt());
            propSet.pro(PropId.AP_PANTS, pBytes.readUnsignedInt());
            propSet.pro(PropId.AP_ASSIST, pBytes.readUnsignedInt());
            propSet.pro(PropId.AP_BACK, pBytes.readUnsignedInt());
            roleData.propSet = propSet;
            /**装备数据 */
            roleData.qe = [];
            var eqCount = pBytes.readByte();
            for (var i_1 = 0; i_1 < eqCount; i_1++) {
                var usItem = new UserItem(pBytes);
                usItem.sourceType = ItemSourceType.OTHER_ROLEEQUIP;
                roleData.qe.push(usItem);
            }
            /**装备槽强化信息 */
            roleData.strent = [];
            var strentCount = pBytes.readByte();
            for (var i_2 = 0; i_2 < strentCount; i_2++) {
                roleData.strent.push(pBytes.readUnsignedShort());
            }
            /**记录角色数据 */
            otherData.roleList.push(roleData);
        }
        GameCache.rank.otherRoleData = otherData;
        App.ViewManager.open(ViewConst.OTHERROLE);
    };
    /**请求排行榜信息*/
    RankProxy.prototype.askRank = function (type) {
        var bytes = this.getBytes(10);
        bytes.writeByte(type);
        this.sendToServer(bytes);
    };
    /**请求查看玩家信息*/
    RankProxy.prototype.askRoleInfo = function (id) {
        var bytes = this.getBytes(11);
        bytes.writeUnsignedInt(id);
        this.sendToServer(bytes);
    };
    return RankProxy;
}(BaseProxy));
__reflect(RankProxy.prototype, "RankProxy");
//# sourceMappingURL=RankProxy.js.map