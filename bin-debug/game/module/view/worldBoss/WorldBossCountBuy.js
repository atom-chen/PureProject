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
 * @Description: 次数购买
 * @Author: xiejunwei
 * @Date: 2019-08-13 22:40:48
 * @LastEditTime: 2019-08-23 16:46:16
 */
var WorldBossCountBuy = (function (_super) {
    __extends(WorldBossCountBuy, _super);
    function WorldBossCountBuy() {
        var _this = _super.call(this, LayerManager.UI_Tips) || this;
        _this.skinName = "WorldBossCountBuySkin";
        return _this;
    }
    WorldBossCountBuy.prototype.init = function () {
        _super.prototype.init.call(this);
    };
    WorldBossCountBuy.prototype.open = function (param) {
        _super.prototype.open.call(this);
        this.message(MsgConst.WORLDBOSS_COUNT, this.initData);
        this.addTouchEvent(this.numSele, this.onTouche);
        this.addTouchEvent(this.btn_0, this.buyFunc);
        this.initData();
    };
    WorldBossCountBuy.prototype.initData = function () {
        var obj = GameCache.boss.worldEnterCount ? GameCache.boss.worldEnterCount : null;
        var max = obj ? 10 - obj.buyCount : 10;
        this.max.text = "今日尚可购买" + max + "次";
        this.numSele.initData(10 - obj, 1);
        this.cost.setData(GlobalVar.GOLD, 5 * 1);
    };
    WorldBossCountBuy.prototype.onTouche = function () {
        this.cost.setData(GlobalVar.GOLD, 5 * this.numSele.num);
    };
    WorldBossCountBuy.prototype.buyFunc = function () {
        Proxy.boss.sendBossFubenOpt(3, 29);
        this.closeView();
    };
    return WorldBossCountBuy;
}(BaseEuiWindow));
__reflect(WorldBossCountBuy.prototype, "WorldBossCountBuy");
//# sourceMappingURL=WorldBossCountBuy.js.map