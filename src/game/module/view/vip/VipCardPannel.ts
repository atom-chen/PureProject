/*
 * @Description: vip卡片
 * @Author: liangzhaowei
 * @Date: 2019-08-27 16:17:46
 * @LastEditTime: 2019-09-05 10:38:53
 */

class VipCardPannel extends CommunalPagePannel {
    public constructor($parent: egret.DisplayObjectContainer = null) {
        super($parent);
        this.skinName = "VipCardPannelSkin"
    }

    public lbWelfareDay: eui.Label;
    public listLb: eui.List;
    public btnLuck: eui.Button;
    public progressBar: eui.ProgressBar;
    public vipNum: eui.Image;




    public init(): void {
        this.listLb.itemRenderer = VipCardItem;
    }

    public open(param: ViewProp = null) {
        /**顶部 */
        this.addTouchEvent(this.btnLuck, this.onClick);
        this.message(MsgConst.PROPERTY + PropId.AP_VIP_TEMPROARY, this.upVip);//vip临时
        this.message(MsgConst.PROPERTY + PropId.AP_VIP_GRADE, this.upVip);//vip等级

        this.message(MsgConst.PROPERTY + PropId.AP_VIP_TEMPROARY, this.upCn);//vip临时
        this.message(MsgConst.PROPERTY + PropId.AP_VIP_GRADE, this.upCn);//vip等级

        this.message(MsgConst.PROPERTY + PropId.AP_VIP_POINT, this.upVip);//vip积分
        this.message(MsgConst.VIP_CARD_TIME, this.upTime);

        this.message(MsgConst.VIP_CARD, this.upCn);

        this.upCn();
        this.upVip();

        App.TimerManager.add(1000, this.upTime, this);
    }

    /**更新内容 */
    public upCn() {
        let list = [];
        for (let index in GameConfig.vipCard) {
            list.push(GameConfig.vipCard[index]);
        }
        this.setListData(this.listLb, list);
        this.upTime();
    }

    public upTime() {

        let strTime = "";
        if (GameCache.vip.privilegeCardTime > 0) {
            strTime = App.DateUtils.getFormatBySecond(GlobalFun.getDiffMiniDateTime(GameCache.vip.privilegeCardTime) / 1000, DateUtils.TIME_FORMAT_5,2)
            strTime = StringUtils.substitute(Language.lang.lcn10, strTime);
        }
        else if (GameCache.vip.privilegeCardTime == -1) {
               strTime =  Language.lang.lcn11
        }
        this.lbWelfareDay.text = strTime;
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
                App.ViewManager.close(ViewConst.VIP);
                App.ViewManager.open(ViewConst.CHARGE);
                break;
            default:
                break;
        }


    }



}
