/*
 * @Description: 宝石背包物品条目
 * @Author: xiejunwei
 * @Date: 2019-09-11 14:16:43
 */
class JewelBagItem extends ItemBase {
    public checkBox: eui.CheckBox;

    protected childrenCreated(): void {
        super.childrenCreated();
        this.checkBox.touchEnabled = false;
        // this.addTouchEvent(this.ico,this.checkBoxTouche);
    }

    protected dataChanged(): void {
        super.dataChanged();
        // this.enabled = false;
        this.checkBox.selected = this.data.checkSele;

        this.setHandler(this, this.checkBoxTouche);
    }

    public dispose(): void {
        super.dispose();
        this.checkBox.selected = false;
    }

    public checkBoxTouche(): void {
        this.checkBox.selected = !this.checkBox.selected;
    }

}