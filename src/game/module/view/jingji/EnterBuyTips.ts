/*
 * @Description: 通用次数购买
 * @Author: xiejunwei
 * @Date: 2019-09-18 11:11:47
 */
class EnterBuyTips extends BaseEuiWindow {
    public constructor() {
        super(LayerManager.UI_Tips);
        this.skinName = "WorldBossCountBuySkin";
    }

    public bg: BaseWinBg;
    public cost: ItemExpend;
    public num_0: NumberMC;
    public num_1: NumberMC;
    public max: eui.Label;
    public max_1: eui.Label;
    public btn_0: eui.Button;
    public btn_1: eui.Button;

    private limit: number = 0;

    private hand: Handler;

    public init(): void {
        super.init();
        this.num_0.gap = this.num_1.gap = 30;
        this.cost.lab.textColor = 0x3e1700;
        // this.cost.numColor_0 = 0x0cff00;
    }

    public open(param: ViewProp): void {
        super.open();
        this.addTouchEvent(this.btn_0, this.buyFunc);
        this.addTouchEvent(this.btn_1, this.closeView);
        this.cost.setData(GlobalVar.GOLD, param.firData["price"]);
        if (this.hand) {
            this.hand.dispose();
        }
        this.hand = Handler.create(param.firData["thisc"], param.firData["func"], param.firData["arg"], false);

        let vipLvl = GameCache.vip.realValue();
        let lvlMax = GameConfig.vip[vipLvl + 1] ? false : true;

        this.num_0.value = vipLvl;
        this.num_1.value = vipLvl + 1;

        let remain = param.firData["max"][0] - param.firData["max"][1];
        let color = remain > 0 ? 0x0cff00 : 0xff0000;
        this.max.textFlow = TextFlowUtils.generateTextFlow(StringUtils.substitute(Language.lang.buyRemian, `<(c${color})${remain}/${param.firData["max"][0]}>`));
        if (lvlMax) {
            this.currentState = "max";
        } else {
            this.currentState = "nor";
            this.max_1.textFlow = TextFlowUtils.generateTextFlow(StringUtils.substitute(Language.lang.buyRemian, `<(c0x0cff00)${param.firData["max"][2]}>`));
        }
    }

    private buyFunc(): void {
        if (this.cost.isExpend) {
            this.hand.run();
        } else {
            GlobalFun.gotoCharge();
        }
        this.closeView();
    }

    public close(param: ViewProp): void {
        super.close();
        if (this.hand) {
            this.hand.dispose();
            this.hand = null;
        }
    }

}