
/**
 * Sound管理类
 */
class SoundManager {
    private static _instance: SoundManager;
    public static getIns(): SoundManager {
        if (this._instance == null)
            this._instance = new SoundManager();
        return this._instance;
    }
    /**音乐文件清理时间 */
    //private CLEAR_TIME: number = 180000;

    /**背景音开关 1|关闭   其他|打开*/
    private musicOff: number = 1;
    /**音效开关 1|关闭   其他|打开*/
    private effectOff: number = 1;
    /**背景音乐的音量 */
    private musicVolume: number;
    /**音效的音量 */
    private effectVolume: number;
    /**当前播放的音乐名 */
    private currMusicName: string;
    /**音乐 */
    private soundMusic: SoundMusic;
    /**音效 */
    private soundEffect: SoundEffects;

    private soundFlag: boolean = true;


    /**
     * 构造函数
     */
    public constructor() {
        this.soundMusic = new SoundMusic();
        this.soundEffect = new SoundEffects();
    }

    /**
     * 初始化
     * mo  音乐开关 1|关闭   其他|打开
     * mv  音乐音量
     * eo  音效开关 1|关闭   其他|打开
     * ev  音效音量
     */
    public init(mo: number, mv: number, eo: number, ev: number): void {
        this.musicOff = mo;
        this.musicVolume = mv;
        this.soundMusic.setVolume(mv);
        this.effectOff = eo;
        this.effectVolume = ev;
        this.soundEffect.setVolume(ev);
    }

    /**
     * 播放背景音乐
     * @param key
     */
    public playMusic(bgName?: string): void {
        if (!bgName) {
            bgName = this.currMusicName;
        } else {
            this.currMusicName = bgName;
        }
        if (this.musicOff == 1) {
            return;
        }
        if (bgName) {
            this.soundMusic.play(RES_DIR_SOUND + bgName + ".mp3");
        }
    }

    /**
     * 停止音乐
     */
    public stopMusic(): void {
        this.soundMusic.stop();
    }

    /**
     * 设置背景音乐是否开启
     * val  1|关闭   其他|打开
     */
    public setMusicOn(val: number): void {
        this.musicOff = val;
        if (!val) {
            this.soundMusic.stop();
        } else {
            if (this.currMusicName) {
                this.playMusic(this.currMusicName);
            }
        }
    }

    /**
     * 设置背景音乐音量
     * volume   0到1
     */
    public setMusicVolume(volume: number): void {
        this.musicVolume = volume;
        this.soundMusic.setVolume(volume);
    }

    /**
     * 获取背景音乐音量
     * @returns {number}
     */
    public getMusicVolume(): number {
        return this.musicVolume;
    }


    /**
     * 播放音效
     * effectName
     * limt ==true时，上个==true还没播放完成的，就跳过本次播放
     */
    public playEffect(effectName: string, limt?: boolean): void {
        if (this.effectOff == 1) {
            return;
        }
        this.soundEffect.play(RES_DIR_SOUND + effectName + ".mp3", limt);
    }

    /**
     * 设置音效是否开启
     * val  1|关闭   其他|打开
     */
    public setEffectOn(val: number): void {
        this.effectOff = val;
    }

    /**
     * 设置音效音量
     * volume  0到1
     */
    public setEffectVolume(volume: number): void {
        this.effectVolume = volume;
        this.soundEffect.setVolume(volume);
    }

    /**
     * 获取音效音量
     */
    public getEffectVolume(): number {
        return this.effectVolume;
    }

    /**
     * 关闭所有声音
     * shield 1|关闭  其他|打开
     */
    public closeAllSound(shield): void {
        this.setMusicOn(shield);
        this.setEffectOn(shield);
    }

    /****************************************************************************/
    public useSkill(skill): void {
        let skillCon: StdSkill = GameConfig.skill[skill];
        if(skillCon.music){
            this.playEffect(skillCon.music);
        }
    }

}