var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/*
 * @Description: 道具来源类型
 * @Author: guolinsen
 * @Date: 2019-08-19 17:22:30
 * @LastEditTime: 2019-10-29 11:58:22
 */
var ItemSourceType = (function () {
    function ItemSourceType() {
    }
    /**背包*/
    ItemSourceType.BAG = 1;
    /**身上装备*/
    ItemSourceType.ROLEEQUIP = 2;
    /**其他人身上装备*/
    ItemSourceType.OTHER_ROLEEQUIP = 999;
    return ItemSourceType;
}());
__reflect(ItemSourceType.prototype, "ItemSourceType");
//# sourceMappingURL=ItemSourceType.js.map