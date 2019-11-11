/*
 * @Description: 
 * @Author: xiejunwei
 * @Date: 2019-09-06 11:21:20
 * @LastEditTime: 2019-10-31 13:36:36
 */
class JingjiInfo extends BaseEuiWindow {
    public constructor() {
        super(LayerManager.UI_Main);
        this.skinName = "JingjiInfoSkin";

        this.top = 100;
        this.horizontalCenter = 1;
    }

    public tg: eui.Group;
    public time: NumberMC;

    public init(): void {
        super.init();
        this.time.gap = 15;
    }

    public open(param: ViewProp): void {
        super.open();
        let pro = GameCache.jingji.targetDetail;
        if (pro) {
            App.BattleManager.start(pro, this.getResult, this);
        }
        if (!App.TimerManager.isExists(this.countTime, this))
            App.TimerManager.addDelay(0, 1000, 0, this.countTime, this);
    }

    public close(param: ViewProp): void {
        super.close();
        App.TimerManager.remove(this.countTime, this);
        App.BattleManager.resetState();
        // GameCache.jingji.targetDetail = [];
    }

    private countTime(): void {
        let time = GameCache.copy.copyTime[GameCache.map.fbId];
        let delta = time - GameCache.server.serverTime;
        if (time) {
            this.tg.visible = true;
            let str = "";
            if (delta >= 0) {
                str = App.DateUtils.getFormatBySecond(delta / 1000, DateUtils.TIME_FORMAT_1);
                str = str.replace(/:/g, "s");
                this.time.value = str;
                return;
            } else {
                this.tg.visible = false;
                GlobalVar.autoOpenGroup.push([ViewConst.FAIL]);
            }
        } else {
            this.tg.visible = false;
            GlobalVar.autoOpenGroup.push([ViewConst.FAIL]);
        }
        App.TimerManager.remove(this.countTime, this);
    }

    public getResult(arg1, arg2): void {
        if (arg1 > 0 && arg2 > 0) return;
        if (arg1 > arg2) {
            let conf = GameConfig.jingji[GameCache.jingji.targetIdx];
            conf = conf ? conf : GameConfig.jingji["1"];
            GameCache.award.openAwardTips(conf.awardshow, AwardSourceType.JINGJI);
        } else {
            GlobalVar.autoOpenGroup.push([ViewConst.FAIL]);
            PassMgr.switchGj(true);
            // App.ViewManager.open(ViewConst.FAIL);
        }
        App.TimerManager.remove(this.countTime, this);
        let result = arg1 > arg2 ? 1 : 0;
        Proxy.other.sendResult(result);
    }

}