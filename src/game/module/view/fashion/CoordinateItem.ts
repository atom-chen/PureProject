/*
 * @Description: 搭配窗口条目
 * @Author: xiejunwei
 * @Date: 2019-08-06 15:36:06
 * @LastEditTime: 2019-08-16 17:49:09
 */
class CoordinateItem extends BaseCustComponent {

    public bg: eui.Image;
    public iG: eui.Group;
    public propPart: PropPart;
    public tBtn: eui.Button;
    public title: eui.Image;
    public active: eui.Image;

    private itemArr: any[] = [];
    private bState: boolean = true;

    public constructor() {
        super();
    }

    protected childrenCreated(): void {
        super.childrenCreated();
        this.addTouchEvent(this.tBtn, this.onTouche);
    }

    protected dataChanged(): void {
        super.dataChanged();
        if (!this.data.id) return;
        this.itemArr = [];
        this.initItem();
        this.btnState();
    }

    public dispose(): void {
        super.dispose();
        this.itemArr = [];
    }

    private initItem(): void {
        this.active.visible = true;
        for (let i = 0; i < 8; i++) {
            let item = GameConfig.fashion[this.data.part[i]];
            let buy = GameCache.fashion.checkHave(item);
            if(!buy) this.active.visible = false;
            (this[`item_${i}`] as FashionItem).data = item;
            this.itemArr.push(item);
        }
    }

    public reflashItemList(): void {
        for (let i = 0; i < 8; i++) {
            (this[`item_${i}`] as FashionItem).initState();
        }
    }

    private btnState(): void {
        for (let i = 0; i < this.itemArr.length; i++) {
            let fashionId = GameCache.fashion.tempProp.pro(this.itemArr[i].part);
            if (fashionId != this.itemArr[i].shape) {
                this.bState = true;
                this.tBtn.icon = "fashion_json.fashion_try2_png";
                return;
            }
        }
        this.bState = false;
        this.tBtn.icon = "res/btn/takeOff.png";
    }


    private onTouche(): void {
        if (this.bState) {
            GameCache.fashion.tryFashion(this.itemArr);
            App.ViewManager.close(ViewConst.COORDINATE);
        } else {
            GameCache.fashion.takeOff(this.itemArr);
            this.bState = true;
            this.tBtn.icon = "fashion_json.fashion_try2_png";
        }
    }

    private tryFashion(): void {
        GameCache.fashion.tryFashion(this.itemArr);
    }

    private takeOff(): void {
        GameCache.fashion.takeOff(this.itemArr);
    }

}