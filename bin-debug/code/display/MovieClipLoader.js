var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var MovieClipLoader = (function () {
    function MovieClipLoader() {
        this.count = 0;
        this.needLoadUrl = [];
        this.loadList = {};
        this.loadingDic = {};
    }
    MovieClipLoader.ins = function () {
        if (!MovieClipLoader["instance"]) {
            MovieClipLoader["instance"] = new MovieClipLoader();
        }
        return MovieClipLoader["instance"];
    };
    MovieClipLoader.prototype.load = function (mc, url) {
        var arr = this.loadList[url];
        if (!arr) {
            arr = this.loadList[url] = [];
        }
        arr.push(mc);
        if (this.loadingDic[url])
            return;
        this.needLoadUrl.push(url);
        this.loadNext();
    };
    MovieClipLoader.prototype.loadData = function (url) {
        this.count++;
        var mctexture;
        var movieClipData;
        var self = this;
        var isRemove = false;
        var com = function (res) {
            if (isRemove)
                return;
            if (!res) {
                console.log("加载失败，跳过", url);
                isRemove = true;
                self.count--;
                self.loadNext();
                return;
            }
            if (mctexture && movieClipData) {
                self.count--;
                var arr = self.loadList[url];
                if (!arr) {
                    return;
                }
                delete self.loadList[url];
                delete self.loadingDic[url];
                for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
                    var mc = arr_1[_i];
                    mc.resGetComplete(url, mctexture, movieClipData);
                }
                self.loadNext();
            }
        };
        self.loadingDic[url] = 1;
        RES.getResByUrl(url + ".png", function (t) {
            mctexture = t;
            com(t);
        }, self, RES.ResourceItem.TYPE_IMAGE);
        RES.getResByUrl(url + ".json", function (d) {
            movieClipData = d;
            com(d);
        }, self, RES.ResourceItem.TYPE_JSON);
    };
    MovieClipLoader.prototype.loadNext = function () {
        if (this.count <= 2) {
            var url = this.needLoadUrl.shift();
            if (url) {
                this.loadData(url);
            }
        }
    };
    MovieClipLoader.prototype.removeUrl = function (url) {
        var i = this.needLoadUrl.indexOf(url);
        if (i) {
            this.needLoadUrl.splice(i, 1);
            //console.log("UNLOAD#2", url);
        }
        delete this.loadList[url];
        delete this.loadingDic[url];
    };
    return MovieClipLoader;
}());
__reflect(MovieClipLoader.prototype, "MovieClipLoader");
//# sourceMappingURL=MovieClipLoader.js.map