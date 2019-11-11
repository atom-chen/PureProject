
/**
 * Sound基类
 */
class BaseSound {

    public cache: Object;
    public loadingCache: Array<string>;

    public constructor() {
        this.cache = {};
        this.loadingCache = [];
    }

    /**
     * 获取Sound
     * key  sound资源名
     */
    public getSound(key: string): egret.Sound {
        var sound: egret.Sound = RES.getRes(key);
        if (sound) {
            if (this.cache[key]) {
                //this.cache[key] = egret.getTimer();
            }
        } else {
            if (this.loadingCache.indexOf(key) != -1) {
                return null;
            }
            this.loadingCache.push(key);
            RES.getResByUrl(key, this.onResourceLoadComplete, this, RES.ResourceItem.TYPE_SOUND);
        }
        return sound;
    }

    /**
     * 资源加载完成
     */
    private onResourceLoadComplete(data: any, key: string): void {
        var index: number = this.loadingCache.indexOf(key);
        if (index != -1) {
            this.loadingCache.splice(index, 1);
            //this.cache[key] = egret.getTimer();
            if (data) {
                this.loadedPlay(data, key);
            }
        }
    }

    /**
     * 资源加载完成后处理播放，子类重写
     * key  sound资源名
     */
    public loadedPlay(data: any, key: string): void {

    }

    /**
     * 检测一个文件是否要清除，子类重写
     * key  sound资源名
     */
    public checkCanClear(key: string): boolean {
        return true;
    }
}