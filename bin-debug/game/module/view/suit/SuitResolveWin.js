/**
 * effect: 套装详情窗口
 * author :lzw
 * data :2019.7.24
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
var SuitResolveWin = (function (_super) {
    __extends(SuitResolveWin, _super);
    function SuitResolveWin() {
        var _this = _super.call(this, LayerManager.UI_Tips) || this;
        /**分解列表 */
        _this.resolveList = [];
        _this.skinName = "SuitResolveWinSkin";
        return _this;
    }
    SuitResolveWin.prototype.init = function () {
        _super.prototype.init.call(this);
        this.list.itemRenderer = SuitResolveItem;
        this.setWinTitleHold("suit_json.suit_title_tzfj_png");
    };
    SuitResolveWin.prototype.open = function (param) {
        _super.prototype.open.call(this);
        this.roleId = param.exData1;
        this.upList();
        this.addTouchEvent(this.btn, this.onclick);
        this.message(MsgConst.SUIT_RESOLVE, this.upList);
        this.message(MsgConst.BAG_ITEM_NUM, this.upList);
        this.message(MsgConst.SUIT_INFO, this.upList);
    };
    SuitResolveWin.prototype.upList = function () {
        this.resolveList = GameCache.suit.sortResolveList();
        this.setListData(this.list, this.resolveList);
    };
    /**一键分解 */
    SuitResolveWin.prototype.onclick = function () {
        Proxy.suit.sendSuitAllResolve(this.roleId, this.resolveList);
    };
    return SuitResolveWin;
}(BaseEuiWindow));
__reflect(SuitResolveWin.prototype, "SuitResolveWin");
//# sourceMappingURL=SuitResolveWin.js.map