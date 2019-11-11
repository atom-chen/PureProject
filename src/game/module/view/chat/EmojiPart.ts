/*
 * @Description: 表情控件
 * @Author: xiejunwei
 * @Date: 2019-09-30 13:44:00
 */
class EmojiPart extends BaseEuiWindow {
    public constructor() {
        super(LayerManager.UI_Tips);
        this.skinName = "EmojiPartSkin";

    }

    public itemList: eui.List;
    private handler: Handler;

    public init(): void {
        super.init();
    }

    // protected childrenCreated(): void {
    //     super.childrenCreated();
    //     this.addEvent(eui.ItemTapEvent.ITEM_TAP, this.itemList, this.onCLick);
    // }

    // protected dataChanged(): void {
    //     super.dataChanged();
    //     if (!this.data.func) return;
    //     if (this.handler) {
    //         this.handler.dispose();
    //     }
    //     this.handler = Handler.create(this.data.thisc, this.data.func, [], false);
    //     this.initList();
    // }

    // public dispose(): void {
    //     super.dispose();
    // }

    public open(param: ViewProp): void {
        super.open();
        this.addEvent(eui.ItemTapEvent.ITEM_TAP, this.itemList, this.onCLick);
        if (param && param.exData1 && param.exData1['func']) {
            if (this.handler) {
                this.handler.dispose();
            }
            this.handler = Handler.create(param.exData1['thisc'], param.exData1['func'], [], false);
            this.initList();
        }
    }

    public close(param: ViewProp): void {
        super.close();
        this.setListData(this.itemList, []);
        if (this.handler) {
            this.handler.dispose();
            this.handler = null;
        }
    }

    private initList(): void {
        let arr = [];
        for (let i = 0; i < 21; i++) {
            let obj = {
                src: "emoji_json.emoji_" + i + "_png"
            }
            arr.push(obj);
        }
        this.setListData(this.itemList, arr);
    }

    private onCLick(e: eui.ItemTapEvent): void {
        let tar = e.itemIndex;
        if (this.handler) {
            this.handler.args = [tar];
            this.handler.run();
        }
    }
}
