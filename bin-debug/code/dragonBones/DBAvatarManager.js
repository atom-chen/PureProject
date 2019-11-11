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
 * 龙骨动画管理，不使用 DragonBonesFactory
*/
var DBAvatarManager = (function (_super) {
    __extends(DBAvatarManager, _super);
    function DBAvatarManager() {
        var _this = _super.call(this) || this;
        _this.disposeTime = 0;
        _this.disposeList = [];
        _this.averageUtils = new AverageUtils();
        _this.factory = new dragonBones.EgretFactory();
        _this.clocks = new Array();
        _this.clocksLen = 0;
        _this.files = {};
        _this.loadFiles = {};
        //默认开启
        _this.start();
        return _this;
    }
    /**
     * 初始化一个动画文件
     * @param skeletonData 动画描述文件
     * @param texture 动画资源
     * @param textureData 动画资源描述文件
     */
    DBAvatarManager.prototype.addArmatureFile = function (skeletonData, texture, textureData, type) {
        if (this.files[skeletonData.name])
            return;
        this.factory.parseDragonBonesData(skeletonData);
        texture && this.factory.parseTextureAtlasData(textureData, texture);
        var file = new DBFile();
        file.name = skeletonData.name;
        file.ref = 0;
        file.type = type;
        this.files[skeletonData.name] = file;
    };
    /**
     * 移除动画文件
     * @param name
     */
    DBAvatarManager.prototype.removeArmatureFile = function (name) {
        var file = this.files[name];
        if (file) {
            if (file.isNude)
                return;
            this.factory.removeDragonBonesData(name);
            this.factory.removeTextureAtlasData(name);
            if (RES.destroyRes(RES_DIR_DRAGON + file.name + "_ske.json")) {
                true && console.log("db delete :" + file.name + "_ske.json");
            }
            if (RES.destroyRes(RES_DIR_DRAGON + file.name + "_tex.json")) {
                true && console.log("db delete :" + file.name + "_tex.json");
            }
            if (RES.destroyRes(RES_DIR_DRAGON + file.name + "_tex.png")) {
                true && console.log("db delete :" + file.name + "_tex.png");
            }
            delete this.files[name];
        }
    };
    /**
     * 创建一个动画
     * @name 动画资源名称
     * @tar  更新对象
     * @playSpeed 播放速度
     * @fast 使用急速模式
     * isReplace 是否换装
    */
    DBAvatarManager.prototype.loadArmature = function (name, tar, isReplace, playSpeed, fast, type) {
        if (isReplace === void 0) { isReplace = false; }
        if (playSpeed === void 0) { playSpeed = 1; }
        if (fast === void 0) { fast = true; }
        if (type === void 0) { type = null; }
        if (this.files[name]) {
            this.makeArmature(name, tar, isReplace, playSpeed, fast);
        }
        else {
            var load = this.loadFiles[name];
            if (!load) {
                load = this.loadFiles[name] = new LoadFile();
                load.name = name;
                load.isReplace = isReplace;
                load.type = type;
            }
            load.tar.push(tar);
            if (!load.loading) {
                this.starLoad(load);
            }
        }
    };
    DBAvatarManager.prototype.unLoadArmature = function (name, tar) {
        if (this.files[name]) {
            this.files[name].ref--;
        }
        else {
            var load = this.loadFiles[name];
            if (load) {
                var i = load.tar.indexOf(tar);
                if (i >= 0) {
                    load.tar.splice(i, 1);
                    if (load.tar.length <= 0) {
                    }
                }
            }
        }
    };
    DBAvatarManager.prototype.starLoad = function (file) {
        file.loading = true;
        var ske, json, tx;
        var self = this;
        var complete = function () {
            if (!ske)
                return;
            if ((!json || !tx))
                return;
            self.addArmatureFile(ske, tx, json, file.type);
            var i = 0;
            var a = file.tar.length;
            for (; i < a; i++) {
                self.makeArmature(file.name, file.tar[i], file.isReplace);
            }
            delete self.loadFiles[file.name];
        };
        RES.getResByUrl(RES_DIR_DRAGON + file.name + "_ske.json", function (data) {
            ske = data;
            complete();
        }, self, RES.ResourceItem.TYPE_JSON);
        //if (file.type != DBPart.NUDE) {
        RES.getResByUrl(RES_DIR_DRAGON + file.name + "_tex.json", function (data) {
            json = data;
            complete();
        }, self, RES.ResourceItem.TYPE_JSON);
        RES.getResByUrl(RES_DIR_DRAGON + file.name + "_tex.png", function (data) {
            tx = data;
            complete();
        }, self, RES.ResourceItem.TYPE_IMAGE);
        //}
    };
    /**
     * 创建一个动画
     * @param name 动作名称
     * @param fromDragonBonesDataName 动画文件名称
     * @returns {Armature}
     */
    DBAvatarManager.prototype.makeArmature = function (name, tar, isRelace, playSpeed, fast) {
        if (playSpeed === void 0) { playSpeed = 1; }
        if (fast === void 0) { fast = true; }
        var file = this.files[name];
        if (!file) {
            return;
        }
        file.ref++;
        if (!isRelace) {
            var armature = this.factory.buildArmature(name);
            if (armature == null) {
                return;
            }
            if (fast) {
                armature.cacheFrameRate = DBPart.CACHE;
            }
            var clock = this.createWorldClock(playSpeed);
            tar.create(armature, clock);
        }
        else {
            tar.relaceSkin(name);
        }
    };
    /**
     * 创建WorldClock
     * @param playSpeed
     * @returns {dragonBones.WorldClock}
     */
    DBAvatarManager.prototype.createWorldClock = function (playSpeed) {
        for (var i = 0; i < this.clocksLen; i++) {
            if (this.clocks[i].timeScale == playSpeed) {
                return this.clocks[i];
            }
        }
        var newClock = new dragonBones.WorldClock();
        newClock.timeScale = playSpeed;
        this.clocks.push(newClock);
        this.clocksLen = this.clocks.length;
        return newClock;
    };
    /**
     * dragonBones体系的每帧刷新
     * @param advancedTime
     */
    DBAvatarManager.prototype.onEnterFrame = function () {
        var curTime = this.advancedTime;
        curTime = App.TimerManager.getSyncTime() - curTime;
        this.averageUtils.push(curTime);
        this.advancedTime = App.TimerManager.getSyncTime();
        var time = this.averageUtils.getValue() * 0.001;
        for (var i = 0; i < this.clocksLen; i++) {
            var clock = this.clocks[i];
            clock.advanceTime(time);
        }
        curTime = this.advancedTime;
        if (curTime >= this.disposeTime) {
            this.disposeTime = curTime + 60000;
            var fn = this.disposeList.shift();
            if (fn) {
                var f = this.files[fn];
                if (!f || f.ref > 0)
                    return;
                this.removeArmatureFile(fn);
            }
        }
    };
    DBAvatarManager.prototype.onScengChange = function () {
        var curTime = App.TimerManager.getSyncTime();
        this.disposeTime = curTime + 60000;
        this.disposeList.length = 0;
        for (var k in this.files) {
            var f = this.files[k];
            if (f.ref <= 0) {
                this.disposeList.push(f.name);
            }
        }
    };
    /**
     * 替换插槽
     */
    DBAvatarManager.prototype.replaceSoltDisplay = function (proName, elName, slotName, reName, slot) {
        this.factory.replaceSlotDisplay(proName, elName, slotName, reName, slot);
    };
    /**
     * 停止
     */
    DBAvatarManager.prototype.stop = function () {
        if (this.isPlay) {
            App.TimerManager.remove(this.onEnterFrame, this);
            this.isPlay = false;
        }
    };
    /**
     * 开启
     */
    DBAvatarManager.prototype.start = function () {
        if (!this.isPlay) {
            this.isPlay = true;
            this.disposeTime = this.advancedTime = App.TimerManager.getSyncTime();
            App.TimerManager.addFrame(2, this.onEnterFrame, this);
        }
    };
    return DBAvatarManager;
}(BaseClass));
__reflect(DBAvatarManager.prototype, "DBAvatarManager");
var DBFile = (function () {
    function DBFile() {
        this._ref = 0;
    }
    Object.defineProperty(DBFile.prototype, "ref", {
        get: function () {
            return this._ref;
        },
        set: function (value) {
            this._ref = value;
        },
        enumerable: true,
        configurable: true
    });
    return DBFile;
}());
__reflect(DBFile.prototype, "DBFile");
var LoadFile = (function () {
    function LoadFile() {
        this.tar = [];
        this.loading = false;
    }
    return LoadFile;
}());
__reflect(LoadFile.prototype, "LoadFile");
//# sourceMappingURL=DBAvatarManager.js.map