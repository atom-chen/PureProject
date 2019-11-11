/*
 * @Description: Bosss数据处理
 * @Author: xiejunwei
 * @Date: 2019-07-30 19:10:13
 * @LastEditTime: 2019-10-31 16:50:12
 */
class BossCache extends BaseCache {

    public bossData;
    public currentBossId: number;
    public worldEnterCount: any;  //进入次数相关结构
    public bossHintGroup: number[] = [];
    private reviveGroup: any;

    public constructor() {
        super();
        this.worldEnterCount = {};
        this.bossData = {};
        this.reviveGroup = {};
    }

    clear() {
        this.bossData = {};
        this.worldEnterCount = {};
        App.TimerManager.remove(this.refleshFunc, this);
        this.currentBossId = 0;
        this.reviveGroup = {};
    }

    public refleshWorldBossData(): void {
        if (!App.TimerManager.isExists(this.refleshFunc, this))
            App.TimerManager.addDelay(0, 200, 1, this.refleshFunc, this);
    }

    private refleshFunc(): void {
        Proxy.boss.sendBossInfo();
    }

    /**判断是否在世界BOSS地图 */
    public isWorldBossMap(): boolean {
        let mapId = GameCache.map.mapId;
        let conf = GameConfig.worldBoss;
        switch (GameCache.map.mapConfig.type) {
            case 1:
                conf = GameConfig.worldBoss;
                break;
            case 9:
                conf = GameConfig.vipBoss;
                break;
        }
        for (let i in conf) {
            if (conf[i].scenceid == mapId) {
                this.currentBossId = conf[i].entityid;
                return true;
            }
        }
        return false;
    }

    public openExitTips(skipTips = false, desc = Language.lang.exitWorldBoss): void {
        if (skipTips) {
            this.exit();
            return;
        }
        let view = new ViewProp();
        let obj = {};
        let fbid = GameCache.map.fbId;
        let conf: StdFuben = GameConfig.fuben[fbid];
        desc = desc ? desc : conf.exitDec;
        obj["desc"] = desc;
        obj["thisc"] = this;
        obj["func"] = this.exit;
        view.exData1 = obj;
        App.ViewManager.open(ViewConst.SYSTIPS, view);
    }

    public exit(): void {
        Proxy.boss.sendBossFubenOpt(2, GameCache.boss.currentBossId);
    }

    public addWorldBossINfo(): void {
        this.isWorldBossMap();
        App.ViewManager.open(ViewConst.WBINFO);
    }

    public removeWorldBossINfo(): void {
        if (App.ViewManager.isShow(ViewConst.WBINFO))
            App.ViewManager.close(ViewConst.WBINFO);
    }
    /**
     * index 从零开始
    */
    public getRemindSet(index, type = SettingType.BOSS_REMIND): boolean {
        let v = GameCache.settings.getValue(type);
        return ((v >> index) & 1) != 1;
    }

    public setRemindSet(index, sel: boolean, type = SettingType.BOSS_REMIND) {
        let vale = sel ? 0 : 1;
        let v = GameCache.settings.getValue(type);

        v = v & (0xffffffff - (1 << index));
        if (vale == 1) {
            v += (1 << index);
        }
        GameCache.settings.update(type, v, true);
    }

    /**
     * 打开奖励面板
     * @param type 1时，为归属奖，2为参与奖
     */
    public openAwardTips(arr: number[] = [], type = 2, state?): void {
        if (!App.ViewManager.isShow(ViewConst.AWARDTIPS)) {
            let obj = {};
            obj["state"] = state ? state : "boss";
            obj["func"] = this.recvAward;
            obj["itemArr1"] = type == 1 ? arr : [];
            obj["itemArr"] = type == 2 ? arr : [];
            let view = new ViewProp();
            view.firData = obj;
            App.ViewManager.open(ViewConst.AWARDTIPS, view);
        } else {
            let view = App.ViewManager.getView(ViewConst.AWARDTIPS);
            view["setList"](type, arr);
        }
    }

    public recvAward(): void {
        Proxy.boss.sendRecieveAw(GameCache.boss.currentBossId);
        Proxy.boss.sendBossFubenOpt(2, GameCache.boss.currentBossId);
    }

    /**判断BOSS是否在复活中 */
    public isReviving(conf, time, idx, hp): void {
        // let delta = (GameCache.server.serverTime - time)
        // let remain = conf.time * 1000 - delta;
        let remain = time - GameCache.server.serverTime;
        if (remain >= 0 && hp == 0) {
            this.reviveGroup[conf.id] = [time, idx, conf.conds];

        } else {
            if (this.reviveGroup[conf.id]) delete this.reviveGroup[conf.id];
        }
        if (!App.TimerManager.isExists(this.countDown, this))
            App.TimerManager.addDelay(0, 3000, 0, this.countDown, this);
    }

    private countDown(): void {
        if (!Object.keys(this.reviveGroup).length) {
            App.TimerManager.remove(this.countDown, this);
        } else {
            for (let i in this.reviveGroup) {
                let curTime = GameCache.server.serverTime
                let result = GameCache.boss.getRemindSet(this.reviveGroup[i][1]);
                let rolelvl = GameCache.hero.mainPro.pro(PropId.AP_LEVEL);
                if (this.reviveGroup[i][0] - curTime < 3000 && this.reviveGroup[i][0] - curTime >= 0) {
                    if (result && (this.reviveGroup[i][2] <= rolelvl)) {
                        this.bossHintGroup.push(parseInt(i));
                        if (!App.ViewManager.isShow(ViewConst.WBREVIVE) && GameCache.map.mapConfig.type == SceneType.NORMAL_FIELD) App.ViewManager.open(ViewConst.WBREVIVE);
                    }
                } else if (this.reviveGroup[i][0] - curTime < 0) {
                    delete this.reviveGroup[i];
                }
            }
        }
    }

    public getWorldBossBuyMax(): number[] {
        let vipLvl = GameCache.vip.realValue();
        let conf = GameConfig.vip[vipLvl];
        let nextConf = GameConfig.vip[vipLvl + 1] ? GameConfig.vip[vipLvl + 1] : conf;
        let obj = this.worldEnterCount ? this.worldEnterCount : null;
        let max = conf.WorldBoss;
        return [max, obj.limit, nextConf.WorldBoss];
    }

    /**
     * 判断世界BOSS进入   
     */
    public getEnableEnterWB(): boolean {
        let data = GameCache.boss.worldEnterCount;
        let c = data && data.count ? data.count : 0;
        let a = GameConfig.globalConfig.worldBossNum;
        let remain = a + data.buyCount - c;
        return remain > 0;
    }
}
