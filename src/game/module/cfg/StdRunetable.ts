class StdRunetable { 
    /** 编号 */
    id: string;
    /** 阶级 */
    classeLevel: number;
    /** 星级 */
    starLevel: number;
    /** 培养增加经验 */
    addExp: number;
    /** 升级所需经验值 */
    upExp: number;
    /** 培养道具消耗 */
    item: any[] = [];
    /** 每级增加属性 */
    atts: any[] = [];
    /** 激活符碑外观id */
    Appearance: number;
}