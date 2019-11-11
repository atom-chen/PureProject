/*
 * @Description: 
 * @Author: moyusheng
 * @Date: 2019-10-08 11:31:51
 */
class PassMgr {

    /**回城按钮管理 */
    static switchGj(skipTips = false): void {
        let conf = GameCache.map.mapConfig;
        switch (conf.type) {
            case SceneType.WORLD_BOSS:     //世界BOSS
            case SceneType.VIP_BOSS:     //VIPboss
                GameCache.boss.openExitTips(skipTips)
                break;
            case SceneType.GUA_JI:    //挂机场景
                Proxy.copy.sendQuit(GlobalVar.GUAJI_SCENE);
                break;
            case SceneType.NORMAL_FIELD:
                Proxy.copy.sendEnterFB(GlobalVar.GUAJI_SCENE);
                break;
            case SceneType.PERSONAL_BOSS: //个人BOSS退出
            case SceneType.MATERIAL_COPY:  //材料副本退出
            case SceneType.FASHION:
            case SceneType.TOWER:
            case SceneType.EXP_COPY:
            case SceneType.ARENA:
                GameCache.copy.openExitTips(skipTips);
                break;
            case SceneType.PURRGATORY_BOSS:
                GameCache.pgtBoss.openExitTips(skipTips);
                break;
            default:
                break;
        }
    }


    /**挂机击杀总数 */
    static guajiTotal(): number {
        let conf = GameConfig.passBOSS;
        let lvl = GameCache.pass.level;
        lvl = lvl > 0 ? lvl : 1;
        for (let i in conf) {
            if (conf[i].start <= lvl && conf[i].end >= lvl) {
                return conf[i].needMon;
            }
        }
        return 9999;
    }

    /**挂机进度*/
    static guajiProgress(): void {
        let view = App.ViewManager.getView(ViewConst.MAIN_UI);
        view["guajiProgress"]();
    }

    /**挂机进度是否完成 */
    static isComplete(): number {
        return GameCache.pass.total - GameCache.pass.killNum;
    }

    /**获取关卡奖励*/
    static getPassAward(sp: boolean = false) {
        let lvl = GameCache.pass.level;
        let AwConf = GameConfig.passAw;
        let id = Object.getOwnPropertyNames(GameConfig.passAw).length + "";
        for (let i in AwConf) {
            if (AwConf[i].start <= lvl && AwConf[i].end >= lvl) {
                id = i;
            }
        }
        let conf = GameConfig.passAw[id];
        let aw = sp ? conf.awardshow : conf.award;
        return aw;
    }

    static getPassBossCfg(): any {
        let lvl = GameCache.pass.level;
        let conf = GameConfig.passBOSS;
        let id = conf[Object.getOwnPropertyNames(conf).length];
        for (let i in conf) {
            if (conf[i].start <= lvl && conf[i].end >= lvl) {
                return conf[i];
            }
        }
        return null;
    }

    /**获取闯关BOSSID */
    static getPassBossData() {
        let cfg;
        let conf = GameConfig.passBOSS;
        return (cfg = this.getPassBossCfg()) ? cfg.bossid : conf[Object.getOwnPropertyNames(conf).length];
    }
}