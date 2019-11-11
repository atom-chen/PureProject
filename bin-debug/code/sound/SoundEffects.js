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
 * 音效类
 */
var SoundEffects = (function (_super) {
    __extends(SoundEffects, _super);
    function SoundEffects() {
        var _this = _super.call(this) || this;
        _this.limitName = null;
        return _this;
    }
    /**
     * 播放一个音效
     */
    SoundEffects.prototype.play = function (soundName, limt) {
        if (limt && this.limitName) {
            return;
        }
        limt && (this.limitName = soundName);
        var sound = this.getSound(soundName);
        if (sound) {
            this.playSound(sound, soundName);
        }
    };
    /**
     * 播放
     */
    SoundEffects.prototype.playSound = function (sound, soundName) {
        var channel = sound.play(0, 1);
        channel.volume = this.volume;
        if (this.limitName == soundName) {
            channel.once(egret.Event.SOUND_COMPLETE, this.onPlayComplete, this);
        }
    };
    SoundEffects.prototype.onPlayComplete = function (e) {
        this.limitName = null;
    };
    /**
     * 设置音量
     */
    SoundEffects.prototype.setVolume = function (volume) {
        this.volume = volume;
    };
    /**
     * 资源加载完成后处理播放
     */
    SoundEffects.prototype.loadedPlay = function (data, key) {
        this.playSound(data, key);
    };
    return SoundEffects;
}(BaseSound));
__reflect(SoundEffects.prototype, "SoundEffects");
//# sourceMappingURL=SoundEffects.js.map