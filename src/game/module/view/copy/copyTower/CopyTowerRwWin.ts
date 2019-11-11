/*
 * @Description: 
 * @Author: liangzhaowei
 * @Date: 2019-08-20 14:32:19
 * @LastEditTime: 2019-08-23 17:04:11
 */


class CopyTowerRwWin extends BaseEuiWindow {
    public constructor() {
        super(LayerManager.UI_Tips);
        this.skinName = "CopyTowerRwWinSkin";
    }
    public bg: BaseWinBg;
    public list: eui.List;
    public btn: eui.Button;
    public stdMiwu: StdMiwutower


    protected init(): void {
        super.init();
        this.list.itemRenderer = ItemBase;
        this.setWinTitle("everydayRw");
    }

    public open(param: ViewProp): void {
        super.open();
        this.stdMiwu = param.exData1;
        this.upBtn();
        this.addTouchEvent(this.btn, this.onclick)
        this.message(MsgConst.CPOY_TOWER, this.upBtn);
        this.setListData(this.list, this.stdMiwu.dailyaward);
    }

    public upBtn() {
        if (GameCache.copytower.copyTowerData) {
            this.btn.icon = GameCache.copytower.copyTowerData.getState ? "res/btn/get_4.png" : "res/btn/get_3.png"
        }
    }

    /**点击响应 */
    public onclick() {
        Proxy.copytower.getDailyRw();
    }

}