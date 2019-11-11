/*
 * @Description: 时装物品条目
 * @Author: xiejunwei
 * @Date: 2019-08-02 14:54:32
 * @LastEditTime: 2019-10-08 16:45:19
 */
class FashionItem extends ItemBase {
    public constructor() {
        super();
    }


    private onImg: eui.Image;
    private lock: eui.Image;

    protected childrenCreated(): void {
        super.childrenCreated();

    }

    protected dataChanged(): void {
        super.dataChanged();
        if (!this.data) return;
        this.initState();
        this.initHandler();
    }

    public dispose(): void {
        super.dispose();
    }



    public initState(): void {
        if (!GameCache.fashion.tempProp) return;
        let roleId = GameCache.hero.getRoleIdByIndex(GameCache.fashion.role);
        let item = GameCache.fashion.dish ? GameCache.fashion.dish[this.itemData.part] : null; //先检查试穿
        !item && (item = GameCache.fashion.roleFashionData[roleId] ? GameCache.fashion.roleFashionData[roleId][this.itemData.part] : null);  //后检查人物身上时装
        if (item && item.id == this.itemData.id) {
            if (!this.onImg) {
                this.onImg = new eui.Image();
                this.onImg.source = "public_json.public_equip_tag2_png";
                this.onImg.x = -7;
                this.onImg.y = -5;
                this.addChild(this.onImg);
            }
            this.onImg.visible = true;
        } else {
            if (this.onImg) this.onImg.visible = false;
        }
        this.checkHave();
    }

    private checkHave(): void {
        if (!this.itemData) return;
        if (!GameCache.fashion.checkHave(this.itemData)) {
            if (!this.lock) {
                this.lock = ObjectPool.get(eui.Image);
                this.lock.source = "public_json.public_lock_2_png";
                this.lock.x = 53;
                this.lock.y = 48;
                this.addChild(this.lock);
            }
            this.ico.filters = FilterUtils.DefaultGrayFilters;
            this.color.filters = FilterUtils.DefaultGrayFilters;
        } else {
            this.ico.filters = null;
            this.color.filters = null;
            if (this.lock) {
                this.lock.source = null;
                ObjectPool.push(this.lock);
                this.removeChild(this.lock);
                this.lock = null;
            }
        }
    }

    private initHandler(): void {
        this.setHandler(this, this.openTips);
    }

    public openTips(): void {
        let btnSrc: string = "";
        let func = [];
        let buy = GameCache.fashion.checkHave(this.itemData);
        let buystr = buy ? "res/btn/share.png" : "res/btn/buy.png";
        if (this.onImg && this.onImg.visible) {
            btnSrc = "res/btn/takeOff.png";
            func = [this.takeOff, this.buyFashion];
        } else {
            btnSrc = buy ? "res/btn/wear.png" : "res/btn/fashion_try.png";
            func = [this.sendMsg, this.buyFashion];
        }

        let view = new ViewProp();
        view.itemData = this.itemData;
        let obj = {
            thisc: this,
            func: func,
            icon: [btnSrc, buystr]
        }
        view.firData = obj;
        App.ViewManager.open(ViewConst.ITEMTIPS, view);
    }

    public sendMsg(): void {
        GameCache.fashion.tryFashion([this.itemData]);
        App.ViewManager.close(ViewConst.ITEMTIPS);
    }

    public buyFashion(): void {
        let item: StdItem = GameConfig.item[this.itemData["needNum"][0].id];
        let need = this.itemData["needNum"][0].count;
        let have = GameCache.bag.itemCount(this.itemData["needNum"][0].id);
        let buy = GameCache.fashion.checkHave(this.itemData);
        if (!buy) {
            if (need <= have) {
                GameCache.fashion.fashionBuy([this.itemData]);
            } else {
                let str = StringUtils.substitute(Language.lang.notEnought, item.name)
                GlobalFun.SysMsg(str);
            }
        }else{
            GameCache.chat.showOffItem(this.itemData);
        }
        App.ViewManager.close(ViewConst.ITEMTIPS);
    }

    public takeOff(): void {
        GameCache.fashion.takeOff([this.itemData]);
        App.ViewManager.close(ViewConst.ITEMTIPS);
    }


}