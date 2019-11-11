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
 * 玩法说明
 */
var InstructionPart = (function (_super) {
    __extends(InstructionPart, _super);
    function InstructionPart() {
        return _super.call(this) || this;
    }
    InstructionPart.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.addTouchEvent(this, this.openTips);
    };
    InstructionPart.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
    };
    InstructionPart.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    InstructionPart.prototype.openTips = function () {
        var conf = GameConfig.instruction[this.name];
        if (!conf) {
            GlobalFun.SysMsg("玩法配置ID" + this.name + "错误");
            return;
        }
        var viewprop = new ViewProp();
        viewprop.exData1 = RES_DIR_INSTRUCTION_TITTLE + (conf.icon || 1) + ".png";
        viewprop.exData2 = conf.dec;
        App.ViewManager.open(ViewConst.INSTRUCTION, viewprop);
    };
    return InstructionPart;
}(BaseCustComponent));
__reflect(InstructionPart.prototype, "InstructionPart");
//# sourceMappingURL=InstructionPart.js.map