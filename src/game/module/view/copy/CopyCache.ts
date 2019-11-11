/*
 * @Description: 副本数据
 * @Author: xiejunwei
 * @Date: 2019-08-20 10:33:38
 * @LastEditTime: 2019-10-30 19:09:31
 */
class CopyCache extends BaseCache {
    public copyData: any;
    public copyEvaData: any;  //副本通关波数信息
    public copyTime: any;

    public buffBuy = [0, 0];

    public copyExpData: any;
    public copyExpBuyData: any;
    // public copyExpTime = [0, 0];    //经验副本时间
    // public copyExpWave = [0,0];     //经验副本波数数据

    public copyBuyData: any;

    public fashionCopyData: any;         //时装副本数据
    public recordItemArr: any[] = [];

    public constructor() {
        super();

        this.copyData = {};
        this.copyEvaData = {};
        this.copyTime = {};
        this.copyExpData = {};
        this.copyExpBuyData = {};
        this.copyBuyData = {};
        this.fashionCopyData = {};
    }

    clear() {
        this.copyData = {};
        this.copyEvaData = {};
        this.copyTime = {};
        this.buffBuy = [0, 0];
        this.copyExpData = {};
        this.copyExpBuyData = {};
        this.copyBuyData = {};
        this.fashionCopyData = {};
        this.recordItemArr = [];
    }

    public initCopyData(fbid, enter, free, sweep, limit?): void {
        if (!this.copyData[fbid]) {
            let conf = GameConfig.fuben[fbid];
            let obj = {
                id: fbid,           //副本ID
                enter: enter,       //累积已进入和扫荡次数
                totalLimit: limit,  //进入与扫荡上限总和
                free: free,         //剩余免费进入次数
                freeTimes: 0,       //免费进入上限
                sweep: sweep,        //剩余扫荡次数
                consumeTimes: 0,    //付费（扫荡）上限
                consumes: {}        //价格或付费道具
            }
            if (conf.enterCfg) {
                for (let i in conf.enterCfg[0]) {
                    obj[i] = conf.enterCfg[0][i];
                }
            }
            this.copyData[fbid] = obj;
        } else {
            this.copyData[fbid].enter = enter;
            this.copyData[fbid].free = free;
            this.copyData[fbid].sweep = sweep;
        }
    }

    public getCopyData(id) {
        return this.copyData[id] || null;
    }

    public initCopyEvaData(fbid, count): void {
        let conf: StdFuben = GameConfig.fuben[fbid];
        let eva = 0;
        let item;
        switch (conf.type) {
            case CopyType.MATERIAL:
                item = GameConfig.copyMaterials[fbid];
                eva = item.score[count - 1];
                break;
            case CopyType.FASHION:
                item = GameConfig.fashionCopy[fbid];
                eva = item.score[count - 1];
                break;
        }
        this.copyEvaData[fbid] = eva;
    }

    public openExitTips(skipTips = false, desc?): void {
        if (skipTips) {
            this.exitCopy();
            return;
        }
        let view = new ViewProp();
        let obj = {};
        let fbid = GameCache.map.fbId;
        let conf: StdFuben = GameConfig.fuben[fbid];
        desc = desc ? desc : conf.exitDec;
        obj["desc"] = desc ? desc : Language.lang.copyExit;
        obj["thisc"] = this;
        obj["func"] = this.exitCopy;
        view.exData1 = obj;
        App.ViewManager.open(ViewConst.SYSTIPS, view);
    }

    public exitCopy(): void {
        Proxy.copy.sendQuit(GameCache.map.fbId);
    }

    public getCopyExpId(): number[] {
        let roleLvl = GameCache.hero.mainPro.pro(PropId.AP_LEVEL);
        let conf = GameConfig.copyExp;
        let id = 0;
        let idx;
        for (let i in conf) {
            if (roleLvl <= conf[i].level[1] && roleLvl >= conf[i].level[0]) {
                id = conf[i].fubenId;
                idx = i;
                break;
            }
        }
        if (id == 0) {
            let max = Object.keys(conf).length;
            id = conf[max].fubenId;
            idx = max;
        }
        return [idx, id]
    }

    public getCopyExpBuyData() {
        let bought = this.copyExpBuyData ? this.copyExpBuyData.boughtCount : 0;
        let vipLvl = GameCache.vip.realValue();
        let vipConf = GameConfig.vip[vipLvl];
        let nextConf = GameConfig.vip[vipLvl + 1] ? GameConfig.vip[vipLvl + 1] : vipConf;
        let max = vipConf.expCopy;
        let next = nextConf.expCopy;
        return [max, bought, next];
    }

    public saveCopyEnterBuy(fbid, count_0, count_1): void {
        let copyConfig: StdFuben = GameConfig.fuben[fbid];
        switch (copyConfig.type) {
            case CopyType.FASHION:
                this.copyBuyData[GameConfig.globalConfig.fashionCopyId] = {
                    enterCount: count_0,
                    boughtCount: count_1
                }
                break;
            default:
                GameCache.copy.copyBuyData[fbid] = {
                    enableCount: count_0,
                    boughtCount: count_1
                }
                break;
        }
        App.MessageCenter.dispatch(MsgConst.COPY_COUNT);
    }

    public enterCopyExp(): void {
        let fbid = this.getCopyExpId()[1];
        Proxy.copy.sendEnterFB(fbid);
    }

    public openPassRank(myRank, arr): void {
        let view = new ViewProp();
        view.exData1 = {};
        view.exData1["title"] = "passRank";
        view.exData1["myRank"] = myRank;
        view.exData1["myValue"] = GameCache.hero.mainPro.pro(PropId.AP_CHKPOINT_LV) - 1;
        view.exData1["listData"] = arr;
        App.ViewManager.open(ViewConst.RANKB, view);
    }

    public getFashionCopyBuyData() {
        let fbid = GameConfig.globalConfig.fashionCopyId;
        let bought = this.copyBuyData[fbid] ? this.copyBuyData[fbid].boughtCount : 0;
        let vipLvl = GameCache.vip.realValue();
        let vipConf = GameConfig.vip[vipLvl];
        let nextConf = GameConfig.vip[vipLvl + 1] ? GameConfig.vip[vipLvl + 1] : vipConf;
        let max = vipConf.fashionCopyBuyNum;
        let next = nextConf.fashionCopyBuyNum;
        return [max, bought, next];
    }

    /**
     * 判读材料副本次数
     */
    public checkMaterial(): boolean {
        let roleLvl = GameCache.hero.mainPro.pro(PropId.AP_LEVEL);
        let conf = GameConfig.copyMaterials;
        for (let i in conf) {
            let cItem: StdCailiaocopy = conf[i];
            let data = GameCache.copy.getCopyData(i);
            if (cItem.level > roleLvl) continue;
            if (!data) return true;
            if (data.free) return true;
        }
        return false;
    }

    /**
     * 判断经验副本次数
     */
    public checkCopyExp(): boolean {
        let dataArr = GameCache.copy.getCopyExpId();
        let conf = GameConfig.copyExp[dataArr[0]];
        let fbid = dataArr[1];
        let expConf = GameConfig.fuben[fbid];
        let data = this.copyExpBuyData ? this.copyExpBuyData : null;
        let boughtCount = data && data.boughtCount ? data.boughtCount : 0
        let enterCount = data && data.enterCount ? data.enterCount : 0
        let count = boughtCount + expConf.enterCfg[0].freeTimes - enterCount;
        if (count <= 0) return false;
        let itemCount = GameCache.bag.itemCount(conf.consume[0].id);
        return itemCount >= conf.consume[0].count;
    }

    public exitFashionCopy(): void {
        this.recordItemArr = [];
        PassMgr.switchGj(true);
    }
}
