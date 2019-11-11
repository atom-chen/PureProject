/*
 * @Description: 符碑数据
 * @Author: xiejunwei
 * @Date: 2019-09-17 20:14:20
 */
class RuneCache extends BaseCache {

    public runeData;

    public constructor() {
        super();

        this.runeData = {};
    }

    clear() {
        this.runeData = {};
    }

    public initRuneData(roleIdx, lvl, star, exp): void {
        let obj = {};
        let id = (lvl * 10 + star);
        id = id < 0 ? 0 : id;
        let roleId = GameCache.hero.getRoleIdByIndex(roleIdx);
        obj["id"] = id;
        obj["star"] = star;
        obj["lvl"] = lvl;
        obj["exp"] = exp;
        this.runeData[roleId] = obj;
    }

    /**
     * 获取升一星所需材料
     */
    public getUpGradeNum(roleIdx): number {
        let roleId = GameCache.hero.getRoleIdByIndex(roleIdx);
        let data = GameCache.rune.runeData[roleId];
        if (!data) data = {
            exp: 0,
            id: 0,
            lvl: 0,
            star: 0
        };
        let conf: StdRune = GameConfig.rune[roleIdx + 1][data.id];
        let curExp = data.exp;
        let maxExp = conf.upExp;
        let plus = conf.addExp;
        let count = conf.item[0].count;
        return Math.ceil((maxExp - curExp) / plus) * count;
    }

    public checkGrade(roleId?): boolean {
        let list = GameCache.hero.list;
        if (!roleId) {
            let list = GameCache.hero.list;
            for (let i = 0; i < list.length; i++) {
                if (this.checkGrade(list[i].id)) return true;
            }
            return false;
        }
        let idx = 0;
        for (let i = 0; i < list.length; i++) {
            if (list[i].id == roleId) {
                idx = i;
                break;
            }
        }
        let data = this.runeData[roleId];
        let id = data ? data.id : 0;
        let conf = GameConfig.rune[idx + 1][id + 1];
        if (!conf) return false;
        let count = GameCache.bag.itemCount(conf.item[0].id);
        return count >= conf.item[0].count;
    }
}