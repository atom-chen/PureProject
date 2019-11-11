/*
 * @Description:
 * @Author: liangzhaowei
 * @Date: 2019-08-20 14:32:19
 * @LastEditTime: 2019-08-23 17:04:11
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
var CopyTowerRwWin = (function (_super) {
    __extends(CopyTowerRwWin, _super);
    function CopyTowerRwWin() {
        var _this = _super.call(this, LayerManager.UI_Tips) || this;
        _this.skinName = "CopyTowerRwWinSkin";
        return _this;
    }
    CopyTowerRwWin.prototype.init = function () {
        _super.prototype.init.call(this);
        this.list.itemRenderer = ItemBase;
        this.setWinTitle("everydayRw");
    };
    CopyTowerRwWin.prototype.open = function (param) {
        _super.prototype.open.call(this);
        this.stdMiwu = param.exData1;
        this.upBtn();
        this.addTouchEvent(this.btn, this.onclick);
        this.message(MsgConst.CPOY_TOWER, this.upBtn);
        this.setListData(this.list, this.stdMiwu.dailyaward);
    };
    CopyTowerRwWin.prototype.upBtn = function () {
        if (GameCache.copytower.copyTowerData) {
            this.btn.icon = GameCache.copytower.copyTowerData.getState ? "res/btn/get_4.png" : "res/btn/get_3.png";
        }
    };
    /**点击响应 */
    CopyTowerRwWin.prototype.onclick = function () {
        Proxy.copytower.getDailyRw();
    };
    return CopyTowerRwWin;
}(BaseEuiWindow));
__reflect(CopyTowerRwWin.prototype, "CopyTowerRwWin");
//# sourceMappingURL=CopyTowerRwWin.js.map