/**
 * effect: 套装分解item内容
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
var SuitResolveItem = (function (_super) {
    __extends(SuitResolveItem, _super);
    function SuitResolveItem() {
        var _this = _super.call(this) || this;
        _this.skinName = "SuitResolveItemSkin";
        return _this;
    }
    SuitResolveItem.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.addTouchEvent(this.eBtn, this.onClick);
    };
    SuitResolveItem.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (this.data.id) {
            this.lbNe.textFlow = TextFlowUtils.generateTextFlow(ItemUtils.getItemNamewithColor(this.data));
            this.imgItem.source = GlobalFun.getItemSourceById(GameCache.suit.nResolveId);
            if (GameConfig.equipExchange[this.data.id] && GameConfig.equipExchange[this.data.id].needNum[0]) {
                this.lbNum.text = GameConfig.equipExchange[this.data.id] ? "X" + GameConfig.equipExchange[this.data.id].needNum[0].count : "";
            }
            this.itemBase.data = this.data.id;
        }
    };
    SuitResolveItem.prototype.onClick = function () {
        Proxy.suit.sendSuitResolve(this.data.roleId, this.data.id, 1);
    };
    return SuitResolveItem;
}(BaseCustComponent));
__reflect(SuitResolveItem.prototype, "SuitResolveItem");
//# sourceMappingURL=SuitResolveItem.js.map