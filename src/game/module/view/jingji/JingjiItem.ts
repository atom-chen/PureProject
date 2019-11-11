/*
 * @Description: 竞技列表条目
 * @Author: xiejunwei
 * @Date: 2019-09-03 21:06:20
 * @LastEditTime: 2019-10-26 15:20:30
 */
class JingjiItem extends BaseCustComponent {
    public constructor() {
        super();
    }

    public item_0: ItemBase;
    public item_1: ItemBase;
    public item_2: ItemBase;
    public mLvl: eui.Label;
    public mName: eui.Label;
    public zdl: NumberMC;
    public enterBtn: eui.Button;
    public icon: eui.Image;

    protected childrenCreated(): void {
        super.childrenCreated();
        this.addTouchEvent(this.enterBtn, this.enterFunc);
        this.zdl.gap = 16;
    }

    protected dataChanged(): void {
        super.dataChanged();
        if (!this.data.icon) return;
        this.initData();
    }

    public dispose(): void {
        super.dispose();
    }

    private initData(): void {
        let data: { icon, lvl, power, roleName } = this.data;
        let conf = GameConfig.jingji[this.itemIndex];
        conf = conf ? conf : GameConfig.jingji["1"];
        this.item_0.data = conf.awardshow[0];
        this.item_1.data = conf.awardshow[1];
        this.item_2.data = conf.awardshow[2];

        this.zdl.value = data.power;
        this.icon.source = GlobalFun.getRoleIcon(data.icon);//RES_DIR_ROLE_ICON + "role_" + data.icon + ".png";
        this.mName.text = data.roleName + "";
        this.mLvl.text = data.lvl + "";
    }

    private enterFunc(): void {
        let count = GameCache.jingji.jingjiData.remain;
        if (count) {
            Proxy.other.sendChallenge(this.itemIndex);
            GameCache.jingji.targetIdx = this.itemIndex;
            App.ViewManager.close(ViewConst.JINGJI);
        } else {
            GlobalFun.SysMsg(Language.lang.jingji_t5);
        }
    }

}