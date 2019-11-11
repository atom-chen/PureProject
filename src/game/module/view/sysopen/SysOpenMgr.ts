/*
 * @Description: 系统开启管理器
 * @Author: xiejunwei
 * @Date: 2019-09-20 13:46:21
 */
class SysOpenMgr {
    static checkOpen(): void {
        let data = GameCache.sysopen.checkList;
        let openday = GameCache.server.serverOpenDay;
        let playList = [];
        let curLvl = 0;
        let questId = GameCache.quest.questId;
        let state = GameCache.quest.state;
        let maxItem;
        for (let i in data) {
            let item = data[i];
            if (App.ViewManager.checkOpenCondition(item, false)) {
                // playList.push(item);
                // if (questId > item.openQuest || (questId == item.openQuest && state == 2)) {
                //     maxItem = item;
                //     curLvl = item.openLv;
                // }
                maxItem = item;
                curLvl = item.openLv;
                delete GameCache.sysopen.checkList[i];
            }
        }
        if (!maxItem) return;
        let view = new ViewProp();
        playList.push(maxItem);
        view.firData = playList;
        App.ViewManager.open(ViewConst.SYSOPENHINT, view);
    }
}