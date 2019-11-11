var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/*
 * @Description: Bosss数据处理
 * @Author: xiejunwei
 * @Date: 2019-07-30 19:10:13
 * @LastEditTime: 2019-10-31 16:50:12
 */
var BossCache = (function (_super) {
    __extends(BossCache, _super);
    function BossCache() {
        var _this = _super.call(this) || this;
        _this.bossHintGroup = [];
        _this.worldEnterCount = {};
        _this.bossData = {};
        _this.reviveGroup = {};
        return _this;
    }
    BossCache.prototype.clear = function () {
        this.bossData = {};
        this.worldEnterCount = {};
        App.TimerManager.remove(this.refleshFunc, this);
        this.currentBossId = 0;
        this.reviveGroup = {};
    };
    BossCache.prototype.refleshWorldBossData = function () {
        if (!App.TimerManager.isExists(this.refleshFunc, this))
            App.TimerManager.addDelay(0, 200, 1, this.refleshFunc, this);
    };
    BossCache.prototype.refleshFunc = function () {
        Proxy.boss.sendBossInfo();
    };
    /**判断是否在世界BOSS地图 */
    BossCache.prototype.isWorldBossMap = function () {
        var mapId = GameCache.map.mapId;
        var conf = GameConfig.worldBoss;
        switch (GameCache.map.mapConfig.type) {
            case 1:
                conf = GameConfig.worldBoss;
                break;
            case 9:
                conf = GameConfig.vipBoss;
                break;
        }
        for (var i in conf) {
            if (conf[i].scenceid == mapId) {
                this.currentBossId = conf[i].entityid;
                return true;
            }
        }
        return false;
    };
    BossCache.prototype.openExitTips = function (skipTips, desc) {
        if (skipTips === void 0) { skipTips = false; }
        if (desc === void 0) { desc = Language.lang.exitWorldBoss; }
        if (skipTips) {
            this.exit();
            return;
        }
        var view = new ViewProp();
        var obj = {};
        var fbid = GameCache.map.fbId;
        var conf = GameConfig.fuben[fbid];
        desc = desc ? desc : conf.exitDec;
        obj["desc"] = desc;
        obj["thisc"] = this;
        obj["func"] = this.exit;
        view.exData1 = obj;
        App.ViewManager.open(ViewConst.SYSTIPS, view);
    };
    BossCache.prototype.exit = function () {
        Proxy.boss.sendBossFubenOpt(2, GameCache.boss.currentBossId);
    };
    BossCache.prototype.addWorldBossINfo = function () {
        this.isWorldBossMap();
        App.ViewManager.open(ViewConst.WBINFO);
    };
    BossCache.prototype.removeWorldBossINfo = function () {
        if (App.ViewManager.isShow(ViewConst.WBINFO))
            App.ViewManager.close(ViewConst.WBINFO);
    };
    /**
     * index 从零开始
    */
    BossCache.prototype.getRemindSet = function (index, type) {
        if (type === void 0) { type = SettingType.BOSS_REMIND; }
        var v = GameCache.settings.getValue(type);
        return ((v >> index) & 1) != 1;
    };
    BossCache.prototype.setRemindSet = function (index, sel, type) {
        if (type === void 0) { type = SettingType.BOSS_REMIND; }
        var vale = sel ? 0 : 1;
        var v = GameCache.settings.getValue(type);
        v = v & (0xffffffff - (1 << index));
        if (vale == 1) {
            v += (1 << index);
        }
        GameCache.settings.update(type, v, true);
    };
    /**
     * 打开奖励面板
     * @param type 1时，为归属奖，2为参与奖
     */
    BossCache.prototype.openAwardTips = function (arr, type, state) {
        if (arr === void 0) { arr = []; }
        if (type === void 0) { type = 2; }
        if (!App.ViewManager.isShow(ViewConst.AWARDTIPS)) {
            var obj = {};
            obj["state"] = state ? state : "boss";
            obj["func"] = this.recvAward;
            obj["itemArr1"] = type == 1 ? arr : [];
            obj["itemArr"] = type == 2 ? arr : [];
            var view = new ViewProp();
            view.firData = obj;
            App.ViewManager.open(ViewConst.AWARDTIPS, view);
        }
        else {
            var view = App.ViewManager.getView(ViewConst.AWARDTIPS);
            view["setList"](type, arr);
        }
    };
    BossCache.prototype.recvAward = function () {
        Proxy.boss.sendRecieveAw(GameCache.boss.currentBossId);
        Proxy.boss.sendBossFubenOpt(2, GameCache.boss.currentBossId);
    };
    /**判断BOSS是否在复活中 */
    BossCache.prototype.isReviving = function (conf, time, idx, hp) {
        // let delta = (GameCache.server.serverTime - time)
        // let remain = conf.time * 1000 - delta;
        var remain = time - GameCache.server.serverTime;
        if (remain >= 0 && hp == 0) {
            this.reviveGroup[conf.id] = [time, idx, conf.conds];
        }
        else {
            if (this.reviveGroup[conf.id])
                delete this.reviveGroup[conf.id];
        }
        if (!App.TimerManager.isExists(this.countDown, this))
            App.TimerManager.addDelay(0, 3000, 0, this.countDown, this);
    };
    BossCache.prototype.countDown = function () {
        if (!Object.keys(this.reviveGroup).length) {
            App.TimerManager.remove(this.countDown, this);
        }
        else {
            for (var i in this.reviveGroup) {
                var curTime = GameCache.server.serverTime;
                var result = GameCache.boss.getRemindSet(this.reviveGroup[i][1]);
                var rolelvl = GameCache.hero.mainPro.pro(PropId.AP_LEVEL);
                if (this.reviveGroup[i][0] - curTime < 3000 && this.reviveGroup[i][0] - curTime >= 0) {
                    if (result && (this.reviveGroup[i][2] <= rolelvl)) {
                        this.bossHintGroup.push(parseInt(i));
                        if (!App.ViewManager.isShow(ViewConst.WBREVIVE) && GameCache.map.mapConfig.type == SceneType.NORMAL_FIELD)
                            App.ViewManager.open(ViewConst.WBREVIVE);
                    }
                }
                else if (this.reviveGroup[i][0] - curTime < 0) {
                    delete this.reviveGroup[i];
                }
            }
        }
    };
    BossCache.prototype.getWorldBossBuyMax = function () {
        var vipLvl = GameCache.vip.realValue();
        var conf = GameConfig.vip[vipLvl];
        var nextConf = GameConfig.vip[vipLvl + 1] ? GameConfig.vip[vipLvl + 1] : conf;
        var obj = this.worldEnterCount ? this.worldEnterCount : null;
        var max = conf.WorldBoss;
        return [max, obj.limit, nextConf.WorldBoss];
    };
    /**
     * 判断世界BOSS进入
     */
    BossCache.prototype.getEnableEnterWB = function () {
        var data = GameCache.boss.worldEnterCount;
        var c = data && data.count ? data.count : 0;
        var a = GameConfig.globalConfig.worldBossNum;
        var remain = a + data.buyCount - c;
        return remain > 0;
    };
    return BossCache;
}(BaseCache));
__reflect(BossCache.prototype, "BossCache");
//# sourceMappingURL=BossCache.js.map