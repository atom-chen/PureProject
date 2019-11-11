/**
 * create by junwei on 07/29/2019
 * 价格模块
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
var PricePart = (function (_super) {
    __extends(PricePart, _super);
    function PricePart() {
        var _this = _super.call(this) || this;
        _this.skinName = "PricePartSkin";
        return _this;
    }
    PricePart.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.cost.gainWay.visible = false;
        this.cost.lab.textFlow = TextFlowUtils.generateTextFlow(Language.lang.price);
    };
    PricePart.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
    };
    PricePart.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return PricePart;
}(BaseCustComponent));
__reflect(PricePart.prototype, "PricePart");
//# sourceMappingURL=PricePart.js.map