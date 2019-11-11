/*
 * @Description: VIPBOSS条目
 * @Author: xiejunwei
 * @Date: 2019-09-20 11:41:35
 */
class VipBossItem extends BaseCustComponent {
    public constructor() {
        super();
    }

    public lImg: eui.Image;
    public hp: eui.ProgressBar;
    public check: eui.CheckBox;
    public fImg: eui.Image;
    public enterBtn: eui.Button;
    public fName: eui.Label;
    public mLvl: eui.Label;
    public lLvl: eui.Label;
    public mImg: eui.Image;
    public mName: eui.Label;
    public item_0: GSItem;
    public item_1: ItemBase;
    public item_2: ItemBase;
    public rTime: eui.Label;
    public labelDisplay: eui.Label;
    public icon: eui.Image;
    public lG: eui.Group;

    private time: SecondCountDown;

    protected childrenCreated(): void {
        super.childrenCreated();
        this.addTouchEvent(this.enterBtn, this.enterFunc);
        this.addTouchEvent(this.check, this.onCheck);
        this.check.selected = false;
        this.time = new SecondCountDown();
        this.time.addCallBack(this.initTime, this);
        this.time.addLabel(this.rTime, Language.lang.reviveTime, DateUtils.TIME_FORMAT_1);
    }

    protected dataChanged(): void {
        super.dataChanged();
        if (!this.data.id) return;
        this.time.time = 0;
        this.stateJuge();
        this.initData();
        this.autoHint();
    }

    public dispose(): void {
        super.dispose();
    }


    private initData(): void {
        let mConfig = GameConfig.monster[this.data.id];
        if (!mConfig) return;
        this.mName.text = mConfig.name;
        this.mLvl.text = mConfig.level;
        if (this.data.hp == 0) {
            this.icon.source = RES_DIR_MONSTERICON + mConfig.icon + "d.png";
        } else {
            this.icon.source = RES_DIR_MONSTERICON + mConfig.icon + ".png";
        }
        this.item_0.data = this.data.conf.reward_show[0];
        this.item_1.data = this.data.conf.reward_show[1];
        this.item_2.data = this.data.conf.reward_show[2];
        this.setProgess();

        //首杀显示
        this.fName.text = this.data.kname;
        if (this.data.kname == "") {
            this.fName.visible = false;
            this.fImg.visible = false;
        } else {
            this.fName.visible = true;
            this.fImg.visible = true;
        }
    }

    private setProgess(): void {
        this.hp.maximum = 100;
        this.hp.value = this.data.hp;
        let str = this.data.hp + "%";
        this.labelDisplay.text = str;
    }

    //BOSS复活判断，进入等级判断
    private stateJuge(): void {
        let conf = this.data.conf;
        let time = Math.floor((this.data.reviveTime - GameCache.server.serverTime) / 1000);
        // let time = conf.time - Math.floor((GameCache.server.serverTime - this.data.killTime) / 1000);
        this.rTime.visible = false;
        let vipLvl = GameCache.vip.realValue();
        let roleLvl = GameCache.hero.mainPro.pro(PropId.AP_LEVEL);
        // this.lLvl.visible = false;
        // this.lImg.visible = false;
        this.lG.visible = false;
        this.enterBtn.visible = true;
        this.check.visible = true;
        if (vipLvl < this.data.conf.conds || roleLvl < this.data.conf.levelConds) {
            this.rTime.visible = false;
            this.enterBtn.visible = false;
            // this.lLvl.visible = true;
            // this.lImg.visible = true;
            this.lG.visible = true;
            this.check.visible = false;
            this.lLvl.text = StringUtils.substitute(Language.lang.vipBoss_1, this.data.conf.levelConds, this.data.conf.conds);
        } else if (time > 0 && this.data.killTime != 0 && this.data.hp == 0) {
            this.rTime.visible = true;
            this.enterBtn.visible = false;
            this.time.time = time;
        }
    }

    private initTime(t): void {
        if (t <= 0) {
            App.TimerManager.remove(this.initTime, this);
            GameCache.boss.refleshWorldBossData();
            return;
        }
    }

    private enterFunc(): void {
        GameCache.boss.currentBossId = this.data.id;
        Proxy.boss.sendBossFubenOpt(1, this.data.id);
        App.ViewManager.close(ViewConst.BOSS);
    }

    private autoHint(): void {
        let roleLvl = GameCache.hero.mainPro.pro(PropId.AP_LEVEL);
        let result = GameCache.boss.getRemindSet(this.data["index"]);
        if (roleLvl < this.data.conf.conds) {
            if (result) {
                this.check.selected = false;
            }
        } else {
            this.check.selected = GameCache.boss.getRemindSet(this.data["index"]);
        }
    }

    private onCheck(): void {
        GameCache.boss.setRemindSet(this.data["index"], this.check.selected, SettingType.VIP_BOSS_REMIND);
    }

}