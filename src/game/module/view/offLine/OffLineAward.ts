/*
 * @Description: 离线奖励面板
 * @Author: xiejunwei
 * @Date: 2019-08-28 17:32:33
 * @LastEditTime: 2019-10-21 19:37:38
 */
class OffLineAward extends BaseEuiWindow {
    public constructor() {
        super(LayerManager.UI_Tips);
        this.skinName = "OffLineAwardSkin";
    }

    public time: eui.Label;
    public t0: eui.Label;
    public t1: eui.Label;
    public t2: eui.Label;
    public t3: eui.Label;
    public t4: eui.Label;
    public g0: eui.Label;
    public g1: eui.Label;
    public e0: eui.Label;
    public e1: eui.Label;
    public i0: eui.Label;
    public i1: eui.Label;
    public full: eui.Label;
    public vipBtn:eui.Button;

    protected init(): void {
        super.init();
    }

    public open(param: ViewProp): void {
        super.open();
        this.addTouchEvent(this.vipBtn,this.vipFunc);

        for (let i = 0; i < 3; i++) {
            (this[`t${i}`] as eui.Label).text = Language.lang.offLineText[i];
        }
        let obj: { coin, exp, eq, melt, full, offLineTime } = param.firData;
        let vipLvl = GameCache.vip.realValue();
        let conf = GameConfig.vip[vipLvl + 1];
        this.currentState = conf ? "nor" : "max";
        this.g0.text = GlobalFun.numCut(obj.coin);
        this.e0.text = GlobalFun.numCut(obj.exp);
        this.i1.text = this.i0.text = GlobalFun.numCut(obj.eq);
        if (conf) {
            this.t4.textFlow = TextFlowUtils.generateTextFlow(StringUtils.substitute(Language.lang.offLineText[4], vipLvl+1));
            this.g1.text = GlobalFun.numCut((obj.coin * (1 + conf.goldadd / 10000)));
            this.e1.text = GlobalFun.numCut((obj.exp * (1 + conf.expadd / 10000)));
        }
        this.full.visible = obj.full;
        if (obj.full) {
            this.full.text = obj.melt ? StringUtils.substitute(Language.lang.offLineBag[1], obj.melt) : Language.lang.offLineBag[0];
        }
        let serverTime = GameCache.server.serverTime;
        let deltaTime = Math.ceil((serverTime - obj.offLineTime) / 1000);
        let str = App.DateUtils.getFormatBySecond(deltaTime, DateUtils.TIME_FORMAT_5);
        this.time.text = str;
    }


    private vipFunc():void{
        // GlobalFun.gotoCharge();
        App.ViewManager.open(ViewConst.VIP);
        this.closeView();
    }
}