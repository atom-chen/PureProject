/*
 * @Description: 通用排行榜
 * @Author: xiejunwei
 * @Date: 2019-10-17 18:01:13
 */
class RankModeWinB extends BaseEuiWindow {
    public constructor() {
        super(LayerManager.UI_Tips);
        this.skinName = "RankModelWinBSkin";
    }

    public bg: BaseWinBg;
    public list: eui.List;
    public imgRank: eui.Image;
    public lbRank: eui.Label;
    public lbLv: eui.Label;


    public init(): void {
        super.init();
        this.list.itemRenderer = RankModeItemB;
    }

    public open(param: ViewProp): void {
        super.open();
        this.message(MsgConst.PASS_RANK_INFO, this.initRank);
        if (!param || !param.exData1) return;
        this.setWinTitle(param.exData1["title"]);
        this.initData(param.exData1["myRank"], param.exData1["myValue"], param.exData1["listData"]);
    }

    public close(param: ViewProp): void {
        super.close();
    }

    private initRank(arr, myRank, myValue): void {
        this.initData(myRank, myValue, arr);
    }

    private initData(myRank, myValue, listData): void {
        if (myRank <= 0) {
            this.imgRank.visible = false;
            this.lbRank.textFlow = TextFlowUtils.generateTextFlow(`<(c${ColorUtil.C_RED})${Language.lang.jingji_t4}>`);
        } else {
            this.imgRank.visible = myRank < 4;
            this.lbRank.visible = !this.imgRank.visible;
            if (this.imgRank.visible) this.imgRank.source = "public_json.public_rank_" + myRank + "_png";
            this.lbRank.textFlow = TextFlowUtils.generateTextFlow(`<(c${ColorUtil.C_COFFEE})${myRank}>`);
        }
        this.lbLv.text = myValue + "";
        this.setListData(this.list, listData);
    }
}