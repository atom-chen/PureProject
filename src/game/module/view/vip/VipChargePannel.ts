/*
 * @Description: 充值页面
 * @Author: liangzhaowei
 * @Date: 2019-09-03 17:27:08
 * @LastEditTime: 2019-09-25 19:06:43
 */


class VipChargePannel extends CommunalPagePannel {
    public constructor($parent: egret.DisplayObjectContainer = null) {
        super($parent);
        this.skinName = "VipChargePannelSkin"
    }

    public listLb: eui.List;
    public btnLuck: eui.Button;
    public progressBar: eui.ProgressBar;
    public vipNum: eui.Image;



    public init(): void {
        this.listLb.itemRenderer = VipChargeItem;
    }

    public open(param: ViewProp = null) {
        /**顶部 */
        this.addTouchEvent(this.btnLuck, this.onClick);
        this.message(MsgConst.PROPERTY + PropId.AP_VIP_TEMPROARY, this.upVip);//vip临时
        this.message(MsgConst.PROPERTY + PropId.AP_VIP_GRADE, this.upVip);//vip等级

        this.message(MsgConst.PROPERTY + PropId.AP_VIP_TEMPROARY, this.upCn);//vip临时
        this.message(MsgConst.PROPERTY + PropId.AP_VIP_GRADE, this.upCn);//vip等级

        this.message(MsgConst.PROPERTY + PropId.AP_VIP_POINT, this.upVip);//vip积分
        this.message(MsgConst.FIRST_CHARGE, this.upCn);//vip积分

        this.upCn();
        this.upVip();

    }

    /**更新内容 */
    public upCn() {
        this.setListData(this.listLb, GameCache.vip.getchargeCfg());
    }

    public upVip() {
        this.vipNum.source = "vip_json.vip_" + GameCache.vip.realValue() + "_png";
        let pro = GameCache.hero.mainPro;
        if (pro) {
            let vipcfig: StdVip = GameConfig.vip[GameCache.vip.realValue()];
            if (vipcfig && vipcfig.upgradePoint) {
                this.progressBar.maximum = vipcfig.upgradePoint;
            }
            this.progressBar.value = pro.pro(PropId.AP_VIP_POINT);
        }

    }

    public onClick(e: egret.TouchEvent) {

        switch (e.currentTarget) {
            case this.btnLuck:
                App.ViewManager.close(ViewConst.CHARGE);
                App.ViewManager.open(ViewConst.VIP);
                break;
            default:
                break;
        }


    }



}
