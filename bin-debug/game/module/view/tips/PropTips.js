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
 * @Description: 总属性提示
 * @Author: xiejunwei
 * @Date: 2019-08-27 11:48:35
 * @LastEditTime: 2019-08-27 11:54:48
 */
var PropTips = (function (_super) {
    __extends(PropTips, _super);
    function PropTips() {
        var _this = _super.call(this, LayerManager.UI_Tips) || this;
        _this.skinName = "PropTipsSkin";
        return _this;
    }
    PropTips.prototype.init = function () {
    };
    PropTips.prototype.open = function (param) {
        _super.prototype.open.call(this);
        if (param) {
            this.title.source = param.firData["src"];
            this.propList.setData(param.firData["prop"], []);
        }
    };
    return PropTips;
}(BaseEuiWindow));
__reflect(PropTips.prototype, "PropTips");
//# sourceMappingURL=PropTips.js.map