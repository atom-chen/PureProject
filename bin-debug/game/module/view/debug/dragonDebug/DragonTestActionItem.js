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
var DragonTestActionItem = (function (_super) {
    __extends(DragonTestActionItem, _super);
    function DragonTestActionItem() {
        return _super.call(this) || this;
    }
    DragonTestActionItem.prototype.init = function () {
        _super.prototype.init.call(this);
        this.addTouchEvent(this.play, this.onPlay);
    };
    DragonTestActionItem.prototype.onPlay = function () {
        var hero = GameCache.hero.focusPlayer;
        hero.playAction(this.data.actionIndex, parseInt(this.inText.text));
    };
    return DragonTestActionItem;
}(BaseCustComponent));
__reflect(DragonTestActionItem.prototype, "DragonTestActionItem");
//# sourceMappingURL=DragonTestActionItem.js.map