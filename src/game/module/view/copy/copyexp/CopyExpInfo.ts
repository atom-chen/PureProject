/*
 * @Description: 经验副本信息面板
 * @Author: xiejunwei
 * @Date: 2019-09-02 13:42:40
 * @LastEditTime: 2019-10-30 14:27:17
 */
class CopyExpInfo extends BaseEuiWindow {
    public constructor() {
        super(LayerManager.UI_Main);
        this.skinName = "CopyExpInfoSkin";

        this.top = 100;
        this.right = 0;
        this.bottom = 0;
        this.left = 0;
    }

    public iG: eui.Group;
    public num: NumberMC;
    public wave: NumberMC;
    public btnGroup: eui.Group;
    public tG: eui.Group;
    public vip: eui.Label;
    public total: eui.Label;
    public timeNum: NumberMC;
    public killNum: NumberMC;

    public init(): void {
        super.init();
        this.timeNum.gap = 23;
    }

    public open(param: ViewProp): void {
        super.open();
        this.message(MsgConst.COPY_EXP_TIME, this.beginCountDown);
        this.message(MsgConst.COPY_EXP_WAVE, this.initWave);
        this.message(MsgConst.COPY_EXP_INCOME, this.initIcome);
        this.beginCountDown();
        this.initIcome();
        this.initWave();
    }

    public close(param: ViewProp): void {
        super.close();
        App.TimerManager.remove(this.timeCount, this);
        GameCache.copy.copyExpData = {};
    }

    private time = [];
    private beginCountDown(): void {
        this.time = GameCache.copy.copyExpData["time"];
        if (!this.time) return;
        if (!App.TimerManager.isExists(this.timeCount, this))
            App.TimerManager.addDelay(0, 1000, 0, this.timeCount, this);
    }

    private timeCount(): void {
        let delta_0 = this.time[0] - GameCache.server.serverTime;
        let delta_1 = this.time[1] - GameCache.server.serverTime;
        let total = this.time[2] - GameCache.server.serverTime;
        if (total >= 0) {
            let str = "";
            if (delta_0 > 0) {
                this.tG.visible = true;
                this.timeNum.value = Math.floor(delta_0 / 1000);
                str = App.DateUtils.getFormatBySecond(this.time[3]);
            } else {
                this.tG.visible = false;
                str = App.DateUtils.getFormatBySecond(total / 1000);
            }
            str = str.replace(/:/g, "s");
            this.num.value = str;
        } else {
            App.TimerManager.remove(this.timeCount, this);
        }
    }

    private initWave(): void {
        let waveNum = GameCache.copy.copyExpData["wave"];
        if (!waveNum) {
            let conf = GameConfig.copyExp;
            let fbid = GameCache.map.fbId;
            for (let i in conf) {
                if (conf[i].fubenId == fbid) {
                    waveNum = [1, conf[i].monsterInfo.length];
                    break;
                }
            }
        }
        this.wave.value = waveNum[0] + "l" + waveNum[1];
    }

    private initIcome(): void {
        let income = GameCache.copy.copyExpData["exp"];
        income = income ? income : 0;
        let str = GlobalFun.numCut(income);
        this.total.textFlow = TextFlowUtils.generateTextFlow(StringUtils.substitute(Language.lang.expIcome, str));

        let killNum = GameCache.copy.copyExpData["killCount"];
        killNum = killNum ? killNum : 0;
        this.killNum.value = killNum + "";
    }

}
