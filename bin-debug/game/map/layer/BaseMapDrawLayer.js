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
 *
 *素材地图层
*/
var BaseMapDrawLayer = (function (_super) {
    __extends(BaseMapDrawLayer, _super);
    function BaseMapDrawLayer() {
        var _this = _super.call(this) || this;
        _this.imagList = [];
        _this.dataList = [];
        _this.touchEnabled = false;
        _this.touchChildren = false;
        return _this;
    }
    BaseMapDrawLayer.prototype.setData = function (arr, lw, lh, sw, sh) {
        this.dataList = arr;
        this.layerWidth = lw;
        this.layerHeight = lh;
        this.stepWidth = sw;
        this.stepHeight = sh;
        this.widthRate = lw / sw;
        this.heightRate = lh / sh;
        this.removeAll();
    };
    BaseMapDrawLayer.prototype.focusToCenter = function () {
        var tx = -(this.layerWidth - App.StageUtils.getWidth()) >> 1;
        var ty = -(this.layerHeight - App.StageUtils.getHeight()) >> 1;
        this.x = tx;
        this.y = ty;
        this.onUpdate(-tx, -ty, App.StageUtils.getWidth(), App.StageUtils.getHeight());
    };
    /**
     * 镜头左上角坐标
    */
    BaseMapDrawLayer.prototype.moveTo = function (tx, ty, perX, perY) {
        this.x = tx;
        this.y = ty;
        //this.x = (-(this.layerWidth - App.StageUtils.getWidth())) / 100 * perX;
        //this.y = (-(this.layerHeight - App.StageUtils.getHeight())) / 100 * perY;
        this.onUpdate(-this.x, -this.y, App.StageUtils.getWidth(), App.StageUtils.getHeight());
    };
    BaseMapDrawLayer.prototype.onUpdate = function (x, y, w, h) {
        var i = 0;
        var len = this.dataList.length;
        var hasUpdate = false;
        for (; i < len; i++) {
            var d = this.dataList[i];
            var show = d.onScreen(x, y, w, h);
            var img = this.imagList[i];
            if (show) {
                if (!img) {
                    img = new MapImage();
                    img.setData(d);
                    this.imagList[i] = img;
                }
                if (!img.parent) {
                    hasUpdate = true;
                    this.addChild(img);
                }
            }
            else {
                if (img && img.parent)
                    this.removeChild(img);
            }
        }
        if (hasUpdate) {
            this.$children.sort(this.sortImg);
        }
    };
    BaseMapDrawLayer.prototype.sortImg = function (d1, d2) {
        if (d1.data.index > d2.data.index) {
            return 1;
        }
        else if (d1.data.index < d2.data.index) {
            return -1;
        }
        else {
            return 0;
        }
    };
    BaseMapDrawLayer.prototype.removeAll = function () {
        var i = 0;
        var len = this.imagList.length;
        for (; i < len; i++) {
            if (this.imagList[i]) {
                this.imagList[i].onRemove();
            }
        }
        this.imagList.length = 0;
    };
    return BaseMapDrawLayer;
}(egret.DisplayObjectContainer));
__reflect(BaseMapDrawLayer.prototype, "BaseMapDrawLayer", ["ICamera"]);
//# sourceMappingURL=BaseMapDrawLayer.js.map