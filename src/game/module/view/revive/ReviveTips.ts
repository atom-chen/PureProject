/*
 * @Description: 复活提示
 * @Author: xiejunwei
 * @Date: 2019-08-01 10:31:38
 * @LastEditTime: 2019-10-14 19:57:00
 */
class ReviveTips extends BaseEuiWindow {
    public constructor() {
        super(LayerManager.UI_Tips);
        this.skinName = "ReviveTipsSkin";
    }

    public bg: BaseWinBg;
    public btn_0: eui.Button;
    public btn_1: eui.Button;
    public lbValue: eui.Label;
    public imgRoleBg0: eui.Image;
    public imgRole0: eui.Image;
    public imgRoleBg1: eui.Image;
    public imgRole1: eui.Image;
    public imgRoleBg2: eui.Image;
    public imgRole2: eui.Image;
    public lbNextTime: eui.Label;


    public time = 0;

    public init(): void {
        super.init();
        this.setWinTitle("revive");
    }

    public open(param: ViewProp): void {
        super.open();
        this.addTouchEvent(this.btn_0, this.reviveFunc);
        this.addTouchEvent(this.btn_1, this.closeView);

        let reviveData = GameCache.revive.reveiveList;

        this.lbNextTime.text = "";

        if (reviveData) {
            for (let i = 0; i < 3; i++) {
                let source = null;
                if (reviveData[i]) {
                    let job = reviveData[i].job
                    source = "public_json.public_icon_role_" + job + "_png"
                }
                this["imgRole" + i].source = source;
                this["imgRoleBg" + i].visible = source == null ? false : true;
            }
        }

        if (reviveData.length) {
            this.lbValue.text = GlobalVar.Recount * reviveData.length + "";
        }

        if (param && param.exData1) {
            App.TimerManager.add(1000, this.upTime, this);
        }
        this.time = GameCache.revive.leftTime;

        /**退出场景时关闭界面 */
        this.message(MsgConst.ENTER_SCENE, this.closeView);

    }




    public upTime() {

        let strTime = "";
        let leftTime = GlobalFun.getDiffMiniDateTime(this.time) / 1000;
        if (leftTime > 0) {
            strTime = App.DateUtils.getFormatBySecond(leftTime, DateUtils.TIME_FORMAT_10)
            strTime = StringUtils.substitute(Language.lang.lcn13, strTime);
        }
        else {
            this.closeView();
        }

        this.lbNextTime.text = strTime;
    }



    private reviveFunc(): void {
        let have = GameCache.hero.mainPro.pro(PropId.AP_YUANBAO);
        if (have < GlobalVar.Recount) {
            //预留跳转充值
            GlobalFun.SysMsg("钻石不足");
            return
        }
        else {
            Proxy.script.sendRevive(1);
        }
        this.closeView();
    }

    /**显示界面红点 */
    private showViewRed(bShow) {
        
    }

    static red() {
        return GameCache.bag.itemCount(3278) > 1;
    }

    /**需要刷新是红点消息列表 */
    static changeMsg() {
        return [MsgConst.BAG_ITEM_NUM + 3278];
    }

}