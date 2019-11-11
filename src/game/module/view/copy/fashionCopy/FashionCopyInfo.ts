/*
 * @Description: 时装副本信息
 * @Author: xiejunwei
 * @Date: 2019-10-28 14:07:56
 */
class FashionCopyInfo extends BaseEuiWindow {
    public constructor() {
        super(LayerManager.UI_Main);
        this.skinName = "FashionCopyInfoSkin"
        this.top = 120;
        this.right = 0;
    }

    public eva: eui.Image;
    public wave: NumberMC;
    public time: NumberMC;

    public init(): void {
        super.init();
    }

    public open(param: ViewProp): void {
        super.open();
        this.message(MsgConst.COPY_EVALUATION, this.initEva);
        this.message(MsgConst.COPY_TIME, this.startCount);
        this.wave.value = 1;
        this.startCount();
        this.eva.source = `copyInfo_json.copyInfo_${5}_png`;
    }

    public close(param: ViewProp): void {
        super.open();
    }

    private initEva(count, copyId): void {
        let conf = GameConfig.fashionCopy[copyId];
        let eva = conf.score[count - 1];
        this.eva.source = `copyInfo_json.copyInfo_${eva}_png`;
        this.wave.value = count;
    }

    private startCount(): void {
        if (App.TimerManager.isExists(this.initTime, this))
            App.TimerManager.remove(this.initTime, this);
        App.TimerManager.addDelay(0, 1000, 0, this.initTime, this);
    }

    private initTime(): void {
        let id = GameCache.map.fbId
        let time = GameCache.copy.copyTime[id];
        let serverTime = GameCache.server.serverTime;
        time = time ? time - serverTime : 0;
        time = time < 0 ? 0 : time;
        let str = "";
        if (!time || time == null) str = "00s00s00";
        time = time / 1000;
        str = App.DateUtils.getFormatBySecond(time, DateUtils.TIME_FORMAT_1);
        str = str.replace(/:/g, "s");
        this.time.value = str;
        if (time <= 0) {
            App.TimerManager.remove(this.initTime, this);
            return;
        }
    }


}
