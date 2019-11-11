/*
 * @Description: 系统开启数据
 * @Author: xiejunwei
 * @Date: 2019-09-20 13:57:53
 */
class SysOpenCache extends BaseCache {

    public checkList = {};
    public checkInited: boolean = false;

    public constructor() {
        super();
    }

    /**
     * 初始化系统开启等级检查列表
     */
    public initCheckList(): void {
        if (this.checkInited) return;
        let conf: StdModcontrol = GameConfig.modControl;
        let lvl = GameCache.hero.mainPro.pro(PropId.AP_LEVEL);
        let openday = GameCache.server.serverOpenDay;
        let questid = GameCache.quest.questId;
        for (let i in conf) {
            for (let j in conf[i]) {
                for (let k in conf[i][j]) {
                    let item: StdModcontrol = conf[i][j][k];
                    if (!item.location) continue;
                    if (!App.ViewManager.checkOpenCondition(item, false)) {
                        let name = i + j + k;
                        this.checkList[name] = {
                            icon: item.image[0],
                            name: item.image[1],
                            location: item["location"],
                            openLv: item.openLv,
                            openDay: item.openDay,
                            openQuest: item.openQuest,
                        }
                    }
                }
            }
        }
        this.checkInited = true;
    }

    clear() {
        this.checkList = {};
    }
}