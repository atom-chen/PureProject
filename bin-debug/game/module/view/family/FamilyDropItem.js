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
var FamilyDropItem = (function (_super) {
    __extends(FamilyDropItem, _super);
    function FamilyDropItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FamilyDropItem.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    FamilyDropItem.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        this.labLimit.text = StringUtils.substitute(Language.lang.familyApplyCondition, this.data.sc);
    };
    return FamilyDropItem;
}(BaseCustComponent));
__reflect(FamilyDropItem.prototype, "FamilyDropItem");
//# sourceMappingURL=FamilyDropItem.js.map