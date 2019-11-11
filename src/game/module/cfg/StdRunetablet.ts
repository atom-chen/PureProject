class StdRunetablet { 
    /** 编号 */
    id: string;
    /** 阶级 */
    classLvl: number;
    /** 星级 */
    starlevel: number;
    /** 培养增加经验 */
    addExp: number;
    /** 升级所需经验值 */
    upExp: number;
    /** 培养道具消耗 */
    item: any[] = [];
    /** 培养金币消耗 */
    gold: any[] = [];
    /** 每级增加属性 */
    atts: any[] = [];
    /** 激活翅膀外观id */
    Appearance: number;
}