class StdSkilleffect { 
    /** 编号 */
    id: number;
    /** 资源名字 */
    eff: string;
    /** 类型 */
    type: number;
    /** 图层 */
    layer: number;
    /** 延时 */
    delay: number;
    /** 是否反方向 */
    hasDir: number;
    /** 是否震屏 */
    shake: number;
    /** 播放次数 */
    playCount: number;
    /** 播放时间 */
    playTime: number;
    /** 飞行时间 */
    flyTime: number;
    /** 飞行距离 */
    flyDis: number;
    /** 飞行速度 */
    flySpeed: number;
    /** 下个特效 */
    nextId: number;
    /** 击中特效 */
    hiteff: number;
    /** 特效偏移X */
    offsetX: number;
    /** 特效偏移Y */
    offsetY: number;
    /** 技能音效 */
    music: string;
}