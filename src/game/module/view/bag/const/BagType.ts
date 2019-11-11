// TypeScript file
class BagType {
    static TEMP_DEAL: number = 0;             //交易中的临时列表
    static TEMP_SELL_BUY: number = 1;         //寄卖系统

    static AUTO_USE_VALID_TIME: number = 5000;	//自动使用物品的有效使用时间

    //背包物品分类定义
    //值的大小也是排列的顺序(小的在前),对应bagItemTypeIndex的数组下标
    static BAG_TYPE_ALL: number = 0;          //所有物品
    static BAG_TYPE_OTHER: number = 1;        //其他
    static BAG_TYPE_EQUIP: number = 2;        //装备(包括武器)
    static BAG_TYPE_PURGATORY: number = 3;     //炼狱
    static BAG_TYPE_JEWEL: number = 4;         //宝石
    // static BAG_TYPE_MEDICINAL: number = 2;    //药品
    // static BAG_TYPE_TASK: number = 3;         //任务
    // static BAG_TYPE_HERO: number = 5;		//英雄
    // static BAG_TYPE_MAGIC: number = 6;     //法宝
    // static BAG_TYPE_RUNE: number = 7;     ///符石


    static MAX_BUYBACK_COUNT: number = 10;    //回购物品的最大保存数量
}