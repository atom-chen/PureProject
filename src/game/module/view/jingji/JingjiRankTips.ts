/*
 * @Description: 竞技场排行榜
 * @Author: xiejunwei
 * @Date: 2019-09-04 20:51:21
 * @LastEditTime: 2019-09-06 15:09:22
 */
class JingjiRankTips extends BaseEuiWindow {
    public constructor() {
        super(LayerManager.UI_Tips);
        this.skinName = "JingjiRankTipsSkin";
    }

    public bg: BaseWinBg;
    public itemList: eui.List;
    public t0: eui.Label;

    public init(): void {
        super.init();
        this.itemList.itemRenderer = JingjiRankItem;
        this.bg.setNameImg("rank");
    }

    public open(param: ViewProp): void {
        super.open();
        this.message(MsgConst.JINGJI_RANK, this.initList);
        this.t0.textFlow = TextFlowUtils.generateTextFlow(Language.lang.jingji_t6);
        Proxy.other.sendPointRank(10);
    }



    private initList(arr: any[] = []): void {
        this.setListData(this.itemList, arr);
    }
}