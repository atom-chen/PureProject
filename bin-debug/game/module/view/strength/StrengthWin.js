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
// TypeScript file
var StrengthWin = (function (_super) {
    __extends(StrengthWin, _super);
    function StrengthWin() {
        return _super.call(this) || this;
    }
    StrengthWin.prototype.init = function () {
        _super.prototype.init.call(this);
        // let listData = [];
        // for (let i = 0; i < 5; i++) {
        //     let obj = { icon: "role_json.role_index_ud_0_png", icon2: "role_json.role_index_0_png" }
        //     obj.icon = "role_json.role_index_ud_" + i + "_png"
        //     obj.icon2 = "role_json.role_index_" + i + "_png"
        //     listData.push(obj);
        // }
        // this.setViewData(listData, [StrengthPannel, StrengthPannel, StrengthPannel, StrengthPannel, StrengthPannel])
    };
    return StrengthWin;
}(CommunalPageWin));
__reflect(StrengthWin.prototype, "StrengthWin");
//# sourceMappingURL=StrengthWin.js.map