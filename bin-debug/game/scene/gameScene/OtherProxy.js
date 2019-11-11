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
/**
 * 其他子系统，具体是什么由后端定
*/
var OtherProxy = (function (_super) {
    __extends(OtherProxy, _super);
    function OtherProxy() {
        var _this = _super.call(this, PacketTypes.OTHER) || this;
        _this.regNetMsg(8, _this.doGetServicerTime);
        _this.regNetMsg(28, _this.doServerOpenTime);
        _this.regNetMsg(31, _this.doGetSystemData);
        _this.regNetMsg(80, _this.doAwardInfo);
        _this.regNetMsg(82, _this.doJingjiData); //竞技场个人数据
        _this.regNetMsg(83, _this.doTargetList); //竞技场挑战列表
        _this.regNetMsg(84, _this.doTargetDetal); //竞技场挑战目标详细数据
        _this.regNetMsg(85, _this.doJingjiRankData); //竞技场积分榜数据
        return _this;
    }
    /**
     * 服务器时间返回
     * @param bytes
     *
     */
    OtherProxy.prototype.doGetServicerTime = function (bytes) {
        var serCache = GameCache.server;
        //保存成功进入游戏的服务器时间
        serCache.serverTimeBase = GlobalFun.formatMiniDateTime(bytes.readUnsignedInt()) - egret.getTimer();
        //计算并保存服务器的开区时间
        //serCache.serverOpenTime = GlobalFun.formatMiniDateTime(bytes.readUnsignedInt());
        var d = new Date();
        d.setTime(serCache.serverTime);
        console.log("当前时间：", d.toString());
        //d.setTime(serCache.serverOpenTime);
        //console.log("开服时间：", d.toString());
        //console.log("开服天数：", serCache.serverOpenDay);
        //App.MessageCenter.dispatch(MsgConst.SERVER_TIME_CHANGE);
    };
    /**
     * 服务器开服时间/合服时间
    */
    OtherProxy.prototype.doServerOpenTime = function (bytes) {
        var serCache = GameCache.server;
        serCache.serverOpenDay = bytes.readUnsignedInt();
        serCache.serverOpenTime = GlobalFun.formatMiniDateTime(bytes.readUnsignedInt());
        serCache.serverCombineDay = bytes.readUnsignedInt();
        serCache.serverCombineTime = GlobalFun.formatMiniDateTime(bytes.readUnsignedInt());
        console.log("开服天数：", serCache.serverOpenDay);
        console.log("合服天数：", serCache.serverCombineDay);
        App.MessageCenter.dispatch(MsgConst.SERVER_TIME_CHANGE);
    };
    OtherProxy.prototype.doGetSystemData = function (bytes) {
        GameCache.settings.init();
        var count = bytes.readInt();
        for (var i = 0; i < count; i++) {
            var index = bytes.readByte();
            var value = bytes.readUnsignedInt();
            GameCache.settings.update(index, value, false);
        }
    };
    OtherProxy.prototype.doJingjiData = function (bytes) {
        var winNum = bytes.readUnsignedInt(); //胜场次数
        var winPoint = bytes.readUnsignedInt(); //胜场积分
        var remain = bytes.readByte(); //剩余挑战次数
        var bought = bytes.readByte(); //已购买次数
        var recoverTime = GlobalFun.formatMiniDateTime(bytes.readUnsignedInt()); //恢复挑战次数时间戳
        var refreshTime = GlobalFun.formatMiniDateTime(bytes.readUnsignedInt()); //可刷新时间戳
        var pointRank = bytes.readUnsignedShort(); //个人积分排名
        GameCache.jingji.initJingjiData(winNum, winPoint, remain, bought, recoverTime, refreshTime, pointRank);
    };
    OtherProxy.prototype.doTargetList = function (bytes) {
        var len = bytes.readByte();
        var arr = [];
        for (var i = 0; i < len; i++) {
            var icon = bytes.readUnsignedInt();
            var lvl = bytes.readUnsignedInt();
            var power = bytes.readUnsignedInt();
            var roleName = bytes.readCustomBytes();
            var obj = {
                icon: icon,
                lvl: lvl,
                power: power,
                roleName: roleName
            };
            arr.push(obj);
        }
        GameCache.jingji.jingjiList = arr.concat();
        App.MessageCenter.dispatch(MsgConst.JINGJI_LIST);
    };
    OtherProxy.prototype.doTargetDetal = function (bytes) {
        var len = bytes.readByte();
        var pro = [];
        for (var i = 0; i < len; i++) {
            var proSet = new PropertySet();
            bytes.readUnsignedInt();
            proSet.pro(PropId.AP_ACTOR_ID, bytes.readInt());
            proSet.pro(PropId.AP_JOB, bytes.readUnsignedInt());
            proSet.pro(PropId.AP_LEVEL, bytes.readUnsignedInt());
            proSet.pro(PropId.AP_SEX, bytes.readUnsignedInt());
            var hp = bytes.readUnsignedInt();
            proSet.pro(PropId.AP_MAX_HP, hp);
            proSet.pro(PropId.AP_HP, hp);
            proSet.pro(PropId.AP_ATTACK, bytes.readUnsignedInt());
            //proSet.pro(PropId.AP_MAGIC_ATTACK_MAX, bytes.readUnsignedInt());
            proSet.pro(PropId.AP_DEFENCE, bytes.readUnsignedInt());
            //proSet.pro(PropId.AP_MAGIC_DEFENCE_MAX, bytes.readUnsignedInt());
            proSet.pro(PropId.AP_HITVALUE, bytes.readUnsignedInt());
            proSet.pro(PropId.AP_DOGVALUE, bytes.readUnsignedInt());
            proSet.pro(PropId.AP_MOVE_SPEED, bytes.readUnsignedInt());
            proSet.pro(PropId.AP_ATTACK_SPEED, bytes.readUnsignedInt());
            proSet.pro(PropId.AP_CRIT, bytes.readUnsignedInt());
            proSet.pro(PropId.AP_CRIT_HURT, bytes.readUnsignedInt()); //16
            proSet.skillList = [];
            for (var i_1 = 0; i_1 < 5; i_1++) {
                var skillId = bytes.readUnsignedShort();
                var skillLvl = bytes.readUnsignedInt();
                if (skillId == 0) {
                    // proSet.skillList.push([0, 0]);
                    continue;
                }
                else {
                    proSet.skillList.push([skillId, skillLvl]);
                }
            } //24
            var roleName = bytes.readCustomBytes(); //25
            proSet.setRoleName(roleName);
            pro.push(proSet);
        }
        GameCache.jingji.targetDetail = pro;
        App.MessageCenter.dispatch(MsgConst.JINGJI_DETAIL);
    };
    OtherProxy.prototype.doJingjiRankData = function (bytes) {
        var len = bytes.readByte();
        var arr = [];
        for (var i = 0; i < len; i++) {
            var rank = bytes.readUnsignedInt();
            var job = bytes.readUnsignedInt();
            var lvl = bytes.readUnsignedInt();
            var winPoint = bytes.readUnsignedInt();
            var roleName = bytes.readCustomBytes();
            var obj = {
                rank: rank,
                job: job,
                lvl: lvl,
                winPoint: winPoint,
                roleName: roleName
            };
            arr.push(obj);
        }
        App.MessageCenter.dispatch(MsgConst.JINGJI_RANK, arr);
    };
    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    /**
     *保存系统设置到服务器
     * @param systemSaveDate
     * @param count    为0的时候到数组结束位置
     */
    OtherProxy.prototype.sendSystemConfigSave = function (data) {
        var bytes = this.getBytes(30);
        var count = Object.keys(data).length;
        bytes.writeInt(count); //类型总数量
        for (var k in data) {
            bytes.writeByte(parseInt(k)); //类型
            bytes.writeInt(data[k]); //值
        }
        this.sendToServer(bytes);
    };
    /**
     * 领取奖励通知
     */
    OtherProxy.prototype.doAwardInfo = function (bytes) {
        var len = bytes.readUnsignedShort();
        var arr = [];
        for (var i = 0; i < len; i++) {
            var type = bytes.readByte();
            var id = bytes.readUnsignedShort();
            var count = bytes.readUnsignedInt();
            arr.push([id, count]);
        }
        //场景为世界BOSS时，奖励为归属奖励
        if (GameCache.map.mapConfig.type == SceneType.WORLD_BOSS || GameCache.map.mapConfig.type == SceneType.VIP_BOSS) {
            GameCache.award.openAwardTips(arr, AwardSourceType.BOSS_PLUS);
        }
        else if (GameCache.map.mapConfig.type == SceneType.FASHION) {
            GameCache.copy.recordItemArr = GameCache.copy.recordItemArr.concat(arr);
        }
        else {
            //判断该场景是否显示掉落奖励面板
            if (GameCache.map.mapConfig.awardPanel)
                GameCache.award.openAwardTips(arr, AwardSourceType.OTHER);
        }
    };
    /**
     * 竞技场个人数据请求
     */
    OtherProxy.prototype.sendJingjiDataRequest = function () {
        var bytes = this.getBytes(48);
        this.sendToServer(bytes);
    };
    /**
     * 刷新竞技场列表 或 请求下发
     * @param option 1为刷新 0为请求下发列表
     */
    OtherProxy.prototype.sendListRefresh = function (option) {
        if (option === void 0) { option = 0; }
        var bytes = this.getBytes(49);
        bytes.writeByte(option);
        this.sendToServer(bytes);
    };
    /**
     * 购买竞技场挑战次数
     */
    OtherProxy.prototype.sendBuyChance = function () {
        var bytes = this.getBytes(50);
        this.sendToServer(bytes);
    };
    /**
     * 竞技场挑战
     * @param idx条目下标
     */
    OtherProxy.prototype.sendChallenge = function (idx) {
        var bytes = this.getBytes(51);
        bytes.writeByte(idx);
        this.sendToServer(bytes);
    };
    /**
     * 上传挑战结果
     * @param result 0 为失败 1为胜利
     */
    OtherProxy.prototype.sendResult = function (result) {
        var bytes = this.getBytes(52);
        bytes.writeByte(result);
        this.sendToServer(bytes);
    };
    /**
     * 积分榜数据请求
     */
    OtherProxy.prototype.sendPointRank = function (len) {
        var bytes = this.getBytes(53);
        bytes.writeByte(len);
        this.sendToServer(bytes);
    };
    return OtherProxy;
}(BaseProxy));
__reflect(OtherProxy.prototype, "OtherProxy");
//# sourceMappingURL=OtherProxy.js.map