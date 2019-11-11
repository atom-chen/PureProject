/*
 * @Description: 转职预览窗口
 * @Author: liangzhaowei
 * @Date: 2019-10-29 17:26:55
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
var TransferShowWin = (function (_super) {
    __extends(TransferShowWin, _super);
    function TransferShowWin() {
        var _this = _super.call(this, LayerManager.UI_Tips) || this;
        _this.job = 0;
        _this.skinName = "TransferShowWinSkin";
        return _this;
    }
    TransferShowWin.prototype.init = function () {
        _super.prototype.init.call(this);
        this.list.itemRenderer = TransferShowItem;
        this.setWinTitle("jobShow");
    };
    TransferShowWin.prototype.open = function (param) {
        _super.prototype.open.call(this);
        this.job = param.exData1 ? param.exData1 : 0;
        var cfg = GameConfig.transfertotal[this.job];
        if (cfg && cfg.describe) {
            var list = [];
            for (var index in cfg.describe) {
                var obj = { des: "", job: 0 };
                obj.job = this.job;
                obj.des = cfg.describe[index];
                list.push(obj);
            }
            this.setListData(this.list, list);
        }
    };
    return TransferShowWin;
}(BaseEuiWindow));
__reflect(TransferShowWin.prototype, "TransferShowWin");
//# sourceMappingURL=TransferShowWin.js.map