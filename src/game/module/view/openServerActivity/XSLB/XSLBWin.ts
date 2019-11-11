/*
 * @Description: 限时礼包窗口
 * @Author: xiejunwei
 * @Date: 2019-10-21 11:29:31
 */
class XSLBWin extends BaseEuiWindow {
    public constructor() {
        super(LayerManager.UI_Tips);
        this.skinName = "XSLBWinSkin";
    }

    public closeBtn: eui.Image;
    public iG: eui.Group;
    public cost_1: ItemExpend;
    public cost_0: ItemExpend;
    public zdl: NumberMC;
    public buyBtn: eui.Button;
    public buyTime: eui.Label;
    public tabBtn: eui.TabBar;
    public img_0: eui.Image;
    public img_1: eui.Image;
    public soldOut: eui.Image;

    private itemList: ItemList;
    private lTime: number = 0;

    private confData;
    private day = 0;

    public init(): void {
        super.init();
        this.cost_0.numColor_0 = this.cost_0.lab.textColor = 0xffffff;
        this.cost_1.numColor_0 = this.cost_1.lab.textColor = 0xffffff;
    }

    public open(param: ViewProp): void {
        super.open();

        this.addTouchEvent(this.tabBtn, this.onTouche);
        this.addTouchEvent(this.buyBtn, this.buyFunc);
        this.message(MsgConst.XSYH_BUY_SUCCESS, this.onTouche);
        this.message(MsgConst.XSYH_BUY_SUCCESS, this.initCount);
        this.message(MsgConst.XSYH_INFO, this.onTouche);

        LayerManager.UI_Tips.setRectAlpha(0.7);

        App.DisplayUtils.addClickEff(this.tabBtn);

        this.tabBtn.selectedIndex = 0;
        this.initCount();

        this.initData();
        this.onTouche();
    }

    public close(param: ViewProp): void {
        super.close();
        LayerManager.UI_Tips.resetAlpha();

        this.confData = null;

        if (App.TimerManager.isExists(this.countDown, this)) {
            App.TimerManager.remove(this.countDown, this);
            this.lTime = 0;
        }
    }

    public dispose(): void {
        this.itemList.dispose();
        super.dispose();
    }

    private initCount(): void {
        let servertime = GameCache.server.serverTime;
        this.lTime = App.DateUtils.DayEndTimeSe(servertime);
        if (!App.TimerManager.isExists(this.countDown, this)) {
            App.TimerManager.addDelay(0, 1000, 0, this.countDown, this);
        }
    }

    private countDown(): void {
        if (this.lTime < 0) {
            App.TimerManager.remove(this.countDown, this);
            this.lTime = 0;
        } else {
            this.lTime--;
            let str = App.DateUtils.getFormatBySecond(this.lTime, DateUtils.TIME_FORMAT_1);
            this.buyTime.text = StringUtils.substitute(Language.lang.restTime, str);
        }
    }

    private initData(): void {
        let day = GameCache.activity.serverOpen;
        let conf = GameConfig.xslb;
        let maxDay = Object.keys(conf).length;
        this.day = day > 0 && day < maxDay ? day : Object.keys(conf).length;
        this.confData = conf[this.day];
    }

    private onTouche(): void {
        let tar = this.tabBtn.selectedIndex + 1;
        let data: StdTimegift = this.confData[tar];
        this.setAward(data);

        this.cost_0.setData(data.price.id, data.price.count);
        this.cost_1.setData(data.price.id, data.originalprice);

        let xslbData = GameCache.activity.xslbData[this.day];
        xslbData = xslbData ? xslbData : {};
        this.buyBtn.visible = xslbData[this.tabBtn.selectedIndex + 1] ? false : true;
        this.soldOut.visible = !this.buyBtn.visible;
    }

    private setAward(std: StdTimegift): void {
        if (std && std.showItem) {
            if (!this.itemList) {
                this.itemList = ObjectPool.get(ItemList);
            }
            this.itemList.setData(std.showItem, this.iG);
        } else {
            this.itemList.dispose();
        }
    }

    private buyFunc(): void {
        if (this.cost_0.checkEnough()) {
            Proxy.script.sendXSLBBuy(this.tabBtn.selectedIndex + 1);
        } else {
            this.closeView();
        }
    }
}