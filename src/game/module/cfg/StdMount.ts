class StdMount { 
    /** 编号 */
    id: number;
    /** 名称 */
    name: string;
    /** 图标 */
    icon: number;
    /** 系列id */
    fettersId: number;
    /** 模型 */
    modelid: number;
    /** 宠物品质 */
    petType: number;
    /** 喊话ID */
    shoutContent: number;
    /** 基础属性加成 */
    basicatt: any[] = [];
    /** 激活消耗 */
    activationNeed: any[] = [];
    /** 升级加成 */
    gradeatt: any[] = [];
    /** 升星消耗道具 */
    advanceditem: number;
    /** 升星消耗数量 */
    advancedcount: any[] = [];
    /** 升星对应星级系数 */
    advancedFactor: any[] = [];
    /** 升星对应模型 */
    advancedMod: any[] = [];
    /** 技能数量 */
    skillnum: any[] = [];
    /** 待机说话 */
    adle_talk: any[] = [];
    /** 品质对应星级最大值 */
    typeToStar: any[] = [];
    /** 升级消耗道具ID */
    levelupItem: number;
    /** 单道具提供经验 */
    giveExp: number;
    /** 最大等级（关联petconfig） */
    maxlevel: number;
}