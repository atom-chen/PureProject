class StdMonster { 
    /** 字段名 */
    id: number;
    /** 怪物id */
    entityid: number;
    /** 怪物的名字 */
    name: string;
    /** BOSS类型 */
    fubentype: number;
    /** 怪物的模型di */
    modelid: number;
    /** 怪物的等级 */
    level: number;
    /** 血条数量 */
    hpCounts: number;
    /** 是否是BOSS */
    monsterType: number;
    /** 掉落 */
    dropid: any[] = [];
    /** 图标 */
    icon: number;
}