/*
 * @Description: 时装副本奖励条目
 * @Author: xiejunwei
 * @Date: 2019-10-28 11:42:43
 */
class FashionAwardItem extends ItemBase {
    public constructor() {
        super();
    }

    private tag: eui.Image;

    protected childrenCreated(): void {
        super.childrenCreated();
    }

    protected dataChanged(): void {
        super.dataChanged();
        if (this.data["tag"]) {
            if (!this.tag) {
                this.tag = ObjectPool.get(eui.Image);
                this.tag.source = "public_json.public_bonus_tag_png";
                this.tag.x = this.tag.y = -3;
                this.addChild(this.tag);
            }else{
                this.tag.visible = true;
            }

        } else {
            if (this.tag) {
                this.tag.visible = false;
            }
        }
    }

    public dispose(): void {
        this.tag.source = null;
        this.tag.x = this.tag.y = 0;
        ObjectPool.push(this.tag);
        App.DisplayUtils.removeFromParent(this.tag);
        this.tag = null;
        super.dispose();
    }

}
