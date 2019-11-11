/*
 * @Description: 滑动框
 * @Author: xiejunwei
 * @Date: 2019-08-05 20:27:41
 * @LastEditTime: 2019-08-06 14:00:08
 */
class LiveScroll extends BaseCustComponent {
    public constructor() {
        super();
    }

    public sc: eui.Scroller;
    public g: eui.Group;

    private type;

    private gap: number;
    private itemSkin;

    protected childrenCreated(): void {
        super.childrenCreated();
        let lb = this.g.layout;
        this.gap = lb["gap"];
        this.addEvent(egret.TouchEvent.TOUCH_BEGIN, this, this.onBegin);
        this.addEvent(egret.TouchEvent.TOUCH_MOVE, this, this.onMove);

    }

    protected dataChanged(): void {
        super.dataChanged();
    }

    public dispose(): void {
        super.dispose();
    }

    public initSC(conf, begin, itemRender, itemRenderSkin): void {
        this.type = itemRender;
        let firstItem = ObjectPool.get(itemRender);
        if (itemRenderSkin) {
            firstItem.skinName = itemRenderSkin;
            this.itemSkin = itemRenderSkin;
        }
        this.g.addChild(firstItem);
        let numChild = Math.ceil(this.sc.height / firstItem.height);
        let dataArr = [];
        let confArr = [];
        for (let i in conf) {
            confArr.push(conf[i]);
        }
        for (let i = 0; i < numChild; i++) {
            let confItem = conf[`${begin + i}`] || confArr[begin + i];
            if (!confItem) break;
            if (i == 0) {
                firstItem.data = confItem
            } else {
                let item = ObjectPool.get(itemRender);
                if (itemRenderSkin) item.skinName = itemRenderSkin;
                item.data = confItem;
                this.g.addChild(item)
            }
            dataArr.push(confItem);
        }
    }

    private scY: number;
    private firstItem: any;
    private onBegin(e: egret.TouchEvent): void {
        this.scY = this.sc.viewport.scrollV
        this.firstItem = this.g.getElementAt(0);
    }

    private oncea = true;
    private onMove(): void {
        if (this.firstItem && this.oncea) {
            if (this.sc.viewport.scrollV - this.scY <= -3) {
                let item = ObjectPool.get(this.type);
                item.skinName = this.itemSkin;
                this.g.addChildAt(item, 0);
                this.oncea = false;
            }
        }
    }

}