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
 * @Description: 通用次数购买
 * @Author: xiejunwei
 * @Date: 2019-09-18 11:11:47
 */
var EnterBuyTips = (function (_super) {
    __extends(EnterBuyTips, _super);
    function EnterBuyTips() {
        var _this = _super.call(this, LayerManager.UI_Tips) || this;
        _this.limit = 0;
        _this.skinName = "WorldBossCountBuySkin";
        return _this;
    }
    EnterBuyTips.prototype.init = function () {
        _super.prototype.init.call(this);
        this.num_0.gap = this.num_1.gap = 30;
        this.cost.lab.textColor = 0x3e1700;
        // this.cost.numColor_0 = 0x0cff00;
    };
    EnterBuyTips.prototype.open = function (param) {
        _super.prototype.open.call(this);
        this.addTouchEvent(this.btn_0, this.buyFunc);
        this.addTouchEvent(this.btn_1, this.closeView);
        this.cost.setData(GlobalVar.GOLD, param.firData["price"]);
        if (this.hand) {
            this.hand.dispose();
        }
        this.hand = Handler.create(param.firData["thisc"], param.firData["func"], param.firData["arg"], false);
        var vipLvl = GameCache.vip.realValue();
        var lvlMax = GameConfig.vip[vipLvl + 1] ? false : true;
        this.num_0.value = vipLvl;
        this.num_1.value = vipLvl + 1;
        var remain = param.firData["max"][0] - param.firData["max"][1];
        var color = remain > 0 ? 0x0cff00 : 0xff0000;
        this.max.textFlow = TextFlowUtils.generateTextFlow(StringUtils.substitute(Language.lang.buyRemian, "<(c" + color + ")" + remain + "/" + param.firData["max"][0] + ">"));
        if (lvlMax) {
            this.currentState = "max";
        }
        else {
            this.currentState = "nor";
            this.max_1.textFlow = TextFlowUtils.generateTextFlow(StringUtils.substitute(Language.lang.buyRemian, "<(c0x0cff00)" + param.firData["max"][2] + ">"));
        }
    };
    EnterBuyTips.prototype.buyFunc = function () {
        if (this.cost.isExpend) {
            this.hand.run();
        }
        else {
            GlobalFun.gotoCharge();
        }
        this.closeView();
    };
    EnterBuyTips.prototype.close = function (param) {
        _super.prototype.close.call(this);
        if (this.hand) {
            this.hand.dispose();
            this.hand = null;
        }
    };
    return EnterBuyTips;
}(BaseEuiWindow));
__reflect(EnterBuyTips.prototype, "EnterBuyTips");
//# sourceMappingURL=EnterBuyTips.js.map