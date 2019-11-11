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
var ActivityCatalogueItem = (function (_super) {
    __extends(ActivityCatalogueItem, _super);
    function ActivityCatalogueItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ActivityCatalogueItem.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    ActivityCatalogueItem.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        this.cfg = this.data;
        this.banner.source = RES_DIR_IMAGES_BANNE_ACTIVITY + "/catalogue/" + this.cfg.image;
        // 临时写成永久，因方案还没确定
        this.labTime.text = StringUtils.substitute(Language.lang.activityCatalogueTime, "永久");
        var red = false;
        window[this.cfg.pannel] && window[this.cfg.pannel]["red"] && (red = window[this.cfg.pannel]["red"]());
        App.ViewManager.showRedPoint(this, red);
    };
    ActivityCatalogueItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.cfg = null;
    };
    return ActivityCatalogueItem;
}(BaseCustComponent));
__reflect(ActivityCatalogueItem.prototype, "ActivityCatalogueItem");
//# sourceMappingURL=ActivityCatalogueItem.js.map