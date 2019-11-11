/*
 * @Description: 时装副本条目
 * @Author: xiejunwei
 * @Date: 2019-10-26 16:00:06
 */
class FashionCopyItem extends BaseCustComponent {
    public constructor() {
        super();
    }

    public sG: eui.Group;
    public img: eui.Image;
    public lock: eui.Image;
    public shapeMask: eui.Image;
    public img_0: eui.Image;
    public openImg: eui.Image;
    public vip: NumberMC;
    public desc: eui.Label;

    public acti: boolean = false;

    protected childrenCreated(): void {
        super.childrenCreated();

    }

    protected dataChanged(): void {
        super.dataChanged();
        if (this.data == null) {
            this.sG.visible = false;
            return;
        } else {
            this.sG.visible = true;
            this.initData();
        }
    }

    public dispose(): void {
        super.dispose();
    }

    private initData(): void {
        this.img.source = this.data.copyType == 1 ? RES_DIR_FASHIONCOPY + `fashionCopy_nor_${this.data.backpic}.png` : RES_DIR_FASHIONCOPY + `fashion_treasure_${this.data.backpic}.png`;
        this.shapeMask.source = this.data.copyType == 1 ? "fashionCopy_json.fashionCopy_shapeMask_0_png" : "fashionCopy_json.fashionCopy_shapeMask_1_png";
        let roleLvl = GameCache.hero.mainPro.pro(PropId.AP_LEVEL);
        if (this.data.vipLimit) {
            this.vip.visible = true;
            this.img_0.visible = true;
            this.vip.value = this.data.vipLimit;
        } else {
            this.vip.visible = false;
            this.img_0.visible = false;
        }
        if (!this.data.copyLevel) {
            this.desc.visible = false;
            this.openImg.visible = true;
            this.lock.visible = false;
            this.acti = roleLvl >= this.data.level;
        } else {
            let data = GameCache.copy.fashionCopyData[this.data.copyLevel];
            let acti = data ? data.acti : false;
            acti = acti && roleLvl >= this.data.level;
            this.acti = acti;
            this.desc.visible = !acti;
            this.openImg.visible = acti;
            this.lock.visible = !acti;
            !acti && (this.desc.textFlow = TextFlowUtils.generateTextFlow(StringUtils.substitute(Language.lang.fashioncopy_2, this.data.level)));
        }

    }



}