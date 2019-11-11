/*
 * @Description: 首冲窗口
 * @Author: liangzhaowei
 * @Date: 2019-09-02 17:33:24
 * @LastEditTime: 2019-10-31 20:04:35
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
var FirstChargeWin = (function (_super) {
    __extends(FirstChargeWin, _super);
    function FirstChargeWin() {
        var _this = _super.call(this, LayerManager.UI_Win) || this;
        _this.skinName = "FirstChargeWinSkin";
        return _this;
    }
    /**模块红点函数 不需要计算的写在前面 */
    FirstChargeWin.red = function () {
        return App.ViewManager.bOpened(ViewConst.FIRSTCHARGE);
    };
    FirstChargeWin.prototype.init = function () {
        this.list0.itemRenderer = ItemBase;
        this.list1.itemRenderer = ItemBase;
        this.list2.itemRenderer = ItemBase;
        this.tabBtn.selectedIndex = 0;
    };
    /**用于同一处理打开时的操作 */
    FirstChargeWin.prototype.open = function (param) {
        if (param === void 0) { param = null; }
        _super.prototype.open.call(this);
        this.message(MsgConst.PROPERTY + PropId.AP_VIP_POINT, this.upCn); //充值金额
        this.message(MsgConst.FIRST_CHARGE, this.upCn);
        this.addTouchEvent(this.tabBtn, this.tabTouche);
        this.addTouchEvent(this.btn0, this.onClick);
        this.addTouchEvent(this.btn1, this.onClick);
        this.addTouchEvent(this.btn2, this.onClick);
        this.upCn();
    };
    FirstChargeWin.prototype.tabTouche = function () {
        this.upCn();
    };
    FirstChargeWin.prototype.onClick = function (e) {
        var tIndex = 1;
        switch (e.currentTarget) {
            case this.btn0:
                tIndex = 1;
                break;
            case this.btn1:
                tIndex = 2;
                break;
            case this.btn2:
                tIndex = 3;
                break;
            default:
                break;
        }
        Proxy.firstcharge.getRw(this.tabBtn.selectedIndex + 1, tIndex);
    };
    FirstChargeWin.prototype.upCn = function () {
        /**充值金额 */
        var pro = GameCache.hero.mainPro;
        if (pro) {
            this.lbCharge.text = StringUtils.substitute(Language.lang.lcn12, pro.pro(PropId.AP_VIP_POINT));
        }
        /**是否首冲过 */
        this.gCharge.visible = GameCache.firstcharge.firstChargeSt == 0;
        for (var index in GameCache.firstcharge.getFirstChargeCfg()) {
            var cfg = GameCache.firstcharge.getFirstChargeCfg()[index];
            if (cfg) {
                this["charge" + index].data = cfg;
            }
        }
        /**奖励列表 */
        var reCfg = GameConfig.recharge[this.tabBtn.selectedIndex + 1];
        if (reCfg && reCfg.Reward) {
            for (var index in reCfg.Reward) {
                this.setListData(this["list" + index], GlobalFun.filterJob(reCfg.Reward[index]));
                var getState = 0;
                if (this.tabBtn.selectedIndex == 0) {
                    getState = GameCache.firstcharge.firstGetList[index];
                }
                else if (this.tabBtn.selectedIndex == 1) {
                    getState = GameCache.firstcharge.totalGetList[index];
                }
                this["imgGet" + index].visible = getState != 1;
                this["btn" + index].visible = getState == 1;
                if (getState == 0) {
                    this["imgGet" + index].source = "firstCharge_json.firstCharge" + (parseInt(index) + 5) + "_png";
                }
                else if (getState == 2) {
                    this["imgGet" + index].source = "public_json.luck_img2_png";
                }
            }
        }
    };
    return FirstChargeWin;
}(BaseEuiWindow));
__reflect(FirstChargeWin.prototype, "FirstChargeWin");
//# sourceMappingURL=FirstChargeWin.js.map