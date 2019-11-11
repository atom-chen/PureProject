/*
 * @Description: 日常显示奖励详情
 * @Author: liangzhaowei
 * @Date: 2019-08-13 16:28:54
 * @LastEditTime: 2019-08-15 19:07:22
 */


class DailyShowTipWin extends BaseEuiWindow {
    public constructor() {
        super(LayerManager.UI_Tips);
        this.skinName = "DailyShowTipWinSkin";
    }

    public bg: BaseWinBg;
    public slidePage: SlidePage;
    public num: NumberMC;
    public imgWdc: eui.Image;

    protected init(): void {
        super.init();
        this.num.gap = 15;
        this.bg.setNameImg("treasure");
    }

    public open(param: ViewProp): void {
        super.open();
        let cfg: StdDailyreward = GameConfig.DailyReward[param.exData1];
        if (cfg && cfg.reward) {
            this.slidePage.setData(cfg.reward);
            this.num.value = cfg.value;
        }
        // this.imgWdc.visible = param.exData2;
    }




}