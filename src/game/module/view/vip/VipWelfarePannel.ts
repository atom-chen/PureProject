/*
 * @Description: vip福利页面
 * @Author: liangzhaowei
 * @Date: 2019-08-27 16:17:46
 * @LastEditTime: 2019-10-30 17:58:29
 */

class VipWelfarePannel extends CommunalPagePannel {
    public constructor($parent: egret.DisplayObjectContainer = null) {
        super($parent);
        this.skinName = "VipWelfarePannelSkin"
    }


    public btnLuck: eui.Button;
    public progressBar: eui.ProgressBar;
    public vipNum: eui.Image;
    public lbTqlb: eui.Label;
    public btnRw: eui.Button;
    public list: eui.List;
    public slider: SlidePart;
    public lbTq: eui.Label;
    public imgDaily: eui.Button;
    public lbAcross: eui.Label;
    public lbNum: eui.Label;
    public imgItem: eui.Image;
    public imbGet: eui.Image;

    public indexPage = 1;/**当前对应vip等级叶签 */


    public init(): void {
        this.list.itemRenderer = ItemBase;
    }

    public open(param: ViewProp = null) {
        this.indexPage = 1;

        /**顶部 */
        this.addTouchEvent(this.btnLuck, this.onClick);
        this.message(MsgConst.PROPERTY + PropId.AP_VIP_TEMPROARY, this.upVip);//vip临时
        this.message(MsgConst.PROPERTY + PropId.AP_VIP_GRADE, this.upVip);//vip等级
        this.message(MsgConst.PROPERTY + PropId.AP_VIP_POINT, this.upVip);//vip积分

        this.message(MsgConst.VIP_WELFARE, this.upCn);
        this.addTouchEvent(this.imgDaily, this.onClick);
        this.addTouchEvent(this.btnRw, this.onClick);


        this.slider.initData(VipWelfareSlideItem, this.getVipList(), this.onCall, this);

        this.upVip();
        this.upCn();

    }

    public getVipList() {
        let list = [];
        for (let index in GameConfig.vip) {
            if (index != "0") {
                list.push(GameConfig.vip[index]);
            }
        }
        return list;
    }

    /**更新内容 */
    public upCn() {
        let vipcfig: StdVip = GameConfig.vip[this.indexPage];
        this.lbTq.text = StringUtils.substitute(Language.lang.lcn7, this.indexPage);;
        this.lbTqlb.text = StringUtils.substitute(Language.lang.lcn8, this.indexPage);
        this.lbAcross.text = Language.lang.lcn9;
        if (vipcfig) {
            if (vipcfig.ExclusivePackage.length) {
                this.setListData(this.list, vipcfig.ExclusivePackage);
            }
            if (vipcfig.DailyNum) {
                this.imgItem.source = GlobalFun.getItemSourceById(vipcfig.DailyNum.id)
                this.lbNum.text = vipcfig.DailyNum.count + "";
            }
        }

        let bGetImg = false;
        let btnStr = "res/btn/getReward.png";
        if (GameCache.vip.vipWelfare && GameCache.vip.vipWelfare.exclusiveList) {
            if (GameCache.vip.vipWelfare.exclusiveList[this.indexPage - 1] && GameCache.vip.vipWelfare.exclusiveList[this.indexPage - 1] == 2) {
                btnStr = "res/btn/get_4.png";
            }
        }
        this.btnRw.icon = btnStr;

        if (GameCache.vip.vipWelfare && GameCache.vip.vipWelfare.dailyGet == 2) {
            bGetImg = true;
        }
        this.imbGet.visible = bGetImg


    }

    private onCall(): void {
        this.indexPage = this.slider.currentIndex + 1;
        this.upCn();
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
            case this.imgDaily://日常奖励
                Proxy.vip.actDaily(this.indexPage);
                break;
            case this.btnRw://专属
                Proxy.vip.actExclusive(this.indexPage);
                break;
            default:
                break;
        }


    }



}
