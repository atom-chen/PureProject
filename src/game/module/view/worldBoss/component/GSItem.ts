/*
 * @Description: 归属物品条目
 * @Author: xiejunwei
 * @Date: 2019-07-30 17:11:12
 * @LastEditTime: 2019-08-29 16:04:31
 */
class GSItem extends ItemBase {

    public constructor() {
        super();
    }

    public gs: eui.Image;
    protected dataChanged(): void {
        super.dataChanged();
        if (!this.gs) {
            this.gs = ObjectPool.get(eui.Image);
            this.gs.top = -2;
            this.gs.left = -2;
            this.gs.source = "public_json.public_gs_tag_png";
            this.addChild(this.gs);
        }
    }

    public dispose(): void {
        super.dispose();
        if (this.gs) {
            this.gs.source = null;
        }
    }
}