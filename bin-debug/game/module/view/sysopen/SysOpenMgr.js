var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/*
 * @Description: 系统开启管理器
 * @Author: xiejunwei
 * @Date: 2019-09-20 13:46:21
 */
var SysOpenMgr = (function () {
    function SysOpenMgr() {
    }
    SysOpenMgr.checkOpen = function () {
        var data = GameCache.sysopen.checkList;
        var openday = GameCache.server.serverOpenDay;
        var playList = [];
        var curLvl = 0;
        var questId = GameCache.quest.questId;
        var state = GameCache.quest.state;
        var maxItem;
        for (var i in data) {
            var item = data[i];
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
        if (!maxItem)
            return;
        var view = new ViewProp();
        playList.push(maxItem);
        view.firData = playList;
        App.ViewManager.open(ViewConst.SYSOPENHINT, view);
    };
    return SysOpenMgr;
}());
__reflect(SysOpenMgr.prototype, "SysOpenMgr");
//# sourceMappingURL=SysOpenMgr.js.map