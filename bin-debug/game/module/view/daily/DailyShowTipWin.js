/*
 * @Description: 日常显示奖励详情
 * @Author: liangzhaowei
 * @Date: 2019-08-13 16:28:54
 * @LastEditTime: 2019-08-15 19:07:22
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
var DailyShowTipWin = (function (_super) {
    __extends(DailyShowTipWin, _super);
    function DailyShowTipWin() {
        var _this = _super.call(this, LayerManager.UI_Tips) || this;
        _this.skinName = "DailyShowTipWinSkin";
        return _this;
    }
    DailyShowTipWin.prototype.init = function () {
        _super.prototype.init.call(this);
        this.num.gap = 15;
        this.bg.setNameImg("treasure");
    };
    DailyShowTipWin.prototype.open = function (param) {
        _super.prototype.open.call(this);
        var cfg = GameConfig.DailyReward[param.exData1];
        if (cfg && cfg.reward) {
            this.slidePage.setData(cfg.reward);
            this.num.value = cfg.value;
        }
        // this.imgWdc.visible = param.exData2;
    };
    return DailyShowTipWin;
}(BaseEuiWindow));
__reflect(DailyShowTipWin.prototype, "DailyShowTipWin");
//# sourceMappingURL=DailyShowTipWin.js.map