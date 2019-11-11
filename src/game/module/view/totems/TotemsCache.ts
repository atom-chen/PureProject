/*
 * @Description: 图腾数据
 * @Author: xiejunwei
 * @Date: 2019-08-29 13:40:43
 * @LastEditTime: 2019-10-24 14:15:01
 */
class TotemsCache extends BaseCache {

    public totemsData: any
    public resonanceData: any;

    public constructor() {
        super();

        this.totemsData = {};
        this.resonanceData = {};
    }

    clear() {
        this.totemsData = {};
        this.resonanceData = {};
    }

    /**
     * 初始化图腾数据
     * @param type 图腾类型 lvl图腾阶数 star图腾星数
     */
    public initTotemsData(type, lvl, star): void {
        let id = lvl * 7 + star + 1;
        let obj = {
            id: id,
            jie: lvl,
            star: star
        }
        this.totemsData[type] = obj;
    }

    /**
     * 初始化图腾共鸣信息
     * @param id图腾组合ID，lvl共鸣等级
     */
    public initResonanData(id, lvl): void {
        this.resonanceData[id] = lvl;
    }

    /**
     * 判断升级信息
     */
    public checkGrade(idx?): boolean {
        if (!idx) {
            let len = Object.keys(GameConfig.totems).length;
            for (let i = 1; i <= len; i++) {
                if (this.checkGrade(i)) return true;
            }
            return false;
        }
        if (idx.length) {
            for (let i = idx[0]; i <= idx[1]; i++) {
                if (this.checkGrade(i)) return true;
            }
            return false;
        }
        let data = this.totemsData[idx];
        let id = data ? data.id : 1;
        let conf = GameConfig.totems[idx][id];
        if (!conf) return false;
        if (!conf.consume) return false;
        let count = GameCache.bag.itemCount(conf.consume[0].id);
        return count >= conf.consume[0].count;
    }

    /**
     * 判断共鸣
     */
    public checkReonance(idx?): boolean {
        if (!idx) {
            for (let i in GameConfig.resonance) {
                if (this.checkReonance(i)) return true;
            }
            return false;
        }
        let item = GameConfig.resonance[idx];
        let tLvl = GameCache.totems.resonanceData[idx] ? GameCache.totems.resonanceData[idx] : 0;
        let conf = GameConfig.resonance[idx][tLvl];
        let totemsData = GameCache.totems.totemsData[conf.number[0]];
        let minLvl = totemsData ? totemsData.jie : 0;
        let acti: boolean = true;
        for (let i of conf.number) {
            let td = GameCache.totems.totemsData[i];
            let lvl = td ? td.jie : 0;
            if (!td || td.id == 1) acti = false; // 存在图腾未激活
            minLvl = minLvl > lvl ? lvl : minLvl;
        }
        return (acti && (minLvl >= conf.classLvl || conf.classLvl == 0))
    }
}