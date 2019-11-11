/*
 * @Description: 幸运抽奖
 * @Author: liangzhaowei
 * @Date: 2019-08-20 14:32:19
 * @LastEditTime: 2019-10-10 19:18:49
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
var LuckyDail = (function (_super) {
    __extends(LuckyDail, _super);
    function LuckyDail() {
        var _this = _super.call(this, LayerManager.UI_Tips) || this;
        _this.doneTurn = true;
        _this.rwList = [];
        _this.getTime = 0;
        _this.skinName = "LuckyDailSkin";
        return _this;
    }
    LuckyDail.prototype.init = function () {
        _super.prototype.init.call(this);
    };
    LuckyDail.prototype.open = function (param) {
        _super.prototype.open.call(this);
        this.indicator.rotation = 0;
        this.rwList = param.exData1 || [];
        this.upList();
        this.addTouchEvent(this.sBtn, this.onClick);
        this.addTouchEvent(this.closeBtn, this.onClick);
        this.message(MsgConst.CPOY_TOWER_LUCK, this.turnIndi);
        this.message(MsgConst.CPOY_TOWER, this.upList);
    };
    LuckyDail.prototype.upList = function () {
        if (!this.rwList.length) {
            return;
        }
        for (var i = 1; i <= 10; i++) {
            this["item_" + i].data = this.rwList[i - 1];
            if (GameCache.copytower.copyTowerData) {
                this["item_" + i].setState = GameCache.copytower.copyTowerData.dailList[i - 1];
            }
        }
        if (GameCache.copytower.copyTowerData) {
            this.countText.text = StringUtils.substitute(Language.lang.lcn4, GameCache.copytower.copyTowerData.luckLeftTime);
        }
    };
    /**num 抽中下标*/
    LuckyDail.prototype.turnIndi = function (num) {
        var _this = this;
        if (num === void 0) { num = 1; }
        if (!this.doneTurn)
            return;
        var round = Math.floor(Math.random() * 3) + 1;
        this.doneTurn = false;
        var tw = egret.Tween.get(this.indicator);
        tw.to({ rotation: round * 360 + num * 36 }, round * 1000, egret.Ease.cubicOut).call(function () {
            _this.doneTurn = true;
            var reIndex = 0;
            _this.setRecvState(num + 1);
            Proxy.copytower.getLuckRw();
        });
    };
    LuckyDail.prototype.close = function () {
        if (this.doneTurn) {
            Proxy.copytower.getLuckRw();
        }
        _super.prototype.close.call(this);
    };
    LuckyDail.prototype.setRecvState = function (part) {
        this["item_" + part].setState = true;
    };
    LuckyDail.prototype.onClick = function (e) {
        switch (e.currentTarget) {
            case this.sBtn:
                if (GameCache.copytower.copyTowerData && GameCache.copytower.copyTowerData.luckLeftTime) {
                    Proxy.copytower.getLuck();
                }
                break;
            case this.closeBtn:
                this.closeView();
                break;
            default:
                break;
        }
    };
    return LuckyDail;
}(BaseEuiWindow));
__reflect(LuckyDail.prototype, "LuckyDail");
//# sourceMappingURL=LuckyDail.js.map