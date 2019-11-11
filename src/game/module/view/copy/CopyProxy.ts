/**
 * 副本系统
 */
class CopyProxy extends BaseProxy {
    public constructor() {
        super(PacketTypes.COPY);

        this.regNetMsg(5, this.doCopyTime); //通知副本剩余时间
        this.regNetMsg(11, this.doCopyEnterCount);
        this.regNetMsg(12, this.doSingleCopyEnterCount);
        this.regNetMsg(15, this.doRecvAward);
        this.regNetMsg(20, this.doPassClean);  //通关
        this.regNetMsg(23, this.doCopyEvaluation); //通关波数
        this.regNetMsg(27, this.doSweepPrint); //扫荡返回
        this.regNetMsg(28, this.doBuffCount);
        this.regNetMsg(29, this.doCopyExpTime); //经验副本时间
        this.regNetMsg(30, this.doCopyExpWave); //经验副本波数
        this.regNetMsg(31, this.doExpIncome);    //经验副本收益
        this.regNetMsg(32, this.doExpAward);     //经验副本结果
        this.regNetMsg(33, this.doPassRank);     //闯关排行返回
        this.regNetMsg(34, this.doCopyBuyInfo);   //经验副本购买返回
        this.regNetMsg(35, this.doFashionCopyInfo);  //时装副本返回
        this.regNetMsg(36, this.doCopyEnterBuy);
    }

    private doCopyTime(bytes: GameByteArray): void {
        let fbid = bytes.readUnsignedShort();
        let time = bytes.readInt();
        time = time * 1000 + GameCache.server.serverTime;
        GameCache.copy.copyTime[fbid] = time;
        App.MessageCenter.dispatch(MsgConst.COPY_TIME);
    }

    private doCopyEnterCount(bytes: GameByteArray): void {
        let len = bytes.readUnsignedShort(); //数组长度
        for (let i = 0; i < len; i++) {
            let fbid = bytes.readUnsignedShort(); //副本ID
            let enter = bytes.readByte(); //已进入次数
            let limit = bytes.readByte(); //总共可进入次数
            let free = bytes.readUnsignedByte();  //免费进入次数
            let sweep = bytes.readUnsignedByte();  //扫荡次数（付费次数）
            GameCache.copy.initCopyData(fbid, enter, free, sweep, limit);
        }
        App.MessageCenter.dispatch(MsgConst.COPY_COUNT);
    }

    private doSingleCopyEnterCount(bytes: GameByteArray): void {
        let fbid = bytes.readUnsignedShort();
        let enter = bytes.readByte(); //已进入次数
        let free = bytes.readUnsignedByte();
        let sweep = bytes.readUnsignedByte();
        GameCache.copy.initCopyData(fbid, enter, free, sweep);
        App.MessageCenter.dispatch(MsgConst.COPY_COUNT);
    }

    private doRecvAward(bytes: GameByteArray): void {
        let fbid = bytes.readInt();
        let count = bytes.readByte();
        let itemArr = [];

        for (let i = 0; i < count; i++) {
            let obj = new QuestAward();
            obj.type = bytes.readByte();
            obj.id = bytes.readInt();
            obj.count = bytes.readInt();
            itemArr.push(obj);
        }
        GameCache.award.openAwardTips(itemArr, AwardSourceType.COPY, fbid);
    }

    private doPassClean(bytes: GameByteArray): void {
        let fbid = bytes.readInt();
        let success: boolean = bytes.readByte() == 0;
        if (!success) {
            GlobalVar.autoOpenGroup.push([ViewConst.FAIL]);
        }
        //临时处理，当关卡数属性消息比进入场景慢时，地图配不及时刷新
        if (GlobalVar.PASSBOSS_SCENE == GameCache.map.mapId) {
            let lvl = GameCache.hero.mainPro.pro(PropId.AP_CHKPOINT_LV);
            GameCache.pass.updateLv(lvl + 1);
        }
        let conf: StdFuben = GameConfig.fuben[fbid];
        if (conf.type == CopyType.FASHION) {
            GameCache.copy.fashionCopyData[fbid] = {
                id: fbid,
                acti: success
            }
            if (success) {
                GameCache.award.openAwardTips(GameCache.copy.recordItemArr, AwardSourceType.COPY, fbid);
            } else {
                GameCache.copy.recordItemArr = [];
            }
        }
    }

    private doCopyEvaluation(bytes: GameByteArray): void {
        let fbid = bytes.readUnsignedShort();
        let count = bytes.readByte();
        GameCache.copy.initCopyEvaData(fbid, count);
        App.MessageCenter.dispatch(MsgConst.COPY_EVALUATION, count, fbid);
    }


    private doSweepPrint(bytes: GameByteArray): void {
        let len = bytes.readUnsignedShort();
        let itemArr = [];
        for (let i = 0; i < len; i++) {
            let type = bytes.readByte();
            let id = bytes.readUnsignedShort();
            let count = bytes.readUnsignedShort();
            itemArr.push([id, count]);
        }
        GameCache.award.openAwardTips(itemArr, AwardSourceType.SWEEP);
    }

    private doBuffCount(bytes: GameByteArray): void {
        let coinCount = bytes.readByte();
        let goldCount = bytes.readByte();
        GameCache.copy.buffBuy = [coinCount, goldCount];
        App.MessageCenter.dispatch(MsgConst.COPY_BUFF_COUNT);
    }

    private doCopyExpTime(bytes: GameByteArray): void {
        let waiteTime = bytes.readUnsignedShort();
        let time = bytes.readUnsignedShort();
        let total = (waiteTime + time) * 1000 + GameCache.server.serverTime;
        let begin = time;
        time = time * 1000 + GameCache.server.serverTime;
        waiteTime = waiteTime * 1000 + GameCache.server.serverTime;

        GameCache.copy.copyExpData["time"] = [waiteTime, time, total, begin];
        App.MessageCenter.dispatch(MsgConst.COPY_EXP_TIME);
    }

    private doCopyExpWave(bytes: GameByteArray): void {
        let wave = bytes.readUnsignedShort();
        let total = bytes.readUnsignedShort();
        GameCache.copy.copyExpData["wave"] = [wave, total];
        App.MessageCenter.dispatch(MsgConst.COPY_EXP_WAVE);
    }

    private doExpIncome(bytes: GameByteArray): void {
        let exp = bytes.readUnsignedInt();
        let killCount = bytes.readUnsignedInt();
        GameCache.copy.copyExpData["exp"] = [exp];
        GameCache.copy.copyExpData["killCount"] = killCount;
        App.MessageCenter.dispatch(MsgConst.COPY_EXP_INCOME);
    }

    private doExpAward(bytes: GameByteArray): void {
        let exp = bytes.readUnsignedInt();
        GlobalFun.SysMsg("总收获" + exp + "点经验");
    }

    private doPassRank(bytes: GameByteArray): void {
        let myRank = bytes.readUnsignedByte();
        let len = bytes.readUnsignedByte();
        let arr = [];
        for (let i = 0; i < len; i++) {
            let rank = bytes.readUnsignedByte();
            let value = bytes.readUnsignedShort();
            let roleName = bytes.readCustomBytes();
            let obj = {
                rank: rank,
                value: value,
                roleName: roleName
            }
            arr.push(obj);
        }
        let myValue = GameCache.hero.mainPro.pro(PropId.AP_CHKPOINT_LV) - 1;
        App.MessageCenter.dispatch(MsgConst.PASS_RANK_INFO, arr, myRank, myValue);
    }

    private doCopyBuyInfo(bytes: GameByteArray): void {
        let enterCount = bytes.readUnsignedByte();
        let boughtCount = bytes.readUnsignedByte();
        GameCache.copy.copyExpBuyData = {
            enterCount: enterCount,
            boughtCount: boughtCount
        }
        App.MessageCenter.dispatch(MsgConst.COPY_COUNT);
    }

    private doFashionCopyInfo(bytes: GameByteArray): void {
        let enableCount = bytes.readUnsignedByte();
        let boughtCount = bytes.readUnsignedByte();
        GameCache.copy.saveCopyEnterBuy(GameConfig.globalConfig.fashionCopyId, enableCount, boughtCount);
        let len = bytes.readUnsignedShort();
        for (let i = 0; i < len; i++) {
            let fbid = bytes.readUnsignedInt();
            let acti = bytes.readUnsignedByte();
            GameCache.copy.fashionCopyData[fbid] = {
                id: fbid,
                acti: acti == 0
            }
        }
        App.MessageCenter.dispatch(MsgConst.FASHION_COPY);
    }

    private doCopyEnterBuy(bytes: GameByteArray): void {
        let enableCount = bytes.readUnsignedByte();
        let boughtCount = bytes.readUnsignedByte();
        let fbid = bytes.readUnsignedShort();
        GameCache.copy.saveCopyEnterBuy(fbid, enableCount, boughtCount);
    }

    //////////////////////////////////////////////////////////////////////////////

    //进入副本
    public sendEnterFB(fbid: number): void {
        let bytes: GameByteArray = this.getBytes(8);
        bytes.writeInt(fbid);
        this.sendToServer(bytes);
    }

    //退出副本
    public sendQuit(fbid: number): void {
        let bytes: GameByteArray = this.getBytes(10);
        bytes.writeInt(fbid);
        this.sendToServer(bytes);
    }

    //进入闯关
    public sendPassEnter(): void {
        let bytes: GameByteArray = this.getBytes(20);
        bytes.writeByte(GameCache.hero.list.length);
        for (let i = 0; i < GameCache.hero.list.length; i++) {
            let role = GameCache.hero.list[i];
            bytes.writeByte(GameCache.hero.getServerIdByIndex(i));
            bytes.writeShort(role.cellXY.x);
            bytes.writeShort(role.cellXY.y);
        }
        this.sendToServer(bytes);
    }

    /**
     * 领取副本奖励
     * @param fbid为副本ID type为奖励类型 0为领取普通奖励，1为领取特殊奖励
     */
    public sendGetAward(fbid, type = 0): void {
        let bytes: GameByteArray = this.getBytes(15);
        bytes.writeInt(fbid);
        bytes.writeByte(type);
        this.sendToServer(bytes);
    }

    /**扫荡
     * @param fbid为副本ID idx为索引，0为全部扫荡
     */
    public sendSweep(fbid, idx = 0): void {
        let bytes: GameByteArray = this.getBytes(27);
        bytes.writeUnsignedShort(fbid);
        bytes.writeByte(idx);
        this.sendToServer(bytes);
    }

    /**
     * 鼓舞buff购买
     * @param type 0 为金币鼓舞 1 为元宝鼓舞
     */
    public sendBuyBuff(type): void {
        let bytes: GameByteArray = this.getBytes(28);
        bytes.writeByte(type);
        this.sendToServer(bytes);
    }

    /**
     * 请求闯关排行
     */
    public sendPassRank(val?): void {
        let bytes: GameByteArray = this.getBytes(29);
        val = val ? val : GameConfig.globalConfig.nRankingListMaxSize;
        bytes.writeByte(val);
        this.sendToServer(bytes);
    }

    /**
     * 发送购买经验副本挑战次数
     */
    public sendCopyExpBuy(): void {
        let bytes: GameByteArray = this.getBytes(30);
        this.sendToServer(bytes);
    }

    /**
     * 购买副本进入次数
     */
    public sendCopyEnterBuy(fbid): void {
        let bytes: GameByteArray = this.getBytes(31);
        bytes.writeUnsignedShort(fbid);
        this.sendToServer(bytes);
    }
}
