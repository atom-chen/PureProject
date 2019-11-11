/*
 * @Description:  物品基本条目
 * @Author: xiejunwei
 * @Date: 2019-08-15 22:02:37
 */
class ItemBase extends BaseCustComponent {
    public constructor() {
        super();
    }

    public sele: eui.Image;
    public bg: eui.Image;
    public num: eui.Label;
    public color: eui.Image;
    public ico: eui.Image;
    public zlflag: eui.Image;
    public itemName: eui.Label;
    public part: eui.Image;
    public jobImg: eui.Image;
    public usLevel: eui.Label;

    /**ItemBase类型 */
    public typeItem: number = 0;

    private eff: MovieClip;

    public showArrow: boolean = true;
    public showColor: boolean = true;
    public _itemData: StdItem;
    private _userItem: UserItem;
    private count: number = 1;
    private handler: Handler;

    protected childrenCreated(): void {
        super.childrenCreated();
        this.enabled = true;
        // this.addEvent(egret.TouchEvent.TOUCH_BEGIN, this.ico, () => {
        //     this.ico.scaleX = 0.9;
        //     this.ico.scaleY = 0.9;
        // });
        // this.addEvent(egret.TouchEvent.TOUCH_END, this.ico, () => {
        //     this.ico.scaleX = 1;
        //     this.ico.scaleY = 1;
        // });
    }

    protected dataChanged(): void {
        super.dataChanged();
        this.count = 1;
        if (this.data) {
            this.initData();
        };
        App.DisplayUtils.addClickEff(this.ico);
        this.showZLflag();
        this.showJob();
        this.showEff();
        this.showLv();
    }

    public initData(): void {
        let data: StdItem;
        this._userItem = null;
        if (this.data instanceof StdItem || this.data["type"] == -1) {
            data = this.data;
        }
        else if (this.data instanceof UserItem) {
            data = this.data.stdItem;
            this._userItem = this.data;
            this.count = this.data.btCount;
        }
        else if (typeof (this.data) == "number") {
            data = this.getItemById(this.data);
        }
        else if (this.data["length"]) {
            this.count = this.data[1];
            data = this.getItemById(this.data[0]);
        }
        else if (this.data["id"]) {
            this.count = this.data.count ? this.data.count : 1;
            data = this.getItemById(this.data["id"]);
        }

        this._itemData = data;

        this.initLayout();

    }

    private initLayout(): void {
        if (!this._itemData) return;
        this.ico.source = RES_DIR_IMAGES_ITEM + this._itemData.icon + ".png";
        if (this.itemName) {
            this.itemName.textFlow = TextFlowUtils.generateTextFlow(ItemUtils.getItemNamewithColor(this._itemData));
        }
        this.num.text = this.count + "";
        this.num.visible = this.count > 1;
        if (this.showColor)
            this.color.source = this._itemData.showQuality <= 1 ? null : "public_json.public_item_color_" + this._itemData.showQuality + "_png";
    }

    private showEff() {
        if (this._itemData && this._itemData.eff) {
            if (!this.eff) {
                this.eff = MovieClip.create();
                this.addChild(this.eff);
                this.eff.x = 40;
                this.eff.y = 40;
            }
            this.eff.loadFile(RES_DIR_EFF + this._itemData.eff, -1);
        } else {
            if (this.eff) {
                this.eff.dispose();
                this.eff = null;
            }
        }
    }

    private showZLflag() {
        if (!this.zlflag || !this.showArrow) return;
        if (!this.data || !this._itemData) {
            this.zlflag.visible = false;
            return;
        }
        let hide = !ItemUtils.isEquip(this._itemData);
        if (!hide) {
            if (!this._userItem || this._userItem.sourceType != ItemSourceType.BAG) {
                hide = true;
            }
            if (!hide) {
                let ref = GameCache.equip.compartPower(this._itemData);
                if (ref == 0) hide = true;
                else if (ref > 0) this.zlflag.source = "public_json.public_g_allow_png";
                else hide = true; //this.zlflag.source = "public_json.public_r_allow_png";
            }
        }
        this.zlflag.visible = !hide;
    }

    private showJob() {
        if (!this.jobImg) return;
        let job;
        if (this._userItem &&
            (this._userItem.sourceType == ItemSourceType.ROLEEQUIP || this._userItem.sourceType == ItemSourceType.OTHER_ROLEEQUIP)) {
            job = 0;
        } else {
            job = this._itemData && ItemUtils.isEquip(this._itemData) && ItemUtils.getEquipJob(this._itemData);
        }
        if (job) {
            this.jobImg.source = `public_itemjob${job}_png`;
        } else {
            this.jobImg.source = null;
        }
    }

    private showLv() {
        if (!this.usLevel) return;
        let lv;
        if (this._userItem &&
            (this._userItem.sourceType == ItemSourceType.ROLEEQUIP || this._userItem.sourceType == ItemSourceType.OTHER_ROLEEQUIP)) {
            lv = 0;
        } else {
            lv = this._itemData && ItemUtils.isEquip(this._itemData) && ItemUtils.getUsLv(this._itemData);
        }
        if (lv) {
            this.usLevel.text = StringUtils.substitute(Language.lang.usLv, lv);
        } else {
            this.usLevel.text = "";
        }
    }

    public set partSource(value) {
        if (!this.part) {
            this.part = new eui.Image();
            this.part.x = 5;
            this.part.y = 54;
            this.addChild(this.part);
        }
        this.part.source = value;
    }

    public get itemData(): StdItem {
        return this._itemData;
    }

    public get userItem(): UserItem {
        return this._userItem;
    }

    public set enabled(value) {
        super.$setEnabled = value;
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        value && this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);

    }

    public setHandler(thisc, func, args?: any[]): void {
        if (this.handler) {
            this.handler.dispose();
        }
        this.handler = Handler.create(thisc, func, args, false);
    }

    private getItemById(id): StdItem {
        for (let i in GameConfig.item) {
            if ((GameConfig.item[i] as StdItem).id == id) {
                return GameConfig.item[i];
            }
        }
        return null
    }

    public onTouch(): void {
        if (App.ViewManager.isShow(ViewConst.ITEMTIPS)) return;
        if (this.handler) {
            this.handler.run();
        } else {
            if (this._itemData) {
                GlobalFun.itemTips(this._userItem || this._itemData);
            }
        }

    }

    public dispose(): void {
        super.dispose();
        App.DisplayUtils.removeClickEff(this.ico);
        this.enabled = false;
        if (!this.data) {
            //图片Ico置空
            this.ico.source = null;
        }
        this.disposeHandler();
    }

    /**重置 */
    public reSet() {
        this.data = null;
        this._itemData = null;
        this.num.text = "";
        this.color.source = null;
        this.ico.source = null;
        if (this.eff) {
            this.eff.dispose();
            this.eff = null;
        }
        if (this.itemName) this.itemName.text = "";
    }

    /**设置item 图片 */
    public setIconImg(str) {
        if (str) {
            this.ico.source = str;
        }
    }

    /**品质框 */
    public setColorImg(str = null) {
        this.color.source = str
    }

    /**设置背景*/
    public setBgImg(str) {
        this.bg.source = str;
    }

    /** 设置数量 */
    public setCount(val: number): void {
        if (!val || val < 0) {
            this.count = 1;
        }
        this.count = val;
    }

    public set select(value) {
        this.sele.visible = value;
    }

    public get select(): boolean {
        return this.sele.visible;
    }

    public disposeHandler(): void {
        if (this.handler) {
            this.handler.dispose();
            this.handler = null;
        }
    }
}