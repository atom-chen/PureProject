/*
 * @Description: vip数据
 * @Author: liangzhaowei
 * @Date: 2019-08-27 16:30:47
 * @LastEditTime: 2019-10-30 20:20:24
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
var VipCache = (function (_super) {
    __extends(VipCache, _super);
    function VipCache() {
        var _this = _super.call(this) || this;
        /**特权卡时间 */
        _this.privilegeCardTime = 0;
        /**福利内容 */
        _this.vipWelfare = { dailyGet: 0, exclusiveList: [] };
        /**充值页面列表 */
        _this.chargeCfg = [];
        _this.vipCardSt = {};
        return _this;
    }
    VipCache.prototype.clear = function () {
        this.privilegeCardTime = 0;
        this.vipWelfare = { dailyGet: 0, exclusiveList: [] };
        this.chargeCfg = [];
        this.vipCardSt = {};
    };
    /**更新vip 福利数据 */
    VipCache.prototype.upWelfare = function (serverData) {
        this.vipWelfare = serverData;
    };
    /**vip realValue */
    VipCache.prototype.realValue = function () {
        var vip = 1;
        var pro = GameCache.hero.mainPro;
        if (pro) {
            vip = Math.max(pro.pro(PropId.AP_VIP_TEMPROARY), pro.pro(PropId.AP_VIP_GRADE));
        }
        return vip;
    };
    /** 获取首冲金额列表*/
    VipCache.prototype.getchargeCfg = function () {
        if (this.chargeCfg.length == 0) {
            for (var index in GameConfig.chognzhi) {
                var cfg = GameConfig.chognzhi[index];
                if (cfg.sort) {
                    this.chargeCfg.push(cfg);
                }
            }
            this.chargeCfg.sort(this.sort);
        }
        return this.chargeCfg;
    };
    VipCache.prototype.sort = function (a, b) {
        return a.sort - b.sort;
    };
    VipCache.prototype.openRechargeWin = function () {
        var view = new ViewProp();
        view.exData1 = {};
        view.exData1["func"] = this.openRechargeFunc;
        view.exData1["thisc"] = this;
        view.exData1["desc"] = Language.lang.reChargeHint;
        App.ViewManager.open(ViewConst.SYSTIPS, view);
    };
    VipCache.prototype.openRechargeFunc = function () {
        if (GameCache.firstcharge.firstChargeSt) {
            var vipLvl = this.realValue();
            if (vipLvl < 6) {
                App.ViewManager.open(ViewConst.VIP);
            }
            else {
                App.ViewManager.open(ViewConst.CHARGE);
            }
        }
        else {
            App.ViewManager.open(ViewConst.FIRSTCHARGE);
        }
    };
    return VipCache;
}(BaseCache));
__reflect(VipCache.prototype, "VipCache");
//# sourceMappingURL=VipCache.js.map