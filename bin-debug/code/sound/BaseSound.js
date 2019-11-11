var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Sound基类
 */
var BaseSound = (function () {
    function BaseSound() {
        this.cache = {};
        this.loadingCache = [];
    }
    /**
     * 获取Sound
     * key  sound资源名
     */
    BaseSound.prototype.getSound = function (key) {
        var sound = RES.getRes(key);
        if (sound) {
            if (this.cache[key]) {
                //this.cache[key] = egret.getTimer();
            }
        }
        else {
            if (this.loadingCache.indexOf(key) != -1) {
                return null;
            }
            this.loadingCache.push(key);
            RES.getResByUrl(key, this.onResourceLoadComplete, this, RES.ResourceItem.TYPE_SOUND);
        }
        return sound;
    };
    /**
     * 资源加载完成
     */
    BaseSound.prototype.onResourceLoadComplete = function (data, key) {
        var index = this.loadingCache.indexOf(key);
        if (index != -1) {
            this.loadingCache.splice(index, 1);
            //this.cache[key] = egret.getTimer();
            if (data) {
                this.loadedPlay(data, key);
            }
        }
    };
    /**
     * 资源加载完成后处理播放，子类重写
     * key  sound资源名
     */
    BaseSound.prototype.loadedPlay = function (data, key) {
    };
    /**
     * 检测一个文件是否要清除，子类重写
     * key  sound资源名
     */
    BaseSound.prototype.checkCanClear = function (key) {
        return true;
    };
    return BaseSound;
}());
__reflect(BaseSound.prototype, "BaseSound");
//# sourceMappingURL=BaseSound.js.map