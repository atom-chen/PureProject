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
/*
 * @Description: 离线奖励面板
 * @Author: xiejunwei
 * @Date: 2019-08-28 17:32:33
 * @LastEditTime: 2019-10-21 19:37:38
 */
var OffLineAward = (function (_super) {
    __extends(OffLineAward, _super);
    function OffLineAward() {
        var _this = _super.call(this, LayerManager.UI_Tips) || this;
        _this.skinName = "OffLineAwardSkin";
        return _this;
    }
    OffLineAward.prototype.init = function () {
        _super.prototype.init.call(this);
    };
    OffLineAward.prototype.open = function (param) {
        _super.prototype.open.call(this);
        this.addTouchEvent(this.vipBtn, this.vipFunc);
        for (var i = 0; i < 3; i++) {
            this["t" + i].text = Language.lang.offLineText[i];
        }
        var obj = param.firData;
        var vipLvl = GameCache.vip.realValue();
        var conf = GameConfig.vip[vipLvl + 1];
        this.currentState = conf ? "nor" : "max";
        this.g0.text = GlobalFun.numCut(obj.coin);
        this.e0.text = GlobalFun.numCut(obj.exp);
        this.i1.text = this.i0.text = GlobalFun.numCut(obj.eq);
        if (conf) {
            this.t4.textFlow = TextFlowUtils.generateTextFlow(StringUtils.substitute(Language.lang.offLineText[4], vipLvl + 1));
            this.g1.text = GlobalFun.numCut((obj.coin * (1 + conf.goldadd / 10000)));
            this.e1.text = GlobalFun.numCut((obj.exp * (1 + conf.expadd / 10000)));
        }
        this.full.visible = obj.full;
        if (obj.full) {
            this.full.text = obj.melt ? StringUtils.substitute(Language.lang.offLineBag[1], obj.melt) : Language.lang.offLineBag[0];
        }
        var serverTime = GameCache.server.serverTime;
        var deltaTime = Math.ceil((serverTime - obj.offLineTime) / 1000);
        var str = App.DateUtils.getFormatBySecond(deltaTime, DateUtils.TIME_FORMAT_5);
        this.time.text = str;
    };
    OffLineAward.prototype.vipFunc = function () {
        // GlobalFun.gotoCharge();
        App.ViewManager.open(ViewConst.VIP);
        this.closeView();
    };
    return OffLineAward;
}(BaseEuiWindow));
__reflect(OffLineAward.prototype, "OffLineAward");
//# sourceMappingURL=OffLineAward.js.map