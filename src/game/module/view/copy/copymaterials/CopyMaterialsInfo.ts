/*
 * @Description: 材料副本信息面板
 * @Author: xiejunwei
 * @Date: 2019-08-22 11:10:14
 * @LastEditTime: 2019-10-28 20:25:09
 */
class CopyMaterialsInfo extends BaseEuiWindow {
    public constructor() {
        super(LayerManager.UI_Main);
        this.skinName = "CopyMaterialsInfoSkin";
        this.top = 120;
        this.right = 0;
    }

    public exitBtn: eui.Button;
    public eva: eui.Image;
    public num: NumberMC;
    public txt_0: eui.Label;
    public txt_1: eui.Label;

    public fbid: number = 0;

    protected init(): void {
        super.init();
        this.num.gap = 14;
    }

    public open(param: ViewProp): void {
        this.message(MsgConst.COPY_EVALUATION, this.initEva);
        this.message(MsgConst.COPY_TIME, this.startCount);
        this.addTouchEvent(this.exitBtn, this.openExitTips);
        this.fbid = GameCache.map.fbId;
        this.initData();
        this.startCount();
    }

    public close(param: ViewProp): void {
        super.close();
        App.TimerManager.removeAll(this);
    }

    private initData(): void {
        let fbid = GameCache.map.fbId;
        let conf = GameConfig.copyMaterials[fbid];
        this.eva.source = "copymaterials_json.copymaterials_5_png";
        let aw = conf.awarddec[0];
        let item: StdItem = GameConfig.item[aw.id];
        this.txt_0.textFlow = TextFlowUtils.generateTextFlow(StringUtils.substitute(Language.lang.copyAward_0, item.name, aw.count));
        this.txt_1.textFlow = TextFlowUtils.generateTextFlow(StringUtils.substitute(Language.lang.copyAward_1, "30%"));
    }

    private openExitTips(): void {
        GameCache.copy.openExitTips();
    }

    private initEva(count: number): void {
        let fbid = GameCache.map.fbId;
        let conf: StdCailiaocopy = GameConfig.copyMaterials[fbid];
        this.eva.source = "copymaterials_json.copymaterials_" + conf.score[count - 1] + "_png";;
        count = count - 1 <= 0 ? 0 : count - 1;
        let aw = conf.awarddec[count];
        let item: StdItem = GameConfig.item[aw.id];
        this.txt_0.textFlow = TextFlowUtils.generateTextFlow(StringUtils.substitute(Language.lang.copyAward_0, item.name, aw.count));
    }

    private initTime(): void {
        let time = GameCache.copy.copyTime[this.fbid];
        let serverTime = GameCache.server.serverTime;
        time = time ? time - serverTime : 0;
        time = time < 0 ? 0 : time;
        let str = "";
        if (!time || time == null) str = "00s00s00";
        time = time / 1000;
        str = App.DateUtils.getFormatBySecond(time, DateUtils.TIME_FORMAT_1);
        str = str.replace(/:/g, "s");
        this.num.value = str;
        if (time <= 0) {
            App.TimerManager.remove(this.initTime, this);
            return;
        }
    }

    private startCount(): void {
        if (App.TimerManager.isExists(this.initTime, this))
            App.TimerManager.remove(this.initTime, this);
        App.TimerManager.addDelay(0, 1000, 0, this.initTime, this);
    }

}
