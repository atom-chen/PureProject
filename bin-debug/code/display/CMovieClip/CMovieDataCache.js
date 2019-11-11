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
var CMovieDataCache = (function (_super) {
    __extends(CMovieDataCache, _super);
    function CMovieDataCache() {
        var _this = _super.call(this) || this;
        _this._dataDic = {};
        App.TimerManager.add(10000, _this.check, _this, 0);
        return _this;
    }
    CMovieDataCache.ins = function () {
        return _super.ins.call(this);
    };
    CMovieDataCache.prototype.printData = function () {
        var dic = this._dataDic;
        var data;
        for (var k in dic) {
            data = dic[k];
            data.printData();
        }
        dic = McDataManager.mcDataPool;
        var md;
        for (var k in dic) {
            md = dic[k];
            md.printData();
        }
    };
    CMovieDataCache.prototype.check = function () {
        var dic = this._dataDic;
        var data;
        var time = App.TimerManager.getSyncTime();
        for (var k in dic) {
            data = dic[k];
            if (data.disposeTime > 0) {
                if (data.disposeTime <= time) {
                    data.dispose();
                    delete dic[k];
                }
            }
        }
    };
    CMovieDataCache.prototype.clearEffect = function () {
        var dic = McDataManager.mcDataPool;
        var time = App.TimerManager.getSyncTime();
        var md;
        for (var k in dic) {
            md = dic[k];
            if (md.disposeTime > 0) {
                if (md.disposeTime <= time) {
                    md.dispose();
                    delete dic[k];
                }
            }
        }
    };
    CMovieDataCache.prototype.getData = function (key) {
        if (this._dataDic[key] == null) {
            this._dataDic[key] = ObjectPool.get(CMovieData);
            this._dataDic[key].isDispose = false;
            this._dataDic[key].url = key;
        }
        return this._dataDic[key];
    };
    return CMovieDataCache;
}(BaseClass));
__reflect(CMovieDataCache.prototype, "CMovieDataCache");
var CMovieData = (function (_super) {
    __extends(CMovieData, _super);
    function CMovieData() {
        var _this = _super.call(this) || this;
        _this._counts = 0;
        // private static _factory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory();
        _this.disposeTime = 0;
        _this.isDispose = false;
        _this.level = 0;
        _this._data = {};
        _this._mcArr = [];
        return _this;
    }
    /**获取资源，没有则尝试加载**/
    CMovieData.prototype.getMovieClipData = function (dir) {
        if (dir === void 0) { dir = -1; }
        if (this._data[dir])
            return this._data[dir];
        var url = dir > -1 ? (this.url + "_" + dir) : this.url;
        var self = this;
        CMovieDataLoader.ins().addLoader(url, dir, this);
        // let fac = CMovieData._factory;
        // RES.getResByUrl(url + ".png", function (t) {
        //     RES.getResByUrl(url + ".json", function (d) {
        //         fac.texture = t;
        //         fac.mcDataSet = d;
        //         this.onComplete(dir, fac.generateMovieClipData());
        //         fac.clearCache();
        //     }, self, RES.ResourceItem.TYPE_JSON);
        // }, self, RES.ResourceItem.TYPE_IMAGE);
    };
    CMovieData.prototype.onComplete = function (dir, data) {
        if (data) {
        }
        if (this._data == null) {
            this.dispose();
            return;
        }
        this._data[dir] = data;
        var i = 0;
        var arr = this._mcArr;
        var a = this._counts;
        for (; i < a; i++) {
            var mc = arr[i];
            if (mc.curLoaDir == dir) {
                mc.setMCData(data);
            }
        }
    };
    CMovieData.prototype.addTarget = function (mc) {
        var arr = this._mcArr;
        var i = arr.indexOf(mc);
        if (i == -1) {
            this.disposeTime = 0;
            this._counts++;
            arr.push(mc);
        }
    };
    CMovieData.prototype.removeTarget = function (mc) {
        var arr = this._mcArr;
        var i = arr.indexOf(mc);
        if (i > -1) {
            arr.splice(i, 1);
            this._counts--;
            if (this._counts <= 0) {
                CMovieDataLoader.ins().remove(this);
                this.disposeTime = App.TimerManager.getSyncTime() + 10000;
            }
        }
    };
    Object.defineProperty(CMovieData.prototype, "count", {
        get: function () {
            return this._counts;
        },
        enumerable: true,
        configurable: true
    });
    CMovieData.prototype.dispose = function () {
        var dic = this._data;
        this.isDispose = true;
        for (var dir in dic) {
            if (parseInt(dir) > -1) {
                if (RES.destroyRes(this.url + "_" + dir + ".png")) {
                    // console.log("delete CMovieData Success：" + this.url + "_" + dir);
                }
                RES.destroyRes(this.url + "_" + dir + ".json");
            }
            else {
                RES.destroyRes(this.url + ".png");
                RES.destroyRes(this.url + ".json");
            }
        }
        this._data = {};
        this.level = 0;
        ObjectPool.push(this);
    };
    CMovieData.prototype.printData = function () {
        var dic = this._data;
        console.log("disposeTime : " + this.disposeTime);
        for (var dir in dic) {
            if (parseInt(dir) > -1) {
                console.log("$$ CMovieData Cache：" + this.url + "_" + dir);
            }
            else {
                console.log("$$ CMovieData Cache：" + this.url);
            }
        }
    };
    return CMovieData;
}(egret.HashObject));
__reflect(CMovieData.prototype, "CMovieData");
var McDataManager = (function () {
    function McDataManager() {
    }
    /**
     * 根据mc名字获取mc数据
     */
    McDataManager.getMovieClipDataByName = function (mcName) {
        var rf = this.mcDataPool[mcName];
        if (rf) {
            rf.addCount();
            return rf.data;
        }
        return null;
    };
    /**
     * 根据mc名字设置mcdata
     * mcName mc名字
     */
    McDataManager.setMovieClipDataByName = function (mcName, movieClipDataSet, texture, frameRate) {
        if (!this.mcDataPool[mcName]) {
            if (texture && movieClipDataSet) {
                if (!this.mcDataFactory) {
                    this.mcDataFactory = new egret.MovieClipDataFactory();
                }
                this.mcDataFactory.texture = texture;
                this.mcDataFactory.mcDataSet = movieClipDataSet;
                var movieClipData = this.mcDataFactory.generateMovieClipData();
                movieClipData.frameRate = frameRate ? frameRate : movieClipData.frameRate;
                if (movieClipData.frameRate >= 24) {
                    movieClipData.frameRate = 8;
                }
                var rf = ObjectPool.get(McDataRf);
                rf.data = movieClipData;
                rf.mcName = mcName;
                this.mcDataPool[mcName] = rf;
                this.mcDataFactory.clearCache();
            }
        }
        else {
        }
    };
    /**
     * 根据mc名字删除mcdata
     */
    McDataManager.removeMovieClipDataByName = function (mcName) {
        var rf = this.mcDataPool[mcName];
        if (rf) {
            rf.removeCount();
        }
        MovieClipLoader.ins().removeUrl(mcName); //先放这里吧 严格来讲逻辑不对
    };
    /**mc数据池 */
    McDataManager.mcDataPool = {};
    return McDataManager;
}());
__reflect(McDataManager.prototype, "McDataManager");
var McDataRf = (function () {
    function McDataRf() {
        this.disposeTime = 0;
        this.mcName = "";
        this._counts = 0;
    }
    McDataRf.prototype.addCount = function (value) {
        if (value === void 0) { value = 1; }
        this._counts = this._counts + value;
        this.disposeTime = 0;
    };
    McDataRf.prototype.removeCount = function (value) {
        if (value === void 0) { value = 1; }
        this._counts = this._counts - value;
        if (this._counts <= 0) {
            this.disposeTime = App.TimerManager.getSyncTime() + 30000;
        }
    };
    McDataRf.prototype.printData = function () {
        console.log("disposeTime : " + this.disposeTime);
        if (this.mcName) {
            console.log("$$ effect：" + this.mcName);
        }
    };
    McDataRf.prototype.dispose = function () {
        if (this.mcName) {
            if (RES.destroyRes(this.mcName + ".png")) {
                //console.log("delete effect " + this.mcName + " success");
            }
            RES.destroyRes(this.mcName + ".json");
        }
        this.data = null;
        this.disposeTime = 0;
        this._counts = 0;
        this.mcName = null;
        ObjectPool.push(this);
    };
    return McDataRf;
}());
__reflect(McDataRf.prototype, "McDataRf");
//# sourceMappingURL=CMovieDataCache.js.map