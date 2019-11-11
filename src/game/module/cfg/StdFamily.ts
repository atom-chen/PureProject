class StdFamily { 
    /** 字段名 */
    id: number;
    /** 创建公会最低等级 */
    levelLimit: number;
    /** 创建公会最低VIP等级 */
    createMinVipLevel: number;
    /** 自动解雇会长离线时间(小时) */
    autoFireLeaderTime: number;
    /** 创建或加入工会CD(小时) */
    leftTimeLimit: number;
    /** 创建公会消耗的钻石数 */
    needYbCount: number;
    /** 权限表 */
    privilege: any[] = [];
    /** 申请入会条件(战力) */
    condition: any[] = [];
    /** 默认公告 */
    notice: string;
}