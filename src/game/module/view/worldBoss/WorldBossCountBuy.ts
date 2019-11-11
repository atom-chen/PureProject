/*
 * @Description: 次数购买
 * @Author: xiejunwei
 * @Date: 2019-08-13 22:40:48
 * @LastEditTime: 2019-08-23 16:46:16
 */
class WorldBossCountBuy extends BaseEuiWindow {
    public constructor() {
        super(LayerManager.UI_Tips);
        this.skinName = "WorldBossCountBuySkin";
    }

    public bg: BaseWinBg;
    public numSele: NumSelect;
    public btn_0: eui.Button;
    public btn_1: eui.Button;
    public cost: ItemExpend;
    public max: eui.Label;

    public init(): void {
        super.init();
    }

    public open(param: ViewProp): void {
        super.open();
        this.message(MsgConst.WORLDBOSS_COUNT, this.initData);
        this.addTouchEvent(this.numSele, this.onTouche);
        this.addTouchEvent(this.btn_0, this.buyFunc);
        this.initData();
    }

    private initData(): void {
        let obj = GameCache.boss.worldEnterCount ? GameCache.boss.worldEnterCount : null;
        let max = obj ? 10 - obj.buyCount : 10;
        this.max.text = "今日尚可购买"+max+"次";
        this.numSele.initData(10 - obj, 1);
        this.cost.setData(GlobalVar.GOLD, 5 * 1);
    }

    private onTouche(): void {
        this.cost.setData(GlobalVar.GOLD, 5 * this.numSele.num);

    }


    private buyFunc(): void {
        Proxy.boss.sendBossFubenOpt(3, 29);
        this.closeView();
    }
}