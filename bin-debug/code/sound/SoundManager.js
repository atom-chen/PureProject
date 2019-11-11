var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Sound管理类
 */
var SoundManager = (function () {
    /**
     * 构造函数
     */
    function SoundManager() {
        /**音乐文件清理时间 */
        //private CLEAR_TIME: number = 180000;
        /**背景音开关 1|关闭   其他|打开*/
        this.musicOff = 1;
        /**音效开关 1|关闭   其他|打开*/
        this.effectOff = 1;
        this.soundFlag = true;
        this.soundMusic = new SoundMusic();
        this.soundEffect = new SoundEffects();
    }
    SoundManager.getIns = function () {
        if (this._instance == null)
            this._instance = new SoundManager();
        return this._instance;
    };
    /**
     * 初始化
     * mo  音乐开关 1|关闭   其他|打开
     * mv  音乐音量
     * eo  音效开关 1|关闭   其他|打开
     * ev  音效音量
     */
    SoundManager.prototype.init = function (mo, mv, eo, ev) {
        this.musicOff = mo;
        this.musicVolume = mv;
        this.soundMusic.setVolume(mv);
        this.effectOff = eo;
        this.effectVolume = ev;
        this.soundEffect.setVolume(ev);
    };
    /**
     * 播放背景音乐
     * @param key
     */
    SoundManager.prototype.playMusic = function (bgName) {
        if (!bgName) {
            bgName = this.currMusicName;
        }
        else {
            this.currMusicName = bgName;
        }
        if (this.musicOff == 1) {
            return;
        }
        if (bgName) {
            this.soundMusic.play(RES_DIR_SOUND + bgName + ".mp3");
        }
    };
    /**
     * 停止音乐
     */
    SoundManager.prototype.stopMusic = function () {
        this.soundMusic.stop();
    };
    /**
     * 设置背景音乐是否开启
     * val  1|关闭   其他|打开
     */
    SoundManager.prototype.setMusicOn = function (val) {
        this.musicOff = val;
        if (!val) {
            this.soundMusic.stop();
        }
        else {
            if (this.currMusicName) {
                this.playMusic(this.currMusicName);
            }
        }
    };
    /**
     * 设置背景音乐音量
     * volume   0到1
     */
    SoundManager.prototype.setMusicVolume = function (volume) {
        this.musicVolume = volume;
        this.soundMusic.setVolume(volume);
    };
    /**
     * 获取背景音乐音量
     * @returns {number}
     */
    SoundManager.prototype.getMusicVolume = function () {
        return this.musicVolume;
    };
    /**
     * 播放音效
     * effectName
     * limt ==true时，上个==true还没播放完成的，就跳过本次播放
     */
    SoundManager.prototype.playEffect = function (effectName, limt) {
        if (this.effectOff == 1) {
            return;
        }
        this.soundEffect.play(RES_DIR_SOUND + effectName + ".mp3", limt);
    };
    /**
     * 设置音效是否开启
     * val  1|关闭   其他|打开
     */
    SoundManager.prototype.setEffectOn = function (val) {
        this.effectOff = val;
    };
    /**
     * 设置音效音量
     * volume  0到1
     */
    SoundManager.prototype.setEffectVolume = function (volume) {
        this.effectVolume = volume;
        this.soundEffect.setVolume(volume);
    };
    /**
     * 获取音效音量
     */
    SoundManager.prototype.getEffectVolume = function () {
        return this.effectVolume;
    };
    /**
     * 关闭所有声音
     * shield 1|关闭  其他|打开
     */
    SoundManager.prototype.closeAllSound = function (shield) {
        this.setMusicOn(shield);
        this.setEffectOn(shield);
    };
    /****************************************************************************/
    SoundManager.prototype.useSkill = function (skill) {
        var skillCon = GameConfig.skill[skill];
        if (skillCon.music) {
            this.playEffect(skillCon.music);
        }
    };
    return SoundManager;
}());
__reflect(SoundManager.prototype, "SoundManager");
//# sourceMappingURL=SoundManager.js.map