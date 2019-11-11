/*
 * @Description: 幸运抽奖
 * @Author: liangzhaowei
 * @Date: 2019-08-20 14:32:19
 * @LastEditTime: 2019-10-10 19:18:49
 */


class LuckyDail extends BaseEuiWindow {
    public constructor() {
        super(LayerManager.UI_Tips);
        this.skinName = "LuckyDailSkin";
    }

    public g1: eui.Group;
    public item_1: DailItem;
    public item_5: DailItem;
    public item_4: DailItem;
    public item_3: DailItem;
    public item_2: DailItem;
    public item_6: DailItem;
    public item_7: DailItem;
    public item_8: DailItem;
    public item_9: DailItem;
    public item_10: DailItem;
    public indicator: eui.Image;
    public closeBtn: eui.Button;
    public sBtn: eui.Button;
    public countText: eui.Label;


    private doneTurn: boolean = true;
    private rwList: any[] = [];
    private getTime: number = 0;


    protected init(): void {
        super.init();
    }

    public open(param: ViewProp): void {
        super.open();

        this.indicator.rotation = 0;
        this.rwList = param.exData1 || [];
        this.upList();
        this.addTouchEvent(this.sBtn, this.onClick)
        this.addTouchEvent(this.closeBtn, this.onClick);
        this.message(MsgConst.CPOY_TOWER_LUCK, this.turnIndi);
        this.message(MsgConst.CPOY_TOWER, this.upList);
    }



    private upList(): void {

        if (!this.rwList.length) {
            return;
        }

        for (let i = 1; i <= 10; i++) {
            (this[`item_${i}`] as DailItem).data = this.rwList[i - 1];
            if (GameCache.copytower.copyTowerData) {
                (this[`item_${i}`] as DailItem).setState = GameCache.copytower.copyTowerData.dailList[i - 1];
            }
        }

        if (GameCache.copytower.copyTowerData) {
            this.countText.text = StringUtils.substitute(Language.lang.lcn4, GameCache.copytower.copyTowerData.luckLeftTime);
        }
    }


    /**num 抽中下标*/
    private turnIndi(num: number = 1): void {
        if (!this.doneTurn) return;
        let round = Math.floor(Math.random() * 3) + 1;
        this.doneTurn = false;
        var tw = egret.Tween.get(this.indicator);
        tw.to({ rotation: round * 360 + num * 36 }, round * 1000, egret.Ease.cubicOut).call(() => {
            this.doneTurn = true;
            let reIndex = 0;
            this.setRecvState(num + 1);
            Proxy.copytower.getLuckRw();
        });
    }

    public close() {
        if (this.doneTurn) {
            Proxy.copytower.getLuckRw();
        }
        super.close();
    }


    private setRecvState(part: number): void {
        (this[`item_${part}`] as DailItem).setState = true;
    }

    public onClick(e: egret.TouchEvent) {
        switch (e.currentTarget) {
            case this.sBtn:
                if (GameCache.copytower.copyTowerData && GameCache.copytower.copyTowerData.luckLeftTime) {
                    Proxy.copytower.getLuck();
                }
                break;
            case this.closeBtn:
                this.closeView()
                break;
            default:
                break;
        }


    }

}