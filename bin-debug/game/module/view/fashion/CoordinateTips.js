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
 * @Description: 搭配窗口
 * @Author: xiejunwei
 * @Date: 2019-08-06 15:35:50
 * @LastEditTime: 2019-08-07 15:38:15
 */
var CoordinateTips = (function (_super) {
    __extends(CoordinateTips, _super);
    function CoordinateTips() {
        var _this = _super.call(this, LayerManager.UI_Tips) || this;
        _this.skinName = "CoordinateTipsSkin";
        return _this;
    }
    CoordinateTips.prototype.init = function () {
        _super.prototype.init.call(this);
        this.itemList.itemRenderer = CoordinateItem;
    };
    CoordinateTips.prototype.open = function (param) {
        _super.prototype.open.call(this);
        this.initList(param.exData1);
    };
    CoordinateTips.prototype.initList = function (job) {
        var conf = GameConfig.fashionSuit;
        var arr = [];
        for (var i in conf) {
            if (conf[i].conds[0].value != 0 && conf[i].conds[0].value != job)
                continue;
            arr.push(conf[i]);
        }
        this.setListData(this.itemList, arr);
    };
    CoordinateTips.prototype.refleshItem = function () {
        var idx = this.itemList.selectedIndex;
        var item = this.itemList.getElementAt(idx);
        item.reflashItemList();
    };
    return CoordinateTips;
}(BaseEuiWindow));
__reflect(CoordinateTips.prototype, "CoordinateTips");
//# sourceMappingURL=CoordinateTips.js.map