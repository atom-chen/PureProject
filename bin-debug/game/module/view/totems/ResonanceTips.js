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
 * @Description: 共鸣窗口
 * @Author: xiejunwei
 * @Date: 2019-08-27 14:33:13
 * @LastEditTime: 2019-08-29 15:24:05
 */
var ResonanceTips = (function (_super) {
    __extends(ResonanceTips, _super);
    function ResonanceTips() {
        var _this = _super.call(this) || this;
        _this.skinName = "ResonanceTipsSkin";
        return _this;
    }
    ResonanceTips.prototype.init = function () {
        _super.prototype.init.call(this);
        this.bg.setNameImg("resonance");
        this.itemList.itemRenderer = ResonanceItem;
    };
    ResonanceTips.prototype.open = function (param) {
        _super.prototype.open.call(this);
        this.message(MsgConst.TOTEMS_RESONANCE, this.initData);
        this.message(MsgConst.TOTEMS_INFO, this.initData);
        this.initData();
    };
    ResonanceTips.prototype.initData = function () {
        var conf = GameConfig.resonance;
        var idArr = [];
        for (var i in conf) {
            idArr.push(i);
        }
        this.setListData(this.itemList, idArr);
    };
    return ResonanceTips;
}(BaseEuiWindow));
__reflect(ResonanceTips.prototype, "ResonanceTips");
//# sourceMappingURL=ResonanceTips.js.map