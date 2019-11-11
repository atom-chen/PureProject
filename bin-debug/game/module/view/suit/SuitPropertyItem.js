/**
 * effect: 套装详情item内容
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
var SuitPropertyItem = (function (_super) {
    __extends(SuitPropertyItem, _super);
    function SuitPropertyItem() {
        var _this = _super.call(this) || this;
        _this.skinName = "SuitPropertyItemSkin";
        return _this;
    }
    SuitPropertyItem.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.addTouchEvent(this.eBtn, this.onClick);
    };
    SuitPropertyItem.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (this.data.name) {
            this.prop.setData(this.data.att, []);
            this.lbNe.text = this.data.name;
            this.prop.setSortType("hor");
            this.lbLv.textFlow = TextFlowUtils.generateTextFlow(this.data.dec);
            this.num.value = ItemUtils.getZdlByProp(this.data.att);
            this.eBtn.visible = this.data.sortId < 1000;
            this.eBtn.source = this.data.eqLv >= this.data.showlevel ? "res/btn/activate_1.png" : "res/btn/activate_2.png";
        }
    };
    SuitPropertyItem.prototype.onClick = function () {
        if (this.data.eqLv >= this.data.showlevel) {
            Proxy.suit.sendSuitGetLv(this.data.roleId, this.data.level);
        }
        else {
            GlobalFun.SysMsg(Language.lang.suit1);
        }
    };
    return SuitPropertyItem;
}(BaseCustComponent));
__reflect(SuitPropertyItem.prototype, "SuitPropertyItem");
//# sourceMappingURL=SuitPropertyItem.js.map