class StdPassmonster { 
    /** 字段名 */
    id: number;
    /** 出生点 */
    heroPos: any[] = [];
    /** 地图数据 */
    mapFile: string;
    /** 刷怪 */
    monster: any[] = [];
    /** 刷怪点 */
    pos: any[] = [];
    /** 血量 */
    hp: number;
    /** 刷怪数量 */
    count: number;
    /** 循环开始 */
    circle: number;
}