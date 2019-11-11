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
 * 背包窗口
 */
var BagWin = (function (_super) {
    __extends(BagWin, _super);
    function BagWin() {
        return _super.call(this) || this;
    }
    BagWin.prototype.init = function () {
        _super.prototype.init.call(this);
        // let classArr = [BagEquipPannel,BagItemPannel];
        // let listData = [];
        // for (let i = 1; i <= classArr.length; i++) {
        //     let obj = {}
        //     obj['icon'] = "bag_json.bag_index_" + i + "_png";
        //     obj['icon2'] = "bag_json.bag_index_" + i + "_a_png";
        //     listData.push(obj);
        // }
        // this.setViewData(listData, classArr);
    };
    BagWin.prototype.open = function () {
        _super.prototype.open.call(this);
    };
    return BagWin;
}(CommunalPageWin));
__reflect(BagWin.prototype, "BagWin");
//# sourceMappingURL=BagWin.js.map