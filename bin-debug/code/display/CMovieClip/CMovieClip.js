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
var CMovieClip = (function (_super) {
    __extends(CMovieClip, _super);
    function CMovieClip() {
        var _this = _super.call(this) || this;
        _this.touchEnabled = false;
        return _this;
    }
    //设置播放源 key资源路径 dirNum方向数
    CMovieClip.prototype.setSource = function (key, dirNum) {
        if (dirNum === void 0) { dirNum = 5; }
        this.removeSource();
        this._dirNum = dirNum;
        this._data = CMovieDataCache.ins().getData(key);
        this._data.addTarget(this);
    };
    CMovieClip.prototype.removeSource = function () {
        if (this._data) {
            this._data.removeTarget(this);
            this._data = null;
        }
        this.visible = false;
        this.movieClipData = null;
        this.curLoaDir = -1;
    };
    /**开始加载资源
     * @param dir:方向
     */
    CMovieClip.prototype.load = function (dir) {
        if (dir === void 0) { dir = -1; }
        // if (this._dirNum == 5) //如果是5方向的，看看是否需要取反
        // {
        //     let needChange: number = DirUtil.isScaleX(dir);
        //     if (needChange > 0) {
        //         this.scaleX = -1;
        //         dir = needChange;
        //     }
        //     else {
        //         this.scaleX = 1;
        //     }   
        // }
        // this.curLoaDir = dir;
        // this.getMCData();
    };
    CMovieClip.prototype.disposeSource = function () {
        this.removeSource();
        this.stop();
    };
    CMovieClip.prototype.dispose = function () {
        this.disposeSource();
        App.DisplayUtils.removeFromParent(this);
        ObjectPool.push(this);
    };
    CMovieClip.prototype.getMCData = function () {
        var md = this._data.getMovieClipData(this.curLoaDir);
        if (md) {
            this.setMCData(md);
        }
    };
    CMovieClip.prototype.setMCData = function (data) {
        this.movieClipData = data;
        if (data) {
            this.visible = true;
        }
    };
    CMovieClip.prototype.setFrame = function (index) {
        if (this.movieClipData != null)
            this.gotoAndStop(index);
    };
    return CMovieClip;
}(egret.MovieClip));
__reflect(CMovieClip.prototype, "CMovieClip");
//# sourceMappingURL=CMovieClip.js.map