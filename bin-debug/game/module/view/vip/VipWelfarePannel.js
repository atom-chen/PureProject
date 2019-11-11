/*
 * @Description: vip福利页面
 * @Author: liangzhaowei
 * @Date: 2019-08-27 16:17:46
 * @LastEditTime: 2019-10-30 17:58:29
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var VipWelfarePannel = (function (_super) {
    __extends(VipWelfarePannel, _super);
    function VipWelfarePannel($parent) {
        if ($parent === void 0) { $parent = null; }
        var _this = _super.call(this, $parent) || this;
        _this.indexPage = 1; /**当前对应vip等级叶签 */
        _this.skinName = "VipWelfarePannelSkin";
        return _this;
    }
    VipWelfarePannel.prototype.init = function () {
        this.list.itemRenderer = ItemBase;
    };
    VipWelfarePannel.prototype.open = function (param) {
        if (param === void 0) { param = null; }
        this.indexPage = 1;
        /**顶部 */
        this.addTouchEvent(this.btnLuck, this.onClick);
        this.message(MsgConst.PROPERTY + PropId.AP_VIP_TEMPROARY, this.upVip); //vip临时
        this.message(MsgConst.PROPERTY + PropId.AP_VIP_GRADE, this.upVip); //vip等级
        this.message(MsgConst.PROPERTY + PropId.AP_VIP_POINT, this.upVip); //vip积分
        this.message(MsgConst.VIP_WELFARE, this.upCn);
        this.addTouchEvent(this.imgDaily, this.onClick);
        this.addTouchEvent(this.btnRw, this.onClick);
        this.slider.initData(VipWelfareSlideItem, this.getVipList(), this.onCall, this);
        this.upVip();
        this.upCn();
    };
    VipWelfarePannel.prototype.getVipList = function () {
        var list = [];
        for (var index in GameConfig.vip) {
            if (index != "0") {
                list.push(GameConfig.vip[index]);
            }
        }
        return list;
    };
    /**更新内容 */
    VipWelfarePannel.prototype.upCn = function () {
        var vipcfig = GameConfig.vip[this.indexPage];
        this.lbTq.text = StringUtils.substitute(Language.lang.lcn7, this.indexPage);
        ;
        this.lbTqlb.text = StringUtils.substitute(Language.lang.lcn8, this.indexPage);
        this.lbAcross.text = Language.lang.lcn9;
        if (vipcfig) {
            if (vipcfig.ExclusivePackage.length) {
                this.setListData(this.list, vipcfig.ExclusivePackage);
            }
            if (vipcfig.DailyNum) {
                this.imgItem.source = GlobalFun.getItemSourceById(vipcfig.DailyNum.id);
                this.lbNum.text = vipcfig.DailyNum.count + "";
            }
        }
        var bGetImg = false;
        var btnStr = "res/btn/getReward.png";
        if (GameCache.vip.vipWelfare && GameCache.vip.vipWelfare.exclusiveList) {
            if (GameCache.vip.vipWelfare.exclusiveList[this.indexPage - 1] && GameCache.vip.vipWelfare.exclusiveList[this.indexPage - 1] == 2) {
                btnStr = "res/btn/get_4.png";
            }
        }
        this.btnRw.icon = btnStr;
        if (GameCache.vip.vipWelfare && GameCache.vip.vipWelfare.dailyGet == 2) {
            bGetImg = true;
        }
        this.imbGet.visible = bGetImg;
    };
    VipWelfarePannel.prototype.onCall = function () {
        this.indexPage = this.slider.currentIndex + 1;
        this.upCn();
    };
    VipWelfarePannel.prototype.upVip = function () {
        this.vipNum.source = "vip_json.vip_" + GameCache.vip.realValue() + "_png";
        var pro = GameCache.hero.mainPro;
        if (pro) {
            var vipcfig = GameConfig.vip[GameCache.vip.realValue()];
            if (vipcfig && vipcfig.upgradePoint) {
                this.progressBar.maximum = vipcfig.upgradePoint;
            }
            this.progressBar.value = pro.pro(PropId.AP_VIP_POINT);
        }
    };
    VipWelfarePannel.prototype.onClick = function (e) {
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
    };
    return VipWelfarePannel;
}(CommunalPagePannel));
__reflect(VipWelfarePannel.prototype, "VipWelfarePannel");
//# sourceMappingURL=VipWelfarePannel.js.map