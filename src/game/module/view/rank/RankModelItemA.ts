/*
 * @Description: 排行榜item内容
 * @Author: liangzhaowei
 * @Date: 2019-08-01 17:38:18
 * @LastEditTime: 2019-08-23 14:17:18
 */

class RankModelItemA extends BaseCustComponent {
    public constructor() {
        super();
        this.skinName = "RankModelItemASkin";
    }


    public imgRank: eui.Image;
    public lbRank: eui.Label;
    public lbNe: eui.Label;
    public lbLv: eui.Label;



    protected childrenCreated(): void {
        super.childrenCreated();
    }

    protected dataChanged(): void {
        super.dataChanged();
        if (this.data.layer) {
            this.lbNe.text = this.data.name;
            this.lbLv.text = StringUtils.substitute(Language.lang.lcn5, this.data.layer);
        }
        this.setRankNum(this.imgRank, this.lbRank, this.itemIndex + 1);
    }


    public setRankNum(imgRank: eui.Image, lbRank: eui.Label, num: number) {
        let strImg = ["rank_json.rank_nb_1_png", "rank_json.rank_nb_2_png", "rank_json.rank_nb_3_png"];
        imgRank.visible = num < 4;
        if (strImg[num - 1]) {
            imgRank.source = strImg[num - 1];
        }
        lbRank.visible = num >= 4;
        lbRank.text = num + "";
    }

}
