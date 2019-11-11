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
 * @Description: 归属物品条目
 * @Author: xiejunwei
 * @Date: 2019-07-30 17:11:12
 * @LastEditTime: 2019-08-29 16:04:31
 */
var GSItem = (function (_super) {
    __extends(GSItem, _super);
    function GSItem() {
        return _super.call(this) || this;
    }
    GSItem.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (!this.gs) {
            this.gs = ObjectPool.get(eui.Image);
            this.gs.top = -2;
            this.gs.left = -2;
            this.gs.source = "public_json.public_gs_tag_png";
            this.addChild(this.gs);
        }
    };
    GSItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        if (this.gs) {
            this.gs.source = null;
        }
    };
    return GSItem;
}(ItemBase));
__reflect(GSItem.prototype, "GSItem");
//# sourceMappingURL=GSItem.js.map