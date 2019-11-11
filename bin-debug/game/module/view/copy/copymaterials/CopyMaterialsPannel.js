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
 * @Description: 副本面板
 * @Author: xiejunwei
 * @Date: 2019-08-21 15:50:50
 * @LastEditTime: 2019-08-21 16:00:14
 */
var CopyPannel = (function (_super) {
    __extends(CopyPannel, _super);
    function CopyPannel($parent) {
        if ($parent === void 0) { $parent = null; }
        return _super.call(this, $parent) || this;
    }
    CopyPannel.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    CopyPannel.prototype.open = function (param) {
        if (param === void 0) { param = null; }
        _super.prototype.open.call(this, param);
    };
    CopyPannel.prototype.init = function () {
        _super.prototype.init.call(this);
    };
    return CopyPannel;
}(CommunalPagePannel));
__reflect(CopyPannel.prototype, "CopyPannel");
//# sourceMappingURL=CopyMaterialsPannel.js.map