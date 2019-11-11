var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 物品管理方法
 */
var ItemMgr = (function () {
    function ItemMgr() {
    }
    ItemMgr.sortItemFunc = function (a, b) {
        // if(a.)
        return 1;
    };
    /**
     * 由指定的奖励物品生成一个用户物品
     * @param itemID
     * @return
     *
    */
    ItemMgr.makeUserItemFromAward = function (award) {
        var userItem = this.makeUserItemFromID(award.id);
        userItem.btCount = award.count;
        userItem.btFlag = award.bind ? 1 : 0;
        userItem.btQuality = award.quality;
        userItem.btStrong = award.strong;
        return userItem;
    };
    /**
     * 由指定的物品ID生成一个用户物品
     * @param itemID
     * @param quality 品质
     * @return
     *
     */
    ItemMgr.makeUserItemFromID = function (itemId) {
        var stdItem = GameConfig.item[itemId] ? GameConfig.item[itemId] : null;
        if (!stdItem)
            return null;
        return this.makeUserItemFromStdItem(stdItem);
    };
    /**
     * 由指定的标准物品配置生成一个用户物品
     * @param stdItem
     * @param quality 品质
     * @return
     *
    */
    ItemMgr.makeUserItemFromStdItem = function (stdItem) {
        var userItem = new UserItem();
        userItem.stdItem = stdItem;
        // userItem.nDeadline = stdItem.time;
        userItem.wItemId = stdItem.id;
        // userItem.wDura = stdItem.dura;
        // userItem.wDuraMax = stdItem.dura;
        return userItem;
    };
    return ItemMgr;
}());
__reflect(ItemMgr.prototype, "ItemMgr");
//# sourceMappingURL=ItemMgr.js.map