/**
 * 物品基本条目
 */
class ItemBaseCornerMark extends ItemBase {
    public constructor() {
        super();

    }

    public cornerMark: eui.Image;


    /**重置 */
    public reSet() {
        super.reSet();
        this.cornerMark.source = null;
    }


    /**设置角标图片 */
    public setMarkImg(str: string) {
        if (!this.cornerMark) {
            this.cornerMark = new eui.Image(str);
            this.cornerMark.right = 5;
            this.cornerMark.top = 5;
            this.addChild(this.cornerMark);
        }
        else {
            this.cornerMark.source = str;
        }
    }


}