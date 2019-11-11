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
 * @Description: BOSS
 * @Author: xiejunwei
 * @Date: 2019-07-30 19:10:06
 * @LastEditTime: 2019-10-31 16:50:20
 */
var BossProxy = (function (_super) {
    __extends(BossProxy, _super);
    function BossProxy() {
        var _this = _super.call(this, PacketTypes.BOSS) || this;
        _this.regNetMsg(1, _this.doBossInfo);
        _this.regNetMsg(25, _this.doWorldBossCount);
        _this.regNetMsg(4, _this.doAwardInfo);
        _this.regNetMsg(27, _this.updatePgtBossChallengeInfo);
        _this.regNetMsg(28, _this.updatePgtBossInfo);
        return _this;
    }
    BossProxy.prototype.doBossInfo = function (bytes) {
        var count = bytes.readUnsignedShort();
        var arr = {};
        var idx = {};
        for (var i = 0; i < count; i++) {
            var obj = {};
            obj["id"] = bytes.readShort(); //bossid
            obj["hp"] = bytes.readByte(); //BOSS剩余血量
            obj["killTime"] = GlobalFun.formatMiniDateTime(bytes.readUnsignedInt()); //上一次击杀时间
            obj["reviveTime"] = GlobalFun.formatMiniDateTime(bytes.readUnsignedInt());
            obj["type"] = bytes.readUnsignedShort(); //boss类型
            // obj["type"] = 7;  //boss类型
            obj["kname"] = bytes.readCustomBytes(); //首杀人名称
            idx[obj["type"]] = idx[obj["type"]] > 0 ? idx[obj["type"]] : 0;
            obj["index"] = idx[obj["type"]]++;
            // obj["index"] = i + 1;
            if (!arr[obj["type"]])
                arr[obj["type"]] = {};
            var typeObj = arr[obj["type"]];
            if (!typeObj[obj["id"]])
                obj["conf"] = this.getBossConfig(obj["id"], obj["type"]);
            else
                obj["conf"] = typeObj[obj["id"]]["conf"];
            if (obj["conf"]) {
                typeObj[obj["id"]] = obj;
                GameCache.boss.isReviving(obj["conf"], obj["reviveTime"], obj["index"], obj["hp"]);
            }
        }
        GameCache.boss.bossData = arr;
        App.MessageCenter.dispatch(MsgConst.BOSS_INFO);
    };
    BossProxy.prototype.getBossConfig = function (id, type) {
        var conf;
        switch (type) {
            case BossType.WORLDBOSS:
                conf = GameConfig.worldBoss[id];
                break;
            case BossType.VIPBOSS:
                conf = GameConfig.vipBoss[id];
                break;
        }
        return conf;
        // let conf = GameConfig.worldBoss;
        // for (let i in conf) {
        //     if (conf[i].id == id) {
        //         return conf[i];
        //     }
        // }
        // return null;
    };
    BossProxy.prototype.doWorldBossCount = function (bytes) {
        var obj = {};
        obj["count"] = bytes.readUnsignedShort(); //已进入次数
        obj["buyCount"] = bytes.readUnsignedShort(); //购买次数的进入次数
        var time = bytes.readUnsignedInt();
        obj["timeChkPoint"] = time ? GlobalFun.formatMiniDateTime(time) : 0;
        obj["limit"] = bytes.readUnsignedShort(); //已购买次数
        GameCache.boss.worldEnterCount = obj;
        App.MessageCenter.dispatch(MsgConst.WORLDBOSS_COUNT);
    };
    BossProxy.prototype.doAwardInfo = function (bytes) {
        var len = bytes.readUnsignedShort();
        var arr = [];
        for (var i = 0; i < len; i++) {
            var type = bytes.readByte();
            var id = bytes.readUnsignedShort();
            var count = bytes.readUnsignedInt();
            arr.push([id, count]);
        }
        // GameCache.boss.openAwardTips(arr, 2);
        GameCache.award.openAwardTips(arr, AwardSourceType.BOSS);
    };
    BossProxy.prototype.sendBossInfo = function () {
        var bytes = this.getBytes(1);
        this.sendToServer(bytes);
    };
    /**
     * 请求BOSS副本操作
     * @param optId:1为进入 2为退出 3为购买次数
    */
    BossProxy.prototype.sendBossFubenOpt = function (optId, bossid) {
        var bytes = this.getBytes(2);
        bytes.writeByte(optId);
        bytes.writeShort(bossid);
        this.sendToServer(bytes);
    };
    /**
     * 领取BOSS奖励
     */
    BossProxy.prototype.sendRecieveAw = function (bossid) {
        var bytes = this.getBytes(4);
        bytes.writeShort(bossid);
        this.sendToServer(bytes);
    };
    BossProxy.prototype.updatePgtBossInfo = function (bytes) {
        GameCache.pgtBoss.pgtBuy = bytes.readUnsignedByte();
        GameCache.pgtBoss.pgtChallenge = bytes.readUnsignedByte();
        var refreshTime = bytes.readUnsignedInt();
        refreshTime && (refreshTime = GlobalFun.formatMiniDateTime(refreshTime));
        GameCache.pgtBoss.pgtRefresh = refreshTime;
        var len = bytes.readUnsignedShort();
        var arr = [];
        for (var i = 0; i < len; i++) {
            var cd = bytes.readUnsignedInt();
            cd && (cd = GlobalFun.formatMiniDateTime(cd));
            var hp = bytes.readUnsignedByte();
            var complete = bytes.readUnsignedByte();
            var bossid = bytes.readUnsignedShort();
            arr.push({ bossid: bossid, hp: hp, complete: complete, cd: cd });
        }
        GameCache.pgtBoss.updatePgtBossData(arr);
        App.MessageCenter.dispatch(MsgConst.PURGATORY_BOSS_UPDATE);
    };
    /**炼狱boss数据更新 */
    BossProxy.prototype.updatePgtBossChallengeInfo = function (bytes) {
        GameCache.pgtBoss.pgtBuy = bytes.readByte();
        GameCache.pgtBoss.pgtChallenge = bytes.readByte();
        var refreshTime = bytes.readUnsignedInt();
        refreshTime && (refreshTime = GlobalFun.formatMiniDateTime(refreshTime));
        GameCache.pgtBoss.pgtRefresh = refreshTime;
        App.MessageCenter.dispatch(MsgConst.PURGATORY_BOSS_UPDATE);
    };
    /**
     * 购买炼狱boss次数
     * @returns void
     */
    BossProxy.prototype.pgtBossBuy = function () {
        var bytes = this.getBytes(22);
        this.sendToServer(bytes);
    };
    return BossProxy;
}(BaseProxy));
__reflect(BossProxy.prototype, "BossProxy");
//# sourceMappingURL=BossProxy.js.map