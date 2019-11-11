/*
 * @Description: vip特权展示提示
 * @Author: liangzhaowei
 * @Date: 2019-09-05 11:30:40
 * @LastEditTime: 2019-09-05 13:58:38
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
var VipTips = (function (_super) {
    __extends(VipTips, _super);
    function VipTips() {
        var _this = _super.call(this, LayerManager.UI_Tips) || this;
        _this.skinName = "VipTipsSkin";
        _this.closeDispose = false;
        return _this;
    }
    VipTips.prototype.open = function (param) {
        if (param === void 0) { param = null; }
        this.list.itemRenderer = VipWelfareItem;
        if (param) {
            var cfg = GameConfig.vip[param.exData1];
            var list = [];
            if (cfg) {
                for (var index in cfg.des) {
                    var obj = { bNew: false, dec: "" };
                    obj.dec = cfg.des[index];
                    list.push(obj);
                }
                this.setListData(this.list, list);
            }
        }
    };
    return VipTips;
}(BaseEuiWindow));
__reflect(VipTips.prototype, "VipTips");
//# sourceMappingURL=VipTips.js.map