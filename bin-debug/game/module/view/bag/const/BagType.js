var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
// TypeScript file
var BagType = (function () {
    function BagType() {
    }
    BagType.TEMP_DEAL = 0; //交易中的临时列表
    BagType.TEMP_SELL_BUY = 1; //寄卖系统
    BagType.AUTO_USE_VALID_TIME = 5000; //自动使用物品的有效使用时间
    //背包物品分类定义
    //值的大小也是排列的顺序(小的在前),对应bagItemTypeIndex的数组下标
    BagType.BAG_TYPE_ALL = 0; //所有物品
    BagType.BAG_TYPE_OTHER = 1; //其他
    BagType.BAG_TYPE_EQUIP = 2; //装备(包括武器)
    BagType.BAG_TYPE_PURGATORY = 3; //炼狱
    BagType.BAG_TYPE_JEWEL = 4; //宝石
    // static BAG_TYPE_MEDICINAL: number = 2;    //药品
    // static BAG_TYPE_TASK: number = 3;         //任务
    // static BAG_TYPE_HERO: number = 5;		//英雄
    // static BAG_TYPE_MAGIC: number = 6;     //法宝
    // static BAG_TYPE_RUNE: number = 7;     ///符石
    BagType.MAX_BUYBACK_COUNT = 10; //回购物品的最大保存数量
    return BagType;
}());
__reflect(BagType.prototype, "BagType");
//# sourceMappingURL=BagType.js.map