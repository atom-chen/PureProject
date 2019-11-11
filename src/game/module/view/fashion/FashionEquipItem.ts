/*
 * @Description: 时装展示item
 * @Author: xiejunwei
 * @Date: 2019-09-16 12:02:19
 */
class FashionEquipItem extends ItemBase {
    public partImg: eui.Image;

    protected childrenCreated(): void {
        super.childrenCreated();
    }

    protected dataChanged(): void {
        super.dataChanged();
        if (!this.data) return;
        if (this.itemData) {
            this.initHandler();
            this.initPartImg(this.itemData.part);
        }
    }

    public dispose(): void {
        super.dispose();
    }

    public initPartImg(part): void {
        if (!this.partImg) {
            this.partImg = new eui.Image();
            this.partImg.x = 5;
            this.partImg.y = 51;
            this.addChild(this.partImg);
        }
        this.partImg.source = "fashion_json.fashion_part_" + part + "_png";
    }

    private initHandler(): void {
        this.setHandler(this, this.openTips);
    }

    public openTips(): void {
        if (!this.itemData) return;
        let btnSrc: string = "";
        let func = [];
        let buy = GameCache.fashion.checkHave(this.itemData);
        let buystr = buy ? "res/btn/share.png" : "res/btn/buy.png";
        btnSrc = "res/btn/takeOff.png";
        func = [this.takeOff, this.buyFashion];

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
        }
        App.ViewManager.close(ViewConst.ITEMTIPS);
    }

    public takeOff(): void {
        GameCache.fashion.takeOff([this.itemData]);
        App.ViewManager.close(ViewConst.ITEMTIPS);
    }

}