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
/**
 * 地图素材
*/
var MapImage = (function (_super) {
    __extends(MapImage, _super);
    function MapImage() {
        return _super.call(this) || this;
    }
    MapImage.prototype.setData = function (data) {
        if (GameCache.map.showLoading) {
            var list = GameCache.map.loadlingList;
            var i = list.indexOf(this.source);
            if (i > -1) {
                list.splice(i, 1);
            }
            list.push("res/" + data.url);
        }
        this.data = data;
        this.source = "res/" + data.url;
        this.x = data.x;
        this.y = data.y;
        this.scaleX = data.scaleX;
        this.scaleY = data.scaleY;
    };
    MapImage.prototype.onRemove = function () {
        this.source = null;
        this.data = null;
        App.DisplayUtils.removeFromParent(this);
    };
    return MapImage;
}(eui.Image));
__reflect(MapImage.prototype, "MapImage");
//# sourceMappingURL=MapImage.js.map