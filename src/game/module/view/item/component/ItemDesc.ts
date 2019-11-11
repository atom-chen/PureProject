/**
 * create by junwei on 07/03/2019
 * 物品描述模块
 */
class ItemDesc extends BaseCustComponent {
    public constructor() {
        super();
        this.skinName = "ItemDescSkin";
    }

    public desc: eui.Label;

    protected childrenCreated(): void {
        super.childrenCreated();
    }

    protected dataChanged(): void {
        super.dataChanged();
        if(typeof(this.data) != "string") return;
        this.desc.textFlow = TextFlowUtils.generateTextFlow(this.data);
    }

    public dispose(): void {
        super.dispose();
    }

}