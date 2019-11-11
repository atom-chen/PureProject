/*
 * @Description: BOSS
 * @Author: xiejunwei
 * @Date: 2019-07-30 19:10:06
 * @LastEditTime: 2019-10-31 16:50:20
 */
class BossProxy extends BaseProxy {
    public constructor() {
        super(PacketTypes.BOSS);
        this.regNetMsg(1, this.doBossInfo);
        this.regNetMsg(25, this.doWorldBossCount);
        this.regNetMsg(4, this.doAwardInfo);
        this.regNetMsg(27, this.updatePgtBossChallengeInfo);
        this.regNetMsg(28, this.updatePgtBossInfo);
    }

    private doBossInfo(bytes: GameByteArray): void {
        let count = bytes.readUnsignedShort();
        let arr = {};
        let idx = {};
        for (let i = 0; i < count; i++) {
            let obj = {};
            obj["id"] = bytes.readShort(); //bossid
            obj["hp"] = bytes.readByte();  //BOSS剩余血量
            obj["killTime"] = GlobalFun.formatMiniDateTime(bytes.readUnsignedInt()); //上一次击杀时间
            obj["reviveTime"] = GlobalFun.formatMiniDateTime(bytes.readUnsignedInt());
            obj["type"] = bytes.readUnsignedShort();  //boss类型
            // obj["type"] = 7;  //boss类型
            obj["kname"] = bytes.readCustomBytes();   //首杀人名称

            idx[obj["type"]] = idx[obj["type"]] > 0 ? idx[obj["type"]] : 0;

            obj["index"] = idx[obj["type"]]++;
            // obj["index"] = i + 1;

            if (!arr[obj["type"]]) arr[obj["type"]] = {};
            let typeObj = arr[obj["type"]];

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
    }

    private getBossConfig(id, type) {
        let conf;
        switch (type) {
            case BossType.WORLDBOSS:
                conf = GameConfig.worldBoss[id];
                break;
            case BossType.VIPBOSS:
                conf = GameConfig.vipBoss[id];
                break;
            // case BossType.PURGATORY_BOSS:
            //     conf = GameConfig.purgatoryBoss[id];
            //     break;
        }
        return conf;
        // let conf = GameConfig.worldBoss;
        // for (let i in conf) {
        //     if (conf[i].id == id) {
        //         return conf[i];
        //     }
        // }
        // return null;
    }



    private doWorldBossCount(bytes): void {
        let obj = {};
        obj["count"] = bytes.readUnsignedShort(); //已进入次数
        obj["buyCount"] = bytes.readUnsignedShort();  //购买次数的进入次数
        let time = bytes.readUnsignedInt();
        obj["timeChkPoint"] = time ? GlobalFun.formatMiniDateTime(time) : 0;
        obj["limit"] = bytes.readUnsignedShort();  //已购买次数
        GameCache.boss.worldEnterCount = obj;
        App.MessageCenter.dispatch(MsgConst.WORLDBOSS_COUNT);
    }

    private doAwardInfo(bytes: GameByteArray) {
        let len = bytes.readUnsignedShort();
        let arr = [];
        for (let i = 0; i < len; i++) {
            let type = bytes.readByte();
            let id = bytes.readUnsignedShort();
            let count = bytes.readUnsignedInt();
            arr.push([id, count]);
        }
        // GameCache.boss.openAwardTips(arr, 2);
        GameCache.award.openAwardTips(arr, AwardSourceType.BOSS);
    }

    public sendBossInfo(): void {
        let bytes: GameByteArray = this.getBytes(1);
        this.sendToServer(bytes);
    }

    /**
     * 请求BOSS副本操作
     * @param optId:1为进入 2为退出 3为购买次数
    */
    public sendBossFubenOpt(optId, bossid): void {
        let bytes: GameByteArray = this.getBytes(2);
        bytes.writeByte(optId);
        bytes.writeShort(bossid);
        this.sendToServer(bytes);
    }

    /**
     * 领取BOSS奖励
     */
    public sendRecieveAw(bossid): void {
        let bytes: GameByteArray = this.getBytes(4);
        bytes.writeShort(bossid);
        this.sendToServer(bytes);
    }

    private updatePgtBossInfo(bytes: GameByteArray): void {
        GameCache.pgtBoss.pgtBuy = bytes.readUnsignedByte();
        GameCache.pgtBoss.pgtChallenge = bytes.readUnsignedByte();
        let refreshTime = bytes.readUnsignedInt();
        refreshTime && (refreshTime = GlobalFun.formatMiniDateTime(refreshTime));
        GameCache.pgtBoss.pgtRefresh = refreshTime;
        let len = bytes.readUnsignedShort();
        let arr: PgtBossData[] = [];
        for (let i = 0; i < len; i++) {
            let cd = bytes.readUnsignedInt();
            cd && (cd = GlobalFun.formatMiniDateTime(cd));
            let hp = bytes.readUnsignedByte();
            let complete = bytes.readUnsignedByte();
            let bossid = bytes.readUnsignedShort();
            arr.push({ bossid: bossid, hp: hp, complete: complete, cd: cd });
        }
        GameCache.pgtBoss.updatePgtBossData(arr);
        App.MessageCenter.dispatch(MsgConst.PURGATORY_BOSS_UPDATE);
    }

    /**炼狱boss数据更新 */
    private updatePgtBossChallengeInfo(bytes: GameByteArray): void {
        GameCache.pgtBoss.pgtBuy = bytes.readByte();
        GameCache.pgtBoss.pgtChallenge = bytes.readByte();
        let refreshTime = bytes.readUnsignedInt();
        refreshTime && (refreshTime = GlobalFun.formatMiniDateTime(refreshTime));
        GameCache.pgtBoss.pgtRefresh = refreshTime;
        App.MessageCenter.dispatch(MsgConst.PURGATORY_BOSS_UPDATE);
    }

    /**
     * 购买炼狱boss次数
     * @returns void
     */
    public pgtBossBuy(): void {
        let bytes: GameByteArray = this.getBytes(22);
        this.sendToServer(bytes);
    }
}
