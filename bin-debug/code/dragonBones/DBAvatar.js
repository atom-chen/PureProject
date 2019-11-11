var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 龙骨动画封装，外部调用唯一接口
*/
var DBAvatar = (function () {
    function DBAvatar() {
        this._dir = 1;
    }
    Object.defineProperty(DBAvatar.prototype, "rolePro", {
        /**有其他部位的，通过设置人物属性更新*/
        set: function (pro) {
            this.unload();
            this.pro = pro;
            this._partName = {};
            this._partArmature = {};
            var partId = DBPart.PartId;
            var partName = this._partName;
            for (var k in partId) {
                partName[k] = 0;
            }
        },
        enumerable: true,
        configurable: true
    });
    DBAvatar.prototype.setRoot = function (root, completeHandler) {
        this._root = root;
        this._completeHandler = completeHandler;
    };
    DBAvatar.prototype.load = function (name, unLoad, isNude) {
        if (unLoad === void 0) { unLoad = false; }
        if (isNude === void 0) { isNude = false; }
        unLoad && this.unload();
        this._armatureName = name;
        App.DBAvatarManager.loadArmature(name, this, false, 1, true, isNude ? DBPart.NUDE : name);
    };
    DBAvatar.prototype.unload = function () {
        if (this._armatureName) {
            if (this._armature) {
                this.stop();
                App.DisplayUtils.removeFromParent(this._armature.display);
                this._armature.dispose();
                this._armature = null;
            }
            App.DBAvatarManager.unLoadArmature(this._armatureName, this);
            this._armatureName = null;
            var partName = this._partName;
            for (var k in partName) {
                if (partName[k]) {
                    this.unLoadPart(k, partName[k]);
                }
            }
            this._partName = null;
            this._partArmature = null;
        }
    };
    DBAvatar.prototype.unLoadPart = function (partName, fileName) {
        var nameList = DBPart.getPartNameList(partName);
        if (!nameList)
            return;
        var arDic = this._partArmature;
        var i = 0;
        var a = nameList.length;
        for (; i < a; i++) {
            var arName = partName + nameList[i];
            if (arDic[arName]) {
                arDic[arName].dispose();
                delete arDic[arName];
            }
            if (this._armature) {
                var slot = this._armature.getSlot(arName);
                slot.childArmature = null;
            }
        }
        App.DBAvatarManager.unLoadArmature(fileName, this);
    };
    /**更新检测是否需要换装*/
    DBAvatar.prototype.updateSkin = function () {
        if (!this._armature || !this.pro)
            return;
        if (!ThingKind.isHumanModel(this.pro.kind)) {
            return;
        }
        var pro = this.pro;
        var partId = DBPart.PartId;
        var partName = this._partName;
        //let arDic = this._partArmature;
        var job = pro.pro(PropId.AP_JOB);
        var sex = pro.pro(PropId.AP_SEX);
        for (var k in partId) {
            var proid = partId[k];
            var needId = pro.pro(proid);
            if (proid == PropId.AP_PANTS) {
                var armourId = pro.pro(PropId.AP_BODY_ID);
                var obj = GameConfig.dress[armourId];
                if (obj)
                    needId = obj.pantsID;
            }
            var fileName = needId ? (needId + "" + sex) : DBPart.getDefault(job, sex, k);
            if (true && DeBugMgr.dragonTest) {
                var str = DeBugMgr.dragonTest[proid];
                if (str && str.length)
                    fileName = str;
            }
            if (fileName != partName[k]) {
                var old = partName[k];
                if (old) {
                    this.unLoadPart(k, old);
                }
                partName[k] = fileName;
                fileName && App.DBAvatarManager.loadArmature(fileName, this, true);
            }
        }
    };
    /**加载后回调*/
    DBAvatar.prototype.create = function (armature, clock) {
        this._armature = armature;
        this._clock = clock;
        this._root.addChild(this._armature.display);
        this.play(this._playName, this._playNum);
        this.setDir(this._dir);
        this.updateSkin();
    };
    /**加载后回调*/
    DBAvatar.prototype.relaceSkin = function (id) {
        if (!this._armature)
            return;
        var partName = this._partName;
        for (var k in partName) {
            if (partName[k] == id) {
                var nameList = DBPart.getPartNameList(k);
                if (nameList) {
                    var i = 0;
                    var a = nameList.length;
                    for (; i < a; i++) {
                        var slotName = k + nameList[i];
                        var arName = id + nameList[i];
                        var armature = App.DBAvatarManager.factory.buildArmature(arName);
                        if (!armature) {
                            true && console.log("没有找到部件：" + arName);
                            continue;
                        }
                        armature.cacheFrameRate = DBPart.CACHE;
                        var slot = this._armature.getSlot(slotName);
                        if (!slot) {
                            true && console.log("缺少插槽：" + arName);
                            continue;
                        }
                        slot.childArmature = armature;
                        this._partArmature[slotName] = armature;
                        if (!this._playNum) {
                            this.play(this._playName, this._playNum);
                        }
                    }
                }
                break;
            }
        }
    };
    /**1向右 -1 向左*/
    DBAvatar.prototype.setDir = function (dir) {
        this._dir = dir;
        if (this._armature) {
            if (this._armature.display.scaleX != dir)
                this._armature.display.scaleX = dir;
        }
    };
    /**
     * 播放名为name的动作
     * @param name 名称
     * @param playNum 指定播放次数，默认走动画配置
     */
    DBAvatar.prototype.play = function (name, playNum, playNow) {
        if (playNum === void 0) { playNum = 0; }
        if (playNow === void 0) { playNow = true; }
        var armature = this._armature;
        this._playName = name;
        this._playNum = playNum;
        if (!armature || !this._playName || !playNow) {
            return;
        }
        this.start();
        armature.animation.play(name, playNum);
        if (!playNum) {
            for (var k in this._partArmature) {
                this._partArmature[k].animation.play(name, playNum);
            }
        }
    };
    DBAvatar.prototype.playTempAction = function (name) {
        if (this._armature && this._playName) {
            this.start();
            this._armature.animation.play(name, 1);
        }
    };
    DBAvatar.prototype.recoverPlay = function () {
        this.play(this._playName, this._playNum);
    };
    /**
     * 添加事件监听
     */
    DBAvatar.prototype.addListeners = function () {
        this._armature.eventDispatcher.addEvent(dragonBones.EventObject.COMPLETE, this.playComplete, this);
    };
    /**
     * 移除事件监听
     */
    DBAvatar.prototype.removeListeners = function () {
        this._armature.eventDispatcher.removeEvent(dragonBones.EventObject.COMPLETE, this.playComplete, this);
    };
    DBAvatar.prototype.resetParam = function () {
        this._armatureName = null;
        this._isPlay = false;
        this._playName = null;
        this._playNum = 0;
    };
    /**
     * 事件完成执行函数
     * @param e
     */
    DBAvatar.prototype.playComplete = function (e) {
        if (this._completeHandler) {
            this._completeHandler.args = [this._playName];
            this._completeHandler.run();
        }
    };
    /**
     * 恢复播放
     */
    DBAvatar.prototype.start = function () {
        if (!this._isPlay) {
            this._clock.add(this._armature);
            this._isPlay = true;
            this.addListeners();
        }
    };
    /**
     * 停止播放
     */
    DBAvatar.prototype.stop = function () {
        if (this._isPlay) {
            this._clock.remove(this._armature);
            this._isPlay = false;
            this._playName = null;
            this.removeListeners();
        }
    };
    DBAvatar.prototype.onRemove = function () {
        this.unload();
        this.resetParam();
        this.pro = null;
    };
    DBAvatar.prototype.dispose = function () {
        this.onRemove();
        this._root = null;
        this._completeHandler = null;
    };
    return DBAvatar;
}());
__reflect(DBAvatar.prototype, "DBAvatar");
//# sourceMappingURL=DBAvatar.js.map