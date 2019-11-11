/**
 * create by junwei on 07/08/2019
 * 背包拓展页面
 */
class BagExpand extends BaseEuiWindow {
    public constructor() {
        super(LayerManager.UI_Tips);
        this.skinName = "BagExtendSkin";
    }

    public btn: eui.Image;
    public numSele: NumSelect;
    public cost: ItemExpend;

    protected init(): void {
        super.init();
        this.numSele.skinName = "NumSelectSkin";
        this.numSele.currentState = "s2";
        let handler = Handler.create(this, this.initPrice, [], false);
        this.numSele._handler = handler;
    }

    public open(param: ViewProp): void {
        this.addTouchEvent(this.btn, this.expandFunc);

        this.initData();
        this.initPrice();
    }

    public close(param: ViewProp): void {
        super.close();
    }

    private initData(): void {
        let bagNum = GameCache.hero.mainPro.pro(PropId.AP_BAG_GRID_COUNT);
        let max = GameConfig.bagStuff.maxEquip.value - (bagNum - GameConfig.bagStuff.maxItem.value);
        this.numSele.initData(max, 1, 1);
    }

    private initPrice(): void {
        let num = GameConfig.bagStuff.openCounsums.value.count * this.numSele.num;
        this.cost.setData(GlobalVar.GOLD, num);
    }

    private expandFunc(): void {
        if (this.cost.isExpend) {
            Proxy.bag.sendExpandGrid(BagType.BAG_TYPE_EQUIP,this.numSele.num);
        }
    }
}