/**
 * effect: 窗口数据类
 * author :lzw
 * data :2019.6.25 
 */

class ViewProp {

    /**窗口名称 */
    key: string = "";
    /**模块名称 */
    module: string = "";
    /**一级页签下标 */
    firIndex: number = 0;
    /**二级页签下标 */
    secIndex: number = 0;
    /**开启等级 */
    openLv: number = 1;
    /**开服天数 */
    openDay: number = 1;
    /**一级页签数据 */
    firData: any;
    /**二级页签数据 */
    secData: any;
    /**扩展数据1 */
    exData1: any;
    /**扩展数据2 */
    exData2: any;
    /**物品数据 */
    itemData: StdItem;
    /**模块名称 */
    winTitle: string = "";
}