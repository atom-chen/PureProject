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
var PgtBossItem = (function (_super) {
    __extends(PgtBossItem, _super);
    function PgtBossItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PgtBossItem.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.once(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
    };
    PgtBossItem.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        this.initData();
    };
    PgtBossItem.prototype.initData = function () {
        this.bossid = this.data;
        var cfg = GameConfig.purgatoryBoss[this.data];
        var mstCfg = GameConfig.monster[cfg.entityid];
        this.labLv.text = StringUtils.substitute(Language.lang.pgtBossLv, cfg.level);
        this.labName.text = mstCfg.name;
    };
    PgtBossItem.prototype.onRemove = function () {
        this.bossid = null;
    };
    return PgtBossItem;
}(BaseCustComponent));
__reflect(PgtBossItem.prototype, "PgtBossItem");
//# sourceMappingURL=PgtBossItem.js.map