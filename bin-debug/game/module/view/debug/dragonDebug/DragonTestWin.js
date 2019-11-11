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
 * @Description: 龙骨套装替换测试
 * @Author: guolinsen
 * @Date: 2019-09-27 15:40:20
 */
var DragonTestWin = (function (_super) {
    __extends(DragonTestWin, _super);
    function DragonTestWin() {
        var _this = _super.call(this, LayerManager.UI_Message) || this;
        _this.skinName = "DragonTestSkin";
        _this.left = 0;
        _this.top = 0;
        return _this;
    }
    DragonTestWin.prototype.init = function () {
        _super.prototype.init.call(this);
        this.partList.itemRenderer = DragonTestItem;
        this.actionList.itemRenderer = DragonTestActionItem;
    };
    DragonTestWin.prototype.open = function () {
        _super.prototype.open.call(this);
        this.addTouchEvent(this.sBtn, this.onRefresh);
    };
    DragonTestWin.prototype.onRefresh = function () {
        DeBugMgr.dragonTest = {};
        var len = this.partList.numElements;
        for (var i = 0; i < len; i++) {
            var item = this.partList.getElementAt(i);
            DeBugMgr.dragonTest[item.data.partPro] = item.inText.text;
        }
        GameCache.hero.mainPlayer.loadBody(1);
    };
    return DragonTestWin;
}(BaseEuiWindow));
__reflect(DragonTestWin.prototype, "DragonTestWin");
//# sourceMappingURL=DragonTestWin.js.map