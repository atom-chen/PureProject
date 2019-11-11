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
var DragonTestItem = (function (_super) {
    __extends(DragonTestItem, _super);
    function DragonTestItem() {
        return _super.call(this) || this;
    }
    DragonTestItem.prototype.init = function () {
        _super.prototype.init.call(this);
    };
    return DragonTestItem;
}(BaseCustComponent));
__reflect(DragonTestItem.prototype, "DragonTestItem");
//# sourceMappingURL=DragonTestItem.js.map