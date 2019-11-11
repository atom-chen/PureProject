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
/**
 * create by junwei on 07/25/2019
 * 玩法说明TIPS
 */
var InstructionTips = (function (_super) {
    __extends(InstructionTips, _super);
    function InstructionTips() {
        var _this = _super.call(this, LayerManager.UI_Tips) || this;
        _this.skinName = "InstructionTipsSkin";
        return _this;
    }
    InstructionTips.prototype.init = function () {
    };
    InstructionTips.prototype.open = function (param) {
        this.title.source = param.exData1;
        this.desc.textFlow = TextFlowUtils.generateTextFlow(param.exData2);
    };
    return InstructionTips;
}(BaseEuiWindow));
__reflect(InstructionTips.prototype, "InstructionTips");
//# sourceMappingURL=InstructionTipsSkin.js.map