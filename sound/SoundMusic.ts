
/**
 * 背景音乐类
 */
class SoundMusic extends BaseSound {
    private volume: number;
    private currName: string;
    private currSound: egret.Sound;
    private currSoundChannel: egret.SoundChannel;

    public constructor() {
        super();
    }

    /**
     * 停止当前音乐
     */
    public stop(): void {
        if (this.currSoundChannel) {
            this.currSoundChannel.stop();
        }
        this.currSoundChannel = null;
        this.currSound = null;
        this.currName = "";
    }

    /**
     * 播放某个音乐
     */
    public play(soundName: string): void {
        if (this.currName == soundName) {
            return;
        }
        this.stop();
        this.currName = soundName;
        var sound: egret.Sound = this.getSound(soundName);
        if (sound) {
            this.playSound(sound);
        }
    }

    /**
     * 播放
     */
    private playSound(sound: egret.Sound): void {
        sound.type = egret.Sound.MUSIC;
        this.currSound = sound;
        this.currSoundChannel = this.currSound.play(0, -1);
        this.currSoundChannel.volume = this.volume;
    }

    /**
     * 设置音量
     */
    public setVolume(volume: number): void {
        this.volume = volume;
        if (this.currSoundChannel) {
            this.currSoundChannel.volume = this.volume;
        }
    }

    /**
     * 资源加载完成后处理播放
     */
    public loadedPlay(data: any, key:string): void {
        if (this.currName == key) {
            this.playSound(data);
        }
    }

    /**
     * 检测一个文件是否要清除
     */
    public checkCanClear(key: string): boolean {
        return this.currName != key;
    }

}