/*
 * @Description: 徽章数据
 * @Author: xiejunwei
 * @Date: 2019-08-27 20:29:39
 * @LastEditTime: 2019-10-24 15:29:23
 */
class BadgeCache extends BaseCache {


    public constructor() {
        super();
    }

    clear() {

    }

    public checkGrade(): boolean {
        let passLvl = GameCache.hero.mainPro.pro(PropId.AP_CHKPOINT_LV);
        let badgeLvl = GameCache.hero.mainPro.pro(PropId.AP_BADGE_LVL); // 当前徽章等级
        let conf = GameConfig.badge[badgeLvl + 1];
        if (!conf || !conf.Checkpoint) return false
        return passLvl > conf.Checkpoint;
    }
}