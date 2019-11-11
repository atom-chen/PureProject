/*
 * @Description: 充值页面
 * @Author: liangzhaowei
 * @Date: 2019-09-03 17:27:08
 * @LastEditTime: 2019-09-25 19:06:43
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
var VipChargePannel = (function (_super) {
    __extends(VipChargePannel, _super);
    function VipChargePannel($parent) {
        if ($parent === void 0) { $parent = null; }
        var _this = _super.call(this, $parent) || this;
        _this.skinName = "VipChargePannelSkin";
        return _this;
    }
    VipChargePannel.prototype.init = function () {
        this.listLb.itemRenderer = VipChargeItem;
    };
    VipChargePannel.prototype.open = function (param) {
        if (param === void 0) { param = null; }
        /**顶部 */
        this.addTouchEvent(this.btnLuck, this.onClick);
        this.message(MsgConst.PROPERTY + PropId.AP_VIP_TEMPROARY, this.upVip); //vip临时
        this.message(MsgConst.PROPERTY + PropId.AP_VIP_GRADE, this.upVip); //vip等级
        this.message(MsgConst.PROPERTY + PropId.AP_VIP_TEMPROARY, this.upCn); //vip临时
        this.message(MsgConst.PROPERTY + PropId.AP_VIP_GRADE, this.upCn); //vip等级
        this.message(MsgConst.PROPERTY + PropId.AP_VIP_POINT, this.upVip); //vip积分
        this.message(MsgConst.FIRST_CHARGE, this.upCn); //vip积分
        this.upCn();
        this.upVip();
    };
    /**更新内容 */
    VipChargePannel.prototype.upCn = function () {
        this.setListData(this.listLb, GameCache.vip.getchargeCfg());
    };
    VipChargePannel.prototype.upVip = function () {
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
    VipChargePannel.prototype.onClick = function (e) {
        switch (e.currentTarget) {
            case this.btnLuck:
                App.ViewManager.close(ViewConst.CHARGE);
                App.ViewManager.open(ViewConst.VIP);
                break;
            default:
                break;
        }
    };
    return VipChargePannel;
}(CommunalPagePannel));
__reflect(VipChargePannel.prototype, "VipChargePannel");
//# sourceMappingURL=VipChargePannel.js.map