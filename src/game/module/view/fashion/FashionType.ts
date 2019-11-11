/*
 * @Description: 时装部位条目
 * @Author: xiejunwei
 * @Date: 2019-07-29 16:40:23
 * @LastEditTime: 2019-10-21 17:37:50
 */
class FashionType extends BaseCustComponent {
    public constructor() {
        super();
    }

    public bg: eui.Image;
    public arrow: eui.Image;
    public typeImg: eui.Image;
    public unBtn: eui.Button;
    public fashionName: eui.Label;

    private handler: Handler;

    protected childrenCreated(): void {
        super.childrenCreated();
        this.addTouchEvent(this.bg, this.onTouche);
        this.addTouchEvent(this.typeImg, this.onTouche);
        this.addTouchEvent(this.unBtn, this.takeOff);
    }

    protected dataChanged(): void {
        super.dataChanged();
        this.cleanGroup();
        if (!this.data) return;
        if (!GameCache.fashion.tempProp) return;
        this.initData();
    }

    public dispose(): void {
        super.dispose();
        this.handler = null;
    }

    private initData(): void {
        this.handler = Handler.create(this.data.thisc, this.data.func, [this.itemIndex], false);
        this.typeImg.source = "fashion_json.fashion_part" + this.data.id + "_png";

        let roleId = GameCache.hero.getRoleIdByIndex(GameCache.fashion.role);
        let bag = this.data.item;
        let fashionId = GameCache.fashion.tempProp.pro(this.data.id);
        this.unBtn.visible = this.fashionName.visible = false;
        if (bag) {
            for (let i = 0; i < bag.length; i++) {
                // let item = GameConfig.fashion[bag[i]];
                let item = bag[i];
                if (item.shape == fashionId) {
                    this.unBtn.visible = this.fashionName.visible = true;
                    this.fashionName.textFlow = TextFlowUtils.generateTextFlow(ItemUtils.getItemNamewithColor(item));
                }
            }
        }
    }

    private onTouche(): void {
        this.handler.run();
    }

    private g: eui.Scroller;
    private list: eui.List;
    private dataGroup: eui.ArrayCollection;
    public testFunc(): void {
        if (!this.g) {
            this.g = ObjectPool.get(eui.Scroller);
            this.g.width = this.width;
            this.g.y = 48;
            this.g.height = 220;
            this.g.left = 0;
            this.g.right = 0;
            this.addChild(this.g);

            this.list = ObjectPool.get(eui.List);
            this.list.itemRenderer = FashionItem;
            this.list.itemRendererSkinName = "ItembaseSkin";
            let layout = new eui.TileLayout();
            layout.horizontalGap = 22;
            layout.paddingLeft = 9;
            layout.requestedColumnCount = 5;
            this.list.layout = layout;
            this.g.addChild(this.list);
            if (!this.dataGroup) {
                this.dataGroup = new eui.ArrayCollection(this.data.item);
            } else {
                this.dataGroup.source = this.data.item;
            }
            this.list.dataProvider = this.dataGroup;
            this.arrow.source = "public_json.public_arrow_up_png";
        } else {
            this.cleanGroup();
        }
    }

    public refreshList(): void {
        if (this.list) {
            this.dataGroup.source = this.data.item;
            this.list.dataProviderRefreshed();
            this.initData();
        }
    }

    private cleanGroup(): void {
        if (this.g) {
            this.arrow.source = "public_json.public_arrow_down_png";
            ObjectPool.push(this.list);
            ObjectPool.push(this.g);
            App.DisplayUtils.removeFromParent(this.list);
            App.DisplayUtils.removeFromParent(this.g);
            this.list = null;
            this.g = null;
        }
    }

    private takeOff(): void {
        GameCache.fashion.takeOff([this.data.item[0]]);
    }


}