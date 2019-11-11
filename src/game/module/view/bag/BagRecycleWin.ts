/**
 * 装备回收窗口
 */
class BagRecycleWin extends BaseEuiWindow {
    public constructor() {
        super(LayerManager.UI_Tips);
        this.skinName = "BagRecycleWinSkin";
    }

    public itemGroup: eui.Group;
    public mBtn: eui.Button;
    public closeBtn: eui.Image;
    public toggle: eui.CheckBox;





    private itemArr: UserItem[] = [];
    private recycleArr: UserItem[] = [];

    protected init(): void {

    }

    public open(param: ViewProp): void {
        super.open();
        this.initData();
        this.addTouchEvent(this.mBtn, this.meltFunc);
        this.addTouchEvent(this.toggle, this.AutoSwich);
        this.message(MsgConst.BAG_RECYCLE, this.recycleBack);

        this.toggle.selected = !GlobalFun.getRemindSet(0, SettingType.AUTO_RECYCLE);
    }

    public close(param: ViewProp): void {
        super.close();
        this.itemArr = [];
    }

    private initData(): void {
        let count = 0;
        let bag = GameCache.bag.recycleArr;
        for (let i = 0; i < 16; i++) {
            let itemBlank = this[`item_${i}`] as ItemBase;
            itemBlank.reSet();
        }
        for (let i in bag) {
            if (count <= 15) {
                this.itemArr.push(bag[i]);
                let itemBlank = this[`item_${count}`] as ItemBase;
                itemBlank.data = bag[i];
            } else {
                break;
            }
            count++;
        }


    }

    public recycleBack() {
        this.initData();
        App.DisplayUtils.addEffectToObj(this, "ronglian_0_1", 1, 218, 260);
    }

    private meltFunc(): void {
        Proxy.bag.sendEquipRecycleBagItem(BagType.BAG_TYPE_EQUIP, this.itemArr);
        this.cleanItem();
    }

    private cleanItem(): void {
        for (let i = 0; i < 16; i++) {
            let itemBlank = this[`item_${i}`] as ItemBase;
            itemBlank.reSet();
        }
        this.itemArr = [];
    }

    private AutoSwich(): void {
        // GlobalVar.AUTO_RECYCLE = this.toggle.selected;
        GlobalFun.setRemindSet(0, !this.toggle.selected, SettingType.AUTO_RECYCLE);
        GameCache.bag.autoRecycle();
    }
}