/**
 * effect: 窗口数据类
 * author :lzw
 * data :2019.6.25
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ViewProp = (function () {
    function ViewProp() {
        /**窗口名称 */
        this.key = "";
        /**模块名称 */
        this.module = "";
        /**一级页签下标 */
        this.firIndex = 0;
        /**二级页签下标 */
        this.secIndex = 0;
        /**开启等级 */
        this.openLv = 1;
        /**开服天数 */
        this.openDay = 1;
        /**模块名称 */
        this.winTitle = "";
    }
    return ViewProp;
}());
__reflect(ViewProp.prototype, "ViewProp");
//# sourceMappingURL=ViewProp.js.map