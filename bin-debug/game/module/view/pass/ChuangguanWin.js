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
/**
 * create by junwei on 07/11/2019
 * 闯关窗口
 */
var ChuangguanWin = (function (_super) {
    __extends(ChuangguanWin, _super);
    function ChuangguanWin() {
        return _super.call(this) || this;
    }
    ChuangguanWin.prototype.init = function () {
        // this.setViewData([], [ChuangguanPannel]);
    };
    return ChuangguanWin;
}(CommunalPageWin));
__reflect(ChuangguanWin.prototype, "ChuangguanWin");
//# sourceMappingURL=ChuangguanWin.js.map