/*
 * @Description: 排行榜样式A
 * @Author: liangzhaowei
 * @Date: 2019-08-20 14:32:19
 * @LastEditTime: 2019-08-30 14:54:14
 */


class RankModelWinA extends BaseEuiWindow {
    public constructor() {
        super(LayerManager.UI_Tips);
        this.skinName = "RankModelWinASkin";
    }

    public bg: BaseWinBg;
    public list: eui.List;
    public imgRank: eui.Image;
    public lbRank: eui.Label;
    public lbLv: eui.Label;



    protected init(): void {
        super.init();
        this.list.itemRenderer = RankModelItemA;
        this.setWinTitle("fogTower");
    }

    public open(param: ViewProp): void {
        super.open();
        this.message(MsgConst.CPOY_TOWER_RANK, this.upList);
    }

    public upList() {
        this.setListData(this.list, GameCache.copytower.rankList);
        this.setRankNum(this.imgRank, this.lbRank, GameCache.copytower.myRank)
        let str = ""
        if (GameCache.copytower.copyTowerData) {
            let layer = GameCache.copytower.copyTowerData.layer > 0 ? GameCache.copytower.copyTowerData.layer : 1
            str = StringUtils.substitute(Language.lang.lcn5, GameCache.copytower.copyTowerData.layer);
        }
        this.lbLv.text = str;
    }

    public setRankNum(imgRank: eui.Image, lbRank: eui.Label, num: number) {
        if (num > 0) {
            let strImg = ["rank_json.rank_nb_1_png", "rank_json.rank_nb_2_png", "rank_json.rank_nb_3_png"];
            imgRank.visible = num < 4;
            if (strImg[num - 1]) {
                imgRank.source = strImg[num - 1];
            }
            lbRank.visible = num >= 4;
            lbRank.text = num + "";
        } else {
            lbRank.text = Language.lang.lcn6;
            imgRank.visible = false;
        }
    }

}