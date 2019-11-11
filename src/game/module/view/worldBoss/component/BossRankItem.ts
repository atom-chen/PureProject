/*
 * @Description: BOSS排行条目
 * @Author: xiejunwei
 * @Date: 2019-09-23 19:06:26
 */
class BossRankItem extends BaseCustComponent {
    public constructor() {
        super();
    }

    public rImg: eui.Image;
    public rNum: eui.Label;
    public rName: eui.Label;
    public value: eui.Label;

    protected childrenCreated(): void {
        super.childrenCreated();
    }

    protected dataChanged(): void {
        super.dataChanged();
        if (!this.data || !this.data.bossid) {
            this.cleanFunc();
            return;
        };
        this.rName.text = this.data.roleName;
        this.value.text = GlobalFun.numCut(this.data.value);
        this.rNum.visible = this.data.rank > 3 || this.data.rank < 0;
        this.rImg.visible = !this.rNum.visible;
        this.rNum.text = this.data.rank <= 0 ? Language.lang.jingji_t8 : this.data.rank + "";
        if (this.rImg.visible) {
            this.rImg.source = "public_json.public_rank_" + this.data.rank + "_png";
        } else {
            this.rImg.source = null;
        }
    }

    public dispose(): void {
        super.dispose();
    }

    private cleanFunc(): void {
        this.rNum.text = this.rName.text = this.value.text = "";
        this.rImg.source = null;
    }

}