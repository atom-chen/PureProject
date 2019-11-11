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
var FamilyOption = (function (_super) {
    __extends(FamilyOption, _super);
    function FamilyOption() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FamilyOption.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    FamilyOption.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        this.icon.source = "family_json." + this.data.icon + "_png";
        this.labName.text = this.data.name;
    };
    return FamilyOption;
}(BaseCustComponent));
__reflect(FamilyOption.prototype, "FamilyOption");
//# sourceMappingURL=FamilyOption.js.map