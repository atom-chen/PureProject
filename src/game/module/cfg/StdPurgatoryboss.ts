class StdPurgatoryboss { 
    /** 怪物id */
    entityid: number;
    /** 地图配置 */
    scenceid: number;
    /** 难度 */
    difficulty: number;
    /** 挑战等级 */
    level: number;
    /** 副本ID */
    fubenid: number;
    /** 挑战消耗 */
    consume: any[] = [];
    /** 掉落预览 */
    reward_show: any[] = [];
    /** 复活时间 */
    time: number;
    /** 页签 */
    page: number;
    /** 推荐战力 */
    power: number;
}