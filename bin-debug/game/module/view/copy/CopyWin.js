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
 * @Description: 副本窗口
 * @Author: xiejunwei
 * @Date: 2019-08-21 19:25:13
 * @LastEditTime: 2019-08-21 19:27:00
 */
var CopyWin = (function (_super) {
    __extends(CopyWin, _super);
    function CopyWin() {
        return _super.call(this) || this;
    }
    CopyWin.prototype.open = function () {
        _super.prototype.open.call(this);
    };
    return CopyWin;
}(CommunalPageWin));
__reflect(CopyWin.prototype, "CopyWin");
//# sourceMappingURL=CopyWin.js.map