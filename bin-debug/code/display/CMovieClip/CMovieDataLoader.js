var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var CMovieDataLoader = (function () {
    function CMovieDataLoader() {
        this.loaderList_A = [];
        this.loaderList_B = [];
        this.loaderDic = {};
        this.loadingConut = 0;
        this._factory = new egret.MovieClipDataFactory();
    }
    CMovieDataLoader.ins = function () {
        if (!CMovieDataLoader["instance"]) {
            CMovieDataLoader["instance"] = new CMovieDataLoader();
        }
        return CMovieDataLoader["instance"];
    };
    CMovieDataLoader.prototype.addLoader = function (url, dir, item) {
        var arr = this.loaderDic[item.hashCode];
        if (!arr) {
            arr = this.loaderDic[item.hashCode] = [];
        }
        // if (this.loaderDic[item.hashCode]) {
        // 	this.loaderDic[item.hashCode].isDelete = true;
        // 	delete this.loaderDic[item.hashCode];
        // }
        var l = ObjectPool.get(CMovieDataLoaderItem);
        l.isDelete = false;
        l.url = url;
        l.tar = item;
        l.dir = dir;
        if (this.loadingConut >= 3) {
            //this.loaderDic[item.hashCode] = l;
            if (item.level == 1)
                this.loaderList_A.push(l);
            else
                this.loaderList_B.push(l);
            arr.push(l);
        }
        else {
            this.load(l);
        }
    };
    CMovieDataLoader.prototype.load = function (loader) {
        this.loadingConut++;
        var fac = this._factory;
        var url = loader.url;
        var item = loader.tar;
        var dir = loader.dir;
        var self = this;
        //delete this.loaderDic[item.hashCode];
        var texture;
        var json;
        var isRemove = false;
        var com = function (res) {
            if (isRemove)
                return;
            if (!res) {
                console.log("加载失败，跳过", url);
                isRemove = true;
                self.loadingConut--;
                self.loadNext();
                return;
            }
            if (!texture || !json)
                return;
            self.loadingConut--;
            ObjectPool.push(loader);
            if (loader.isDelete) {
                //RES.destroyRes(url + ".png");
                //RES.destroyRes(url + ".json");
                self.loadNext();
                return;
            }
            fac.texture = texture;
            fac.mcDataSet = json;
            item.onComplete(dir, fac.generateMovieClipData());
            fac.clearCache();
            self.loadNext();
        };
        RES.getResByUrl(url + ".png", function (t) {
            texture = t;
            com(t);
        }, self, RES.ResourceItem.TYPE_IMAGE);
        RES.getResByUrl(url + ".json", function (d) {
            json = d;
            com(d);
        }, self, RES.ResourceItem.TYPE_JSON);
    };
    CMovieDataLoader.prototype.loadNext = function () {
        var obj = this.loaderList_A.pop();
        if (!obj)
            obj = this.loaderList_B.pop();
        if (obj) {
            if (!obj.isDelete)
                this.load(obj);
            else {
                ObjectPool.push(obj);
                this.loadNext();
            }
        }
    };
    CMovieDataLoader.prototype.remove = function (cm) {
        var t = this.loaderDic[cm.hashCode];
        if (t) {
            // t.isDelete = true;
            // delete this.loaderDic[cm.hashCode];
            for (var _i = 0, t_1 = t; _i < t_1.length; _i++) {
                var i = t_1[_i];
                i.isDelete = true;
                //console.log("UNLOAD#1", i.url);
            }
            delete this.loaderDic[cm.hashCode];
        }
    };
    return CMovieDataLoader;
}());
__reflect(CMovieDataLoader.prototype, "CMovieDataLoader");
var CMovieDataLoaderItem = (function () {
    function CMovieDataLoaderItem() {
    }
    return CMovieDataLoaderItem;
}());
__reflect(CMovieDataLoaderItem.prototype, "CMovieDataLoaderItem");
//# sourceMappingURL=CMovieDataLoader.js.map