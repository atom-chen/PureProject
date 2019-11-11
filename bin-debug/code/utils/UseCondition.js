var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/*
 * @Description: 物品使用类(方便给物品使用一个类型)
 * @Author: liangzhaowei
 * @Date: 2019-08-13 16:38:15
 * @LastEditTime: 2019-08-13 16:41:30
 */
var UseCondition = (function () {
    function UseCondition() {
        /**物品品类 */
        this.type = 0;
        /**物品id */
        this.id = 101;
        /**物品数量 */
        this.count = 1;
    }
    return UseCondition;
}());
__reflect(UseCondition.prototype, "UseCondition");
//# sourceMappingURL=UseCondition.js.map