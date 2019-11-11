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
var RoleInfoItem = (function (_super) {
    __extends(RoleInfoItem, _super);
    function RoleInfoItem() {
        var _this = _super.call(this) || this;
        _this.skinName = "RoleInfoItemSkin";
        return _this;
    }
    RoleInfoItem.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        // this.addTouchEvent(this, this.onTouche);
    };
    RoleInfoItem.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (this.data) {
            this.roleType.source = this.data.icon;
            this.imgRoleSl.visible = this.data.index == this.itemIndex;
        }
    };
    return RoleInfoItem;
}(BaseCustComponent));
__reflect(RoleInfoItem.prototype, "RoleInfoItem");
//# sourceMappingURL=RoleInfoItem.js.map