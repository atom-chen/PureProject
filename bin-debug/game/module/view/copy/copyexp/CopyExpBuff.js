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
 * @Description: 经验副本经验BUFF使用、购买
 * @Author: xiejunwei
 * @Date: 2019-09-02 17:57:39
 * @LastEditTime: 2019-09-17 12:04:02
 */
var CopyExpBuff = (function (_super) {
    __extends(CopyExpBuff, _super);
    function CopyExpBuff() {
        var _this = _super.call(this, LayerManager.UI_Tips) || this;
        _this.skinName = "CopyExpBuffSkin";
        return _this;
    }
    CopyExpBuff.prototype.init = function () {
        _super.prototype.init.call(this);
        this.itemList.itemRenderer = CopyExpBuffItem;
    };
    CopyExpBuff.prototype.open = function (param) {
        _super.prototype.open.call(this);
    };
    CopyExpBuff.prototype.close = function (param) {
        _super.prototype.close.call(this);
    };
    return CopyExpBuff;
}(BaseEuiWindow));
__reflect(CopyExpBuff.prototype, "CopyExpBuff");
//# sourceMappingURL=CopyExpBuff.js.map