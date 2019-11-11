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
 * @Description: 翅膀面板
 * @Author: xiejunwei
 * @Date: 2019-08-14 14:22:57
 * @LastEditTime: 2019-08-14 17:35:50
 */
var WingPanel = (function (_super) {
    __extends(WingPanel, _super);
    function WingPanel($parent) {
        if ($parent === void 0) { $parent = null; }
        return _super.call(this, $parent) || this;
    }
    WingPanel.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    WingPanel.prototype.open = function (param) {
        if (param === void 0) { param = null; }
        _super.prototype.open.call(this, param);
    };
    WingPanel.prototype.init = function () {
        _super.prototype.init.call(this);
    };
    return WingPanel;
}(CommunalPagePannel));
__reflect(WingPanel.prototype, "WingPanel");
//# sourceMappingURL=WingPannel.js.map