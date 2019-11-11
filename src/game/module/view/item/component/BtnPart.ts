/**
 * create by junwei on 07/02/2019
 * 按钮模组
 */
class BtnPart extends BaseCustComponent {
    public constructor() {
        super();
        this.skinName = "BtnPartSkin";
    }

    public wBtn: eui.Button;
    public sBtn: eui.Button;


    private _itemData: UserItem;
    private itemType = BagType.BAG_TYPE_EQUIP;

    protected childrenCreated(): void {
        super.childrenCreated();
        this.addTouchEvent(this.wBtn, this.btnClick);
        this.addTouchEvent(this.sBtn, this.sendShowOff);
        // this.addTouchEvent(this.uBtn, this.sendDropEquipByItemSeries);
    }

    protected dataChanged(): void {
        super.dataChanged();
        if (!this.data || !this.data["stdItem"]) return;
        this._itemData = this.data;
        this.initBtn();
    }

    public dispose(): void {
        super.dispose();
    }

    private unload: boolean = false;
    private initBtn(): void {
        let item: StdItem = this.data["stdItem"];
        if (item.type < ItemType.itEquipMax) {
            this.itemType = BagType.BAG_TYPE_EQUIP;
        } else {
            this.itemType = BagType.BAG_TYPE_OTHER;
        }
        this.wBtn.icon = "itemtips_json.itemtips_use_png";
        if (this.itemType == BagType.BAG_TYPE_EQUIP) {
            let eqList = GameCache.equip.roleEquipList;
            this.unload = false;
            for (let i in eqList) {
                if (eqList[i][item.part]) {
                    let eqitem: UserItem = eqList[i][item.part];
                    if (eqitem.series.isEquals(this._itemData.series)) {
                        this.wBtn.icon = "itemtips_json.itemtips_unload_png";
                        this.unload = true;
                    }
                    break;
                }
            }
        }
    }

    private btnClick(): void {
        if (this.itemType == BagType.BAG_TYPE_EQUIP) {
            if (this.unload) {
                this.sendDropEquipByItemSeries();
            } else {
                this.sendWearEquip();
            }
        } else {
            //使用物品
            this.sendUseItem();
        }
    }

    private sendWearEquip(): void {
        if (this._itemData.stdItem.type < ItemType.itEquipMax && this._itemData.stdItem.type != 0) {
            let job = ItemUtils.getEquipJob(this._itemData.stdItem);
            let roleId = GameCache.hero.getServerIdByJob(job);
            if (roleId == -1) {
                GlobalFun.SysMsg(Language.lang.wearError);
                return;
            }
            // Proxy.equip.sendWearEquip(this._itemData.series, 2, roleId);
            Proxy.equip.sendQuickEquip(roleId, [this._itemData]);
        }
        App.ViewManager.close(ViewConst.ITEMTIPS);
    }

    private sendDropEquipByItemSeries(): void {
        if (this._itemData.stdItem.type < ItemType.itEquipMax && this._itemData.stdItem.type != 0) {
            let job = ItemUtils.getEquipJob(this._itemData.stdItem);
            let roleId = GameCache.hero.getServerIdByJob(job);
            // Proxy.equip.sendWearEquip(this._itemData.series, roleId);
            Proxy.equip.sendDropEquipByItemSeries(this._itemData.series, roleId);
        }
        App.ViewManager.close(ViewConst.ITEMTIPS);
    }

    private sendUseItem(): void {
        Proxy.bag.sendItemUse(this._itemData, 1);
    }

    private sendShowOff(): void {
        GameCache.chat.showOffItem(this._itemData.stdItem);
        App.ViewManager.close(ViewConst.ITEMTIPS);
    }


}