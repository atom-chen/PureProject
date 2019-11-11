/*
 * @Description: 经验副本BUFF购买
 * @Author: xiejunwei
 * @Date: 2019-09-02 17:42:30
 * @LastEditTime: 2019-09-18 14:27:15
 */
class CopyExpBuffBuy extends BaseEuiWindow {
    public constructor() {
        super(LayerManager.UI_Tips);
        this.skinName = "CopyExpBuyBuffSkin";
    }

    public bg: BaseWinBg;
    public g0: eui.Group;
    public sele_0: eui.Image;
    public bg_0: eui.Image;
    public title_0: eui.Image;
    public g1: eui.Group;
    public sele_1: eui.Image;
    public bg_1: eui.Image;
    public title_1: eui.Image;
    public icon_0: eui.Image;
    public cost_0: eui.Label;
    public icon_1: eui.Image;
    public cost_1: eui.Label;
    public num: NumberMC;
    public c0: eui.Label;
    public c1: eui.Label;
    public t0: eui.Label;
    public buyBtn:eui.Button;

    private toggle: number = 0;

    public init(): void {
        super.init();
        this.num.gap = 15;
    }

    public open(param: ViewProp): void {
        super.open();
        this.message(MsgConst.COPY_BUFF_COUNT, this.initCount);
        this.addTouchEvent(this.g1, this.onTouche);
        this.addTouchEvent(this.g0, this.onTouche);
        this.addTouchEvent(this.buyBtn,this.buyFunc);
        this.initCount();
        this.onTouche();
        this.bg.setNameImg("inspire");

        let conf: StdGlobalconfig = GameConfig.globalConfig;
        this.cost_0.text = StringUtils.substitute(Language.lang.inspire_1, conf.coinInspireConsume);
        this.cost_1.text = StringUtils.substitute(Language.lang.inspire_1, conf.goldInspireConsume);
        this.num.value = "10%";
    }


    private onTouche(e?: egret.TouchEvent) {
        let tar = e ? parseInt(e.target.name) : 0;
        this.toggle = tar;
        this.sele_0.visible = this.toggle == 0;
        this.sele_1.visible = !this.sele_0.visible;
    }

   

    public buyFunc(): void {
        let conf: StdGlobalconfig = GameConfig.globalConfig;
        let have = 0;
        if (this.toggle == 0) {
            have = GameCache.hero.mainPro.pro(PropId.AP_COIN);
            if (have < conf.coinInspireConsume) {
                GlobalFun.SysMsg(StringUtils.substitute(Language.lang.notEnought, Language.lang.coin));
                return;
            }
        } else {
            have = GameCache.hero.mainPro.pro(PropId.AP_YUANBAO);
            if (have < conf.goldInspireConsume) {
                GlobalFun.SysMsg(StringUtils.substitute(Language.lang.notEnought, Language.lang.yb));
                //预留充值跳转
                GlobalFun.gotoCharge();
                return;
            }
        }
        Proxy.copy.sendBuyBuff(this.toggle);
    }

    public initCount(): void {
        let arr = GameCache.copy.buffBuy ? GameCache.copy.buffBuy : [0, 0];
        let conf: StdGlobalconfig = GameConfig.globalConfig;
        this.c0.text = StringUtils.substitute(Language.lang.inspire_0, arr[0], conf.coinInspireCount);
        this.c1.text = StringUtils.substitute(Language.lang.inspire_0, arr[1], conf.goldInspireCount);
        let total = (arr[0] + arr[1]) * 10;
        this.t0.x = total == 100 ? 137 : 146;
        this.t0.textFlow = TextFlowUtils.generateTextFlow(StringUtils.substitute(Language.lang.inspire_2, total));
    }
}