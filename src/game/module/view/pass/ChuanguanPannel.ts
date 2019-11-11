/*
 * @Description: 
 * @Author: moyusheng
 * @Date: 2019-10-08 11:31:51
 * @LastEditTime: 2019-10-30 19:29:21
 */
/**
 * create by junwei on 7/11/2019
 * 闯关面板
 */
class ChuangguanPannel extends BaseEuiWindow {
    public constructor() {
        super();
        this.skinName = "ChuangguanPannelSkin";
    }

    public rankWin: eui.Image;
    public fName: eui.Label;
    public passDone: eui.Image;
    public spG: eui.Group;
    // public recvBtn: eui.Button;
    public revLb: eui.Label;
    public item: ItemBase;
    private itemEff: MovieClip;
    public mModel: UIAvatar;
    public num: NumberMC;
    public progress: eui.ProgressBar;
    public enterBtn: eui.Button;
    public awGroup: eui.Group;
    public bossBg: eui.Image;

    private level: number = 1;

    protected init(): void {
        super.init();
        this.num.type = "num_num_";
    }

    public open(param: ViewProp): void {
        super.open();
        this.addTouchEvent(this.enterBtn, this.enterFunc);
        this.addTouchEvent(this.rankWin, this.openRank);
        // this.addTouchEvent(this.recvBtn, this.recvFunc);
        this.message(MsgConst.PROPERTY + PropId.AP_CHKPOINT_AWARD_LV, this.initData);
        this.message(MsgConst.PROPERTY + PropId.AP_CHKPOINT_LV, this.initData);
        this.message(MsgConst.PASS_RANK_INFO, this.initRank);
        this.level = GameCache.pass.level ? GameCache.pass.level : 1;
        // this.level = 1;
        this.initData();
        Proxy.copy.sendPassRank(1);
    }

    public close(param: ViewProp): void {
        super.close();
    }

    public dispose(): void {
        super.dispose();
        this.itemList.dispose();
        this.itemEff && this.itemEff.dispose();
        this.itemEff = null;
    }

    private initData(): void {
        this.num.value = this.level;
        // let bossConfig = GameConfig.passBOSS[this.level];
        let bossid = PassMgr.getPassBossData();
        let bossCfg = PassMgr.getPassBossCfg();
        if (bossid) {
            let boss = GameConfig.monster[bossid];
            if (boss) this.mModel.showMonster(boss.modelid);
            this.bossBg.source = `${RES_DIR_BG}passBg${bossCfg.backpic}.jpg`;
        }

        this.initAw();
        this.initProgress();
    }

    private itemList: ItemList;
    private initAw(): void {
        let awArr = PassMgr.getPassAward(true);

        if (!this.itemList) {
            this.itemList = ObjectPool.get(ItemList);
        }
        this.itemList.setData(awArr, this.awGroup);
    }

    private initProgress(): void {
        let proMax = 0;
        let conf = GameConfig.passSpAw;
        let spID = GameCache.hero.mainPro.pro(PropId.AP_CHKPOINT_AWARD_LV);
        let spLvl = conf[spID] && conf[spID].barrier ? conf[spID].barrier : 0;
        for (let i in conf) {
            if (spLvl < conf[i].barrier) {
                proMax = conf[i].barrier;
                this.item.data = conf[i].showAwards[0];
                break;
            }
        }
        this.progress.maximum = proMax;
        this.progress.value = this.level - 1 <= 0 ? 0 : this.level - 1;
        this.initSpAw();
        //预留未领取处理
    }

    private initSpAw(): void {
        let conf = GameConfig.passSpAw;
        let maxLen = Object.getOwnPropertyNames(conf).length;
        let spID = GameCache.hero.mainPro.pro(PropId.AP_CHKPOINT_AWARD_LV);
        let spLvl = conf[spID] && conf[spID].barrier ? conf[spID].barrier : 0;
        this.passDone.visible = false;
        this.spG.visible = true;
        for (let i in conf) {
            let spConfig = conf[i];
            if (this.progress.value >= spConfig.barrier) {
                if (spLvl < spConfig.barrier) {
                    this.progress.visible = false;
                    if (!this.itemEff) {
                        this.itemEff = MovieClip.create();
                        this.item.addChild(this.itemEff);
                        this.itemEff.x = 40;
                        this.itemEff.y = 40;
                    }
                    this.itemEff.loadFile(`${RES_DIR_EFF}petselect_0_1`, -1);
                    this.revLb.visible = true;
                    this.item.setHandler(this, this.recvFunc);
                    return;
                }
            }
        }
        this.progress.visible = true;
        this.revLb.visible = false;
        this.itemEff && this.itemEff.dispose();
        this.itemEff = null;
        this.item.disposeHandler();
        if (conf[`${maxLen}`].barrier <= spLvl) {
            this.spG.visible = false;
            this.passDone.visible = true;
        }
    }

    private initRank(arr): void {
        this.fName.text = arr && arr[0] ? arr[0].roleName : "";
    }

    private enterFunc(): void {
        let delta = PassMgr.isComplete()
        if (delta <= 0 && GameCache.map.mapId == GlobalVar.GUAJI_SCENE) {
            Proxy.copy.sendPassEnter();
        } else {
            GlobalFun.SysMsg("还需击杀" + delta + "只怪");
            return;
        }
        //进入BOSS场景
        App.ViewManager.close(ViewConst.CHUANGGUAN);
    }

    private recvFunc(): void {
        Proxy.copy.sendGetAward(GlobalVar.GUAJI_SCENE, 1);
    }

    private openRank(): void {
        GameCache.copy.openPassRank(0, []);
        Proxy.copy.sendPassRank();
    }
}