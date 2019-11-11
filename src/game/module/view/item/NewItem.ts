/**
 * create by junwei on 07/02/2019
 * 获得新物品提示
 */
class NewItem extends BaseEuiWindow {
    public constructor() {
        super(LayerManager.UI_Message);
        this.skinName = "NewItemSkin";

        this.right = 10;
        this.bottom = 200;
    }

    public item: ItemBase;
    public btn: eui.Button;
    public itemName: eui.Label;
    public cBtn: eui.Image;



    protected initUI(): void {

    }

    public open(param: ViewProp): void {
        super.open();
        // this.message(MsgConst.BAG_ITEM_NUM, this.initData);
        this.message(MsgConst.EQUIP_INFO, this.initData);
        this.addTouchEvent(this.cBtn, this.closeFunc);
        this.addTouchEvent(this.btn, this.useFunc);
        this.initData();
    }

    public close(param: ViewProp): void {
        super.close();
        this.begin = true;
    }

    private begin = true;
    private initData(): void {
        let item = GameCache.bag.newItenHintArr[0] || null;
        if (!item) {
            this.closeView();
            return;
        }
        this.item.data = item;
        this.itemName.text = item.stdItem.name;
        if (!this.begin) {
            this.checkList(item);
        }
        this.begin = false;
    }

    private useFunc(): void {
        let item = this.item.data;
        // let bagtype = GameCache.bag.getItemBagType(item.stdItem);
        let bagtype = item.bagType;
        switch (bagtype) {
            case BagType.BAG_TYPE_EQUIP:
                let job = ItemUtils.getEquipJob(item.stdItem);
                let roleId = GameCache.hero.getServerIdByJob(job);
                // Proxy.equip.sendWearEquip(item.series, 2, roleId);
                Proxy.equip.sendQuickEquip(roleId, [item]);
                break;
            default:
                break;
        }
        // this.closeFunc();
    }

    private closeFunc(): void {
        GameCache.bag.newItenHintArr.shift();
        this.initData();
    }

    private btnIconChange(item: UserItem): void {
        if (item.bagType == BagType.BAG_TYPE_EQUIP) {
            this.btn.icon = "newtips_json.newtips_btn_1_png";
        } else {
            this.btn.icon = "newtips_json.newtips_btn_2_png";
        }
    }

    private checkList(item: UserItem): void {
        if (!ItemUtils.itemSuggestUse(item)) {
            this.closeFunc();
        }
    }
}