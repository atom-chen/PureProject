/*
 * @Description: 时装购买确认
 * @Author: xiejunwei
 * @Date: 2019-08-12 17:05:58
 * @LastEditTime: 2019-10-17 20:06:02
 */
class FashionBuyTips extends BaseEuiWindow {
    public constructor() {
        super(LayerManager.UI_Tips);
        this.skinName = "FashionBuyTipsSkin";
    }

    public bg: BaseWinBg;
    public buyBtn: eui.Button;
    public cBtn: eui.Button;
    public t0: eui.Label;
    public costGroup: eui.Group;
    public itemList: eui.List;

    private itemArr: any[] = [];
    private role: number;

    // private need = {};

    public init(): void {
        super.init();
        this.itemList.itemRenderer = ItemBase;
        // this.cost.lab.textColor = this.cost.numColor_0 = 0xffffff;
        this.setWinTitle("fashion");
        this.t0.text = Language.lang.consume;
    }

    public open(param: ViewProp): void {
        super.open();
        this.addTouchEvent(this.buyBtn, this.buyFashion);
        this.addTouchEvent(this.cBtn, this.closeView);
        this.initPrice(param.exData1);
        this.initList(param.exData1);
        this.role = param.exData2;
    }

    private initList(itemArr): void {
        this.itemArr = [];
        this.setListData(this.itemList, itemArr);
        this.itemArr = itemArr.concat();
    }

    private initPrice(itemArr: any[] = []): void {
        // let needNum = 0;
        let need = {};
        for (let i of itemArr) {
            for (let j of i["needNum"]) {
                if (!need[j.id]) need[j.id] = 0;
                need[j.id] += j.count;
            }
            // needNum += i["needNum"][0].count;
        }
        for (let i in need) {
            let itemExpand = new ItemExpend();
            itemExpand.skinName = "ItemExpend5Skin";
            this.costGroup.addChild(itemExpand);
            itemExpand.currentState = "single";
        }
        App.TimerManager.addDelay(50, 50, 1, () => {
            let count = 0;
            for (let i in need) {
                let itemExpand = this.costGroup.getChildAt(count) as ItemExpend;
                itemExpand.setData(parseInt(i), need[i]);
                count++;
            }
        }, this);
        // this.cost.setData(itemArr[0]["needNum"][0].id, needNum);
    }

    public close(param: ViewProp): void {
        super.close();
        this.itemArr = [];
        for (let i = 0; i < this.costGroup.numChildren; i++) {
            let item = this.costGroup.getChildAt(i) as ItemExpend;
            App.DisplayUtils.removeFromParent(item);
            item.dispose();
            item = null;
        }
        // this.need = {};
    }

    private buyFashion(): void {
        // if (this.cost.isExpend) {
        //     GameCache.fashion.fashionBuy(this.itemArr);
        //     GameCache.fashion.dish = {}; //购买清空试穿列表
        //     App.ViewManager.close(ViewConst.FASHIONBUY);
        // }
        for (let i = 0; i < this.costGroup.numChildren; i++) {
            let item = this.costGroup.getChildAt(i) as ItemExpend;
            if (!item.checkEnough()) return;
        }
        GameCache.fashion.fashionBuy(this.itemArr);
        GameCache.fashion.dish = {}; //购买清空试穿列表
        App.ViewManager.close(ViewConst.FASHIONBUY);
    }
}