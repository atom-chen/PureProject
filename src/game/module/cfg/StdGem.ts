class StdGem { 
    /** 数据id */
    id: number;
    /** 宝石名称 */
    item: string;
    /** 宝石类型 */
    part: number;
    /** 基础属性 */
    attr: any[] = [];
    /** 成长属性 */
    lvlAttr: any[] = [];
    /** 基础升级消耗 */
    consume: any[] = [];
    /** 升级消耗成长系数 */
    lvlConsume: number;
    /** 分解获得 */
    resolve: any[] = [];
    /** 宝石背包最大个数 */
    maxNum: number;
    /** 宝石最大等级 */
    maxLevel: number;
    /** 孔位开启条件 */
    condition: any[] = [];
}