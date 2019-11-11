/**
 * effect: 角色部位
 * author :lzw
 * data :2019.6.18
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
var RolePartSprite = (function (_super) {
    __extends(RolePartSprite, _super);
    function RolePartSprite() {
        var _this = _super.call(this) || this;
        _this.skinName = "RolePartSkin";
        return _this;
        // this.initUI()
    }
    RolePartSprite.prototype.init = function () {
        // this.part.source = "role_json.role_part_" + this.name + "_png"
    };
    return RolePartSprite;
}(BaseCustComponent));
__reflect(RolePartSprite.prototype, "RolePartSprite");
//# sourceMappingURL=RolePartSprite.js.map