/*
 * @Description: 修改奖励物品条目
 * @Author: xiejunwei
 * @Date: 2019-10-11 15:34:21
 */
class AwardItem extends ItemBase {
    public constructor() {
        super();
    }

    protected childrenCreated(): void {
        super.childrenCreated();
    }

    protected dataChanged(): void {
        super.dataChanged();
        this.itemName.textFlow = TextFlowUtils.generateTextFlow(`<(c${ColorUtil.C_COFFEE})${this.itemName.text}>`);
    }

    public dispose(): void {
        super.dispose();
    }

}
