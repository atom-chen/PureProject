/*
 * @Description: 通用排行榜条目
 * @Author: xiejunwei
 * @Date: 2019-10-17 18:01:22
 */
class RankModeItemB extends BaseCustComponent {
    public constructor() {
        super();
    }

    public imgRank: eui.Image;
    public rankNum: eui.Label;
    public rName: eui.Label;
    public value_0: eui.Label;
    public zdl: eui.Label;
    public bg: eui.Image;

    protected childrenCreated(): void {
        super.childrenCreated();
    }

    protected dataChanged(): void {
        super.dataChanged();
        if (!this.data.rank) {
            return;
        }
        this.bg.source = this.itemIndex % 2 == 0 ? "public_json.public_rect_11_png" : "public_json.public_rect_9_png"
        this.imgRank.visible = this.data.rank < 4;
        this.rankNum.visible = !this.imgRank.visible;
        if (this.imgRank.visible) {
            this.imgRank.source = "public_json.public_rank_" + this.data.rank + "_png";
        } else {
            this.rankNum.text = this.data.rank + "";
        }
        this.rName.text = this.data.roleName;
        this.value_0.text = this.data.value;
        this.zdl.text = this.data.zdl;
    }

    public dispose(): void {
        super.dispose();
    }

}