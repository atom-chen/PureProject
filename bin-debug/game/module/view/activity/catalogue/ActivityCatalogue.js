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
var ActivityCatalogue = (function (_super) {
    __extends(ActivityCatalogue, _super);
    function ActivityCatalogue($parent) {
        if ($parent === void 0) { $parent = null; }
        var _this = _super.call(this, $parent) || this;
        _this.skinName = "ActivityCataSkin";
        return _this;
    }
    ActivityCatalogue.prototype.open = function (param) {
        _super.prototype.open.call(this, param);
        this.addTouchEvent(this.list, this.onListClick);
        this.list.itemRenderer = ActivityCatalogueItem;
        this.refreshPanel();
    };
    ActivityCatalogue.red = function () {
        var red = false;
        for (var k in GameConfig.activityCata) {
            var cfg = GameConfig.activityCata[k];
            /**任务开启 */
            if (!App.ViewManager.checkOpenCondition({ openLv: cfg.openLv, openQuest: cfg.openQuest }, false)) {
                continue;
            }
            var panel = cfg.pannel;
            if (window[panel] && window[panel]["red"] && window[panel]["red"]()) {
                return true;
            }
        }
        return red;
    };
    /**需要刷新是红点消息列表 */
    ActivityCatalogue.changeMsg = function () {
        return [];
    };
    ActivityCatalogue.prototype.refreshPanel = function () {
        var openList = [];
        for (var k in GameConfig.activityCata) {
            var cfg = GameConfig.activityCata[k];
            /**任务开启 */
            if (!App.ViewManager.checkOpenCondition({ openLv: cfg.openLv, openQuest: cfg.openQuest }, false)) {
                continue;
            }
            if (!openList[cfg.id]) {
                openList[cfg.id] = cfg;
            }
        }
        this.setListData(this.list, openList);
    };
    ActivityCatalogue.prototype.onListClick = function (e) {
        var tar = e.currentTarget;
        TextFlowUtils.hrefType(tar.selectedItem.jump);
        App.ViewManager.close(ViewConst.ACTIVITY_CATALOGUE);
    };
    ActivityCatalogue.prototype.close = function () {
        _super.prototype.close.call(this);
        for (var _i = 0, _a = this.list.$children; _i < _a.length; _i++) {
            var item = _a[_i];
            item.dispose();
        }
        this.list.itemRenderer = null;
    };
    ActivityCatalogue.isRed = false;
    return ActivityCatalogue;
}(BaseEuiWindow));
__reflect(ActivityCatalogue.prototype, "ActivityCatalogue");
//# sourceMappingURL=ActivityCatalogue.js.map