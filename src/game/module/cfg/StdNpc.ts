class StdNpc { 
    /** 字段名 */
    id: number;
    /** npc名称 */
    name: string;
    /** 图片id */
    modelid: string;
    /** 坐标x */
    posx: number;
    /** 坐标y */
    posy: number;
    /** 横向偏移 */
    offx: number;
    /** 垂直偏移 */
    offy: number;
    /** 场景 */
    scene: number;
    /** 默认说话 */
    talk: any[] = [];
    /** 气泡内容 */
    say: string;
    /** 类型ID */
    classId: number;
    /** 脚本 */
    funcName: number;
    /** 声音文件 */
    soundId: string;
    /** 打开面板 */
    window: string;
}