/*
 * @Description: 排行榜item内容
 * @Author: liangzhaowei
 * @Date: 2019-08-01 17:38:18
 * @LastEditTime: 2019-10-17 15:19:48
 */

class RankViewItem extends BaseCustComponent {
    public constructor() {
        super();
        this.skinName = "RankViewItemSkin";
    }


    public bg: eui.Image;
    public rankRe: eui.Image;
    public imgRank: eui.Image;
    public rankNum: NumberMC;
    public lbNe: eui.Label;
    public imgVip: eui.Image;
    public rankValue: NumberMC;
    public imgDes: eui.Image;




    protected childrenCreated(): void {
        super.childrenCreated();
        this.addTouchEvent(this, this.onClick)
    }

    protected dataChanged(): void {
        super.dataChanged();
        let data: RankItemData = this.data;
        if (data.wid) {
            this.lbNe.text = data.name;
            this.rankValue.value = data.rankValue
            this.imgVip.source = "zjm_json.zjm_vip_" + data.vipLv + "_png"
            this.setRankNum(this.imgRank, this.rankNum, data.rank, this.rankRe);
            this.imgDes.source = `rank_json.rank_des_${data.rankType}_png`
        }
        this.bg.source = (this.itemIndex % 2) == 1? "public_json.public_rect_9_png":"public_json.public_rect_11_png";
    }

    public setRankNum(imgRank: eui.Image, lbRank: NumberMC, num: number, imgBg: eui.Image) {
        let strImg = ["public_json.public_rank_1_png", "public_json.public_rank_2_png", "public_json.public_rank_3_png"];
        imgRank.visible = num < 4;
        if (strImg[num - 1]) {
            imgRank.source = strImg[num - 1];
        }
        lbRank.visible = num >= 4;
        lbRank.value = num;
        if (num >= 4) {
            imgBg.source = null;
        }
        else {
            imgBg.source = `rank_json.rank_rect_${num}_png`;
        }
    }

    public onClick(e?) {
        let data: RankItemData = this.data;
        if (data) {
            Proxy.rank.askRoleInfo(data.wid);
        }
    }
}
