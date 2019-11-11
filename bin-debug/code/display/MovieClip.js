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
var MovieClip = (function (_super) {
    __extends(MovieClip, _super);
    function MovieClip() {
        var _this = _super.call(this) || this;
        _this.autoDispose = true; //
        _this.touchEnabled = false;
        return _this;
    }
    /**直接加载播放一个资源
     * @param key:特效文件名
     * @param playCount:播放次数，播放完毕自动dispose
     * @param compFun:播放完毕回调
    */
    MovieClip.prototype.loadFile = function (key, playCount, compFun) {
        if (playCount != undefined) {
            this.playCount = playCount;
        }
        this._compFun = compFun;
        if (key.indexOf("/") == -1) {
            key = key;
        }
        if (this.mcName && this.movieClipData) {
            McDataManager.removeMovieClipDataByName(this.mcName);
            this.movieClipData = null;
        }
        this.mcName = key;
        this.visible = false;
        App.TimerManager.removeAll(this);
        this.loadSource(key);
    };
    MovieClip.prototype.loadSource = function (key) {
        var mcData = McDataManager.getMovieClipDataByName(key);
        if (mcData) {
            this.setMcData(mcData);
            return;
        }
        var self = this;
        var movieClipData;
        var k = key;
        if (k.indexOf("/") > -1) {
            var i = k.lastIndexOf("/");
            k = key.substr(i + 1);
        }
        var mctexture = RES.getRes(k + "_png");
        if (mctexture) {
            RES.getResByUrl(key + ".json", function (d) {
                movieClipData = d;
                self.resGetComplete(key, mctexture, movieClipData);
            }, self, RES.ResourceItem.TYPE_JSON);
        }
        else {
            MovieClipLoader.ins().load(this, key);
        }
        //egret.startTick(this.$cresd, this);
    };
    MovieClip.prototype.resGetComplete = function (key, mctexture, movieClipData) {
        McDataManager.setMovieClipDataByName(key, movieClipData, mctexture);
        if (this.mcName == key) {
            var mcData = McDataManager.getMovieClipDataByName(key);
            this.setMcData(mcData);
        }
    };
    MovieClip.prototype.setMcData = function (mcData) {
        if (mcData) {
            if (this.rate)
                mcData.frameRate = this.rate;
            else if (mcData.frameRate == 24) {
                mcData.frameRate = 8;
            }
            this.movieClipData = mcData;
            this.play(this.playCount);
            if (this.playCount > 0) {
                App.TimerManager.addDelay(this.playTime * this.playCount, 0, 1, this.playComplete, this);
            }
            this.visible = true;
        }
    };
    Object.defineProperty(MovieClip.prototype, "playTime", {
        /** 播放总时长(毫秒) */
        get: function () {
            if (!this.movieClipData)
                return 0;
            return 1 / this.frameRate * this.totalFrames * 1000;
        },
        enumerable: true,
        configurable: true
    });
    // private sh: egret.Shape = new egret.Shape();
    // $cresd(): boolean {
    // 	//super["updateRenderNode"]();
    // 	var texture = this.$texture;
    // 	if (texture) {
    // 		var offsetX = Math.round(this["offsetPoint"].x);
    // 		var offsetY = Math.round(this["offsetPoint"].y);
    // 		let gr = this.sh.graphics;
    // 		gr.clear();
    // 		gr.lineStyle(1, 0xff0000);
    // 		gr.drawRect(0, 0, texture.$sourceWidth, texture.$sourceHeight);
    // 		this.sh.x = offsetX;
    // 		this.sh.y = offsetY;
    // 		if (!this.sh.parent && this.parent) {
    // 			this.parent.addChild(this.sh);
    // 		}
    // 	}
    // 	return true;
    // }
    MovieClip.prototype.playComplete = function () {
        this.visible = false;
        if (this._compFun)
            this._compFun.run();
        if (this.autoDispose) {
            this.dispose();
        }
    };
    MovieClip.prototype.dispose = function () {
        this.autoDispose = true;
        if (this.mcName && this.movieClipData) {
            McDataManager.removeMovieClipDataByName(this.mcName);
            this.mcName = null;
        }
        this.stop();
        this.playCount = 0;
        this.rate = null;
        this.movieClipData = null;
        this._compFun = null;
        this.x = this.y = 0;
        this.scaleX = this.scaleY = 1;
        this.rotation = 0;
        this.visible = false;
        this.touchEnabled = false;
        App.DisplayUtils.removeFromParent(this);
        ObjectPool.push(this);
    };
    MovieClip.prototype.$onAddToStage = function (stage, nestLevel) {
        if (this.movieClipData && this.playCount <= 0) {
            this.play(this.playCount);
        }
        _super.prototype.$onAddToStage.call(this, stage, nestLevel);
    };
    MovieClip.prototype.$onRemoveFromStage = function () {
        if (this.playCount <= 0) {
            this.stop();
        }
        _super.prototype.$onRemoveFromStage.call(this);
    };
    MovieClip.create = function () {
        return ObjectPool.get(MovieClip);
    };
    return MovieClip;
}(egret.MovieClip));
__reflect(MovieClip.prototype, "MovieClip");
//# sourceMappingURL=MovieClip.js.map