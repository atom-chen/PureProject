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
var EUIResourceManager = (function (_super) {
    __extends(EUIResourceManager, _super);
    function EUIResourceManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.resHash = {}; //正在使用的池
        _this.disposeHash = {}; //引用数已经是0的池
        return _this;
    }
    /**增加一个资源引用
     * @param url:资源名字
     * @param dir:是否带有方向
     */
    EUIResourceManager.prototype.add = function (url, dir) {
        var isSheet = this.getSheetName(url);
        if (isSheet) {
            url = isSheet;
        }
        if (!this.resHash[url]) {
            this.resHash[url] = ObjectPool.get(EUIResourceItem);
            this.resHash[url].dir = dir;
        }
        this.resHash[url].count++;
        delete this.disposeHash[url];
        return this.resHash[url].count;
    };
    /**减少一个资源引用
     * @param url:资源名字
     * @param dir:是否带有方向
     */
    EUIResourceManager.prototype.remove = function (url) {
        var isSheet = this.getSheetName(url);
        if (isSheet) {
            url = isSheet;
        }
        if (!this.resHash[url])
            return 0;
        this.resHash[url].count--;
        if (this.resHash[url].count == 0) {
            this.disposeHash[url] = 1;
        }
        return this.resHash[url].count;
    };
    EUIResourceManager.prototype.has = function (url) {
        return this.resHash[url] == null ? 0 : this.resHash[url];
    };
    EUIResourceManager.prototype.getSheetName = function (url) {
        if (typeof url != "string") {
            return null;
        }
        var i = url.indexOf("_json");
        if (i > -1) {
            return url.substr(0, i) + "_json";
        }
        return null;
    };
    EUIResourceManager.prototype.log = function () {
        var dic = this.resHash;
        var count = 0;
        for (var k in dic) {
            count++;
            console.log("texture ", k);
        }
        console.log("total ", count);
    };
    EUIResourceManager.prototype.init = function () {
        App.TimerManager.add(10000, this.doTime, this);
    };
    EUIResourceManager.prototype.doTime = function () {
        var t = App.TimerManager.getSyncTime();
        var count = 0;
        for (var s in this.disposeHash) {
            var item = this.resHash[s];
            if (item.destroyTime > 0 && t > item.destroyTime) {
                var dir = this.resHash[s].dir;
                if (dir) {
                    //DEBUG && console.log("texture dir " + s);
                }
                else {
                    if (RES.destroyRes(s)) {
                        item.dispose();
                        delete this.resHash[s];
                        delete this.disposeHash[s];
                        //console.log("delete texture", s, count);
                        count++;
                        if (count >= 15) {
                            return;
                        }
                    }
                    else {
                        item.times++;
                        if (item.times > 0) {
                            item.dispose();
                            delete this.resHash[s];
                            delete this.disposeHash[s];
                        }
                    }
                }
            }
        }
    };
    return EUIResourceManager;
}(BaseClass));
__reflect(EUIResourceManager.prototype, "EUIResourceManager");
var EUIResourceItem = (function () {
    function EUIResourceItem() {
        this.times = 0;
        this._count = 0;
    }
    Object.defineProperty(EUIResourceItem.prototype, "count", {
        get: function () {
            return this._count < 0 ? 0 : this._count;
        },
        set: function (value) {
            this._count = value;
            this.destroyTime = this._count > 0 ? 0 : App.TimerManager.getSyncTime() + 10000;
        },
        enumerable: true,
        configurable: true
    });
    EUIResourceItem.prototype.dispose = function () {
        this._count = 0;
        this.destroyTime = 0;
        this.times = 0;
        ObjectPool.push(this);
    };
    return EUIResourceItem;
}());
__reflect(EUIResourceItem.prototype, "EUIResourceItem");
//# sourceMappingURL=EUIResourceManager.js.map