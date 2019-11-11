/**
 * 物品管理方法
 */
class ItemMgr {

    public static sortItemFunc(a: UserItem, b: UserItem): number {
        // if(a.)
        return 1;
    }

    /**
     * 由指定的奖励物品生成一个用户物品
     * @param itemID
     * @return
     *
    */
    public static makeUserItemFromAward(award: QuestAward): UserItem {
        let userItem: UserItem = this.makeUserItemFromID(award.id);
        userItem.btCount = award.count;
        userItem.btFlag = award.bind ? 1 : 0;
        userItem.btQuality = award.quality;
        userItem.btStrong = award.strong;
        return userItem;
    }

    /**
     * 由指定的物品ID生成一个用户物品
     * @param itemID
     * @param quality 品质
     * @return
     *
     */
    public static makeUserItemFromID(itemId: number): UserItem {
        let stdItem: StdItem = GameConfig.item[itemId] ? GameConfig.item[itemId] : null;
        if (!stdItem) return null;
        return this.makeUserItemFromStdItem(stdItem);
    }

    /**
     * 由指定的标准物品配置生成一个用户物品
     * @param stdItem
     * @param quality 品质
     * @return
     *
    */
    public static makeUserItemFromStdItem(stdItem: StdItem): UserItem {
        let userItem: UserItem = new UserItem();
        userItem.stdItem = stdItem;
        // userItem.nDeadline = stdItem.time;
        userItem.wItemId = stdItem.id;
        // userItem.wDura = stdItem.dura;
        // userItem.wDuraMax = stdItem.dura;
        return userItem;
    }

}