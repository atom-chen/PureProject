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
 * 副本系统
 */
var CopyProxy = (function (_super) {
    __extends(CopyProxy, _super);
    function CopyProxy() {
        var _this = _super.call(this, PacketTypes.COPY) || this;
        _this.regNetMsg(5, _this.doCopyTime); //通知副本剩余时间
        _this.regNetMsg(11, _this.doCopyEnterCount);
        _this.regNetMsg(12, _this.doSingleCopyEnterCount);
        _this.regNetMsg(15, _this.doRecvAward);
        _this.regNetMsg(20, _this.doPassClean); //通关
        _this.regNetMsg(23, _this.doCopyEvaluation); //通关波数
        _this.regNetMsg(27, _this.doSweepPrint); //扫荡返回
        _this.regNetMsg(28, _this.doBuffCount);
        _this.regNetMsg(29, _this.doCopyExpTime); //经验副本时间
        _this.regNetMsg(30, _this.doCopyExpWave); //经验副本波数
        _this.regNetMsg(31, _this.doExpIncome); //经验副本收益
        _this.regNetMsg(32, _this.doExpAward); //经验副本结果
        _this.regNetMsg(33, _this.doPassRank); //闯关排行返回
        _this.regNetMsg(34, _this.doCopyBuyInfo); //经验副本购买返回
        _this.regNetMsg(35, _this.doFashionCopyInfo); //时装副本返回
        _this.regNetMsg(36, _this.doCopyEnterBuy);
        return _this;
    }
    CopyProxy.prototype.doCopyTime = function (bytes) {
        var fbid = bytes.readUnsignedShort();
        var time = bytes.readInt();
        time = time * 1000 + GameCache.server.serverTime;
        GameCache.copy.copyTime[fbid] = time;
        App.MessageCenter.dispatch(MsgConst.COPY_TIME);
    };
    CopyProxy.prototype.doCopyEnterCount = function (bytes) {
        var len = bytes.readUnsignedShort(); //数组长度
        for (var i = 0; i < len; i++) {
            var fbid = bytes.readUnsignedShort(); //副本ID
            var enter = bytes.readByte(); //已进入次数
            var limit = bytes.readByte(); //总共可进入次数
            var free = bytes.readUnsignedByte(); //免费进入次数
            var sweep = bytes.readUnsignedByte(); //扫荡次数（付费次数）
            GameCache.copy.initCopyData(fbid, enter, free, sweep, limit);
        }
        App.MessageCenter.dispatch(MsgConst.COPY_COUNT);
    };
    CopyProxy.prototype.doSingleCopyEnterCount = function (bytes) {
        var fbid = bytes.readUnsignedShort();
        var enter = bytes.readByte(); //已进入次数
        var free = bytes.readUnsignedByte();
        var sweep = bytes.readUnsignedByte();
        GameCache.copy.initCopyData(fbid, enter, free, sweep);
        App.MessageCenter.dispatch(MsgConst.COPY_COUNT);
    };
    CopyProxy.prototype.doRecvAward = function (bytes) {
        var fbid = bytes.readInt();
        var count = bytes.readByte();
        var itemArr = [];
        for (var i = 0; i < count; i++) {
            var obj = new QuestAward();
            obj.type = bytes.readByte();
            obj.id = bytes.readInt();
            obj.count = bytes.readInt();
            itemArr.push(obj);
        }
        GameCache.award.openAwardTips(itemArr, AwardSourceType.COPY, fbid);
    };
    CopyProxy.prototype.doPassClean = function (bytes) {
        var fbid = bytes.readInt();
        var success = bytes.readByte() == 0;
        if (!success) {
            GlobalVar.autoOpenGroup.push([ViewConst.FAIL]);
        }
        //临时处理，当关卡数属性消息比进入场景慢时，地图配不及时刷新
        if (GlobalVar.PASSBOSS_SCENE == GameCache.map.mapId) {
            var lvl = GameCache.hero.mainPro.pro(PropId.AP_CHKPOINT_LV);
            GameCache.pass.updateLv(lvl + 1);
        }
        var conf = GameConfig.fuben[fbid];
        if (conf.type == CopyType.FASHION) {
            GameCache.copy.fashionCopyData[fbid] = {
                id: fbid,
                acti: success
            };
            if (success) {
                GameCache.award.openAwardTips(GameCache.copy.recordItemArr, AwardSourceType.COPY, fbid);
            }
            else {
                GameCache.copy.recordItemArr = [];
            }
        }
    };
    CopyProxy.prototype.doCopyEvaluation = function (bytes) {
        var fbid = bytes.readUnsignedShort();
        var count = bytes.readByte();
        GameCache.copy.initCopyEvaData(fbid, count);
        App.MessageCenter.dispatch(MsgConst.COPY_EVALUATION, count, fbid);
    };
    CopyProxy.prototype.doSweepPrint = function (bytes) {
        var len = bytes.readUnsignedShort();
        var itemArr = [];
        for (var i = 0; i < len; i++) {
            var type = bytes.readByte();
            var id = bytes.readUnsignedShort();
            var count = bytes.readUnsignedShort();
            itemArr.push([id, count]);
        }
        GameCache.award.openAwardTips(itemArr, AwardSourceType.SWEEP);
    };
    CopyProxy.prototype.doBuffCount = function (bytes) {
        var coinCount = bytes.readByte();
        var goldCount = bytes.readByte();
        GameCache.copy.buffBuy = [coinCount, goldCount];
        App.MessageCenter.dispatch(MsgConst.COPY_BUFF_COUNT);
    };
    CopyProxy.prototype.doCopyExpTime = function (bytes) {
        var waiteTime = bytes.readUnsignedShort();
        var time = bytes.readUnsignedShort();
        var total = (waiteTime + time) * 1000 + GameCache.server.serverTime;
        var begin = time;
        time = time * 1000 + GameCache.server.serverTime;
        waiteTime = waiteTime * 1000 + GameCache.server.serverTime;
        GameCache.copy.copyExpData["time"] = [waiteTime, time, total, begin];
        App.MessageCenter.dispatch(MsgConst.COPY_EXP_TIME);
    };
    CopyProxy.prototype.doCopyExpWave = function (bytes) {
        var wave = bytes.readUnsignedShort();
        var total = bytes.readUnsignedShort();
        GameCache.copy.copyExpData["wave"] = [wave, total];
        App.MessageCenter.dispatch(MsgConst.COPY_EXP_WAVE);
    };
    CopyProxy.prototype.doExpIncome = function (bytes) {
        var exp = bytes.readUnsignedInt();
        var killCount = bytes.readUnsignedInt();
        GameCache.copy.copyExpData["exp"] = [exp];
        GameCache.copy.copyExpData["killCount"] = killCount;
        App.MessageCenter.dispatch(MsgConst.COPY_EXP_INCOME);
    };
    CopyProxy.prototype.doExpAward = function (bytes) {
        var exp = bytes.readUnsignedInt();
        GlobalFun.SysMsg("总收获" + exp + "点经验");
    };
    CopyProxy.prototype.doPassRank = function (bytes) {
        var myRank = bytes.readUnsignedByte();
        var len = bytes.readUnsignedByte();
        var arr = [];
        for (var i = 0; i < len; i++) {
            var rank = bytes.readUnsignedByte();
            var value = bytes.readUnsignedShort();
            var roleName = bytes.readCustomBytes();
            var obj = {
                rank: rank,
                value: value,
                roleName: roleName
            };
            arr.push(obj);
        }
        var myValue = GameCache.hero.mainPro.pro(PropId.AP_CHKPOINT_LV) - 1;
        App.MessageCenter.dispatch(MsgConst.PASS_RANK_INFO, arr, myRank, myValue);
    };
    CopyProxy.prototype.doCopyBuyInfo = function (bytes) {
        var enterCount = bytes.readUnsignedByte();
        var boughtCount = bytes.readUnsignedByte();
        GameCache.copy.copyExpBuyData = {
            enterCount: enterCount,
            boughtCount: boughtCount
        };
        App.MessageCenter.dispatch(MsgConst.COPY_COUNT);
    };
    CopyProxy.prototype.doFashionCopyInfo = function (bytes) {
        var enableCount = bytes.readUnsignedByte();
        var boughtCount = bytes.readUnsignedByte();
        GameCache.copy.saveCopyEnterBuy(GameConfig.globalConfig.fashionCopyId, enableCount, boughtCount);
        var len = bytes.readUnsignedShort();
        for (var i = 0; i < len; i++) {
            var fbid = bytes.readUnsignedInt();
            var acti = bytes.readUnsignedByte();
            GameCache.copy.fashionCopyData[fbid] = {
                id: fbid,
                acti: acti == 0
            };
        }
        App.MessageCenter.dispatch(MsgConst.FASHION_COPY);
    };
    CopyProxy.prototype.doCopyEnterBuy = function (bytes) {
        var enableCount = bytes.readUnsignedByte();
        var boughtCount = bytes.readUnsignedByte();
        var fbid = bytes.readUnsignedShort();
        GameCache.copy.saveCopyEnterBuy(fbid, enableCount, boughtCount);
    };
    //////////////////////////////////////////////////////////////////////////////
    //进入副本
    CopyProxy.prototype.sendEnterFB = function (fbid) {
        var bytes = this.getBytes(8);
        bytes.writeInt(fbid);
        this.sendToServer(bytes);
    };
    //退出副本
    CopyProxy.prototype.sendQuit = function (fbid) {
        var bytes = this.getBytes(10);
        bytes.writeInt(fbid);
        this.sendToServer(bytes);
    };
    //进入闯关
    CopyProxy.prototype.sendPassEnter = function () {
        var bytes = this.getBytes(20);
        bytes.writeByte(GameCache.hero.list.length);
        for (var i = 0; i < GameCache.hero.list.length; i++) {
            var role = GameCache.hero.list[i];
            bytes.writeByte(GameCache.hero.getServerIdByIndex(i));
            bytes.writeShort(role.cellXY.x);
            bytes.writeShort(role.cellXY.y);
        }
        this.sendToServer(bytes);
    };
    /**
     * 领取副本奖励
     * @param fbid为副本ID type为奖励类型 0为领取普通奖励，1为领取特殊奖励
     */
    CopyProxy.prototype.sendGetAward = function (fbid, type) {
        if (type === void 0) { type = 0; }
        var bytes = this.getBytes(15);
        bytes.writeInt(fbid);
        bytes.writeByte(type);
        this.sendToServer(bytes);
    };
    /**扫荡
     * @param fbid为副本ID idx为索引，0为全部扫荡
     */
    CopyProxy.prototype.sendSweep = function (fbid, idx) {
        if (idx === void 0) { idx = 0; }
        var bytes = this.getBytes(27);
        bytes.writeUnsignedShort(fbid);
        bytes.writeByte(idx);
        this.sendToServer(bytes);
    };
    /**
     * 鼓舞buff购买
     * @param type 0 为金币鼓舞 1 为元宝鼓舞
     */
    CopyProxy.prototype.sendBuyBuff = function (type) {
        var bytes = this.getBytes(28);
        bytes.writeByte(type);
        this.sendToServer(bytes);
    };
    /**
     * 请求闯关排行
     */
    CopyProxy.prototype.sendPassRank = function (val) {
        var bytes = this.getBytes(29);
        val = val ? val : GameConfig.globalConfig.nRankingListMaxSize;
        bytes.writeByte(val);
        this.sendToServer(bytes);
    };
    /**
     * 发送购买经验副本挑战次数
     */
    CopyProxy.prototype.sendCopyExpBuy = function () {
        var bytes = this.getBytes(30);
        this.sendToServer(bytes);
    };
    /**
     * 购买副本进入次数
     */
    CopyProxy.prototype.sendCopyEnterBuy = function (fbid) {
        var bytes = this.getBytes(31);
        bytes.writeUnsignedShort(fbid);
        this.sendToServer(bytes);
    };
    return CopyProxy;
}(BaseProxy));
__reflect(CopyProxy.prototype, "CopyProxy");
//# sourceMappingURL=CopyProxy.js.map