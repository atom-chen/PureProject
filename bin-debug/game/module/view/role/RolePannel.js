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
    author:lzw
    date:2019/6/24 14:10
    explain:角色pannel内容
*/
var RolePannel = (function (_super) {
    __extends(RolePannel, _super);
    function RolePannel($parent) {
        if ($parent === void 0) { $parent = null; }
        return _super.call(this, $parent) || this;
    }
    RolePannel.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    RolePannel.prototype.open = function (param) {
        if (param === void 0) { param = null; }
        _super.prototype.open.call(this, param);
    };
    RolePannel.prototype.init = function () {
        _super.prototype.init.call(this);
    };
    return RolePannel;
}(CommunalPagePannel));
__reflect(RolePannel.prototype, "RolePannel");
//# sourceMappingURL=RolePannel.js.map