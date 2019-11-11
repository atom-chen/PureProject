
/**
 * 音效类
 */
class SoundEffects extends BaseSound {

    private volume: number;

    private limitName: string = null;

    public constructor() {
        super();
    }

    /**
     * 播放一个音效
     */
    public play(soundName: string, limt?: boolean): void {
        if (limt && this.limitName) {
            return;
        }
        limt && (this.limitName = soundName);
        var sound: egret.Sound = this.getSound(soundName);
        if (sound) {
            this.playSound(sound, soundName);
        }
    }

    /**
     * 播放
     */
    private playSound(sound: egret.Sound, soundName:string): void {
        var channel: egret.SoundChannel = sound.play(0, 1);
        channel.volume = this.volume;
        if (this.limitName == soundName) {
            channel.once(egret.Event.SOUND_COMPLETE, this.onPlayComplete, this);
        }
    }

    private onPlayComplete(e: egret.Event): void {
        this.limitName = null;
    }

    /**
     * 设置音量
     */
    public setVolume(volume: number): void {
        this.volume = volume;
    }


    /**
     * 资源加载完成后处理播放
     */
    public loadedPlay(data: any, key: string): void {
        this.playSound(data, key);
    }
}