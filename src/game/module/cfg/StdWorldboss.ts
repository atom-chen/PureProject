class StdWorldboss { 
    /** 字段名 */
    id: number;
    /** 怪物id */
    entityid: number;
    /** 解锁条件 */
    conds: number;
    /** 地图配置 */
    scenceid: number;
    /** 复活时间 */
    time: number;
    /** 奖励展示 */
    reward_show: any[] = [];
    /** 页签 */
    page: number;
}