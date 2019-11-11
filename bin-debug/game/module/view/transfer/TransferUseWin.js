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
var TransferUseWin = (function (_super) {
    __extends(TransferUseWin, _super);
    function TransferUseWin() {
        var _this = _super.call(this, LayerManager.UI_Tips) || this;
        _this.slRoleId = 0;
        _this.skinName = "TransferUseWinSkin";
        return _this;
    }
    TransferUseWin.prototype.init = function () {
        _super.prototype.init.call(this);
        this.list.itemRenderer = TransferUseItem;
        this.setWinTitle("expChange");
    };
    TransferUseWin.prototype.open = function (param) {
        _super.prototype.open.call(this);
        this.slRoleId = param.exData1 ? param.exData1 : 0;
        this.upList();
        this.message(MsgConst.TRANSFER_INFO, this.upList);
    };
    TransferUseWin.prototype.upList = function () {
        var list = [];
        if (GameConfig.transferconfig) {
            for (var index in GameConfig.transferconfig) {
                var obj = { item: [], slRoleId: 0 };
                obj.slRoleId = this.slRoleId;
                obj.item = GameConfig.transferconfig[index];
                list.push(obj);
            }
        }
        this.setListData(this.list, list);
    };
    return TransferUseWin;
}(BaseEuiWindow));
__reflect(TransferUseWin.prototype, "TransferUseWin");
//# sourceMappingURL=TransferUseWin.js.map