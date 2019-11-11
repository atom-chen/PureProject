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
 * @Description: 新手指引箭头
 * @Author: guolinsen
 * @Date: 2019-10-09 10:47:52
 */
var NoviceGuideArrow = (function (_super) {
    __extends(NoviceGuideArrow, _super);
    function NoviceGuideArrow() {
        var _this = _super.call(this) || this;
        _this.skinName = "NoviceGuideArrowSkin";
        return _this;
    }
    NoviceGuideArrow.prototype.setData = function (text, dir) {
        this.text.text = text;
        this.currentState = dir == 1 ? "r" : "l";
        if (dir == 1) {
            this.currentState = "r";
            this.x = -241;
        }
        else {
            this.currentState = "l";
            this.x = 40;
        }
        this.y = -90;
    };
    return NoviceGuideArrow;
}(BaseCustComponent));
__reflect(NoviceGuideArrow.prototype, "NoviceGuideArrow");
//# sourceMappingURL=NoviceGuideArrow.js.map