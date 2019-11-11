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
 * @Description: 角色图标
 * @Author: xiejunwei
 * @Date: 2019-08-01 10:37:43
 * @LastEditTime: 2019-09-05 15:48:29
 */
var RoleIcon = (function (_super) {
    __extends(RoleIcon, _super);
    function RoleIcon() {
        return _super.call(this) || this;
    }
    RoleIcon.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    RoleIcon.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (!(this.data instanceof PropertySet))
            return;
        this.initData();
    };
    RoleIcon.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    RoleIcon.prototype.initData = function () {
        var data = this.data;
        if (data.pro(PropId.AP_HP) <= 0) {
            this.filters = FilterUtils.DefaultGrayFilters;
        }
        else {
            this.filters = [];
        }
    };
    return RoleIcon;
}(BaseCustComponent));
__reflect(RoleIcon.prototype, "RoleIcon");
//# sourceMappingURL=RoleIcon.js.map