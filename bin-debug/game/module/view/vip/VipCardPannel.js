/*
 * @Description: vip卡片
 * @Author: liangzhaowei
 * @Date: 2019-08-27 16:17:46
 * @LastEditTime: 2019-09-05 10:38:53
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
var VipCardPannel = (function (_super) {
    __extends(VipCardPannel, _super);
    function VipCardPannel($parent) {
        if ($parent === void 0) { $parent = null; }
        var _this = _super.call(this, $parent) || this;
        _this.skinName = "VipCardPannelSkin";
        return _this;
    }
    VipCardPannel.prototype.init = function () {
        this.listLb.itemRenderer = VipCardItem;
    };
    VipCardPannel.prototype.open = function (param) {
        if (param === void 0) { param = null; }
        /**顶部 */
        this.addTouchEvent(this.btnLuck, this.onClick);
        this.message(MsgConst.PROPERTY + PropId.AP_VIP_TEMPROARY, this.upVip); //vip临时
        this.message(MsgConst.PROPERTY + PropId.AP_VIP_GRADE, this.upVip); //vip等级
        this.message(MsgConst.PROPERTY + PropId.AP_VIP_TEMPROARY, this.upCn); //vip临时
        this.message(MsgConst.PROPERTY + PropId.AP_VIP_GRADE, this.upCn); //vip等级
        this.message(MsgConst.PROPERTY + PropId.AP_VIP_POINT, this.upVip); //vip积分
        this.message(MsgConst.VIP_CARD_TIME, this.upTime);
        this.message(MsgConst.VIP_CARD, this.upCn);
        this.upCn();
        this.upVip();
        App.TimerManager.add(1000, this.upTime, this);
    };
    /**更新内容 */
    VipCardPannel.prototype.upCn = function () {
        var list = [];
        for (var index in GameConfig.vipCard) {
            list.push(GameConfig.vipCard[index]);
        }
        this.setListData(this.listLb, list);
        this.upTime();
    };
    VipCardPannel.prototype.upTime = function () {
        var strTime = "";
        if (GameCache.vip.privilegeCardTime > 0) {
            strTime = App.DateUtils.getFormatBySecond(GlobalFun.getDiffMiniDateTime(GameCache.vip.privilegeCardTime) / 1000, DateUtils.TIME_FORMAT_5, 2);
            strTime = StringUtils.substitute(Language.lang.lcn10, strTime);
        }
        else if (GameCache.vip.privilegeCardTime == -1) {
            strTime = Language.lang.lcn11;
        }
        this.lbWelfareDay.text = strTime;
    };
    VipCardPannel.prototype.upVip = function () {
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
    VipCardPannel.prototype.onClick = function (e) {
        switch (e.currentTarget) {
            case this.btnLuck:
                App.ViewManager.close(ViewConst.VIP);
                App.ViewManager.open(ViewConst.CHARGE);
                break;
            default:
                break;
        }
    };
    return VipCardPannel;
}(CommunalPagePannel));
__reflect(VipCardPannel.prototype, "VipCardPannel");
//# sourceMappingURL=VipCardPannel.js.map