/*
 * @Description: 限时优惠窗口
 * @Author: xiejunwei
 * @Date: 2019-10-14 10:03:49
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
var XSYHWin = (function (_super) {
    __extends(XSYHWin, _super);
    function XSYHWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "CommunalPageWin4Skin";
        return _this;
    }
    XSYHWin.prototype.init = function () {
        _super.prototype.init.call(this);
        var classArr = [XSYHPannel];
        var listData = [];
        for (var i = 1; i <= classArr.length; i++) {
            var obj = {};
            obj['icon'] = "bag_json.bag_index_" + i + "_png";
            obj['icon2'] = "bag_json.bag_index_" + i + "_a_png";
            listData.push(obj);
        }
        this.setViewData(listData, classArr);
    };
    XSYHWin.prototype.open = function () {
        _super.prototype.open.call(this);
    };
    return XSYHWin;
}(CommunalPageWin));
__reflect(XSYHWin.prototype, "XSYHWin");
//# sourceMappingURL=XSYHWin.js.map