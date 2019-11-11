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
 * 背景音乐类
 */
var SoundMusic = (function (_super) {
    __extends(SoundMusic, _super);
    function SoundMusic() {
        return _super.call(this) || this;
    }
    /**
     * 停止当前音乐
     */
    SoundMusic.prototype.stop = function () {
        if (this.currSoundChannel) {
            this.currSoundChannel.stop();
        }
        this.currSoundChannel = null;
        this.currSound = null;
        this.currName = "";
    };
    /**
     * 播放某个音乐
     */
    SoundMusic.prototype.play = function (soundName) {
        if (this.currName == soundName) {
            return;
        }
        this.stop();
        this.currName = soundName;
        var sound = this.getSound(soundName);
        if (sound) {
            this.playSound(sound);
        }
    };
    /**
     * 播放
     */
    SoundMusic.prototype.playSound = function (sound) {
        sound.type = egret.Sound.MUSIC;
        this.currSound = sound;
        this.currSoundChannel = this.currSound.play(0, -1);
        this.currSoundChannel.volume = this.volume;
    };
    /**
     * 设置音量
     */
    SoundMusic.prototype.setVolume = function (volume) {
        this.volume = volume;
        if (this.currSoundChannel) {
            this.currSoundChannel.volume = this.volume;
        }
    };
    /**
     * 资源加载完成后处理播放
     */
    SoundMusic.prototype.loadedPlay = function (data, key) {
        if (this.currName == key) {
            this.playSound(data);
        }
    };
    /**
     * 检测一个文件是否要清除
     */
    SoundMusic.prototype.checkCanClear = function (key) {
        return this.currName != key;
    };
    return SoundMusic;
}(BaseSound));
__reflect(SoundMusic.prototype, "SoundMusic");
//# sourceMappingURL=SoundMusic.js.map