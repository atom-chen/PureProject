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
/**共享图集的MovieClip*/
var SheetMovieClip = (function (_super) {
    __extends(SheetMovieClip, _super);
    function SheetMovieClip() {
        return _super.call(this) || this;
    }
    SheetMovieClip.prototype.loadFile = function (url) {
        if (this.sheetName == null) {
            return;
        }
        if (SheetMovieClip.mcData[url]) {
            this.movieClipData = SheetMovieClip.mcData[url];
            if (this.movieClipData.frames.length > 1) {
                this.play(-1);
            }
            else {
                this.gotoAndStop(1);
            }
            return;
        }
        var self = this;
        var key = url;
        if (key.indexOf("/") == -1) {
            key = key;
        }
        RES.getResByUrl(this.sheetName, function (e) {
            RES.getResByUrl(key + ".json", function (json) {
                var mcDataFactory = new egret.MovieClipDataFactory();
                mcDataFactory.texture = RES.getRes(this.sheetName + "." + url + "_png");
                mcDataFactory.mcDataSet = json;
                var movieClipData = mcDataFactory.generateMovieClipData();
                movieClipData.frameRate = this.rate ? this.rate : movieClipData.frameRate;
                if (movieClipData.frameRate >= 24) {
                    movieClipData.frameRate = 8;
                }
                SheetMovieClip.mcData[url] = movieClipData;
                this.movieClipData = movieClipData;
                if (movieClipData.frames.length > 1) {
                    this.play(-1);
                }
                else {
                    this.gotoAndStop(1);
                }
                mcDataFactory.clearCache();
            }, self, RES.ResourceItem.TYPE_JSON);
        }, self, RES.ResourceItem.TYPE_SHEET);
    };
    SheetMovieClip.prototype.dispose = function () {
        this.stop();
        App.DisplayUtils.removeFromParent(this);
        ObjectPool.push(this);
    };
    SheetMovieClip.create = function () {
        return ObjectPool.get(SheetMovieClip);
    };
    SheetMovieClip.mcData = {};
    return SheetMovieClip;
}(egret.MovieClip));
__reflect(SheetMovieClip.prototype, "SheetMovieClip");
//# sourceMappingURL=SheetMovieClip.js.map