var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var MapImageVo = (function () {
    function MapImageVo() {
        this.index = 0;
    }
    /**
     * 判断是否在显示范围内
    */
    MapImageVo.prototype.onScreen = function (tx, ty, tw, th) {
        var flag = true;
        var x = this.x - (this.scaleX == -1 ? this.w : 0), y = this.y;
        if (x + this.w <= tx) {
            flag = false;
        }
        else if (x >= tx + tw) {
            flag = false;
        }
        else if (y + this.h <= ty) {
            flag = false;
        }
        else if (y >= ty + th) {
            flag = false;
        }
        return flag;
    };
    return MapImageVo;
}());
__reflect(MapImageVo.prototype, "MapImageVo");
//# sourceMappingURL=MapImageVo.js.map