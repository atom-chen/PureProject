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
 * @Description: 经验副本BUFF购买
 * @Author: xiejunwei
 * @Date: 2019-09-02 17:42:30
 * @LastEditTime: 2019-09-18 14:27:15
 */
var CopyExpBuffBuy = (function (_super) {
    __extends(CopyExpBuffBuy, _super);
    function CopyExpBuffBuy() {
        var _this = _super.call(this, LayerManager.UI_Tips) || this;
        _this.toggle = 0;
        _this.skinName = "CopyExpBuyBuffSkin";
        return _this;
    }
    CopyExpBuffBuy.prototype.init = function () {
        _super.prototype.init.call(this);
        this.num.gap = 15;
    };
    CopyExpBuffBuy.prototype.open = function (param) {
        _super.prototype.open.call(this);
        this.message(MsgConst.COPY_BUFF_COUNT, this.initCount);
        this.addTouchEvent(this.g1, this.onTouche);
        this.addTouchEvent(this.g0, this.onTouche);
        this.addTouchEvent(this.buyBtn, this.buyFunc);
        this.initCount();
        this.onTouche();
        this.bg.setNameImg("inspire");
        var conf = GameConfig.globalConfig;
        this.cost_0.text = StringUtils.substitute(Language.lang.inspire_1, conf.coinInspireConsume);
        this.cost_1.text = StringUtils.substitute(Language.lang.inspire_1, conf.goldInspireConsume);
        this.num.value = "10%";
    };
    CopyExpBuffBuy.prototype.onTouche = function (e) {
        var tar = e ? parseInt(e.target.name) : 0;
        this.toggle = tar;
        this.sele_0.visible = this.toggle == 0;
        this.sele_1.visible = !this.sele_0.visible;
    };
    CopyExpBuffBuy.prototype.buyFunc = function () {
        var conf = GameConfig.globalConfig;
        var have = 0;
        if (this.toggle == 0) {
            have = GameCache.hero.mainPro.pro(PropId.AP_COIN);
            if (have < conf.coinInspireConsume) {
                GlobalFun.SysMsg(StringUtils.substitute(Language.lang.notEnought, Language.lang.coin));
                return;
            }
        }
        else {
            have = GameCache.hero.mainPro.pro(PropId.AP_YUANBAO);
            if (have < conf.goldInspireConsume) {
                GlobalFun.SysMsg(StringUtils.substitute(Language.lang.notEnought, Language.lang.yb));
                //预留充值跳转
                GlobalFun.gotoCharge();
                return;
            }
        }
        Proxy.copy.sendBuyBuff(this.toggle);
    };
    CopyExpBuffBuy.prototype.initCount = function () {
        var arr = GameCache.copy.buffBuy ? GameCache.copy.buffBuy : [0, 0];
        var conf = GameConfig.globalConfig;
        this.c0.text = StringUtils.substitute(Language.lang.inspire_0, arr[0], conf.coinInspireCount);
        this.c1.text = StringUtils.substitute(Language.lang.inspire_0, arr[1], conf.goldInspireCount);
        var total = (arr[0] + arr[1]) * 10;
        this.t0.x = total == 100 ? 137 : 146;
        this.t0.textFlow = TextFlowUtils.generateTextFlow(StringUtils.substitute(Language.lang.inspire_2, total));
    };
    return CopyExpBuffBuy;
}(BaseEuiWindow));
__reflect(CopyExpBuffBuy.prototype, "CopyExpBuffBuy");
//# sourceMappingURL=CopyExpBuffBuy.js.map