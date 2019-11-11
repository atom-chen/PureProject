/*
 * @Description: 宝石面板条目
 * @Author: xiejunwei
 * @Date: 2019-09-10 10:50:29
 * @LastEditTime: 2019-09-11 17:51:29
 */
class JewelItem extends BaseCustComponent {
    public constructor() {
        super();
    }

    public blank: eui.Image;
    public sele: eui.Image;
    public jName: eui.Label;
    public icon: eui.Image;

    protected childrenCreated(): void {
        super.childrenCreated();
        App.DisplayUtils.addLinkonText(this, this.jName);
    }

    protected dataChanged(): void {
        super.dataChanged();
        if (this.data) {
            this.initData();
        } else {
            this.cleanData();
        }
    }

    public dispose(): void {
        super.dispose();
    }

    public stateJuge(lvl, first: boolean = false): void {
        this.icon.source = "public_json.public_lock_1_png";
        if (first) {
            let str = StringUtils.substitute(Language.lang.jewel_0, lvl);
            this.jName.textFlow = TextFlowUtils.generateTextFlow(`<(u)(e_win_COPY#1)(c0x00ff0c)${str}>`);
            this.jName.visible = true;
            this.blank.visible = true;
        } else {
            this.jName.visible = false;
            this.blank.visible = false;
        }
    }

    private initData(): void {
        let item: StdItem = GameConfig.item[this.data.id];
        let color = ItemUtils.getItemColor(item.showQuality);
        let name = StringUtils.substitute(Language.lang.nameLvl, item.name, this.data.lvl);
        this.jName.visible = true;
        this.blank.visible = true;
        this.jName.textFlow = TextFlowUtils.generateTextFlow(`<(c${color})${name}>`);
        this.icon.source = RES_DIR_IMAGES_ITEM + item.icon + ".png";
    }

    public cleanData(): void {
        this.icon.source = null;
        this.jName.visible = false;
        this.blank.visible = false;
    }

    public set seleted(val) {
        this.sele.visible = val;
    }

}