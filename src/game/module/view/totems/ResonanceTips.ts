/*
 * @Description: 共鸣窗口
 * @Author: xiejunwei
 * @Date: 2019-08-27 14:33:13
 * @LastEditTime: 2019-08-29 15:24:05
 */
class ResonanceTips extends BaseEuiWindow {
    public constructor() {
        super();
        this.skinName = "ResonanceTipsSkin";
    }

    public bg: BaseWinBg;
    public itemList: eui.List;

    protected init(): void {
        super.init();
        this.bg.setNameImg("resonance");
        this.itemList.itemRenderer = ResonanceItem;
    }

    public open(param: ViewProp): void {
        super.open();
        this.message(MsgConst.TOTEMS_RESONANCE, this.initData);
        this.message(MsgConst.TOTEMS_INFO, this.initData);
        this.initData();
    }



    private initData(): void {
        let conf = GameConfig.resonance;
        let idArr = [];
        for (let i in conf) {
            idArr.push(i);
        }
        this.setListData(this.itemList, idArr);
    }
}
