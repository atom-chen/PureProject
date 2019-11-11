/*
 * @Description: 宠物展示界面
 * @Author: liangzhaowei
 * @Date: 2019-09-18 10:30:22
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
var PetShowAllWin = (function (_super) {
    __extends(PetShowAllWin, _super);
    function PetShowAllWin() {
        var _this = _super.call(this, LayerManager.UI_Tips) || this;
        _this.skinName = "PetShowAllWinSkin";
        return _this;
    }
    PetShowAllWin.prototype.init = function () {
        _super.prototype.init.call(this);
        this.list.itemRenderer = PetShowInfoItem;
        this.setWinTitle("petAll");
    };
    PetShowAllWin.prototype.open = function (param) {
        _super.prototype.open.call(this);
        this.upList();
    };
    PetShowAllWin.prototype.upList = function () {
        var tList = [];
        for (var index in GameConfig.pet) {
            if (GameConfig.pet[index].id) {
                tList.push(GameConfig.pet[index]);
            }
        }
        this.setListData(this.list, tList);
    };
    return PetShowAllWin;
}(BaseEuiWindow));
__reflect(PetShowAllWin.prototype, "PetShowAllWin");
//# sourceMappingURL=PetShowAllWin.js.map