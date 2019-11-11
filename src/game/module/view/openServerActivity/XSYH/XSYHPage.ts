/*
 * @Description: 限时优惠页面
 * @Author: xiejunwei
 * @Date: 2019-10-14 10:07:09
 */
class XSYHPage extends BaseSpriteView {
    public constructor($parent: egret.DisplayObjectContainer = null) {
        super($parent);
        this.skinName = "XSYHPageSkin";
    }

    public itemList: eui.List;
    public zdl: NumberMC;
    public num: NumberMC;

    private lTime: number = 0;

    protected init(): void {
        super.init();
        this.itemList.itemRenderer = XSYHItem;
    }

    public open(param: ViewProp) {
        super.open();

        this.message(MsgConst.XSYH_BUY_SUCCESS, this.initList);
        this.message(MsgConst.XSYH_BUY_SUCCESS, this.initCount);
        this.message(MsgConst.XSYH_INFO, this.initList);

        // !this.lTime && (this.lTime = App.DateUtils.DayEndTimeSe(servertime));
        this.initCount();
    }

    public close(param: ViewProp): void {
        super.close();
        if (App.TimerManager.isExists(this.countDown, this)) {
            App.TimerManager.remove(this.countDown, this);
            this.lTime = 0;
        }
    }

    private initCount(): void {
        let servertime = GameCache.server.serverTime;
        this.lTime = App.DateUtils.DayEndTimeSe(servertime);
        this.initList();
        if (!App.TimerManager.isExists(this.countDown, this)) {
            App.TimerManager.addDelay(0, 1000, 0, this.countDown, this);
        }
    }

    private initList(): void {
        let maxLength = Object.keys(GameConfig.xsyh).length;
        let day = GameCache.activity.serverOpen > maxLength ? maxLength : GameCache.activity.serverOpen;
        let data = GameCache.activity.xsyhData;
        day = day ? day : 1;
        let conf = GameConfig.xsyh[day];
        let arr = [];
        for (let i in conf) {
            let item = {
                state: data && data[day] && data[day][conf[i].id] >= 1 ? false : true,
                id: conf[i].id,
                item: conf[i].item,
                price: [conf[i].price.id, conf[i].price.count],
                originalprice: conf[i].originalprice,
                vip: conf[i].vipLimit,
                discount: conf[i].discount
            }
            arr.push(item);
        }
        this.setListData(this.itemList, arr);
    }

    private countDown(): void {
        if (this.lTime < 0) {
            App.TimerManager.remove(this.countDown, this);
            this.lTime = 0;
        } else {
            this.lTime--;
            let str = App.DateUtils.getFormatBySecond(this.lTime, DateUtils.TIME_FORMAT_1);
            str = str.replace(/:/g, "s");
            this.num.value = str;
        }
    }
}