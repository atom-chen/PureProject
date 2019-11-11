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
 * @Description: 图腾条目
 * @Author: xiejunwei
 * @Date: 2019-08-27 14:33:01
 * @LastEditTime: 2019-08-29 20:28:16
 */
var TotemsItem = (function (_super) {
    __extends(TotemsItem, _super);
    function TotemsItem() {
        return _super.call(this) || this;
    }
    TotemsItem.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    TotemsItem.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        this.initData();
    };
    TotemsItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    TotemsItem.prototype.initData = function () {
        var conf = GameConfig.totems[this.data];
        var totemsData = GameCache.totems.totemsData[this.data];
        var id = totemsData ? totemsData.id : 1;
        if (!conf)
            return;
        this.icon.source = id > 1 ? RES_DIR_TOTEMS_ICON + "s" + this.data + ".png" : RES_DIR_TOTEMS_ICON + "s" + this.data + "u.png";
        this.lvl.text = StringUtils.substitute(Language.lang.jie, StringUtils.toCNUpper(conf[id].classLvl));
        this.bg.source = id > 1 ? "totems_json.totems_item_bg_" + conf[id].icon + "_png" : "totems_json.totems_item_bg_0_png";
        this.tName.source = id > 1 ? RES_DIR_TOTEMS_NAME + "s" + this.data + ".png" : RES_DIR_TOTEMS_NAME + "s" + this.data + "u.png";
    };
    return TotemsItem;
}(BaseCustComponent));
__reflect(TotemsItem.prototype, "TotemsItem");
//# sourceMappingURL=TotemsItem.js.map