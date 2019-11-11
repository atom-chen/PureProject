var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/*
 * @Description:
 * @Author: moyusheng
 * @Date: 2019-10-08 11:31:51
 */
var PassMgr = (function () {
    function PassMgr() {
    }
    /**回城按钮管理 */
    PassMgr.switchGj = function (skipTips) {
        if (skipTips === void 0) { skipTips = false; }
        var conf = GameCache.map.mapConfig;
        switch (conf.type) {
            case SceneType.WORLD_BOSS: //世界BOSS
            case SceneType.VIP_BOSS://VIPboss
                GameCache.boss.openExitTips(skipTips);
                break;
            case SceneType.GUA_JI://挂机场景
                Proxy.copy.sendQuit(GlobalVar.GUAJI_SCENE);
                break;
            case SceneType.NORMAL_FIELD:
                Proxy.copy.sendEnterFB(GlobalVar.GUAJI_SCENE);
                break;
            case SceneType.PERSONAL_BOSS: //个人BOSS退出
            case SceneType.MATERIAL_COPY: //材料副本退出
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
    };
    /**挂机击杀总数 */
    PassMgr.guajiTotal = function () {
        var conf = GameConfig.passBOSS;
        var lvl = GameCache.pass.level;
        lvl = lvl > 0 ? lvl : 1;
        for (var i in conf) {
            if (conf[i].start <= lvl && conf[i].end >= lvl) {
                return conf[i].needMon;
            }
        }
        return 9999;
    };
    /**挂机进度*/
    PassMgr.guajiProgress = function () {
        var view = App.ViewManager.getView(ViewConst.MAIN_UI);
        view["guajiProgress"]();
    };
    /**挂机进度是否完成 */
    PassMgr.isComplete = function () {
        return GameCache.pass.total - GameCache.pass.killNum;
    };
    /**获取关卡奖励*/
    PassMgr.getPassAward = function (sp) {
        if (sp === void 0) { sp = false; }
        var lvl = GameCache.pass.level;
        var AwConf = GameConfig.passAw;
        var id = Object.getOwnPropertyNames(GameConfig.passAw).length + "";
        for (var i in AwConf) {
            if (AwConf[i].start <= lvl && AwConf[i].end >= lvl) {
                id = i;
            }
        }
        var conf = GameConfig.passAw[id];
        var aw = sp ? conf.awardshow : conf.award;
        return aw;
    };
    PassMgr.getPassBossCfg = function () {
        var lvl = GameCache.pass.level;
        var conf = GameConfig.passBOSS;
        var id = conf[Object.getOwnPropertyNames(conf).length];
        for (var i in conf) {
            if (conf[i].start <= lvl && conf[i].end >= lvl) {
                return conf[i];
            }
        }
        return null;
    };
    /**获取闯关BOSSID */
    PassMgr.getPassBossData = function () {
        var cfg;
        var conf = GameConfig.passBOSS;
        return (cfg = this.getPassBossCfg()) ? cfg.bossid : conf[Object.getOwnPropertyNames(conf).length];
    };
    return PassMgr;
}());
__reflect(PassMgr.prototype, "PassMgr");
//# sourceMappingURL=PassMgr.js.map